import { css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticProps,
  NextPage,
} from 'next';
import {
  NextRouter,
  useRouter,
} from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import DefaultLayout from '../components/pageLayouts/DefaultLayout';
import { CommonServerSideParams } from '../types/nextjs/CommonServerSideParams';
import { SoftPageProps } from '../types/pageProps/SoftPageProps';
import { SSGPageProps } from '../types/pageProps/SSGPageProps';
import {
  DEFAULT_LOCALE,
  LANG_EN,
  LANG_FR,
} from '../utils/i18n/i18n';
import { getExamplesCommonStaticProps } from '../utils/nextjs/SSG';

const fileLabel = 'pages/404';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getExamplesCommonStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SoftPageProps;

const Fr404 = (): JSX.Element => {
  return (
    <>
      <h1>Page non trouvée</h1>

      <p>
        La page que vous recherchez n'existe pas
      </p>
    </>
  );
};

const En404 = (): JSX.Element => {
  return (
    <>
      <h1>Page not found</h1>

      <p>
        The page you're looking for doesn't exist
      </p>
    </>
  );
};

/**
 * "404 not found" page, doesn't support i18n
 *
 * Doesn't use "getStaticPaths" because it's not supported by Next.js "getStaticPaths can only be used with dynamic pages, not '/404'."
 *
 * XXX The "locale" cannot be resolved properly using SSG on 404 pages, because this file doesn't belong to the "/[locale]" folder and thus doesn't benefit from url rewriting
 *  Therefore, the page will be displayed based on the DEFAULT_LOCALE value and not on the actual end-user locale
 *
 * @param props
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */
const NotFound404Page: NextPage<Props> = (props): JSX.Element => {
  const router: NextRouter = useRouter();
  const locale = router?.asPath?.split('/')?.[1] || DEFAULT_LOCALE;
  const lang: string = locale.split('-')?.[0];
  let content: JSX.Element;

  switch (lang) {
    case LANG_FR:
      content = <Fr404 />;
      break;
    case LANG_EN:
      content = <En404 />;
      break;
    default:
      content = <En404 />;
      break;
  }

  // We can display a custom message based on the lang, but the other parts of the app won't be translated (nav, footer)
  // Also, it has to be hardcoded, it cannot be stored on Locize, because we don't have access to translations from other languages
  return (
    <DefaultLayout
      {...props}
      pageName={'404'}
      headProps={{
        title: '404 Not Found - Next Right Now',
      }}
    >
      <div
        css={css`
          text-align: center;
        `}
      >
        {content}
      </div>
    </DefaultLayout>
  );
};

export default NotFound404Page;
