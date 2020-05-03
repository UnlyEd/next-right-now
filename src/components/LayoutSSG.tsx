/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NRN_DEFAULT_FONT, NRN_DEFAULT_SECONDARY_COLOR, NRN_DEFAULT_THEME } from '../constants';
import ErrorPage from '../pages/_error';
import { Theme } from '../types/data/Theme';
import { LayoutPropsSSG } from '../types/LayoutProps';
import i18nextLocize from '../utils/i18nextLocize';
import { isRunningInIframe } from '../utils/iframe';
import { getValue, STRATEGY_DO_NOTHING } from '../utils/record';
import Footer from './Footer';
import Nav from './Nav';
import { ThemeProvider } from 'emotion-theming';
import classnames from 'classnames';
import { Button } from 'reactstrap';

const fileLabel = 'components/Layout';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Layout of the whole app. Acts as a wrapper that displays the whole thing (menus, page, etc.)
 *
 * @param {Props} props
 * @return {JSX.Element}
 * @constructor
 */
const Layout: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children,
    customer,
    error,
    defaultLocales,
    lang,
    // amplitudeInstance,
  }: Props = props;
  const router = useRouter();
  const i18nextInstance = i18nextLocize(lang, defaultLocales); // Apply i18next configuration with Locize backend
  const isInIframe: boolean = isRunningInIframe();
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

  return (
    <>
      {/* XXX Global styles that applies to all pages within this layout go there */}
      <Global
        styles={css`
          // Only applied to the main application
          body.nrn {
            background-color: #f5f5f5;

            #__next{
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
          }

          // Applied to all containers marked with ".nrn" - XXX could be grouped with the other one above?
          .nrn {
            * {
              // XXX We try to load the font specified by the organisation or the school, then we fallback to one of the "less ugly" native font
              font-family: "${getValue(theme, `font`, NRN_DEFAULT_FONT, STRATEGY_DO_NOTHING)}", sans-serif !important;
            }

            .container {
              justify-content: center;
              text-align: center;
              margin-left: auto;
              margin-right: auto;
            }

            .container-white {
              background-color: white;
              border-radius: 10px;
              padding: 30px;
              margin-top: 30px;
              margin-bottom: 30px;
            }

            // ----------- Utilities -----------

            b, .b, strong {
              color: ${getValue(theme, `primaryColor`)};
              font-weight: bold;
            }

            a {
             color: ${getValue(theme, `primaryColor`)} !important;
            }

            .page-container {
              background-color: #f5f5f5;

              @media (max-width: 991.98px) {
                min-height: 300px;
              }
            }

            .center {
              text-align: center;
            }

            .center-block {
              text-align: center;
              margin: auto;
            }

            .pcolor, [class*="primary_color"] {
              color: ${getValue(theme, `primaryColor`)};
              fill: ${getValue(theme, `primaryColor`)}; // For SVG
            }

            .pacolor {
              color: ${getValue(theme, `primaryAltColor`, getValue(theme, `primaryColor`), STRATEGY_DO_NOTHING)};
            }

            .scolor {
              color: ${getValue(theme, `secondaryColor`, NRN_DEFAULT_SECONDARY_COLOR, STRATEGY_DO_NOTHING)};
            }

            .pbgcolor {
              background-color: ${getValue(theme, `primaryColor`)};
            }

            .pabgcolor {
              background-color: ${getValue(theme, `primaryAltColor`, getValue(theme, `primaryColor`), STRATEGY_DO_NOTHING)};
            }

            .sbgcolor {
              background-color: ${getValue(theme, `secondaryColor`, NRN_DEFAULT_SECONDARY_COLOR, STRATEGY_DO_NOTHING)};
            }

            .btn-border{
               background-color: transparent;
               color: ${theme.primaryColor};
               border: 1.5px solid ${theme.primaryColor};
               border-radius: 30px;
               margin: 5px;
               padding: 5px 12px 5px 12px;
               white-space: nowrap;
               display: inline-block; // Necessary so that <a> and <button> behave identically
            }

            label {
              cursor: pointer;
            }

            button {
              cursor: pointer;
              outline: none !important; // Overrides bootstrap color around the button

              &.btn-primary {
                color: ${getValue(theme, `secondaryColor`, NRN_DEFAULT_SECONDARY_COLOR, STRATEGY_DO_NOTHING)};
                background-color: ${getValue(theme, `primaryAltColor`, getValue(theme, `primaryColor`), STRATEGY_DO_NOTHING)};
                border-color: ${getValue(theme, `primaryAltColor`, getValue(theme, `primaryColor`), STRATEGY_DO_NOTHING)};

                &:active, &:focus {
                  box-shadow: 0 0 0 0.2rem ${getValue(theme, `primaryAltColor`, getValue(theme, `primaryColor`), STRATEGY_DO_NOTHING)};
                }
              }

              &.btn-outline-secondary {
                color: ${getValue(theme, `primaryAltColor`, getValue(theme, `primaryColor`), STRATEGY_DO_NOTHING)};
                background-color: ${getValue(theme, `secondaryColor`, NRN_DEFAULT_SECONDARY_COLOR, STRATEGY_DO_NOTHING)};

                &:active, &:focus {
                  box-shadow: 0 0 0 0.2rem ${getValue(theme, `secondaryColor`, NRN_DEFAULT_SECONDARY_COLOR, STRATEGY_DO_NOTHING)};
                }
              }

              &.btn-primary, &.btn-outline-secondary {
                &:hover,
                &:active,
                &:focus {
                  opacity: 0.8;
                }
              }

              &.disabled {
                cursor: not-allowed;
              }
            }

            .info-label {
              display: inline-block;
              border-radius: 60px;
              border: none;
              background-color: #C9D0F6;
              color: #0028FF;
              padding: 10px 15px 7px 14px;
              margin: 1px;
            }

            .select {
              // Overrides react select styles everywhere
              *  {
                color: ${getValue(theme, `primaryColor`, NRN_DEFAULT_SECONDARY_COLOR, STRATEGY_DO_NOTHING)} !important;
              }
            }

            [class*="fa-"], [class*="fal-"], [class*="fas-"], [class*="far-"] {
              margin-right: 5px;
            }

            .animated {
              // Delay control (latency)
              &.delay-100ms {
                animation-delay: 0.1s;
              }

              &.delay-200ms {
                animation-delay: 0.2s;
              }

              &.delay-400ms {
                animation-delay: 0.4s;
              }

              &.delay-600ms {
                animation-delay: 0.6s;
              }

              // Duration control (speed)
              &.duration-100ms {
                animation-duration: 0.1s;
              }

              &.duration-200ms {
                animation-duration: 0.2s;
              }

              &.duration-300ms {
                animation-duration: 0.3s;
              }

              &.duration-400ms {
                animation-duration: 0.4s;
              }

              &.duration-600ms {
                animation-duration: 0.6s;
              }

              &.duration-3000ms {
                animation-duration: 3s;
              }

              &.duration-6000ms {
                animation-duration: 6s;
              }
            }

            .fade {
              opacity: 1 !important; // Overrides default bootstrap behaviour to avoid make-believe SSR doesn't work on the demo, when JS is disabled - See https://github.com/UnlyEd/next-right-now/issues/9
            }
          }
        `}
      />

      <ThemeProvider theme={theme}>
        {/* See https://github.com/mikemaccana/outdated-browser-rework */}
        <div
          id="outdated"
          style={{ display: 'none' }}
        ></div>

        {
          !isInIframe && (
            <Nav
              customer={customer}
              theme={theme}
              router={router}
            />
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
                      <h1>Le service est momentanément indisponible</h1>
                      <pre>Erreur 500. Nos serveurs ont un coup de chaud.</pre>
                    </div>

                    <div>
                      <p>
                        Essayez de recharger la page. Veuillez contacter notre support technique si le problème persiste.
                      </p>
                      <Button
                        color={'primary'}
                        onClick={(): void =>
                          // @ts-ignore XXX showReportDialog is not recognised but works fine due to the webpack trick that replaces @sentry/node
                          Sentry.showReportDialog({ eventId: errorEventId })
                        }
                      >
                        Contacter le support technique
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
                  children({
                    ...props,
                    isInIframe,
                    router,
                    i18nextInstance,
                  })
                }
              </>
            )
          }
        </div>

        {
          !isInIframe && (
            <Footer
              customer={customer}
              theme={theme}
              router={router}
              lang={lang}
            />
          )
        }
      </ThemeProvider>
    </>
  );
};

type Props = {
  children: Function;
} & LayoutPropsSSG;

export default Layout;
