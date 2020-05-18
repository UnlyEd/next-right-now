/** @jsx jsx */
import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { userSessionContext } from '../../stores/userSessionContext';
import { MultiversalAppBootstrapPageProps } from '../../types/nextjs/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../../types/nextjs/MultiversalAppBootstrapProps';
import { MultiversalPageProps } from '../../types/pageProps/MultiversalPageProps';
import { OnlyBrowserPageProps } from '../../types/pageProps/OnlyBrowserPageProps';
import { UserSemiPersistentSession } from '../../types/UserSemiPersistentSession';
import { getAmplitudeInstance } from '../../utils/analytics/amplitude';
import { createLogger } from '../../utils/app/logger';
import UniversalCookiesManager from '../../utils/cookies/UniversalCookiesManager';
import { getIframeReferrer, isRunningInIframe } from '../../utils/iframe';

const fileLabel = 'components/appBootstrap/BrowserPageBootstrap';
const logger = createLogger(fileLabel);

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
  const { t, i18n } = useTranslation();
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

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  const amplitudeInstance = getAmplitudeInstance({
    customerRef,
    iframeReferrer,
    isInIframe,
    lang,
    locale,
    userId,
  });

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (process.env.APP_STAGE !== 'production') {
    window['amplitudeInstance'] = amplitudeInstance;
    window['i18n'] = i18n;
    window['router'] = router;
    window['t'] = t;
    window['logger'] = logger;
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
      apiKey={process.env.AMPLITUDE_API_KEY}
      userId={userId}
    >
      <Amplitude
        // DA Event props and user props are sometimes duplicated to ease the data analysis through Amplitude
        //  Because charts are sometimes easier to build using events props, or user users props
        eventProperties={{
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
            ref: customerRef,
          },
          lang: lang,
          locale: locale,
          iframe: isInIframe,
          iframeReferrer: iframeReferrer,
        }}
        // XXX Do not use "userProperties" here, add default user-related properties in getAmplitudeInstance instead
        //  Because "event" had priority over "user event" and will be executed before! So, userProperties defined here
        //  will NOT be applied until the NEXT Amplitude event and this is likely gonna cause analytics issues!
        // userProperties={{}}
      >
        <userSessionContext.Provider value={{ ...userSession }}>
          <Component
            {...injectedPageProps}
            // @ts-ignore
            error={err}
          />
        </userSessionContext.Provider>
      </Amplitude>
    </AmplitudeProvider>
  );
};

export default BrowserPageBootstrap;
