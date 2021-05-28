import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { PublicHeaders } from '@/layouts/core/types/PublicHeaders';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { mockedStaticDataset } from '@/layouts/public/mockedStaticDataset';
import {
  GetPublicLayoutServerSideProps,
  GetPublicLayoutServerSidePropsOptions,
} from '@/layouts/public/types/GetPublicLayoutServerSideProps';
import { getCustomer } from '@/modules/core/airtable/dataset';
import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
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

const fileLabel = 'layouts/public/publicLayoutSSR';
const logger = createLogger({
  fileLabel,
});

/**
 * "getDemoLayoutServerSideProps" returns only part of the props expected in SSRPageProps.
 * To avoid TS errors, we omit those that we don't return, and add those necessary to the "getServerSideProps" function.
 */
export type GetPublicLayoutServerSidePropsResults = SSRPageProps & {
  headers: PublicHeaders;
}

/**
 * Returns a "getServerSideProps" function.
 *
 * Disables redirecting to the 404 page when building the 404 page.
 *
 * @param options
 */
export const getPublicLayoutServerSideProps: GetPublicLayoutServerSideProps = (options?: GetPublicLayoutServerSidePropsOptions) => {
  const {
    enable404Redirect = true,
  } = options || {};

  /**
   * XXX This layout comes "naked" (mocked data) with the strictest minimal stuff to build new pages.
   *  It doesn't run Airtable API requests, and provides the minimal amount of required data for the page to work.
   *
   * Only executed on the server side, for every request.
   * Computes some dynamic props that should be available for all SSR pages that use getServerSideProps.
   *
   * Because the exact GQL query will depend on the consumer (AKA "caller"), this helper doesn't run any query by itself, but rather return all necessary props to allow the consumer to perform its own queries.
   * This improves performances, by only running one GQL query instead of many (consumer's choice).
   *
   * Meant to avoid code duplication between pages sharing the same layout.
   *
   * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
   */
  const getServerSideProps: GetServerSideProps<GetPublicLayoutServerSidePropsResults, CommonServerSideParams> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetPublicLayoutServerSidePropsResults>> => {
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
    const customer: AirtableRecord<Customer> = getCustomer(mockedStaticDataset);
    const i18nTranslations: I18nextResources = await getLocizeTranslations(lang);

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
        serializedDataset: serializeSafe({
          customer,
        }),
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
