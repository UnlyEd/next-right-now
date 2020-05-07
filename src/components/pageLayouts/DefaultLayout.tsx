/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import classnames from 'classnames';
import React from 'react';
import { Button } from 'reactstrap';
import ErrorPage from '../../pages/_error';
import { BrowserPageProps } from '../../types/BrowserPageProps';
import { MultiversalPageProps } from '../../types/MultiversalPageProps';
import Footer from './Footer';
import Head, { HeadProps } from './Head';
import Nav from './Nav';

const fileLabel = 'components/pageLayouts/DefaultLayout';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
  headProps: HeadProps;
  pageName: string;
} & MultiversalPageProps<BrowserPageProps>;

/**
 * The layout handle the positioning of elements within the page
 *
 * This Layout component adds a Nav/Footer component, and the Page component in between
 * Also, it automatically track page views (Amplitude)
 *
 * It also handle errors by displaying the Error page, with the ability to contact technical support (which will send a Sentry User Feedback)
 *
 * @param props
 */
const DefaultLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    error,
    isInIframe,
    headProps = {},
    pageName,
  } = props;

  return (
    <Amplitude
      eventProperties={(inheritedProps): object => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: pageName,
        },
      })}
    >
      <Head {...headProps} />
      <LogOnMount eventType="page-displayed" />

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
              {children}
            </>
          )
        }
      </div>

      {
        !isInIframe && (
          <Footer />
        )
      }
    </Amplitude>
  );
};

export default DefaultLayout;
