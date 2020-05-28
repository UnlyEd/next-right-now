import { GetStaticPaths, GetStaticProps } from 'next';

import { StaticParams } from '../../../../types/nextjs/StaticParams';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import ExampleWithSSGPage, { getStaticPaths as getStaticPathsHomePage, getStaticProps as getStaticPropsHomePage } from './example-with-ssg';

// XXX This page is an "alias"
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = getStaticPropsHomePage;
export const getStaticPaths: GetStaticPaths<StaticParams> = getStaticPathsHomePage;

export default ExampleWithSSGPage;
