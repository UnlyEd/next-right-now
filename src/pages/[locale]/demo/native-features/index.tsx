import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { CommonServerSideParams } from '@/modules/app/types/CommonServerSideParams';
import { SSGPageProps } from '@/layouts/base/types/SSGPageProps';
import ExampleWithSSGPage, {
  getStaticPaths as getStaticPathsHomePage,
  getStaticProps as getStaticPropsHomePage,
} from './example-with-ssg';

// XXX This page is an "alias"
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getStaticPathsHomePage;
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getStaticPropsHomePage;

export default ExampleWithSSGPage;
