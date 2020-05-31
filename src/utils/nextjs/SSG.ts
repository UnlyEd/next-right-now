import { ApolloQueryResult } from 'apollo-client';
import map from 'lodash.map';
import { GetStaticPaths, GetStaticProps } from 'next';
import { LAYOUT_QUERY } from '../../gql/common/layoutQuery';

import { supportedLocales } from '../../i18nConfig';
import { Customer } from '../../types/data/Customer';
import { I18nLocale } from '../../types/i18n/I18nLocale';
import { PreviewData } from '../../types/nextjs/PreviewData';
import { StaticParams } from '../../types/nextjs/StaticParams';
import { StaticPath } from '../../types/nextjs/StaticPath';
import { StaticPathsOutput } from '../../types/nextjs/StaticPathsOutput';
import { StaticPropsInput } from '../../types/nextjs/StaticPropsInput';
import { StaticPropsOutput } from '../../types/nextjs/StaticPropsOutput';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { prepareGraphCMSLocaleHeader } from '../gql/graphcms';
import { createApolloClient } from '../gql/graphql';
import { DEFAULT_LOCALE, resolveFallbackLanguage } from '../i18n/i18n';
import { fetchTranslations, I18nextResources } from '../i18n/i18nextLocize';

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
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getCommonStaticProps: GetStaticProps<SSGPageProps, StaticParams> = async (props: StaticPropsInput): Promise<StaticPropsOutput> => {
  const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const preview: boolean = props?.preview || false;
  const previewData: PreviewData = props?.previewData || null;
  const hasLocaleFromUrl = !!props?.params?.locale;
  const locale: string = hasLocaleFromUrl ? props?.params?.locale : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
  const i18nTranslations: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const apolloClient = createApolloClient();
  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'LAYOUT_QUERY',
    query: LAYOUT_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locale': gcmsLocales,
      },
    },
  };

  const {
    data,
    errors,
    loading,
    networkStatus,
    stale,
  }: ApolloQueryResult<{
    customer: Customer;
  }> = await apolloClient.query(queryOptions);

  if (errors) {
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  const {
    customer,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned

  return {
    // Props returned here will be available as page properties (pageProps)
    props: {
      apolloState: apolloClient.cache.extract(),
      bestCountryCodes,
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
    // unstable_revalidate: false,
  };
};

/**
 * Only executed on the server side at build time.
 * Computes all static paths that should be available for all SSG pages
 * Necessary when a page has dynamic routes and uses "getStaticProps", in order to build the HTML pages
 *
 * You can use "fallback" option to avoid building all page variants and allow runtime fallback
 *
 * Meant to avoid code duplication
 * Can be overridden for per-page customisation (e.g: deepmerge)
 *
 * @return
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export const getCommonStaticPaths: GetStaticPaths<StaticParams> = async (): Promise<StaticPathsOutput> => {
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
