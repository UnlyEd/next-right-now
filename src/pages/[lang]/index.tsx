/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import I18nLink from '../../components/I18nLink';
import { StaticParams } from '../../types/StaticParams';
import { StaticProps } from '../../types/StaticProps';

const fileLabel = 'pages/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * When a page uses "getStaticProps", then "_app:getInitialProps" is executed but not actually used by the page,
 * only the results from getStaticProps are used.
 *
 * @return Props that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<StaticProps, StaticParams> = async (props) => {
  console.log('getStaticProps', props);
  return {
    props: {
      lang: props?.params?.lang,
      isStaticRendering: true,
    },
    // unstable_revalidate: false,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: 'fr' } }, { params: { lang: 'en' } }],
    fallback: false,
  };
};

type Props = {
  lang: string;
  isStaticRendering: boolean;
};

const Home: NextPage<Props> = (props): JSX.Element => {
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

      <I18nLink
        lang={lang}
        href={'/terms'}
        passHref
      >
        <a>Terms</a>
      </I18nLink>
    </div>
  );
};

export default Home;
