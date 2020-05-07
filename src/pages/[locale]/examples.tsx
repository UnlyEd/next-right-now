/** @jsx jsx */
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import withApollo from '../../common/hocs/withApollo';
import { StaticParams } from '../../common/types/nextjs/StaticParams';
import { UniversalSSGPageProps } from '../../common/types/pageProps/UniversalSSGPageProps';
import { getCommonStaticPaths } from '../../common/utils/nextjs/SSG';
import ExamplesPage, { getExampleStaticProps } from '../../examples/Examples';

const fileLabel = 'pages/examples';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "UniversalSSGPageProps").
 *
 * @return Props (as "UniversalSSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<UniversalSSGPageProps, StaticParams> = getExampleStaticProps;
/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = getCommonStaticPaths;



export default withApollo()(ExamplesPage);
