/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import I18nLink from '../../components/I18nLink';
import { StaticParams } from '../../types/StaticParams';
import { StaticProps } from '../../types/StaticProps';
import { getCommonStaticPaths, getCommonStaticProps } from '../../utils/SSG';

const fileLabel = 'pages/terms';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "StaticProps").
 *
 * @return Props (as "StaticProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<StaticProps, StaticParams> = getCommonStaticProps;

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = getCommonStaticPaths;

type Props = {} & StaticProps;

const TermsPage: NextPage<Props> = (props): JSX.Element => {
  const { locale, lang, customer } = props;
  console.log('TermsPage props', props);

  return (
    <div>
      <h1>Page: Terms</h1>
      <h2>Customer: {customer?.label}</h2>

      <div>
        Locale: {locale}<br />
        Lang: {lang}
      </div>

      <I18nLink
        locale={locale}
        href={'/'}
        passHref
      >
        <a>Index</a>
      </I18nLink>
    </div>
  );
};

export default TermsPage;
