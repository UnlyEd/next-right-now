/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import filter from 'lodash.filter';
import size from 'lodash.size';
import { NextPage, NextPageContext } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Container } from 'reactstrap';
import Layout from '../../components/Layout';
import Products from '../../components/Products';
import Text from '../../components/Text';
import { PRODUCTS_PAGE_QUERY } from '../../gql/pages/products';
import withApollo from '../../hoc/withApollo';
import { Customer } from '../../types/data/Customer';
import { Product } from '../../types/data/Product';
import { UniversalSSGPageProps } from '../../types/UniversalSSGPageProps';
import { prepareGraphCMSLocaleHeader } from '../../utils/graphcms';
import { DEFAULT_LOCALE, resolveFallbackLanguage } from '../../utils/i18n';
import { fetchTranslations, I18nextResources } from '../../utils/i18nextLocize';

const fileLabel = 'pages/products';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type Props = {
  products: Product[];
} & UniversalSSGPageProps;

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
    <Layout
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
    </Layout>
  );
};

ProductsPage.getInitialProps = async (context: NextPageContext & { apolloClient: ApolloClient<NormalizedCacheObject> }): Promise<Props> => {
  const {
    apolloClient,
    AppTree,
    asPath,
    err,
    query,
    pathname,
    req,
    res,
  } = context;
  const customerRef: string = process.env.CUSTOMER_REF;
  const hasLocaleFromUrl = !!query?.locale;
  const locale: string = hasLocaleFromUrl ? query?.locale as string : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
  const defaultLocales: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'PRODUCTS_PAGE_QUERY',
    query: PRODUCTS_PAGE_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locale': gcmsLocales,
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
    apolloState: apolloClient.cache.extract(),
    bestCountryCodes,
    customer,
    customerRef,
    defaultLocales,
    gcmsLocales,
    hasLocaleFromUrl,
    isReadyToRender: true,
    isStaticRendering: true,
    lang,
    locale,
    products,
  };
};

export default withApollo({ ssr: true })(ProductsPage);
