import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPath } from '@/app/types/StaticPath';
import { StaticPathsOutput } from '@/app/types/StaticPathsOutput';
import { StaticPropsInput } from '@/app/types/StaticPropsInput';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { getAirtableSchema } from '@/modules/core/airtable/airtableSchema';
import consolidateSanitizedAirtableDataset from '@/modules/core/airtable/consolidateSanitizedAirtableDataset';
import fetchAirtableDataset from '@/modules/core/airtable/fetchAirtableDataset';
import {
  getCustomer,
  getStaticAirtableDataset,
} from '@/modules/core/airtable/getAirtableDataset';
import prepareAndSanitizeAirtableDataset from '@/modules/core/airtable/prepareAndSanitizeAirtableDataset';
import { AirtableSchema } from '@/modules/core/airtable/types/AirtableSchema';
import { RawAirtableRecordsSet } from '@/modules/core/airtable/types/RawAirtableRecordsSet';
import { AirtableDatasets } from '@/modules/core/data/types/AirtableDatasets';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import { getStaticLocizeTranslations } from '@/modules/core/i18n/getLocizeTranslations';
import {
  DEFAULT_LOCALE,
  resolveFallbackLanguage,
} from '@/modules/core/i18n/i18n';
import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import {
  fetchTranslations,
  I18nextResources,
} from '@/modules/core/i18n/i18nextLocize';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { createLogger } from '@/modules/core/logging/logger';
import { PreviewData } from '@/modules/core/previewMode/types/PreviewData';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
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
 * Only executed on the server side at build time.
 * Computes all static paths that should be available for all SSG pages.
 * Necessary when a page has dynamic routes and uses "getStaticProps", in order to build the HTML pages.
 *
 * You can use "fallback" option to avoid building all page variants and allow runtime fallback.
 *
 * Meant to avoid code duplication.
 * Can be overridden for per-page customisation (e.g: deepmerge).
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 *
 * @return Static paths that will be used by "getCoreStaticProps" to generate pages
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export const getCoreStaticPaths: GetStaticPaths<CommonServerSideParams> = async (context: GetStaticPathsContext): Promise<StaticPathsOutput> => {
  const preferredLocalesOrLanguages = uniq<string>(supportedLocales.map((supportedLocale: I18nLocale) => supportedLocale.lang));
  const dataset: SanitizedAirtableDataset = await getStaticAirtableDataset(preferredLocalesOrLanguages);
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
    fallback: false,
    paths,
  };
};

/**
 * Only executed on the server side at build time.
 * Computes all static props that should be available for all SSG pages.
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
 *
 * Meant to avoid code duplication.
 * Can be overridden for per-page customisation (e.g: deepmerge).
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props (known as "pageProps" in _app).
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getCoreStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = async (props: StaticPropsInput): Promise<GetStaticPropsResult<SSGPageProps>> => {
  const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const preview: boolean = props?.preview || false;
  const previewData: PreviewData = props?.previewData || null;
  const hasLocaleFromUrl = !!props?.params?.locale;
  const locale: string = hasLocaleFromUrl ? props?.params?.locale : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  let i18nTranslations: I18nextResources;
  let dataset: SanitizedAirtableDataset;

  if (preview) {
    // When preview mode is enabled, we want to make real-time API requests to get up-to-date data
    const airtableSchema: AirtableSchema = getAirtableSchema();
    const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDataset(airtableSchema, bestCountryCodes);
    const datasets: AirtableDatasets = prepareAndSanitizeAirtableDataset(rawAirtableRecordsSets, airtableSchema, bestCountryCodes);

    dataset = consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);
    i18nTranslations = await fetchTranslations(lang);
  } else {
    // When preview mode is not enabled, we fallback to the app-wide shared/static data (stale)
    dataset = await getStaticAirtableDataset(bestCountryCodes);
    i18nTranslations = await getStaticLocizeTranslations(lang);
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
