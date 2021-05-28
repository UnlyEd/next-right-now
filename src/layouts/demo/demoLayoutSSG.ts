import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPath } from '@/app/types/StaticPath';
import { StaticPathsOutput } from '@/app/types/StaticPathsOutput';
import { StaticPropsInput } from '@/app/types/StaticPropsInput';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import {
  GetDemoLayoutStaticPaths,
  GetDemoLayoutStaticPathsOptions,
} from '@/layouts/demo/types/GetDemoLayoutStaticPaths';
import {
  GetDemoLayoutStaticProps,
  GetDemoLayoutStaticPropsOptions,
} from '@/layouts/demo/types/GetDemoLayoutStaticProps';
import { getCustomer } from '@/modules/core/airtable/dataset';
import { getAirtableDataset } from '@/modules/core/airtable/getAirtableDataset';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import { getLocizeTranslations } from '@/modules/core/i18n/getLocizeTranslations';
import {
  DEFAULT_LOCALE,
  resolveFallbackLanguage,
} from '@/modules/core/i18n/i18n';
import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import { I18nextResources } from '@/modules/core/i18n/i18nextLocize';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { createLogger } from '@/modules/core/logging/logger';
import { PreviewData } from '@/modules/core/previewMode/types/PreviewData';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import includes from 'lodash.includes';
import map from 'lodash.map';
import uniq from 'lodash.uniq';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next';

const fileLabel = 'layouts/demo/demoLayoutSSG';
const logger = createLogger({
  fileLabel,
});

/**
 * Returns a "getStaticPaths" function.
 *
 * @param options
 */
export const getDemoLayoutStaticPaths: GetDemoLayoutStaticPaths = (options?: GetDemoLayoutStaticPathsOptions) => {
  const {
    fallback = false,
  } = options || {};

  /**
   * Only executed on the server side at build time.
   * Computes all static paths that should be available for all SSG pages.
   * Necessary when a page has dynamic routes and uses "getStaticProps", in order to build the HTML pages.
   *
   * You can use "fallback" option to avoid building all page variants and allow runtime fallback.
   *
   * Meant to avoid code duplication between pages sharing the same layout.
   * Can be overridden for per-page customisation (e.g: deepmerge).
   *
   * XXX Demo component, not meant to be modified. It's a copy of the baseSSG implementation, so the demo keep working even if you change the base implementation.
   *
   * @return Static paths that will be used by "getCoreLayoutStaticProps" to generate pages
   *
   * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
   */
  const getStaticPaths: GetStaticPaths<CommonServerSideParams> = async (context: GetStaticPathsContext): Promise<StaticPathsOutput> => {
    const preferredLocalesOrLanguages = uniq<string>(supportedLocales.map((supportedLocale: I18nLocale) => supportedLocale.lang));
    const dataset: SanitizedAirtableDataset = await getAirtableDataset(preferredLocalesOrLanguages);
    const customer: AirtableRecord<Customer> = getCustomer(dataset);

    // Generate only pages for languages that have been allowed by the customer
    const paths: StaticPath[] = map(customer?.availableLanguages, (availableLanguage: string): StaticPath => {
      return {
        params: {
          locale: availableLanguage,
        },
      };
    });

    return {
      fallback,
      paths,
    };
  };

  return getStaticPaths;
};

/**
 * Returns a "getStaticProps" function.
 *
 * Disables redirecting to the 404 page when building the 404 page.
 *
 * @param options
 */
export const getDemoLayoutStaticProps: GetDemoLayoutStaticProps = (options?: GetDemoLayoutStaticPropsOptions) => {
  const {
    enable404Redirect = true,
  } = options || {};

  /**
   * Only executed on the server side at build time.
   * Computes all static props that should be available for all SSG pages.
   *
   * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
   * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
   *
   * Meant to avoid code duplication between pages sharing the same layout.
   * Can be overridden for per-page customisation (e.g: deepmerge).
   *
   * XXX Demo component, not meant to be modified. It's a copy of the coreLayoutSSG implementation, so the demo keep working even if you change the base implementation.

   * @return Props (as "SSGPageProps") that will be passed to the Page component, as props (known as "pageProps" in _app).
   *
   * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
   * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
   */
  const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = async (props: StaticPropsInput): Promise<GetStaticPropsResult<SSGPageProps>> => {
    const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
    const preview: boolean = props?.preview || false;
    const previewData: PreviewData = props?.previewData || null;
    const hasLocaleFromUrl = !!props?.params?.locale;
    const locale: string = hasLocaleFromUrl ? props?.params?.locale : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
    const lang: string = locale.split('-')?.[0];
    const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
    const i18nTranslations: I18nextResources = await getLocizeTranslations(lang);
    const dataset: SanitizedAirtableDataset = await getAirtableDataset(bestCountryCodes, preview);
    const customer: AirtableRecord<Customer> = getCustomer(dataset);

    // Do not serve pages using locales the customer doesn't have enabled (useful during preview mode and in development env)
    if (enable404Redirect && !includes(customer?.availableLanguages, locale)) {
      logger.warn(`Locale "${locale}" not enabled for this customer (allowed: "${customer?.availableLanguages}"), returning 404 page.`);

      return {
        notFound: true,
      };
    }

    return {
      // Props returned here will be available as page properties (pageProps)
      props: {
        bestCountryCodes,
        serializedDataset: serializeSafe(dataset),
        customerRef,
        i18nTranslations,
        hasLocaleFromUrl,
        isReadyToRender: true,
        isStaticRendering: true,
        lang,
        locale,
        preview,
        previewData,
      },
    };
  };

  return getStaticProps;
};
