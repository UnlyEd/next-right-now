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
  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager();
  const pageLayoutProps: PageLayoutProps = {
    ...props,
    cookiesManager,
    i18nextInstance,
    headProps,
    pageName,
    router,
    t,
    theme,
  };

  // TODO this isn't good for rehydration and needs to be re-implemented - see https://joshwcomeau.com/react/the-perils-of-rehydration/
  if (isBrowser()) {
    const isInIframe: boolean = isRunningInIframe();
    const iframeReferrer: string = getIframeReferrer();
    const userSession: UserSemiPersistentSession = cookiesManager.getUserData();

    return (
      <BrowserPageLayout
        children={children} // eslint-disable-line react/no-children-prop
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
