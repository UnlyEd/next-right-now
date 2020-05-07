/** @jsx jsx */
import { createLogger } from '@unly/utils-simple-logger';
import { GetServerSideProps } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import withApollo from '../../common/hocs/withApollo';
import ProductsPage, { getProductServerSideProps, Props } from '../../products/Products';

const fileLabel = 'pages/products';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});


/**
 * Fetches all products and customer in one single GQL query
 *
 * @param context
 */
export const getServerSideProps: GetServerSideProps<Props> = getProductServerSideProps;

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
