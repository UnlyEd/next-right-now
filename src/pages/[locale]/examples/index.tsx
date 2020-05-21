/** @jsx jsx */
import { Amplitude } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import BuiltInFeaturesSection from '../../../components/doc/BuiltInFeaturesSection';
import BuiltInUtilitiesSection from '../../../components/doc/BuiltInUtilitiesSection';
import IntroductionSection from '../../../components/doc/IntroductionSection';
import NativeFeaturesSection from '../../../components/doc/NativeFeaturesSection';
import DefaultLayout from '../../../components/pageLayouts/DefaultLayout';
import withApollo from '../../../hocs/withApollo';
import { StaticParams } from '../../../types/nextjs/StaticParams';
import { OnlyBrowserPageProps } from '../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../types/pageProps/SSGPageProps';
import { getCommonStaticPaths, getCommonStaticProps } from '../../../utils/nextjs/SSG';
import ExternalFeaturesSection from '../../../components/doc/ExternalFeaturesSection';

const fileLabel = 'pages/[locale]/docs/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = getCommonStaticProps;

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = getCommonStaticPaths;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleHomePage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'index'}
      headProps={{
        title: 'Homepage - Next Right Now',
      }}
    >
      <Amplitude>
        {
          ({ logEvent }): JSX.Element => {
            return (
              <>
                <IntroductionSection
                  logEvent={logEvent}
                />

                <NativeFeaturesSection />
                <BuiltInFeaturesSection />
                <BuiltInUtilitiesSection />
                <ExternalFeaturesSection />
              </>
              //   <div>
              //
              //     <div>
              //       <div>
              //         <h2>Overview</h2>
              //         You can navigate between <I18nLink href={'/examples'}>/examples</I18nLink> and{' '}
              //         <I18nLink
              //           href={'/'}
              //         >
              //           <a>/</a>
              //         </I18nLink> to see CSR in action.<br />
              //         You can also disable JS on your browser to see how SSR works.<br />
              //         <br />
              //         If you want to know a bit more about what's running this demo beneath the surface, check out our <a href={'/api/status'}><code>/api/status</code> endpoint!</a>
              //       </div>
              //
              //       <div>
              //         <h3>Analytics overview</h3>
              //         For the purpose of this demo, we are tracking your analytics usage.
              //         <br />
              //         For instance, we know if you've clicked on any link above. That's just basic analytics but it works out-of-the-box.
              //         <br />
              //
              //         You can use
              //         <a
              //           href={'https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp'}
              //           target={'_blank'}
              //           rel={'noopener'}
              //         > Amplitude Instrumentation Explorer extension
              //         </a> to see what analytic events are sent and what they contains exactly, it's very powerful!<br />
              //         <br />
              //         Every time you visit a page, analytics are automatically sent (similar to Google Analytics "pageviews").<br />
              //       </div>
              //
              //       <div>
              //         <h3>GraphQL API overview</h3>
              //         We fetched our GraphQL endpoint to display proper theming.<br />
              //         The colors that are used in this demo are defined within the GraphCMS "Customer" model.
              //       </div>
              //
              //       <div>
              //         <h3>Monitoring overview</h3>
              //         Any runtime error is configured to be sent to Sentry, which redirects it into our Slack channel.<br />
              //         This allows us to be notified in real-time about anything that'd go wrong.<br />
              //         <br />
              //         You can test this behaviour by hitting <a href="/api/error"><code>/api/error</code> our error endpoint</a>. Don't worry, alerts have been disabled so you won't bother us for real ;)
              //       </div>
              //
              //       <div>
              //         <h3>I18n overview</h3>
              //         You can change the language by clicking on the footer flag icon below. <br />
              //         Changing language refresh the whole page, because it was just simpler to do that instead of running the GraphQL query again. <br />
              //         But you could implement it without refreshing the whole page if you wanted.
              //         <br />
              //       </div>
              //
              //       <div>
              //         <h3>Examples</h3>
              //         Check out our
              //         <I18nLink
              //           href={'/examples'}
              //         ><a>examples</a></I18nLink> to learn more and see some code snippets!<br />
              //       </div>
              //
              //       <div>
              //         <h3>Admin site</h3>
              //         Check out our&nbsp;
              //         <a
              //           href={'https://nrn-admin.now.sh'}
              //           target={'_blank'}
              //           rel={'noopener'}
              //         >Admin site</a> to edit the data that belong to the customer!<br />
              //         Please do not use NSFW content or anything that is illegal as we don't enforce any rule. Everybody can change pics and text.<br />
              //         <br />
              //         The admin site is based on
              //         <a
              //           href={'https://github.com/marmelab/react-admin'}
              //           target={'_blank'}
              //           rel={'noopener'}
              //         >react-admin</a>.<br />
              //         The source code&nbsp;
              //         <a
              //           href={'https://github.com/UnlyEd/next-right-now-admin'}
              //           target={'_blank'}
              //           rel={'noopener'}
              //         >is available on GitHub</a> as well. <br />
              //         It also relies on&nbsp;
              //         <a
              //           href={'https://github.com/UnlyEd/ra-data-graphql-prisma'}
              //           target={'_blank'}
              //           rel={'noopener'}
              //         >our open source data provider</a> for react-admin, using GraphQL.<br />
              //         <br />
              //
              //         All the admin site (AKA back-office) uses GraphQL schema definition to build the views and GQL queries/mutations. (but allow override for flexibility)<br />
              //         It's a POC and could use the help of the community. I've started it to build our Back-office but found a better alternative in the meantime that better answers our needs:&nbsp;
              //         <a
              //           href={'https://directus.io/'}
              //           target={'_blank'}
              //           rel={'noopener'}
              //         >Directus</a><br />
              //         So, I won't likely bring NRN-Admin to a production-grade level, and it will likely stay in it's current state: a POC.
              //       </div>
              //
              //       <div>
              //         <Alert color={'success'}>
              //           Feel free to ask for more examples of what this demo can offer by creating an issue on Github! :)<br />
              //           Feel free to make an improvement to this demo as well, though a PR. (if it's big, please let's discuss it first!)
              //         </Alert>
              //       </div>
              //     </div>
              //   </div>
              // </Container>
            );
          }
        }
      </Amplitude>

    </DefaultLayout>
  );
};

export default withApollo()(ExampleHomePage);
