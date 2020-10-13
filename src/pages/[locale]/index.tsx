import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';

import { CommonServerSideParams } from '../../types/nextjs/CommonServerSideParams';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import DocsHomePage, {
  getStaticPaths as getStaticPathsHomePage,
  getStaticProps as getStaticPropsHomePage,
} from './examples/';

/*
  XXX This page is an "alias", it basically imports the whole /examples/index page and export it back
   It's a trick that is similar to a "url rewrite", and allows 2 different urls to serve the exact same content, without code duplication
   We use it so that you can build your own /index page while keeping the docs available for later use
   Check out /pageTemplateSSG for getting started with your own index page and override this one
 */

export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getStaticPathsHomePage;
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getStaticPropsHomePage;

export default DocsHomePage;
