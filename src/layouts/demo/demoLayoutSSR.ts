import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { DEMO_LAYOUT_QUERY } from '@/common/gql/demoLayoutQuery';
import { PublicHeaders } from '@/layouts/core/types/PublicHeaders';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { initializeApollo } from '@/modules/core/apollo/apolloClient';
import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { Customer } from '@/modules/core/data/types/Customer';
import { GraphCMSDataset } from '@/modules/core/data/types/GraphCMSDataset';
import { getGraphcmsDataset } from '@/modules/core/gql/getGraphcmsDataset';
import { prepareGraphCMSLocaleHeader } from '@/modules/core/gql/graphcms';
import { ApolloQueryOptions } from '@/modules/core/gql/types/ApolloQueryOptions';
import {
  StaticCustomer,
  StaticDataset,
} from '@/modules/core/gql/types/StaticDataset';
import { getLocizeTranslations } from '@/modules/core/i18n/getLocizeTranslations';
import {
  resolveFallbackLanguage,
  resolveSSRLocale,
} from '@/modules/core/i18n/i18n';
import { I18nextResources } from '@/modules/core/i18n/i18nextLocize';
import { createLogger } from '@/modules/core/logging/logger';
import { isQuickPreviewRequest } from '@/modules/core/quickPreview/quickPreview';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import {
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { IncomingMessage } from 'http';
import includes from 'lodash.includes';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import NextCookies from 'next-cookies';

const fileLabel = 'layouts/demo/demoLayoutSSR';
const logger = createLogger({
  fileLabel,
});

/**
 * "getDemoServerSideProps" returns only part of the props expected in SSRPageProps.
 * To avoid TS errors, we omit those that we don't return, and add those necessary to the "getServerSideProps" function.
 */
export type GetDemoServerSidePropsResults = Omit<SSRPageProps, '__APOLLO_STATE__' | 'customer'> & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  layoutQueryOptions: ApolloQueryOptions;
  headers: PublicHeaders;
}

/**
 * Only executed on the server side, for every request.
 * Computes some dynamic props that should be available for all SSR pages that use getServerSideProps.
 *
 * Because the exact GQL query will depend on the consumer (AKA "caller"), this helper doesn't run any query by itself, but rather return all necessary props to allow the consumer to perform its own queries.
 * This improves performances, by only running one GQL query instead of many (consumer's choice).
 *
 * Meant to avoid code duplication between pages sharing the same layout.
 *
 * XXX Demo component, not meant to be modified. It's a copy of the coreLayoutSSR implementation, so the demo keep working even if you change the base implementation.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export const getDemoServerSideProps: GetServerSideProps<GetDemoServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetDemoServerSidePropsResults>> => {
  const {
    query,
    params,
    req,
    res,
    ...rest
  } = context;
  const isQuickPreviewPage: boolean = isQuickPreviewRequest(req);
  const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const readonlyCookies: Cookies = NextCookies(context); // Parses Next.js cookies in a universal way (server + client)
  const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res); // Cannot be forwarded as pageProps, because contains circular refs
  const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
  const { headers }: IncomingMessage = req;
  const publicHeaders: PublicHeaders = {
    'accept-language': headers?.['accept-language'],
    'user-agent': headers?.['user-agent'],
    'host': headers?.host,
  };
  const hasLocaleFromUrl = !!query?.locale;
  const locale: string = resolveSSRLocale(query, req, readonlyCookies);
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
  const i18nTranslations: I18nextResources = await getLocizeTranslations(lang);
  // XXX This part is not using "getGraphcmsDataset" because I'm not sure how to return the "apolloClient" instance when doing so, as it'll be wrapped and isn't returned
  //  So, code is duplicated, but that works fine
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  const variables = {
    customerRef,
  };
  const layoutQueryOptions: ApolloQueryOptions = {
    displayName: 'DEMO_LAYOUT_QUERY',
    query: DEMO_LAYOUT_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locales': gcmsLocales,
      },
    },
  };

  const dataset: StaticDataset | GraphCMSDataset = await getGraphcmsDataset(gcmsLocales);
  const customer: StaticCustomer | Customer = dataset?.customer;

  // Do not serve pages using locales the customer doesn't have enabled
  if (!includes(customer?.availableLanguages, locale)) {
    logger.warn(`Locale "${locale}" not enabled for this customer (allowed: "${customer?.availableLanguages}"), returning 404 page.`);

    return {
      notFound: true,
    };
  }

  // Most props returned here will be necessary for the app to work properly (see "SSRPageProps")
  // Some props are meant to be helpful to the consumer and won't be passed down to the _app.render (e.g: apolloClient, layoutQueryOptions)
  return {
    props: {
      apolloClient,
      bestCountryCodes,
      serializedDataset: null, // We don't send the dataset yet (we don't have any because we haven't fetched the database yet), but it must be done by SSR pages in"getServerSideProps"
      customerRef,
      i18nTranslations,
      headers: publicHeaders,
      gcmsLocales,
      hasLocaleFromUrl,
      isReadyToRender: true,
      isServerRendering: true,
      lang,
      locale,
      layoutQueryOptions,
      readonlyCookies,
      userSession,
      isQuickPreviewPage,
    },
  };
};
