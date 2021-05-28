import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { PublicHeaders } from '@/layouts/core/types/PublicHeaders';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { getCustomer } from '@/modules/core/airtable/dataset';
import { getAirtableDataset } from '@/modules/core/airtable/getAirtableDataset';
import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import {
  DEFAULT_LOCALE,
  resolveFallbackLanguage,
  SUPPORTED_LANGUAGES,
} from '@/modules/core/i18n/i18n';
import {
  fetchTranslations,
  I18nextResources,
} from '@/modules/core/i18n/i18nextLocize';
import { createLogger } from '@/modules/core/logging/logger';
import { isQuickPreviewRequest } from '@/modules/core/quickPreview/quickPreview';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import * as Sentry from '@sentry/node';
import universalLanguageDetect from '@unly/universal-language-detector';
import { ERROR_LEVELS } from '@unly/universal-language-detector/lib/utils/error';
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
 * "getCoreServerSideProps" returns only part of the props expected in SSRPageProps.
 * To avoid TS errors, we omit those that we don't return, and add those necessary to the "getServerSideProps" function.
 */
export type GetCoreServerSidePropsResults = SSRPageProps & {
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
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export const getCoreServerSideProps: GetServerSideProps<GetCoreServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetCoreServerSidePropsResults>> => {
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
      logger.error(error.message);
    },
  });
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const i18nTranslations: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const dataset: SanitizedAirtableDataset = await getAirtableDataset(bestCountryCodes, true);
  const customer: AirtableRecord<Customer> = getCustomer(dataset);

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
      bestCountryCodes,
      serializedDataset: serializeSafe(dataset),
      customerRef,
      i18nTranslations,
      headers: publicHeaders,
      hasLocaleFromUrl,
      isReadyToRender: true,
      isServerRendering: true,
      lang,
      locale,
      readonlyCookies,
      userSession,
      isQuickPreviewPage,
    },
  };
};
