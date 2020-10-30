import { css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInUtilitiesSidebar from '../../../../components/doc/BuiltInUtilitiesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-utilities/hocs';
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

const HocsPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'hocs'}
      headProps={{
        title: 'HOCs examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>HOCs examples</h1>

        <Alert color={'info'}>
          A few HOCs are provided as utilities:<br />
          <ul
            css={css`
              text-align: left;
            `}
          >
            <li>
              <code>withApollo</code>: Wraps a page into an <code>ApolloProvider</code> and handles state rehydration between CSR navigation.<br />
              Can be used with any rendering mode (expect SSG by default).<br />
              Do not use <code>getInitialProps</code> by default, only when <code>useGetInitialProps: true</code> (meant for pages using <code>getInitialProps</code> only).
            </li>
            <li>
              <code>withHOCTemplate</code>: Template for quickly getting started with a new HOC, meant as a utility. Feel free to customise it!
            </li>
          </ul>
        </Alert>

        <h2>withApollo</h2>

        <p>
          This HOC is necessary for all pages in the demo, because all pages need data that are used by shared component (i.e: Nav, Footer).<br />
          If you don't need to fetch data from a data source, then you don't need to use it.
        </p>

        <Code
          text={`
            // Example for a page using getStaticProps or getServerSideProps
            export default (ExampleHomePage);

            // Example for a page using getInitialProps
            export default withApollo({ useGetInitialProps: true })(ExampleHomePage);
          `}
        />

        <br />

        <Alert color={'info'}>
          We don't actually use the <code>useGetInitialProps</code> option anywhere in this demo, because we don't use <code>getInitialProps</code> anymore.
        </Alert>

      </DocPage>
    </DefaultLayout>
  );
};

export default (HocsPage);
