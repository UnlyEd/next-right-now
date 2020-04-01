/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { NextPage } from 'next';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert, Container } from 'reactstrap';
import Head from '../components/Head';
import { PageProps } from '../types/PageProps';

const fileLabel = 'pages/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const Home: NextPage<PageProps> = (props: PageProps): JSX.Element => {
  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering index page (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  return (
    <Amplitude
      eventProperties={(inheritedProps): object => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: 'index',
        },
      })}
    >
      {({ logEvent }): JSX.Element => (
        <>
          <LogOnMount eventType="page-displayed" />
          <Head />
          <Container
            className={'container-white'}
            css={css`
              h2, h3 {
                margin-top: 30px;
              }
            `}
          >
            <h1>Next Right Now Demo</h1>

            <div className={'b'} style={{ color: 'black' }}>
              The purpose of this demo is to showcase what features are built-in within the selected preset.<br />
            </div>

            <Alert
              color={'info'}
              css={css`
              a {
                font-weight: bold;
                color: blueviolet !important;
              }
            `}
            >
              This demo uses the preset <code>{process.env.NRN_PRESET}</code><br />
              <a
                href={'https://unlyed.github.io/next-right-now/concepts/presets'}
                target={'_blank'}
                rel={'noopener'}
                onClick={() => {
                  logEvent('open-what-is-preset-doc');
                }}
              >
                What's a preset?
              </a>
              &nbsp;-&nbsp;
              <a
                href={'https://unlyed.github.io/next-right-now/getting-started/select-preset'}
                target={'_blank'}
                rel={'noopener'}
                onClick={() => {
                  logEvent('open-see-all-presets-doc');
                }}
              >
                See all presets
              </a>
            </Alert>
            <div>
              <span className={'b'}>Please note that the documentation is hardcoded in English, so don't expect it to change when switching language.</span><br />

              <div>
                <div>
                  <h2>Overview</h2>
                  You can navigate between <Link href={'/examples'}>/examples</Link> and <Link href={'/'}>/</Link> to see CSR in action.<br />
                  You can also disable JS on your browser to see how SSR works.<br />
                  <br />
                  If you want to know a bit more about what's running this demo beneath the surface, check out our <a href={'/api/status'}><code>/api/status</code> endpoint!</a>
                </div>

                <div>
                  <h3>Analytics overview</h3>
                  For the purpose of this demo, we are tracking your analytics usage.
                  <br />
                  For instance, we know if you've clicked on any link above. That's just basic analytics but it works out-of-the-box.
                  <br />

                  You can use
                  <a
                    href={'https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp'}
                    target={'_blank'}
                    rel={'noopener'}
                  > Amplitude Instrumentation Explorer extension
                  </a> to see what analytic events are sent and what they contains exactly, it's very powerful!<br />
                  <br />
                  Every time you visit a page, analytics are automatically sent (similar to Google Analytics "pageviews").<br />
                </div>

                <div>
                  <h3>GraphQL API overview</h3>
                  We fetched our GraphQL endpoint to display proper theming.<br />
                  The colors that are used in this demo are defined within the GraphCMS "Customer" model.
                </div>

                <div>
                  <h3>Monitoring overview</h3>
                  Any runtime error is configured to be sent to Sentry, which redirects it into our Slack channel.<br />
                  This allows us to be notified in real-time about anything that'd go wrong.<br />
                  <br />
                  You can test this behaviour by hitting <a href="/api/error"><code>/api/error</code> our error endpoint</a>. Don't worry, alerts have been disabled so you won't bother us for real ;)
                </div>

                <div>
                  <h3>I18n overview</h3>
                  You can change the language by clicking on the footer flag icon below. <br />
                  Changing language refresh the whole page, because it was just simpler to do that instead of running the GraphQL query again. <br />
                  But you could implement it without refreshing the whole page if you wanted.
                  <br />
                </div>

                <div>
                  <h3>Examples</h3>
                  Check out our <Link href={'/examples'}>examples</Link> to learn more and see some code snippets!<br />
                </div>

                <div>
                  <Alert color={'success'}>
                    Feel free to ask for more examples of what this demo can offer by creating an issue on Github! :)<br />
                    Feel free to make an improvement to this demo as well, though a PR. (if it's big, please let's discuss it first!)
                  </Alert>
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
    </Amplitude>
  );

};

export default Home;
