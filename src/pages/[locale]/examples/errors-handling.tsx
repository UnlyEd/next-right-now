/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';
import DocPage from '../../../components/doc/DocPage';
import I18nLink from '../../../components/i18n/I18nLink';
import DefaultLayout from '../../../components/pageLayouts/DefaultLayout';
import Code from '../../../components/utils/Code';
import ExternalLink from '../../../components/utils/ExternalLink';
import withApollo from '../../../hocs/withApollo';
import { StaticParams } from '../../../types/nextjs/StaticParams';
import { OnlyBrowserPageProps } from '../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../types/pageProps/SSGPageProps';
import { getCommonStaticPaths, getCommonStaticProps } from '../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/errors-handling';
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

const ErrorsHandlingPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'errors-handling'}
      headProps={{
        title: 'Errors handling examples - Next Right Now',
      }}
    >
      <DocPage>
        <h2 className={'pcolor'}>Errors handling examples</h2>

        <Alert color={'info'}>

        </Alert>

        <p>

        </p>

        <Code
          text={`

          `}
        />

      </DocPage>
    </DefaultLayout>
  );
};

export default withApollo()(ErrorsHandlingPage);
