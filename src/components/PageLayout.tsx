/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { i18n } from 'i18next';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import { Theme } from '../types/data/Theme';
import { PageLayoutProps } from '../types/PageLayoutProps';
import { StaticProps } from '../types/StaticProps';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';
import i18nextLocize from '../utils/i18nextLocize';
import { getIframeReferrer, isRunningInIframe } from '../utils/iframe';
import { initCustomerTheme } from '../utils/theme';
import UniversalCookiesManager from '../utils/UniversalCookiesManager';
import BrowserPageLayout from './BrowserPageLayout';
import { HeadProps } from './Head';
import UniversalPageLayout from './UniversalPageLayout';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

const fileLabel = 'components/PageLayout';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
  children: Function;
  pageName: string;
  headProps?: HeadProps;
} & StaticProps;

/**
 * Acts as a wrapper that displays the whole thing (menus, page, etc.)
 *
 * @example
 * <PageLayout
 *   name={'index'}
 *   {...props}
 * >
 *  {
 *    (layoutPageProps: PageLayoutProps): JSX.Element => {
 *      => layoutPageProps
 *    }
 *  }
 * </PageLayout>
 *
 * @param {Props} props
 */
const PageLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    customer,
    customerRef,
    defaultLocales,
    error,
    headProps,
    lang,
    locale,
    pageName,
  }: Props = props;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page "${pageName}"`,
    level: Sentry.Severity.Debug,
  });

  const router = useRouter();
  const i18nextInstance: i18n = i18nextLocize(lang, defaultLocales); // Apply i18next configuration with Locize backend
  const { t }: UseTranslationResponse = useTranslation();
  const theme: Theme = initCustomerTheme(customer);
  const pageLayoutProps: PageLayoutProps = {
    ...props,
    i18nextInstance,
    headProps,
    pageName,
    router,
    t,
    theme,
  };

  /*
   * We split the rendering between server and browser
   * There are actually 3 rendering modes, each of them has its own set of limitations
   *  1. SSR (doesn't have access to browser-related features (LocalStorage), but it does have access to request-related data (cookies, HTTP headers))
   *  2. Server during SSG (doesn't have access to browser-related features (LocalStorage), nor to request-related data (cookies, localStorage, HTTP headers))
   *  3. Static rendering (doesn't have access to server-related features (HTTP headers), but does have access to request-related data (cookie) and browser-related features (LocalStorage))
   *
   * What we do here, is to avoid rendering browser-related stuff if we're not running in a browser, because it cannot work properly.
   * (e.g: Generating cookies will work, but they won't be stored on the end-user device, and it would create "Text content did not match" warnings, if generated from the server during SSG)
   *
   * So, the BrowserPageLayout does browser-related stuff and then call the UniversalPageLayout which takes care of stuff that is isomorphic (identical between browser and server)
   *
   * XXX If you're concerned regarding React rehydration, read our talk with Josh, author of https://joshwcomeau.com/react/the-perils-of-rehydration/
   *  https://twitter.com/Vadorequest/status/1257658553361408002
   */
  if (isBrowser()) {
    const isInIframe: boolean = isRunningInIframe();
    const iframeReferrer: string = getIframeReferrer();
    const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager();
    const userSession: UserSemiPersistentSession = cookiesManager.getUserData();

    return (
      <BrowserPageLayout
        children={children} // eslint-disable-line react/no-children-prop
        cookiesManager={cookiesManager}
        isInIframe={isInIframe}
        iframeReferrer={iframeReferrer}
        userSession={userSession}
        {...pageLayoutProps}
      />
    );
  } else {
    return (
      <UniversalPageLayout
        children={children} // eslint-disable-line react/no-children-prop
        {...pageLayoutProps}
      />
    );
  }
};

export default PageLayout;
