/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import { ApolloQueryResult } from 'apollo-client';
import filter from 'lodash.filter';
import size from 'lodash.size';
import { GetServerSideProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Container } from 'reactstrap';

import DefaultLayout from '../common/components/pageLayouts/DefaultLayout';
import Products from '../common/components/data/Products';
import Text from '../common/components/utils/Text';
import { PRODUCTS_PAGE_QUERY } from '../common/gql/pages/products';
import { Customer } from '../common/types/data/Customer';
import { Product } from '../common/types/data/Product';
import { GetServerSidePropsContext } from '../common/types/nextjs/GetServerSidePropsContext';
import { UniversalSSRPageProps } from '../common/types/pageProps/UniversalSSRPageProps';
import { getCommonServerSideProps, GetCommonServerSidePropsResults } from '../common/utils/nextjs/SSR';

const fileLabel = 'products/Products';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

export type Props = {
  [key: string]: any;
  products: Product[];
} & UniversalSSRPageProps;

const ProductsPage: NextPage<Props> = (props): JSX.Element => {
  const { products } = props;
  const productsPublished = filter(products, { status: 'PUBLISHED' });
  const productsDraft = filter(products, { status: 'DRAFT' });

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  return (
    <DefaultLayout
      pageName={'products'}
      headProps={{
        title: `${size(products)} products (SSR) - Next Right Now`,
      }}
      {...props}
    >
      <Container
        className={'container-white'}
      >
        <h1>Products</h1>

        <Text>
          {`
            This page uses server side rendering (SSR)

            Each page refresh (either SSR or CSR) queries the GraphQL API and displays products below:
          `}
        </Text>

        <hr />

        <h2>Published products</h2>

        <Products
          products={productsPublished}
        />

        <hr />

        <h2>Draft products</h2>

        <Text>
          {`
            Those products are being created/updated by the NRN community, anybody can manipulate those through <a href="https://nrn-admin.now.sh/#/Product/create" target="_blank">the Admin site</a>.

            Don't hesitate to give it a try, you'll see the list of products below will update because content is fetched for every page request.
          `}
        </Text>

        <Products
          products={productsDraft}
        />
      </Container>
    </DefaultLayout>
  );
};

/**
 * Fetches all products and customer in one single GQL query
 *
 * @param context
 */
export const getProductServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext): Promise<{ props: Props }> => {
  // @ts-ignore
  const {
    apolloClient,
    layoutQueryOptions,
    ...propsToForward
  }: GetCommonServerSidePropsResults = await getCommonServerSideProps(context);
  const queryOptions = { // Override query (keep existing variables and headers)
    ...layoutQueryOptions,
    displayName: 'PRODUCTS_PAGE_QUERY',
    query: PRODUCTS_PAGE_QUERY,
  };

  const {
    data,
    errors,
    loading,
    networkStatus,
    stale,
  }: ApolloQueryResult<{
    customer: Customer;
    products: Product[];
  }> = await apolloClient.query(queryOptions);

  if (errors) {
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  const {
    customer,
    products,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned

  return {
    props: {
      ...propsToForward,
      apolloState: apolloClient.cache.extract(),
      customer,
      products,
    },
  };
};


export default ProductsPage;
