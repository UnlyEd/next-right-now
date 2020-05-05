/** @jsx jsx */
import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { cookieContext } from '../stores/cookieContext';
import { PageLayoutProps } from '../types/PageLayoutProps';
import { getAmplitudeInstance } from '../utils/amplitude';
import UniversalPageLayout from './UniversalPageLayout';

const fileLabel = 'components/BrowserPageLayout';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
  children: Function;
} & PageLayoutProps;

/**
 *
 * @param props
 * @constructor
 */
const BrowserPageLayout = (props: Props): JSX.Element => {
  const {
    cookiesManager,
    customer,
    customerRef,
    defaultLocales,
    error,
    i18nextInstance,
    iframeReferrer,
    isInIframe,
    headProps,
    lang,
    locale,
    pageName,
    router,
    userSession,
    theme,
  } = props;
  const { children, ...layoutPageProps } = props; // Only keep PageLayoutProps variables (remove children)
  const userId = userSession.id;
  const { t, i18n } = useTranslation();

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page "${pageName}"`,
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
            name: pageName,
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
        <cookieContext.Provider value={{ userSession, cookiesManager }}>
          <UniversalPageLayout
            children={children} // eslint-disable-line react/no-children-prop
            {...layoutPageProps}
          />
        </cookieContext.Provider>
      </Amplitude>
    </AmplitudeProvider>
  );
};

export default BrowserPageLayout;
