import { createLogger } from '@unly/utils-simple-logger';
import map from 'lodash.map';
import size from 'lodash.size';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import {
  Alert,
  Container,
} from 'reactstrap';

import AllProducts from '../../../../components/data/AllProducts';
import NativeFeaturesSidebar from '../../../../components/doc/NativeFeaturesSidebar';
import I18nLink from '../../../../components/i18n/I18nLink';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { AirtableRecord } from '../../../../types/data/AirtableRecord';
import { Product } from '../../../../types/data/Product';
import { I18nLocale } from '../../../../types/i18n/I18nLocale';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { SUPPORTED_LOCALES } from '../../../../utils/i18n/i18n';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/native-features/example-with-ssg';
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

const ExampleWithSSGPage: NextPage<Props> = (props): JSX.Element => {
  const { customer } = props;
  const products = customer?.fields?.products as AirtableRecord<Product>[];

  return (
    <DefaultLayout
      {...props}
      pageName={'examples'}
      headProps={{
        title: `${size(products)} products (SSG) - Next Right Now`,
      }}
      Sidebar={NativeFeaturesSidebar}
    >
      <Container
        className={'container-white'}
      >
        <h1>Example, using SSG</h1>

        <Alert color={'info'}>
          This page uses static site generation (SSG) because it uses <code>getStaticProps</code><br />
          (<i>it also uses <code>getStaticPaths</code>, because it's necessary for i18n support, to generate a different page, per available locale</i>).<br />
          <br />
          Therefore, this page has been statically generated {size(SUPPORTED_LOCALES)} times, for:{' '}
          {
            map(SUPPORTED_LOCALES, (locale: I18nLocale, i) => {
              return (
                <span key={i}>
                  <I18nLink href={'/examples/native-features/example-with-ssg'} locale={locale.name}>{locale.name}</I18nLink>
                  {
                    i + 1 !== size(SUPPORTED_LOCALES) && (
                      <> | </>
                    )
                  }
                </span>
              );
            })
          }
          <br />
          <br />
          <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation'}>Learn more about the technical details</ExternalLink><br />
          <br />
          Each page refresh (either static or CSR) fetches the static bundle and displays products below.<br />
          <br />
          If you use <ExternalLink href={''}>Stacker</ExternalLink> and update the products there,{' '}
          then the products below will <b>NOT</b> be updated, because each page refresh will still fetch the static content, which was generated at build time.<br />
          Therefore, changes there won't be reflected here. (but they'll be reflected <I18nLink href={'/examples/native-features/example-with-ssr'}>on the SSR version though</I18nLink>)
          <br />
          <b>N.B</b>: During development, the static page is automatically rebuilt when refreshing, so the above behaviour is only valid in staging/production stages.
        </Alert>

        <hr />

        <AllProducts products={products} />
      </Container>
    </DefaultLayout>
  );
};

export default (ExampleWithSSGPage);
