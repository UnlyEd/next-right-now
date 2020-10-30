import { createLogger } from '@unly/utils-simple-logger';
import size from 'lodash.size';
import {
  GetServerSideProps,
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

import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { AirtableRecord } from '../../../../types/data/AirtableRecord';
import { Product } from '../../../../types/data/Product';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { SSRPageProps } from '../../../../types/pageProps/SSRPageProps';
import { getExamplesCommonServerSideProps } from '../../../../utils/nextjs/SSR';

const fileLabel = 'pages/[locale]/examples/native-features/example-with-ssr';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Props that are only available for this page
 */
type CustomPageProps = {}

type GetServerSidePageProps = CustomPageProps & SSRPageProps

/**
 * Fetches all products and customer in one single GQL query
 *
 * @param context
 */
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = getExamplesCommonServerSideProps;

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const ProductsWithSSRPage: NextPage<Props> = (props): JSX.Element => {
  const { customer } = props;
  const products = customer?.fields?.products as AirtableRecord<Product>[];

  return (
    <DefaultLayout
      {...props}
      pageName={'example-with-ssr'}
      headProps={{
        title: `${size(products)} products (SSR) - Next Right Now`,
      }}
      Sidebar={NativeFeaturesSidebar}
    >
      <Container
        className={'container-white'}
      >
        <h1>Example, using SSR</h1>

        <Alert color={'info'}>
          This page uses server side rendering (SSR) because it uses <code>getServerSideProps</code>.<br />
          <br />
          When this page is loaded through a client-side rendering (AKA "transition") (using <code>next/link</code> or <code>I18nLink</code>){' '}
          then Next.js sends an API request to the server which runs the <code>getServerSideProps</code> and returns the result as JSON.<br />
          <br />
          <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#only-runs-on-server-side'}>Learn more about the technical details</ExternalLink><br />
          <br />
          Each page refresh (either SSR or CSR) queries the Airtable API and displays products below.<br />
          <br />
          If you use <ExternalLink href={''}>Stacker</ExternalLink> and update the products there,{' '}
          then the products below will be updated immediately, because each page refresh will fetch the latest content.<br />
        </Alert>

        <hr />

        <AllProducts products={products} />
      </Container>
    </DefaultLayout>
  );
};

export default (ProductsWithSSRPage);
