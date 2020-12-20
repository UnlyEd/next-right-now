import * as Sentry from '@sentry/node';
import universalLanguageDetect from '@unly/universal-language-detector';
import { ERROR_LEVELS } from '@unly/universal-language-detector/lib/utils/error';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { IncomingMessage } from 'http';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import NextCookies from 'next-cookies';

import { LAYOUT_QUERY } from '../../gql/common/layoutQuery';
import { Cookies } from '../../types/Cookies';
import { GenericObject } from '../../types/GenericObject';
import { ApolloQueryOptions } from '../../types/gql/ApolloQueryOptions';
import { CommonServerSideParams } from '../../types/nextjs/CommonServerSideParams';
import { PublicHeaders } from '../../types/pageProps/PublicHeaders';
import { SSRPageProps } from '../../types/pageProps/SSRPageProps';
import { UserSemiPersistentSession } from '../../types/UserSemiPersistentSession';
import UniversalCookiesManager from '../cookies/UniversalCookiesManager';
import { prepareGraphCMSLocaleHeader } from '../gql/graphcms';
import { createApolloClient } from '../gql/graphql';
import {
  DEFAULT_LOCALE,
  resolveFallbackLanguage,
  SUPPORTED_LANGUAGES,
} from '../i18n/i18n';
import {
  fetchTranslations,
  I18nextResources,
} from '../i18n/i18nextLocize';
import { isQuickPreviewRequest } from '../quickPreview/quickPreview';

/**
 * getExamplesCommonServerSideProps returns only part of the props expected in SSRPageProps
 * To avoid TS issue, we omit those that we don't return, and add those necessary to the getServerSideProps function
 */
export type GetCommonServerSidePropsResults = Omit<SSRPageProps, 'apolloState' | 'customer'> & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  layoutQueryOptions: ApolloQueryOptions;
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
export const getCommonServerSideProps: GetServerSideProps<GetCommonServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetCommonServerSidePropsResults>> => {
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
export const getExamplesCommonServerSideProps: GetServerSideProps<GetCommonServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetCommonServerSidePropsResults>> => {
  const {
    query,
    params,
    req,
    res,
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
  // Resolve locale from query, fallback to browser headers
  const locale: string = hasLocaleFromUrl ? query?.locale as string : universalLanguageDetect({
    supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: DEFAULT_LOCALE, // Fallback language in case the user's language cannot be resolved
    acceptLanguageHeader: req?.headers?.['accept-language'], // Optional - Accept-language header will be used when resolving the language on the server side
    serverCookies: readonlyCookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
    errorHandler: (error: Error, level: ERROR_LEVELS, origin: string, context: GenericObject): void => {
      Sentry.withScope((scope): void => {
        scope.setExtra('level', level);
        scope.setExtra('origin', origin);
        scope.setContext('context', context);
        Sentry.captureException(error);
      });
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  });
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
  const i18nTranslations: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const apolloClient = createApolloClient();
  const variables = {
    customerRef,
  };
  const layoutQueryOptions: ApolloQueryOptions = {
    displayName: 'LAYOUT_QUERY',
    query: LAYOUT_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locales': gcmsLocales,
      },
    },
  };

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
