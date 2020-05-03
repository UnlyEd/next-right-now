/** @jsx jsx */
import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { i18n } from 'i18next';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NRN_DEFAULT_THEME } from '../constants';
import { Theme } from '../types/data/Theme';
import { LayoutPageProps } from '../types/LayoutPageProps';
import { LayoutPropsSSG } from '../types/LayoutProps';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';
import { getAmplitudeInstance } from '../utils/amplitude';
import i18nextLocize from '../utils/i18nextLocize';
import { getIframeReferrer, isRunningInIframe } from '../utils/iframe';
import { getValue, STRATEGY_DO_NOTHING } from '../utils/record';
import UniversalCookiesManager from '../utils/UniversalCookiesManager';
import UniversalPageLayout from './UniversalPageLayout';

const fileLabel = 'components/PageLayout';
const logger = createLogger({
  label: fileLabel,
});

/**
 * PageLayout of the whole app. Acts as a wrapper that displays the whole thing (menus, page, etc.)
 *
 * @param {Props} props
 * @return {JSX.Element}
 * @constructor
 */
const PageLayout: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children,
    customer,
    customerRef,
    error,
    defaultLocales,
    lang,
    locale,
    // amplitudeInstance,
  }: Props = props;
  const router = useRouter();
  const i18nextInstance: i18n = i18nextLocize(lang, defaultLocales); // Apply i18next configuration with Locize backend
  const isInIframe: boolean = isRunningInIframe();
  const iframeReferrer: string = getIframeReferrer();
  const { t, i18n } = useTranslation();

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering layout (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (isBrowser() && process.env.APP_STAGE !== 'production') {
    window['i18n'] = i18n;
    window['t'] = t;
    // window['amplitudeInstance'] = amplitudeInstance;
    logger.info(`Utilities have been bound to the DOM for quick testing (only in non-production stages):
    - i18n
    - t
    // - amplitudeInstance
    `);
  }

  const theme: Theme = customer?.theme || {};

  // Apply default theming if not specified
  theme.primaryColor = getValue(theme, 'primaryColor', NRN_DEFAULT_THEME.primaryColor, STRATEGY_DO_NOTHING);
  logger.debug(JSON.stringify(theme, null, 2));

  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager();
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
  const userId = userSession.id;
  const layoutPageProps: LayoutPageProps = {
    ...props,
    isInIframe,
    router,
    i18nextInstance,
    cookiesManager,
    userSession,
  };

  const BrowserPageLayout = (): JSX.Element => {
    const amplitudeInstance = getAmplitudeInstance({
      customerRef,
      iframeReferrer,
      isInIframe,
      lang,
      locale,
      userId,
    });
    console.log('amplitudeInstance', amplitudeInstance);

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
          // userProperties={{}} XXX Do not use this, add default user-related properties in getAmplitudeInstance instead
        >
          <UniversalPageLayout
            children={children} // eslint-disable-line react/no-children-prop
            iframeReferrer={iframeReferrer}
            theme={theme}
            {...layoutPageProps}
          />
        </Amplitude>
      </AmplitudeProvider>
    );
  };

  if (isBrowser()) {
    return (
      <BrowserPageLayout />
    );
  } else {
    return (
      <UniversalPageLayout
        children={children} // eslint-disable-line react/no-children-prop
        iframeReferrer={iframeReferrer}
        theme={theme}
        {...layoutPageProps}
      />
    );
  }
};

type Props = {
  children: Function;
} & LayoutPropsSSG;

export default PageLayout;
