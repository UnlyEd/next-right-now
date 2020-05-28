import { GetStaticPaths, GetStaticProps } from 'next';

import { StaticParams } from '../../../../types/nextjs/StaticParams';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import HostingPage, { getStaticPaths as getStaticPathsHomePage, getStaticProps as getStaticPropsHomePage } from './hosting';

// XXX This page is an "alias"
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = getStaticPropsHomePage;
export const getStaticPaths: GetStaticPaths<StaticParams> = getStaticPathsHomePage;

export default HostingPage;
