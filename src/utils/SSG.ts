import { ApolloQueryResult } from 'apollo-client';
import map from 'lodash.map';
import { GetStaticPaths, GetStaticProps } from 'next';
import { LAYOUT_QUERY } from '../gql/common/layoutQuery';

import { allowedLocales } from '../i18nConfig';
import { Customer } from '../types/data/Customer';
import { StaticParams } from '../types/StaticParams';
import { StaticProps } from '../types/StaticProps';
import { prepareGraphCMSLocaleHeader } from './graphcms';
import { getStandaloneApolloClient } from './graphql';
import { DEFAULT_LOCALE, resolveFallbackLanguage } from './i18n';
import { fetchTranslations, I18nextResources } from './i18nextLocize';

/**
 * Static props given as inputs for getStaticProps
 */
type StaticPropsInput = {
  params?: StaticParams;
  preview?: boolean;
  previewData?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Static props returned as outputs for getStaticProps (yielded result)
 */
type StaticPropsOutput = {
  props: StaticProps;
  unstable_revalidate?: number | boolean;
}

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
type StaticPathsOutput = {
  paths: {
    params: StaticParams;
  }[];
  fallback: boolean; // See https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
}

/**
 * Only executed on the server side at build time.
 * Computes all static props that should be available for all SSG pages
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "StaticProps").
 *
 * Meant to avoid code duplication
 * Can be overridden for per-page customisation (e.g: deepmerge)
 *
 * @param props
 * @return Props (as "StaticProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getCommonStaticProps: GetStaticProps<StaticProps, StaticParams> = async (props: StaticPropsInput): Promise<StaticPropsOutput> => {
  const customerRef: string = process.env.CUSTOMER_REF;
  const hasLocaleFromUrl = !!props?.params?.locale;
  const locale: string = hasLocaleFromUrl ? props?.params?.locale : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
  const lang: string = locale.split('-')?.[0];
  const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
  const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
  const defaultLocales: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
  const apolloClient = getStandaloneApolloClient();
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
    props: {
      customer,
      hasLocaleFromUrl,
      lang,
      locale,
      customerRef,
      bestCountryCodes,
      gcmsLocales,
      defaultLocales,
      apolloStaticCache: apolloClient.cache.extract(),
      isStaticRendering: true,
      isReadyToRender: true,
    },
    // unstable_revalidate: false,
  };
};

type StaticPath = {
  params: StaticParams;
}

type I18nLocale = {
  name: string; // Locale name (e.g: fr-FR)
  lang: string; // Locale language (e.g: fr)
}

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
  const paths: StaticPath[] = map(allowedLocales, (locale: I18nLocale): StaticPath => {
    return {
      params: {
        locale: locale.name,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
