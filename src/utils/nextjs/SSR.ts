import { IncomingMessage } from 'http';
import get from 'lodash.get';
import NextCookies from 'next-cookies';
import { Cookies } from '../../types/Cookies';
import { Customer } from '../../types/data/Customer';
import { GetServerSidePropsContext } from '../../types/nextjs/GetServerSidePropsContext';
import { PublicHeaders } from '../../types/pageProps/PublicHeaders';
import { SSRPageProps } from '../../types/pageProps/SSRPageProps';
import { UserSemiPersistentSession } from '../../types/UserSemiPersistentSession';
import fetchCustomer from '../api/fetchCustomer';
import UniversalCookiesManager from '../cookies/UniversalCookiesManager';
import { DEFAULT_LOCALE, resolveFallbackLanguage } from '../i18n/i18n';
import { fetchTranslations, I18nextResources } from '../i18n/i18nextLocize';

/**
 * getExamplesCommonServerSideProps returns only part of the props expected in SSRPageProps
 * To avoid TS issue, we omit those that we don't return, and add those necessary to the getServerSideProps function
 */
export type GetCommonServerSidePropsResults = SSRPageProps & {
  headers: PublicHeaders;
}

/**
 * Only executed on the server side, for every request.
 * Computes some dynamic props that should be available for all SSR pages that use getServerSideProps
 *
 * Because the exact GQL query will depend on the consumer (AKA "caller"), this helper doesn't run any query by itself, but rather return all necessary props to allow the consumer to perform its own queries
 * This improves performances, by only running one GQL query instead of many (consumer's choice)
 *
 * Meant to avoid code duplication
 *
 * @param context
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export const getCommonServerSideProps = async (context: GetServerSidePropsContext): Promise<GetCommonServerSidePropsResults> => {
  // TODO Make your own implementation.
  // XXX Having this as separate function helps making your own pages without affecting existing examples under "pages/[locale]/examples".
  //  For instance, you may want to replace the GraphQL query by your own API query, while keeping the existing example pages working.
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return getExamplesCommonServerSideProps(context);
};

/**
 * Only executed on the server side, for every request.
 * Computes some dynamic props that should be available for all SSR pages that use getServerSideProps
 *
 * Because the exact GQL query will depend on the consumer (AKA "caller"), this helper doesn't run any query by itself, but rather return all necessary props to allow the consumer to perform its own queries
 * This improves performances, by only running one GQL query instead of many (consumer's choice)
 *
 * Meant to avoid code duplication
 *
 * @param context
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export const getExamplesCommonServerSideProps = async (context: GetServerSidePropsContext): Promise<GetCommonServerSidePropsResults> => {
  const {
    query,
    params,
    req,
    res,
  } = context;
  const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const readonlyCookies: Cookies = NextCookies(context); // Parses Next.js cookies in a universal way (server + client)
  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res); // Cannot be forwarded as pageProps, because contains circular refs
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
  const { headers }: IncomingMessage = req;
  const publicHeaders: PublicHeaders = {
    'accept-language': get(headers, 'accept-language'),
    'user-agent': get(headers, 'user-agent'),
    'host': get(headers, 'host'),
  };
  const hasLocaleFromUrl = !!query?.locale;
  const locale: string = hasLocaleFromUrl ? query?.locale as string : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const i18nTranslations: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const customer: Customer = await fetchCustomer(bestCountryCodes);
  console.log('customer', JSON.stringify(customer, null, 2));

  // Most props returned here will be necessary for the app to work properly (see "SSRPageProps")
  // Some props are meant to be helpful to the consumer and won't be passed down to the _app.render (e.g: apolloClient, layoutQueryOptions)
  return {
    bestCountryCodes,
    customer,
    customerRef,
    i18nTranslations,
    headers: publicHeaders,
    hasLocaleFromUrl,
    isReadyToRender: true,
    isServerRendering: true,
    lang,
    locale,
    products: customer.products,
    readonlyCookies,
    userSession,
  };
};
