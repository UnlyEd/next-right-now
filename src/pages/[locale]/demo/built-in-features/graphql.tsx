import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import withApollo from '../../../../hocs/withApollo';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/graphql';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getExamplesCommonStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getExamplesCommonStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleGraphQLPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'graphql'}
      headProps={{
        seoTitle: 'GraphQL examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>GraphQL examples, using GraphCMS vendor</h1>

        <Alert color={'warning'}>
          Fetching APIs works slightly differently depending on whether you use SSG or SSR.<br />
          <br />
          When you're using SSG, all queries are executed from the server side, during build generation, on your computer or your CI server.<br />
          When using SSR, queries are executed on the fly, from the client or from the server depending on how the page is served (CSR vs SSR).<br />
          <br />
          Therefore, you need to be careful about tokens and other <b>credentials</b> you might use.
          And you also need to consider performances (e.g: running all queries at once)<br />
          <br />
          The below examples will focus on SSG, because that's what we recommend to use. But know that you may use both.<br />
          Also, you might want to run GraphQL queries from the browser even when using SSG, it's also possible but we don't provide such example at this time.
        </Alert>

        <Code
          text={`
            const variables = { // Variables to provide to the GQL query (or fragment)
              customerRef, // We provide the current customer ref to make sure we only fetch related product for this customer
            };
            const queryOptions = {
              displayName: 'LAYOUT_QUERY', // Naming queries makes debugging easier
              query: LAYOUT_QUERY, // This is our actual GQL query (see /gql folder)
              variables,
              context: { // Per-request context override/overload
                headers: {
                  // This is how we handle "Dynamic i18n", by only fetching content for one language
                  // With languages fallback if content isn't available (e.g: ['FR', 'DE', 'EN']
                  'gcms-locales': gcmsLocales,
                },
              },
            };

            const {
              data,
              errors,
              loading,
              networkStatus,
              stale,
            }: ApolloQueryResult<{
              customer: Customer; // We specify which data are expected as query result
            }> = await apolloClient.query(queryOptions);

            if (errors) {
              console.error(errors);
              throw new Error('Errors were detected in GraphQL query.');
            }

            const {
              customer, // We extract the data
            } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned
          `}
        />

        <p>
          The above code is what we actually use in <code>getCommonStaticProps</code>, to fetch data that are shared by all SSG pages.
        </p>

        <p>
          And here is what out GQL query looks like:
        </p>

        <Code
          text={`
            export const LAYOUT_QUERY = gql\`
              query LAYOUT_QUERY($customerRef: String!){
                customer(where: {
                  ref: $customerRef, // Use the variables that were provided to the GQL query
                }){ // Fields that are being fetched
                  id
                  label
                  theme {
                    ...themeFields // This uses a GQL fragment (code reusability)
                  }
                }
              }
              \${theme.themeFields} // Fragment(s) import
            \`;
          `}
        />

        <p>
          All our pages fetch some data from GraphCMS, because we need those in shared components (i.e: Footer, Nav)
        </p>

      </DocPage>
    </DefaultLayout>
  );
};

export default withApollo()(ExampleGraphQLPage);
