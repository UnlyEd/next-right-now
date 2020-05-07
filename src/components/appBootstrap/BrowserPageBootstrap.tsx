/** @jsx jsx */
import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import { i18n } from 'i18next';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { sessionContext } from '../../stores/sessionContext';
import { BrowserPageProps } from '../../types/BrowserPageProps';
import { Theme } from '../../types/data/Theme';
import { MultiversalAppBootstrapProps } from '../../types/MultiversalAppBootstrapProps';
import { MultiversalPageProps } from '../../types/MultiversalPageProps';
import { UserSemiPersistentSession } from '../../types/UserSemiPersistentSession';
import { getAmplitudeInstance } from '../../utils/amplitude';
import { getIframeReferrer, isRunningInIframe } from '../../utils/iframe';
import UniversalCookiesManager from '../../utils/UniversalCookiesManager';

const fileLabel = 'components/appBootstrap/BrowserPageBootstrap';
const logger = createLogger({
  label: fileLabel,
});

export type Props = {} & MultiversalAppBootstrapProps<MultiversalPageProps & {
  i18nextInstance: i18n;
  theme: Theme;
}>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPageBootstrap = (props: Props): JSX.Element => {
  const {
    Component,
    pageProps,
    err,
  } = props;
  const {
    customerRef,
    lang,
    locale,
  } = pageProps;
  const { t, i18n } = useTranslation();
  const isInIframe: boolean = isRunningInIframe();
  const iframeReferrer: string = getIframeReferrer();
  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager();
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
  const userId = userSession.id;
  const injectedPageProps: MultiversalPageProps<BrowserPageProps> = {
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
    window['i18n'] = i18n;
    window['t'] = t;
    window['amplitudeInstance'] = amplitudeInstance;
    logger.info(`Utilities have been bound to the DOM for quick testing (only in non-production stages):
        - i18n
        - t
        - amplitudeInstance
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
        <sessionContext.Provider value={{ userSession, cookiesManager }}>
          <Component
            {...injectedPageProps}
            // @ts-ignore
            error={err}
          />
        </sessionContext.Provider>
      </Amplitude>
    </AmplitudeProvider>
  );
};

export default BrowserPageBootstrap;
