/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import customerContext from '../stores/customerContext';
import i18nContext from '../stores/i18nContext';
import { PageBootstrapProps } from '../types/PageBootstrapProps';
import UniversalGlobalStyles from './UniversalGlobalStyles';

const fileLabel = 'components/PageBootstrap';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type Props = {} & PageBootstrapProps;

/**
 *
 * @param props
 * @constructor
 */
const PageBootstrap = (props: Props): JSX.Element => {
  const {
    customer,
    customerRef,
    defaultLocales,
    i18nextInstance,
    lang,
    locale,
    router,
    theme,
  } = props;
  const {
    Component,
    err,
    ...propsToForward
  } = props;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  if (isBrowser()) { // Avoids log clutter on server
    console.debug(`PageBootstrap.props`, props);
  }

  return (
    <i18nContext.Provider value={{ lang, locale }}>
      <customerContext.Provider value={customer}>
        {/* XXX Global styles that applies to all pages within this layout go there */}
        <UniversalGlobalStyles theme={theme} />

        <ThemeProvider theme={theme}>
          <Component
            {...propsToForward}
            // @ts-ignore
            error={err}
          />
        </ThemeProvider>
      </customerContext.Provider>
    </i18nContext.Provider>
  );
};

export default PageBootstrap;
