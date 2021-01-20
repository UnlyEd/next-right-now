import { MultiversalPageProps } from '@/layouts/core/types/MultiversalPageProps';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { getAmplitudeInstance } from '@/modules/core/amplitude/amplitude';
import amplitudeContext from '@/modules/core/amplitude/context/amplitudeContext';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import useDataset from '@/modules/core/data/hooks/useDataset';
import { Customer } from '@/modules/core/data/types/Customer';
import { detectLightHouse } from '@/modules/core/lightHouse/lighthouse';
import { configureSentryUser } from '@/modules/core/sentry/sentry';
import { cypressContext } from '@/modules/core/testing/contexts/cypressContext';
import {
  CYPRESS_WINDOW_NS,
  detectCypress,
} from '@/modules/core/testing/cypress';
import userConsentContext from '@/modules/core/userConsent/contexts/userConsentContext';
import initCookieConsent, { getUserConsent } from '@/modules/core/userConsent/cookieConsent';
import { UserConsent } from '@/modules/core/userConsent/types/UserConsent';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import { userSessionContext } from '@/modules/core/userSession/userSessionContext';
import {
  getIframeReferrer,
  isRunningInIframe,
} from '@/utils/iframe';
import {
  Amplitude,
  AmplitudeProvider,
} from '@amplitude/react-amplitude';
import { useTheme } from '@emotion/react';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import { AmplitudeClient } from 'amplitude-js';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MultiversalAppBootstrapPageProps } from '../types/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../types/MultiversalAppBootstrapProps';

const fileLabel = 'app/components/BrowserPageBootstrap';
const logger = createLogger({
  label: fileLabel,
});

export type BrowserPageBootstrapProps = MultiversalAppBootstrapProps<MultiversalPageProps & MultiversalAppBootstrapPageProps>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPageBootstrap = (props: BrowserPageBootstrapProps): JSX.Element => {
  const {
    Component,
    err,
    router,
  } = props;
  // When the page is served by the browser, some browser-only properties are available
  const pageProps = props.pageProps as unknown as MultiversalPageProps<OnlyBrowserPageProps>;
  const {
    customerRef,
    lang,
    locale,
  } = pageProps;
  const {
    t,
    i18n,
  } = useTranslation();
  const dataset = useDataset();
  const customer: Customer = useCustomer();
  const isInIframe: boolean = isRunningInIframe();
  const iframeReferrer: string = getIframeReferrer();
  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(); // On browser, we can access cookies directly (doesn't need req/res or page context)
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
  const userId = userSession.id;
  const injectedPageProps: MultiversalPageProps<OnlyBrowserPageProps> = {
    ...props.pageProps,
    isInIframe,
    iframeReferrer,
    cookiesManager,
    userSession,
  };
  const theme = useTheme();
  const isCypressRunning = detectCypress();
  const isLightHouseRunning = detectLightHouse();

  // Configure Sentry user and track navigation through breadcrumb
  configureSentryUser(userSession);
  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  const userConsent: UserConsent = getUserConsent();
  const {
    isUserOptedOutOfAnalytics,
    hasUserGivenAnyCookieConsent,
  } = userConsent;
  const amplitudeInstance: AmplitudeClient = getAmplitudeInstance({
    customerRef,
    iframeReferrer,
    isInIframe,
    lang,
    locale,
    userId,
    userConsent,
  });

  // Init the Cookie Consent popup, which will open on the browser
  initCookieConsent({
    allowedPages: [ // We only allow it on those pages to avoid display that boring popup on every page
      `${window.location.origin}/${locale}/terms`,
      `${window.location.origin}/${locale}/privacy`,
      `${window.location.origin}/${locale}/demo/built-in-features/cookies-consent`,
    ],
    amplitudeInstance,
    locale,
    t,
    theme,
    userConsent,
  });

  // XXX Inject data so that Cypress can use them to run dynamic tests.
  //  Those data mustn't be sensitive. They'll be available in the DOM, no matter the stage of the app.
  //  This is needed to run E2E tests that are specific to a customer. (dynamic testing)
  window[CYPRESS_WINDOW_NS] = {
    dataset,
    customer,
  };

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    window['amplitudeInstance'] = amplitudeInstance;
    window['i18n'] = i18n;
    window['router'] = router;
    window['t'] = t;
    logger.info(`Utilities have been bound to the DOM for quick testing (only in non-production stages):
        - amplitudeInstance
        - i18n
        - router
        - t
    `);
  }

  return (
    <AmplitudeProvider
      amplitudeInstance={amplitudeInstance}
      apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY}
      userId={userId}
    >
      <Amplitude
        // DA Know that we decided to duplicate the tracking of the same properties through event props and user props
        //  This is because charts are sometimes easier to build using events props, or user users props
        //  Duplicating them facilitates the data analysis and grants more flexibility regarding how to create charts
        eventProperties={{
          app: {
            name: process.env.NEXT_PUBLIC_APP_NAME,
            release: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
            stage: process.env.NEXT_PUBLIC_APP_STAGE,
            preset: process.env.NEXT_PUBLIC_NRN_PRESET,
          },
          page: {
            url: location.href,
            path: location.pathname,
            origin: location.origin,
            name: null, // XXX Will be set by the page (usually through its layout)
          },
          customer: {
            ref: customerRef,
          },
          lang: lang,
          locale: locale,
          iframe: isInIframe,
          iframeReferrer: iframeReferrer,
          isUserOptedOutOfAnalytics: isUserOptedOutOfAnalytics,
          hasUserGivenAnyCookieConsent: hasUserGivenAnyCookieConsent,
          isCypressRunning,
          isLightHouseRunning,
        }}
        // XXX Do not use "userProperties" here, add default user-related properties in getAmplitudeInstance instead
        //  Because "event" had priority over "user event" and will be executed before
        //  So, userProperties defined here then it will NOT be applied until the NEXT Amplitude event and this is likely gonna cause analytics issues
        // userProperties={{}}
      >
        <cypressContext.Provider value={{ isCypressRunning }}>
          <amplitudeContext.Provider value={{ amplitudeInstance }}>
            <userSessionContext.Provider value={{ ...userSession }}>
              <userConsentContext.Provider value={{ ...userConsent }}>
                <Component
                  {...injectedPageProps}
                  // @ts-ignore
                  error={err}
                />
              </userConsentContext.Provider>
            </userSessionContext.Provider>
          </amplitudeContext.Provider>
        </cypressContext.Provider>
      </Amplitude>
    </AmplitudeProvider>
  );
};

export default BrowserPageBootstrap;
