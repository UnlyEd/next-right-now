import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPath } from '@/app/types/StaticPath';
import { StaticPathsOutput } from '@/app/types/StaticPathsOutput';
import { StaticPropsInput } from '@/app/types/StaticPropsInput';
import { SSGPageProps } from '@/layouts/base/types/SSGPageProps';
import { getAirtableSchema } from '@/modules/airtable/airtableSchema';
import consolidateSanitizedAirtableDataset from '@/modules/airtable/consolidateSanitizedAirtableDataset';
import fetchAndSanitizeAirtableDatasets from '@/modules/airtable/fetchAndSanitizeAirtableDatasets';
import { AirtableSchema } from '@/modules/airtable/types/AirtableSchema';
import { AirtableDatasets } from '@/modules/data/types/AirtableDatasets';
import { SanitizedAirtableDataset } from '@/modules/data/types/SanitizedAirtableDataset';
import {
  DEFAULT_LOCALE,
  resolveFallbackLanguage,
} from '@/modules/i18n/i18n';
import { supportedLocales } from '@/modules/i18n/i18nConfig';
import {
  fetchTranslations,
  I18nextResources,
} from '@/modules/i18n/i18nextLocize';
import { I18nLocale } from '@/modules/i18n/types/I18nLocale';
import { PreviewData } from '@/modules/previewMode/types/PreviewData';
import serializeSafe from '@/modules/serializeSafe/serializeSafe';
import map from 'lodash.map';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next';

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
 * @return
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export const getDemoStaticPaths: GetStaticPaths<CommonServerSideParams> = async (context: GetStaticPathsContext): Promise<StaticPathsOutput> => {
  const paths: StaticPath[] = map(supportedLocales, (supportedLocale: I18nLocale): StaticPath => {
    return {
      params: {
        locale: supportedLocale.name,
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
 * Computes all static props that should be available for all SSG pages
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
 *
 * Meant to avoid code duplication
 * Can be overridden for per-page customisation (e.g: deepmerge)
 *
 * @param props
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getDemoStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = async (props: StaticPropsInput): Promise<GetStaticPropsResult<SSGPageProps>> => {
  const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const preview: boolean = props?.preview || false;
  const previewData: PreviewData = props?.previewData || null;
  const hasLocaleFromUrl = !!props?.params?.locale;
  const locale: string = hasLocaleFromUrl ? props?.params?.locale : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const i18nTranslations: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const airtableSchema: AirtableSchema = getAirtableSchema();
  const datasets: AirtableDatasets = await fetchAndSanitizeAirtableDatasets(airtableSchema, bestCountryCodes);
  const dataset: SanitizedAirtableDataset = consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);

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

