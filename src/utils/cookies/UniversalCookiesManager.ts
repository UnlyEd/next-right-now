import * as Sentry from '@sentry/node';
import { COOKIE_LOOKUP_KEY_LANG } from '@unly/universal-language-detector/lib';
import { isBrowser } from '@unly/utils';
import ServerCookies, {
  GetOption,
  SetOption,
} from 'cookies';
import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import BrowserCookies, { CookieAttributes } from 'js-cookie';
import { v1 as uuid } from 'uuid'; // XXX Use v1 for uniqueness - See https://www.sohamkamani.com/blog/2016/10/05/uuid1-vs-uuid4/

import { Cookies } from '../../types/Cookies';
import {
  PatchedUserSemiPersistentSession,
  UserSemiPersistentSession,
} from '../../types/UserSemiPersistentSession';
import { addYears } from '../js/date';

const USER_LS_KEY = 'user';

/**
 * Helper to manage cookies universally whether being on the server or browser
 *
 * Switches between BrowserCookies and ServerCookies depending on the runtime engine
 * Those two APIs being different (different projects), it deals with those differences, so that they're hidden away when using the helper
 *
 * XXX Do not try to pass down an instance of UniversalCookiesManager to Next.js "pageProps", or it'll throw a circular dependencies
 *  Instead, better instantiate a new UniversalCookiesManager when needed (without req/res if outside of "getInitialProps")
 */
export default class UniversalCookiesManager {
  private readonly req?: IncomingMessage;
  private readonly res?: ServerResponse;
  private readonly readonlyCookies?: Cookies;
  private readonly defaultServerOptions: SetOption = { // See https://www.npmjs.com/package/cookies#cookiesset-name--value---options--
    httpOnly: false, // Force cookies to be sent to the browser
    expires: addYears(new Date(), 10), // Force cookies to expire in 10 years
  };
  private readonly defaultBrowserOptions: CookieAttributes = { // See https://github.com/js-cookie/js-cookie#cookie-attributes
    expires: 365 * 10, // Force cookies to expire in 10 years
  };

  /**
   * Universal Cookie Manager constructor
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Cookies} readonlyCookies - Useful if req/res aren't accessible (CSR, or SSR outside of _app), will allow to read cookie (but won't allow writes)
   */
  constructor(req?: IncomingMessage, res?: ServerResponse, readonlyCookies?: Cookies) {
    this.req = req || null;
    this.res = res || null;
    this.readonlyCookies = readonlyCookies || null;
  }

  /**
   * Replaces all user data stored in the browser's cookies by a new dataset
   *
   * @param {UserSemiPersistentSession} newUserData
   * @param serverOptions See https://www.npmjs.com/package/cookies#cookiesset-name--value---options--
   * @param browserOptions
   */
  replaceUserData(newUserData: UserSemiPersistentSession, serverOptions = this.defaultServerOptions, browserOptions: CookieAttributes = this.defaultBrowserOptions): void {
    try {
      if (isBrowser()) {
        // XXX By default, "js-cookies" apply a "percent encoding" when writing data, which isn't compatible with the "cookies" lib
        //  We therefore override this behaviour because we need to write proper JSON
        //  See https://github.com/js-cookie/js-cookie#encoding
        const browserCookies = BrowserCookies.withConverter({
          write: function(value: string, name: string) {
            return value;
          },
        });
        browserCookies.set(USER_LS_KEY, JSON.stringify(newUserData), browserOptions);
      } else {
        const serverCookies = new ServerCookies(this.req, this.res);

        // If running on the server side but req or res aren't set, then we don't do anything
        // It's likely because we're calling this code from a view (that doesn't belong to getInitialProps and doesn't have access to req/res even though if it's running on the server)
        if (this.req && this.res) {
          serverCookies.set(USER_LS_KEY, JSON.stringify(newUserData), serverOptions);
        }
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  /**
   * Initializes the user data and stores them in the browser's cookies
   *
   * @return {UserSemiPersistentSession}
   */
  initUserData(): UserSemiPersistentSession {
    const deviceId: string = uuid();
    const userData: UserSemiPersistentSession = {
      id: deviceId, // XXX For now, the device id is used as user id too, because we have no way of uniquely identifying users
      deviceId,
    };

    this.replaceUserData(userData);

    return userData;
  }

  /**
   * Retrieves the user data stored in the browser's cookies
   *
   * If there are no such data, then initialise them
   *
   * @return {UserSemiPersistentSession}
   */
  getUserData(serverOptions?: GetOption): UserSemiPersistentSession {
    let rawUserData: string;

    if (isBrowser()) {
      rawUserData = BrowserCookies.get(USER_LS_KEY);

    } else {
      const serverCookies = new ServerCookies(this.req, this.res);

      // If running on the server side but req or res aren't set, then we should have access to readonlyCookies provided through the _app:getInitialProps
      // Otherwise, it means that's we're trying to read our cookies through SSR but have no way of reading them, which will cause a odd behaviour
      // XXX To avoid this issue, the easiest way is to provide readonlyCookies through the constructor, so that we can read cookies from server side
      if (this.req && this.res) {
        rawUserData = serverCookies.get(USER_LS_KEY, serverOptions);
      } else if (this.readonlyCookies) {
        rawUserData = this.readonlyCookies?.[USER_LS_KEY];
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Calling "getUserData" from the server side, but neither req/res nor readonlyCookies are provided. The server can't read any cookie and will therefore initialise a temporary user session (which won't override actual cookies since we can't access them)`);
      }
    }

    // If cookie's undefined, init (first visit)
    if (typeof rawUserData === 'undefined') {
      return this.initUserData();
    }

    try {
      const userData: UserSemiPersistentSession = JSON.parse(rawUserData);

      if (!userData) {
        return this.initUserData();
      } else {
        return userData;
      }

    } catch (e) {
      Sentry.withScope((scope) => {
        scope.setExtra('rawUserData', rawUserData);

        Sentry.captureException(e);
      });

      // eslint-disable-next-line no-console
      console.error(e);

      // Data unreadable, creating new data
      return this.initUserData();
    }
  }

  /**
   * Patches the existing user data stored in the browser's cookies with a patch
   *
   * This patch may contain any information, all fields are optional
   *
   * @param {PatchedUserSemiPersistentSession} patch
   */
  patchUserData(patch: PatchedUserSemiPersistentSession): void {
    this.replaceUserData({
      ...this.getUserData(),
      ...patch,
    });
  }

  /**
   * Change the language stored in the i18next cookie
   *
   * By default, no language is stored in the cookie and the app relies on the browser's language
   * Once the cookie is set, it'll rely on the cookie instead (through i18next)
   *
   * @param {string} lang
   * @param serverOptions
   */
  setLanguage(lang: string, serverOptions: SetOption = this.defaultServerOptions): void {
    if (isBrowser()) {
      BrowserCookies.set(COOKIE_LOOKUP_KEY_LANG, lang);
    } else {
      const serverCookies = new ServerCookies(this.req, this.res);
      serverCookies.set(COOKIE_LOOKUP_KEY_LANG, lang, serverOptions);
    }
  }
}
