import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import React from 'react';

import { userSessionContext } from '../../stores/userSessionContext';
import { MultiversalAppBootstrapPageProps } from '../../types/nextjs/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../../types/nextjs/MultiversalAppBootstrapProps';
import { MultiversalPageProps } from '../../types/pageProps/MultiversalPageProps';
import { OnlyServerPageProps } from '../../types/pageProps/OnlyServerPageProps';
import { configureSentryUser } from '../../utils/monitoring/sentry';

const fileLabel = 'components/appBootstrap/ServerPageBootstrap';
const logger = createLogger({
  label: fileLabel,
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
  configureSentryUser(userSession);
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
