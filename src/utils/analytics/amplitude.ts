import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { AmplitudeClient, Identify } from 'amplitude-js';
import { NextWebVitalsMetricsReport } from '../../types/nextjs/NextWebVitalsMetricsReport';
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
    } = props;

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      scope.setTag('iframe', `${isInIframe}`);
      scope.setExtra('iframe', isInIframe);
      scope.setExtra('iframeReferrer', iframeReferrer);
    });

    const amplitude = require('amplitude-js'); // eslint-disable-line @typescript-eslint/no-var-requires
    const amplitudeInstance: AmplitudeClient = amplitude.getInstance();

    // https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
    amplitudeInstance.init(process.env.AMPLITUDE_API_KEY, null, {
      userId,
      logLevel: process.env.APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
      includeGclid: true,
      includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
      includeUtm: true,
      // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
      onError: (error): void => {
        Sentry.captureException(error);
        console.error(error); // eslint-disable-line no-console
      },
    });

    amplitudeInstance.setVersionName(process.env.APP_VERSION); // e.g: 1.0.0

    // We're only doing this when detecting a new session, as it won't be executed multiple times for the same session anyway, and it avoids noise
    if (amplitudeInstance.isNewSession()) {
      // Store whether the visitor originally came from an iframe (and from where)
      const visitor: Identify = new amplitudeInstance.Identify();
      // XXX See https://github.com/amplitude/Amplitude-JavaScript/issues/223
      visitor.setOnce('initial_lang', lang); // DA Helps figuring out if the initial language (auto-detected) is changed afterwards
      visitor.setOnce('initial_locale', locale);
      // DA This will help track down the users who discovered our platform because of an iframe
      // @ts-ignore See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43598
      visitor.setOnce('initial_iframe', isInIframe);
      visitor.setOnce('initial_iframeReferrer', iframeReferrer);

      // XXX We must set all other "must-have" properties here (instead of below, as userProperties), because react-amplitude will send the next "page-displayed" event BEFORE sending the $identify event
      //  Thus, it'd store the first event with an associated user who has not defined "customer.ref", "lang", etc... and that'd break our stats (following events would be correct, only the first event of a new user would be wrong)
      visitor.setOnce('customer.ref', customerRef);
      visitor.setOnce('lang', lang);
      visitor.setOnce('locale', locale);
      // @ts-ignore See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43598
      visitor.setOnce('iframe', isInIframe);
      visitor.setOnce('iframeReferrer', iframeReferrer);

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
    amplitudeInstance.init(process.env.AMPLITUDE_API_KEY, null, {
      // userId: null,
      userId: userData.id,
      logLevel: process.env.APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
      includeGclid: true,
      includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
      includeUtm: true,
      // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
      onError: (error): void => {
        Sentry.captureException(error);
        console.error(error); // eslint-disable-line no-console
      },
    });

    amplitudeInstance.setVersionName(process.env.APP_VERSION); // e.g: 1.0.0

    // Sen metrics to our analytics service
    amplitudeInstance.logEvent(`report-web-vitals`, {
      app: {
        name: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        stage: process.env.APP_STAGE,
        preset: process.env.NRN_PRESET,
      },
      page: {
        url: location.href,
        path: location.pathname,
        origin: location.origin,
        name: null,
      },
      customer: {
        ref: process.env.CUSTOMER_REF,
      },
      report,
    });
    console.debug('report-web-vitals report sent to Amplitude');
  } catch (e) {
    Sentry.captureException(e);
    console.error(e);// eslint-disable-line no-console
  }
};
