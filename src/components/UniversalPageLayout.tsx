/** @jsx jsx */
import { LogOnMount } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import classnames from 'classnames';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { Button } from 'reactstrap';
import ErrorPage from '../pages/_error';
import customerContext from '../stores/customerContext';
import i18nContext from '../stores/i18nContext';
import { PageLayoutProps } from '../types/PageLayoutProps';
import Footer from './Footer';
import Head from './Head';
import Nav from './Nav';
import UniversalGlobalStyles from './UniversalGlobalStyles';

const fileLabel = 'components/UniversalPageLayout';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
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
const UniversalPageLayout = (props: Props): JSX.Element => {
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

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page "${pageName}"`,
    level: Sentry.Severity.Debug,
  });

  if (isBrowser()) { // Avoids log clutter on server
    console.debug(`UniversalPageLayout.layoutPageProps`, layoutPageProps);
  }

  return (
    <i18nContext.Provider value={{ lang, locale }}>
      <customerContext.Provider value={customer}>
        <Head {...headProps} />
        <LogOnMount eventType="page-displayed" />

        {/* XXX Global styles that applies to all pages within this layout go there */}
        <UniversalGlobalStyles theme={theme} />

        <ThemeProvider theme={theme}>
          {/* Loaded from components/Head - See https://github.com/mikemaccana/outdated-browser-rework */}
          <div
            id="outdated"
            style={{ display: 'none' }}
          ></div>

          {
            !isInIframe && (
              <Nav />
            )
          }

          <div
            className={classnames('page-container', {
              'is-iframe': isInIframe,
              'is-not-iframe': !isInIframe,
            })}
          >
            {
              error ? (
                <>
                  <ErrorPage
                    statusCode={500}
                    isSSRReadyToRender={true}
                    // @ts-ignore
                    err={new Error(get(error, 'message', 'No error message provided'))}
                  >
                    <div
                      css={css`
                      text-align: center;

                      .title {
                        margin-top: 30px;
                        margin-bottom: 30px;
                      }
                    `}
                    >
                      <div className={'title'}>
                        <h1>Service currently unavailable</h1>
                        <pre>Error 500.</pre>
                      </div>

                      <div>
                        <p>
                          Try to refresh the page. Please contact our support below if the issue persists.
                        </p>
                        <Button
                          color={'primary'}
                          onClick={(): void =>
                            // @ts-ignore XXX showReportDialog is not recognised (due to the webpack trick that replaces @sentry/node), but it works fine
                            Sentry.showReportDialog({ eventId: errorEventId })
                          }
                        >
                          Contact technical support
                        </Button>
                      </div>
                      <hr />
                    </div>
                  </ErrorPage>
                </>
              ) : (
                <>
                  {
                    // Renders the page with additional/augmented props
                    // See https://medium.com/better-programming/passing-data-to-props-children-in-react-5399baea0356
                    children(layoutPageProps)
                  }
                </>
              )
            }
          </div>

          {
            !isInIframe && (
              <Footer />
            )
          }
        </ThemeProvider>
      </customerContext.Provider>
    </i18nContext.Provider>
  );
};

export default UniversalPageLayout;
