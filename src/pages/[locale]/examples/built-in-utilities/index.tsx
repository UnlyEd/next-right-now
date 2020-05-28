import { GetStaticPaths, GetStaticProps } from 'next';

import { StaticParams } from '../../../../types/nextjs/StaticParams';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import ExampleI18nLinkComponentPage, { getStaticPaths as getStaticPathsHomePage, getStaticProps as getStaticPropsHomePage } from './i18nLink-component';

// XXX This page is an "alias"
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = getStaticPropsHomePage;
export const getStaticPaths: GetStaticPaths<StaticParams> = getStaticPathsHomePage;

export default ExampleI18nLinkComponentPage;
