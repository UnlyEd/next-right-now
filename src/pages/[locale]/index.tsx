import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import DemoHomePage, {
  getStaticPaths as getStaticPathsHomePage,
  getStaticProps as getStaticPropsHomePage,
} from './demo/';

/*
  XXX This page is an "alias", it basically imports the whole /demo/index page and export it back
   It's a trick that is similar to a "url rewrite", and allows 2 different urls to serve the exact same content, without code duplication
   We use it so that you can build your own /index page while keeping the docs available for later use

  XXX
   Check out /pages/public/index to get started with a very simple page!
 */

export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getStaticPathsHomePage;
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getStaticPropsHomePage;

export default DemoHomePage;
