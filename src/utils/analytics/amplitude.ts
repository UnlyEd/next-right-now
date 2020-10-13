import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import {
  AmplitudeClient,
  Identify,
} from 'amplitude-js';

import { NextWebVitalsMetricsReport } from '../../types/nextjs/NextWebVitalsMetricsReport';
import { UserConsent } from '../../types/UserConsent';
import { UserSemiPersistentSession } from '../../types/UserSemiPersistentSession';
import UniversalCookiesManager from '../cookies/UniversalCookiesManager';

/**
 * Event actions
 *
 * All actions must use action verb (imperative form)
 *
 * DA Usefulness: Avoids using anonymous constants that will likely duplicate each other
 *  Using constants ensures strict usage with a proper definition for the analytics team and the developers
 *  Example: Using both "remove" and "delete" could lead to misunderstanding or errors when configuring charts
 */
export enum AMPLITUDE_ACTIONS {
  CLICK = 'click', // When an element is clicked (mouse) or tapped (screen, mobile)
  SELECT = 'select', // When an element is selected (checkbox, select input, multi choices)
  REMOVE = 'remove', // When an element is removed/delete
  OPEN = 'open', // When an element is opened
  CLOSE = 'close', // When an element is closed
}

type GetAmplitudeInstanceProps = {
  customerRef: string;
  iframeReferrer: string;
  isInIframe: boolean;
  lang: string;
  locale: string;
  userId: string;
  userConsent: UserConsent;
}

export const getAmplitudeInstance = (props: GetAmplitudeInstanceProps): AmplitudeClient | null => {
  // XXX Amplitude is disabled on the server side, it's only used on the client side
  //  (avoids duplicated events, and amplitude-js isn't server-side compatible anyway)
  if (isBrowser()) {
    const {
      customerRef,
      iframeReferrer,
      isInIframe,
      lang,
      locale,
      userId,
      userConsent,
    } = props;
    const { isUserOptedOutOfAnalytics, hasUserGivenAnyCookieConsent } = userConsent;

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      scope.setTag('iframe', `${isInIframe}`);
      scope.setExtra('iframe', isInIframe);
      scope.setExtra('iframeReferrer', iframeReferrer);
    });

    const amplitude = require('amplitude-js'); // eslint-disable-line @typescript-eslint/no-var-requires
    const amplitudeInstance: AmplitudeClient = amplitude.getInstance();

    // See https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
    // See all JS SDK options https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/options.js
    amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
      userId,
      logLevel: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
      includeGclid: true,
      includeReferrer: true, // See https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
      includeUtm: true,
      // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
      onError: (error): void => {
        Sentry.captureException(error);
        console.error(error); // eslint-disable-line no-console
      },
      sameSiteCookie: 'Strict', // 'Strict' | 'Lax' | 'None' - See https://web.dev/samesite-cookies-explained/
      cookieExpiration: 365, // Expires in 1 year (would fallback to 10 years by default, which isn't GDPR compliant)
    });

    // Disable analytics tracking entirely if the user has opted-out
    if (isUserOptedOutOfAnalytics) {
      amplitudeInstance.setOptOut(true); // If true, then no events will be logged or sent.
      console.info('User has opted-out of analytics tracking.'); // eslint-disable-line no-console
    } else {
      // Re-enable tracking (necessary if it was previously disabled!)
      amplitudeInstance.setOptOut(false);
      console.info(`User has opted-in into analytics tracking. (Thank you! This helps us make our product better, and we don't track any personal/identifiable data.`); // eslint-disable-line no-console
    }

    amplitudeInstance.setVersionName(process.env.NEXT_PUBLIC_APP_VERSION); // e.g: 1.0.0

    // We're only doing this when detecting a new session, as it won't be executed multiple times for the same session anyway, and it avoids noise
    if (amplitudeInstance.isNewSession()) {
      // Store whether the visitor originally came from an iframe (and from where)
      const visitor: Identify = new amplitudeInstance.Identify();
      // XXX Learn more about "setOnce" at https://github.com/amplitude/Amplitude-JavaScript/issues/223
      visitor.setOnce('initial_lang', lang); // DA Helps figuring out if the initial language (auto-detected) is changed afterwards
      visitor.setOnce('initial_locale', locale);
      // DA This will help track down the users who discovered our platform because of an iframe
      visitor.setOnce('initial_iframe', isInIframe);
      visitor.setOnce('initial_iframeReferrer', iframeReferrer);

      // XXX We set all "must-have" properties here (instead of doing it in the "AmplitudeProvider", as userProperties), because react-amplitude will send the next "page-displayed" event BEFORE sending the $identify event
      visitor.setOnce('customer.ref', customerRef);
      visitor.setOnce('lang', lang);
      visitor.setOnce('locale', locale);
      visitor.setOnce('iframe', isInIframe);
      visitor.setOnce('iframeReferrer', iframeReferrer);

      visitor.set('isUserOptedOutOfAnalytics', isUserOptedOutOfAnalytics);
      visitor.set('hasUserGivenAnyCookieConsent', hasUserGivenAnyCookieConsent);

      amplitudeInstance.identify(visitor); // Send the new identify event to amplitude (updates user's identity)
    }

    return amplitudeInstance;

  } else {
    return null;
  }
};

/**
 * Initialise Amplitude and send web-vitals metrics report.
 *
 * @param report
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 */
export const sendWebVitals = (report: NextWebVitalsMetricsReport): void => {
  try {
    const amplitude = require('amplitude-js'); // eslint-disable-line @typescript-eslint/no-var-requires
    const amplitudeInstance: AmplitudeClient = amplitude.getInstance();
    const universalCookiesManager = new UniversalCookiesManager();
    const userData: UserSemiPersistentSession = universalCookiesManager.getUserData();

    // https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
    // See all JS SDK options https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/options.js
    amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
      // userId: null,
      userId: userData.id,
      logLevel: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
      includeGclid: false, // GDPR Enabling this is not GDPR compliant and must not be enabled without explicit user consent - See https://croud.com/blog/news/10-point-gdpr-checklist-digital-advertising/
      includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
      includeUtm: true,
      // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
      onError: (error): void => {
        Sentry.captureException(error);
        console.error(error); // eslint-disable-line no-console
      },
      sameSiteCookie: 'Strict', // 'Strict' | 'Lax' | 'None' - See https://web.dev/samesite-cookies-explained/
      cookieExpiration: 365, // Expires in 1 year (would fallback to 10 years by default, which isn't GDPR compliant)
    });

    amplitudeInstance.setVersionName(process.env.NEXT_PUBLIC_APP_VERSION); // e.g: 1.0.0

    // Sen metrics to our analytics service
    amplitudeInstance.logEvent(`report-web-vitals`, {
      app: {
        name: process.env.NEXT_PUBLIC_APP_NAME,
        version: process.env.NEXT_PUBLIC_APP_VERSION,
        stage: process.env.NEXT_PUBLIC_APP_STAGE,
        preset: process.env.NEXT_PUBLIC_NRN_PRESET,
      },
      page: {
        url: location.href,
        path: location.pathname,
        origin: location.origin,
        name: null,
      },
      customer: {
        ref: process.env.NEXT_PUBLIC_CUSTOMER_REF,
      },
      report,
    });
    console.debug('report-web-vitals report sent to Amplitude');
  } catch (e) {
    Sentry.captureException(e);
    console.error(e);// eslint-disable-line no-console
  }
};
