/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import React from 'react';

import { userSessionContext } from '../../stores/userSessionContext';
import { MultiversalAppBootstrapPageProps } from '../../types/nextjs/MultiversalAppBootstrapPageProps';
import { MultiversalAppBootstrapProps } from '../../types/nextjs/MultiversalAppBootstrapProps';
import { BrowserPageProps } from '../../types/pageProps/BrowserPageProps';
import { MultiversalPageProps } from '../../types/pageProps/MultiversalPageProps';
import { SSRPageProps } from '../../types/pageProps/SSRPageProps';

const fileLabel = 'components/appBootstrap/ServerPageBootstrap';
const logger = createLogger({
  label: fileLabel,
});

export type ServerPageBootstrapProps = MultiversalAppBootstrapProps<MultiversalPageProps & MultiversalAppBootstrapPageProps>;

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const ServerPageBootstrap = (props: ServerPageBootstrapProps): JSX.Element => {
  const {
    Component,
    pageProps,
    err,
  } = props;
  // When the page is served by the server, additional properties are available
  const {
    userSession,
  } = pageProps as unknown as SSRPageProps;
  const injectedPageProps: MultiversalPageProps<BrowserPageProps> = {
    ...props.pageProps,
    // cookiesManager,
    userSession,
  };

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
