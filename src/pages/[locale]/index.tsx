import { GetStaticPaths, GetStaticProps } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import { StaticParams } from '../../types/nextjs/StaticParams';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import DocsHomePage, { getStaticPaths as getStaticPathsHomePage, getStaticProps as getStaticPropsHomePage } from './examples/index';

/*
  XXX This page is an "alias", it basically imports the whole /examples/index page and export it back
   It's a trick that is similar to a "url rewrite", and allows 2 different urls to serve the exact same content, without code duplication
   We use it so that you can build your own /index page while keeping the docs available for later use
   Check out /pageTemplateSSG for getting started with your own index page and override this one
 */

export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = getStaticPropsHomePage;
export const getStaticPaths: GetStaticPaths<StaticParams> = getStaticPathsHomePage;

export default DocsHomePage;
