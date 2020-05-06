/** @jsx jsx */
import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { sessionContext } from '../stores/sessionContext';
import { BrowserPageBootstrapProps } from '../types/BrowserPageBootstrapProps';
import { MultiversalPageBootstrapProps } from '../types/MultiversalPageBootstrapProps';
import { PageBootstrapProps } from '../types/PageBootstrapProps';
import { UniversalSSGPageBootstrapProps } from '../types/UniversalSSGPageBootstrapProps';
import { getAmplitudeInstance } from '../utils/amplitude';
import PageBootstrap from './PageBootstrap';

const fileLabel = 'components/BrowserPageBootstrap';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
} & BrowserPageBootstrapProps;

/**
 *
 * @param props
 * @constructor
 */
const BrowserPageBootstrap = (props: Props): JSX.Element => {
  const {
    Component,
    cookiesManager,
    customer,
    customerRef,
    defaultLocales,
    err,
    i18nextInstance,
    iframeReferrer,
    isInIframe,
    lang,
    locale,
    router,
    userSession,
    theme,
  } = props;
  const userId = userSession.id;
  const { t, i18n } = useTranslation();

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
  if (isBrowser() && process.env.APP_STAGE !== 'production') {
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
          <PageBootstrap
            {...props}
          />
        </sessionContext.Provider>
      </Amplitude>
    </AmplitudeProvider>
  );
};

export default BrowserPageBootstrap;
