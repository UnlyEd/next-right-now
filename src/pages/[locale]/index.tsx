/** @jsx jsx */
import { createLogger } from '@unly/utils-simple-logger';
import HomePage from '../../home/Home';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import withApollo from '../../common/hocs/withApollo';
import { UniversalSSGPageProps } from '../../common/types/pageProps/UniversalSSGPageProps';
import { StaticParams } from '../../common/types/nextjs/StaticParams';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getCommonStaticProps, getCommonStaticPaths } from '../../common/utils/nextjs/SSG';

const fileLabel = 'pages/index';
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
export const getStaticProps: GetStaticProps<UniversalSSGPageProps, StaticParams> = getCommonStaticProps;

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = getCommonStaticPaths;

export default withApollo()(HomePage);
