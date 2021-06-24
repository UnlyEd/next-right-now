import { MultiversalPageProps } from '@/layouts/core/types/MultiversalPageProps';
import { OnlyServerPageProps } from '@/layouts/core/types/OnlyServerPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { configureSentryUserMetadata } from '@/modules/core/sentry/universal';
import { userSessionContext } from '@/modules/core/userSession/userSessionContext';
import * as Sentry from '@sentry/node';
import React from 'react';
import { MultiversalAppBootstrapPageProps } from '../types/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../types/MultiversalAppBootstrapProps';

const fileLabel = 'app/components/ServerPageBootstrap';
const logger = createLogger({
  fileLabel,
});

export type ServerPageBootstrapProps = MultiversalAppBootstrapProps<MultiversalPageProps & MultiversalAppBootstrapPageProps>;

/**
 * Bootstraps the page, only when rendered on the server
 *
 * @param props
 */
const ServerPageBootstrap = (props: ServerPageBootstrapProps): JSX.Element => {
  const {
    Component,
    err,
  } = props;
  // When the page is served by the server, some server-only properties are available
  const pageProps = props.pageProps as unknown as MultiversalPageProps<OnlyServerPageProps>;
  const injectedPageProps: MultiversalPageProps<OnlyServerPageProps> = {
    ...pageProps,
  };
  const {
    userSession,
  } = pageProps;

  // Configure Sentry user and track navigation through breadcrumb
  configureSentryUserMetadata(userSession);
  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  return (
    <userSessionContext.Provider value={{ ...userSession }}>
      <Component
        {...injectedPageProps}
        // @ts-ignore
        error={err}
      />
    </userSessionContext.Provider>
  );
};

export default ServerPageBootstrap;
