import { AmplitudeClient } from 'amplitude-js';
import { TFunction } from 'i18next';
import BrowserCookies from 'js-cookie';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { UserConsent } from '../../types/UserConsent';

/**
 * Defines whether the user do not consent to data tracking by default (until they've made a choice)
 * XXX The value should depends on the laws applying to the end-user.
 *
 * For instance, in France (GDPR + CNIL), consent is required before tracking any data, unless in a very particular exception where it's allowed.
 * For NRN, we consider consent is not required before tracking analytics data, because no personal data is ever processed.
 */
export const IS_USER_OPT_OUT_BY_DEFAULT = false;

/**
 * Name of the cookie that will store the user consent.
 * Will be used by the application to know what is the choice of the user.
 */
export const CONSENT_COOKIE_NAME = 'cookieconsent_status';

/**
 * Resolves whether the user has opt-in or opt-out for analytics tracking.
 * Handles special cases when users have dismissed or not made a choice yet.
 */
export const getUserConsent = (): UserConsent => {
  const userConsentChoice: string = BrowserCookies.get(CONSENT_COOKIE_NAME);
  const isUserOptOut: boolean = userConsentChoice === 'deny';
  const isUserOptIn: boolean = userConsentChoice === 'allow' || (userConsentChoice === 'dismiss' && IS_USER_OPT_OUT_BY_DEFAULT);
  let isUserOptedOutOfAnalytics;

  if (isUserOptOut) {
    isUserOptedOutOfAnalytics = true;
  } else if (isUserOptIn) {
    isUserOptedOutOfAnalytics = false;
  } else {
    // User hasn't made a choice yet
    isUserOptedOutOfAnalytics = IS_USER_OPT_OUT_BY_DEFAULT;
  }

  return {
    isUserOptedOutOfAnalytics: isUserOptedOutOfAnalytics,
    hasUserGivenAnyCookieConsent: userConsentChoice === 'allow' || userConsentChoice === 'deny',
  };
};

/**
 * Initialise the Cookie Consent UI popup
 * Relies on Osano open source "cookieconsent" software (v3) https://github.com/osano/cookieconsent
 *
 * @param amplitudeInstance
 * @param theme
 * @param t
 *
 * @param locale
 * @see https://www.osano.com/cookieconsent/documentation/
 * @see https://www.osano.com/cookieconsent/documentation/javascript-api/
 * @see https://www.osano.com/cookieconsent/download/
 */
const init = (amplitudeInstance: AmplitudeClient, theme: CustomerTheme, t: TFunction, locale: string): void => {
  const { primaryColor } = theme;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('cookieconsent'); // XXX Requiring it will make it available in the browser (cannot be used properly as a module)

  // @ts-ignore
  const cc = window.cookieconsent;

  // Use https://www.osano.com/cookieconsent/download/ "Start Coding" to use the UI configuration builder
  // See https://www.osano.com/cookieconsent/documentation/javascript-api/ for advanced API options and documentation
  const cookieConsentSettings = {
    // Behavior
    autoOpen: true,
    autoAttach: true,
    type: 'opt-out', // We consider the user is opt-in by default and must opt-out manually to disable tracking
    revokable: true,
    whitelistPage: [`/${locale}/terms`],
    blacklistPage: [],
    location: false, // XXX Can also be an object with advanced configuration to implement your own geolocation resolvers
    cookie: {
      name: CONSENT_COOKIE_NAME,
      path: '/',
      domain: window.location.hostname, // Uses the current domain
      expiryDays: 365,
      secure: process.env.NEXT_PUBLIC_APP_STAGE !== 'development', // Always use a secure cookie on non-dev stages
    },
    dismissOnScroll: false,
    dismissOnTimeout: false, // XXX Beware there is a bug, buggy, will override previous choice stored in cookie
    dismissOnWindowClick: false,

    // UI (colors, visual design)
    theme: 'classic',
    position: 'bottom-right',
    palette: {
      popup: {
        background: '#fff',
      },
      button: {
        background: '#fff',
        text: primaryColor,
      },
    },
    // elements: {
    //   header: '<span class="cc-header"></span>',
    //   message: '<span id="cookieconsent:desc" class="cc-message"></span>',
    //   messagelink: '<span id="cookieconsent:desc" class="cc-message"> <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a></span>',
    //   dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss"></a>',
    //   allow: '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow"></a>',
    //   deny: '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny"></a>',
    //   link: '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a>',
    //   close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close"></span>',
    // },
    // window: '<div role="”dialog”" aria-label="”cookieconsent”" aria-describedby="”cookieconsent:desc”" class="”cc-window" ”></div>',
    // compliance: {
    //   'info': '<div class="cc-compliance"></div>',
    //   'opt-in': '<div class="cc-compliance cc-highlight"></div>',
    //   'opt-out': '<div class="cc-compliance cc-highlight"></div>',
    // },

    // Content (texts, wording)
    content: {
      header: 'Cookies used on the website!',
      message: 'This website uses cookies to improve your experience.',
      dismiss: 'Got it!',
      allow: 'Allow cookies',
      deny: 'Decline',
      link: 'Learn more',
      href: `/${locale}/terms`,
      target: '', // Use "_blank" if you use an external "href" value
      close: '&#x274c;',
      policy: 'Cookie Policy',
    },

    // Events
    onInitialise: function(status) {
      console.info('onInitialise', status);
    },
    onPopupOpen: function() {
      console.info('onPopupOpen');
    },
    onPopupClose: function() {
      console.info('onPopupClose');
    },
    /**
     * The previousChoice is for the status
     * This event may trigger multiple times (once per status changed)
     *
     * @param status
     * @param previousChoice
     */
    onStatusChange: function(status, previousChoice) {
      console.info('onStatusChange', status, previousChoice);
    },
    onRevokeChoice: function() {
      console.info('onRevokeChoice');
    },
  };
  cc.initialise(cookieConsentSettings);
};

export default init;
