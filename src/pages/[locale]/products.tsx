/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { ApolloQueryResult } from 'apollo-client';
import filter from 'lodash.filter';
import size from 'lodash.size';
import { GetServerSideProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Container } from 'reactstrap';
import Products from '../../components/data/Products';

import DefaultLayout from '../../components/pageLayouts/DefaultLayout';
import Text from '../../components/utils/Text';
import { PRODUCTS_PAGE_QUERY } from '../../gql/pages/products';
import withApollo from '../../hocs/withApollo';
import { Customer } from '../../types/data/Customer';
import { Product } from '../../types/data/Product';
import { GetServerSidePropsContext } from '../../types/nextjs/GetServerSidePropsContext';
import { OnlyBrowserPageProps } from '../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { SSRPageProps } from '../../types/pageProps/SSRPageProps';
import { getCommonServerSideProps, GetCommonServerSidePropsResults } from '../../utils/nextjs/SSR';

const fileLabel = 'pages/[locale]/products';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Props that are only available for this page
 */
type CustomPageProps = {
  [key: string]: any;
  products: Product[];
}

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const ProductsPage: NextPage<Props> = (props): JSX.Element => {
  const { products } = props;
  const productsPublished = filter(products, { status: 'PUBLISHED' });
  const productsDraft = filter(products, { status: 'DRAFT' });

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

type GetServerSidePageProps = CustomPageProps & SSRPageProps

/**
 * Fetches all products and customer in one single GQL query
 *
 * @param context
 */
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (context: GetServerSidePropsContext): Promise<{ props: GetServerSidePageProps }> => {
  const {
    apolloClient,
    layoutQueryOptions,
    ...pageData
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
    // eslint-disable-next-line no-console
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  const {
    customer,
    products,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned

  return {
    // Props returned here will be available as page properties (pageProps)
    props: {
      ...pageData,
      apolloState: apolloClient.cache.extract(),
      customer,
      products,
    },
  };
};

// XXX For educational purposes - Equivalent to above "getServerSideProps"
//  Note that CSR fails with below code because we didn't check if req/res were available before usage (and I didn't fix it because switching to getServerSideProps looks cleaner and less tricky IMHO)
// ProductsPage.getInitialProps = async (context: NextPageContext & { apolloClient: ApolloClient<NormalizedCacheObject> }): Promise<Props> => {
//   const {
//     apolloClient,
//     AppTree,
//     asPath,
//     err,
//     query,
//     pathname,
//     req,
//     res,
//   } = context;
//   const customerRef: string = process.env.CUSTOMER_REF;
//   const readonlyCookies: Cookies = NextCookies(context); // Parses Next.js cookies in a universal way (server + client)
//   const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res);
//   const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
//   const { headers }: IncomingMessage = req;
//   const publicHeaders = {
//     'accept-language': get(headers, 'accept-language'),
//     'user-agent': get(headers, 'user-agent'),
//     'host': get(headers, 'host'),
//   };
//   const hasLocaleFromUrl = !!query?.locale;
//   const locale: string = hasLocaleFromUrl ? query?.locale as string : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
//   const lang: string = locale.split('-')?.[0];
//   const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
//   const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
//   const defaultLocales: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
//   const variables = {
//     customerRef,
//   };
//   const queryOptions = {
//     displayName: 'PRODUCTS_PAGE_QUERY',
//     query: PRODUCTS_PAGE_QUERY,
//     variables,
//     context: {
//       headers: {
//         'gcms-locale': gcmsLocales,
//       },
//     },
//   };
//
//   const {
//     data,
//     errors,
//     loading,
//     networkStatus,
//     stale,
//   }: ApolloQueryResult<{
//     customer: Customer;
//     products: Product[];
//   }> = await apolloClient.query(queryOptions);
//
//   if (errors) {
//     console.error(errors);
//     throw new Error('Errors were detected in GraphQL query.');
//   }
//
//   const {
//     customer,
//     products,
//   } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned
//
//   return {
//     apolloState: apolloClient.cache.extract(),
//     bestCountryCodes,
//     customer,
//     customerRef,
//     defaultLocales,
//     headers: publicHeaders,
//     gcmsLocales,
//     hasLocaleFromUrl,
//     isReadyToRender: true,
//     isServerRendering: true,
//     lang,
//     locale,
//     products,
//     readonlyCookies,
//     userSession,
//   };
// };

export default withApollo()(ProductsPage);
