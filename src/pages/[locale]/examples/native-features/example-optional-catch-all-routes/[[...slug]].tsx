/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import map from 'lodash.map';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';
import DocPage from '../../../../../components/doc/DocPage';
import NativeFeaturesSidebar from '../../../../../components/doc/NativeFeaturesSidebar';
import DefaultLayout from '../../../../../components/pageLayouts/DefaultLayout';
import { supportedLocales } from '../../../../../i18nConfig';
import { I18nLocale } from '../../../../../types/i18n/I18nLocale';
import { CommonServerSideParams } from '../../../../../types/nextjs/CommonServerSideParams';
import { StaticPath } from '../../../../../types/nextjs/StaticPath';
import { StaticPathsOutput } from '../../../../../types/nextjs/StaticPathsOutput';
import { OnlyBrowserPageProps } from '../../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../../types/pageProps/SSGPageProps';
import { getExamplesCommonStaticProps } from '../../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/native-features/example-optional-catch-all-routes/[[...slug]]';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type PageAdditionalServerSideParams = {
  slug: string[];
}

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = async (): Promise<StaticPathsOutput<PageAdditionalServerSideParams>> => {
  const paths: StaticPath<PageAdditionalServerSideParams>[] = map(supportedLocales, (supportedLocale: I18nLocale): StaticPath<PageAdditionalServerSideParams> => {
    return {
      params: {
        locale: supportedLocale.name,
        slug: [],
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
};

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

const ExampleWithCatchAllRoutesPage: NextPage<Props> = (props): JSX.Element => {
  const { query } = useRouter();
  console.log('query', query);

  return (
    <DefaultLayout
      {...props}
      pageName={'examples'}
      headProps={{
        title: `Catch-all dynamic routes examples - Next Right Now`,
      }}
      Sidebar={NativeFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Catch-all dynamic routes examples</h1>

        <Alert color={'info'}>
        </Alert>
      </DocPage>
    </DefaultLayout>
  );
};

export default (ExampleWithCatchAllRoutesPage);
