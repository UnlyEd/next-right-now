import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPath } from '@/app/types/StaticPath';
import { StaticPathsOutput } from '@/app/types/StaticPathsOutput';
import { StaticPropsInput } from '@/app/types/StaticPropsInput';
import { DEMO_LAYOUT_QUERY } from '@/common/gql/demoLayoutQuery';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import {
  APOLLO_STATE_PROP_NAME,
  getApolloState,
  initializeApollo,
} from '@/modules/core/apollo/apolloClient';
import { Customer } from '@/modules/core/data/types/Customer';
import { prepareGraphCMSLocaleHeader } from '@/modules/core/gql/graphcms';
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
import { PreviewData } from '@/modules/core/previewMode/types/PreviewData';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
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
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 *
 * @return Static paths that will be used by "getCoreStaticProps" to generate pages
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
 * Computes all static props that should be available for all SSG pages.
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
 *
 * Meant to avoid code duplication.
 * Can be overridden for per-page customisation (e.g: deepmerge).
 *
 * XXX Demo component, not meant to be modified. It's a copy of the baseSSG implementation, so the demo keep working even if you change the base implementation.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props (known as "pageProps" in _app).
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
  const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
  const i18nTranslations: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'LAYOUT_QUERY',
    query: DEMO_LAYOUT_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locales': gcmsLocales,
      },
    },
  };

  const {
    data,
    errors,
    loading,
    networkStatus,
    ...rest
  }: ApolloQueryResult<{
    customer: Customer;
  }> = await apolloClient.query(queryOptions);

  if (errors) {
    // eslint-disable-next-line no-console
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  const {
    customer,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned
  const dataset = {
    customer,
  };

  return {
    // Props returned here will be available as page properties (pageProps)
    props: {
      [APOLLO_STATE_PROP_NAME]: getApolloState(apolloClient),
      bestCountryCodes,
      serializedDataset: serializeSafe(dataset),
      customer,
      customerRef,
      i18nTranslations,
      gcmsLocales,
      hasLocaleFromUrl,
      isReadyToRender: true,
      isStaticRendering: true,
      lang,
      locale,
      preview,
      previewData,
    },
    // revalidate: false,
  };
};

