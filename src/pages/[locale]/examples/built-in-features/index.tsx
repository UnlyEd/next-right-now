import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';

import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import HostingPage, {
  getStaticPaths as getStaticPathsHomePage,
  getStaticProps as getStaticPropsHomePage,
} from './hosting';

// XXX This page is an "alias"
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getStaticPathsHomePage;
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getStaticPropsHomePage;

export default HostingPage;
