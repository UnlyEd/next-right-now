/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import DocPage from '../../../components/doc/DocPage';
import DefaultLayout from '../../../components/pageLayouts/DefaultLayout';
import Code from '../../../components/utils/Code';
import withApollo from '../../../hocs/withApollo';
import { StaticParams } from '../../../types/nextjs/StaticParams';
import { OnlyBrowserPageProps } from '../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../types/pageProps/SSGPageProps';
import { getCommonStaticPaths, getCommonStaticProps } from '../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/analyse-bundle';
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

const AnalyseBundlePage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'analyse-bundle'}
      headProps={{
        title: 'Bundle analysis examples - Next Right Now',
      }}
    >
      <DocPage>
        <h2 className={'pcolor'}>Bundle analysis examples</h2>

        <p>
          You're most likely concerned about how big your client-side bundle is, because it'll impact your end-users experience.<br />
          NRN provides a utility script, which will start the development server locally and open 2 browser tabs automatically.<br />
          One for the front-end bundle, and one for the back-end.
        </p>

        <Code
          text={`yarn next:bundle`}
        />

      </DocPage>
    </DefaultLayout>
  );
};

export default withApollo()(AnalyseBundlePage);
