import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import {
  GetCoreLayoutServerSideProps,
  GetCoreServerSidePropsOptions,
} from '@/layouts/core/types/GetCoreLayoutServerSideProps';
import { PublicHeaders } from '@/layouts/core/types/PublicHeaders';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { getCustomer } from '@/modules/core/airtable/dataset';
import { getAirtableDataset } from '@/modules/core/airtable/getAirtableDataset';
import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import { getLocizeTranslations } from '@/modules/core/i18n/getLocizeTranslations';
import {
  resolveFallbackLanguage,
  resolveSSRLocale,
} from '@/modules/core/i18n/i18n';
import { I18nextResources } from '@/modules/core/i18n/i18nextLocize';
import { createLogger } from '@/modules/core/logging/logger';
import { isQuickPreviewRequest } from '@/modules/core/quickPreview/quickPreview';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import { IncomingMessage } from 'http';
import includes from 'lodash.includes';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import NextCookies from 'next-cookies';

const fileLabel = 'layouts/core/coreLayoutSSR';
const logger = createLogger({
  fileLabel,
});

/**
 * "getCoreLayoutServerSideProps" returns only part of the props expected in SSRPageProps.
 * To avoid TS errors, we omit those that we don't return, and add those necessary to the "getServerSideProps" function.
 */
export type GetCoreLayoutServerSidePropsResults = SSRPageProps & {
  headers: PublicHeaders;
}

/**
 * Returns a "getServerSideProps" function.
 *
 * Disables redirecting to the 404 page when building the 404 page.
 *
 * @param options
 */
export const getCoreLayoutServerSideProps: GetCoreLayoutServerSideProps = (options?: GetCoreServerSidePropsOptions) => {
  const {
    enable404Redirect = true,
  } = options || {};

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
  const getServerSideProps: GetServerSideProps<GetCoreLayoutServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetCoreLayoutServerSidePropsResults>> => {
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
    const i18nTranslations: I18nextResources = await getLocizeTranslations(lang);
    const dataset: SanitizedAirtableDataset = await getAirtableDataset(bestCountryCodes, true);
    const customer: AirtableRecord<Customer> = getCustomer(dataset);

    // Do not serve pages using locales the customer doesn't have enabled
    if (enable404Redirect && !includes(customer?.availableLanguages, locale)) {
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

  return getServerSideProps;
};
