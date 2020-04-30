/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { PageProps } from '../../types/PageProps';

const fileLabel = 'pages/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const Home: NextPage<PageProps> = (props: Props): JSX.Element => {
  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering index page (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });
  const { lang } = props;

  console.log('Home props', props);
  console.log('lang', lang);

  return (
    <div>
      <h1>{lang}</h1>

      <Link href={'/fr/terms'} passHref>
        <a>Terms</a>
      </Link>
    </div>
  );
};

type Props = {
  lang: string;
  isStaticRendering: boolean;
} & PageProps;

/**
 * Only executed on the server side at build time.
 *
 * When a page uses "getStaticProps", then "_app:getInitialProps" is executed but not actually used by the page,
 * only the results from getStaticProps are used.
 *
 * @param context
 * @return Props that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: any }> => {
//   console.log('getStaticProps', context);
//
//   const lang: string = universalLanguageDetect({
//     supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
//     fallbackLanguage: LANG_EN, // Fallback language in case the user's language cannot be resolved
//     acceptLanguageHeader: null,
//     serverCookies: null,
//     errorHandler: (error: Error, level: ERROR_LEVELS, origin: string, context: object): void => {
//       Sentry.withScope((scope): void => {
//         scope.setExtra('level', level);
//         scope.setExtra('origin', origin);
//         scope.setContext('context', context);
//         Sentry.captureException(error);
//       });
//       logger.error(error.message);
//     },
//   });
//   const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
//   const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
//   const defaultLocales: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API
//
//   return {
//     props: {
//       customerRef: process.env.CUSTOMER_REF,
//       isSSRReadyToRender: true,
//       lang,
//       bestCountryCodes,
//       gcmsLocales,
//       defaultLocales,
//     },
//   };

//   return {
//     props: {},
//   };
// };

export const getStaticProps: GetStaticProps<any, any> = async (props) => {
  console.log('getStaticProps', props);
  return {
    props: {
      lang: props?.params?.lang,
      isStaticRendering: true,
    },
    // revalidate: false,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: 'fr' } }, { params: { lang: 'en' } }],
    fallback: false,
  };
};

export default Home;
