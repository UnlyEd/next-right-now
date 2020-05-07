import { NextComponentType, NextPageContext } from 'next';
import { NextRouter } from 'next/router';
import { MultiversalPageProps } from '../pageProps/MultiversalPageProps';

/**
 * Props that are provided to the render function of the application (in _app)
 * Those props can be consolidated by either getInitialProps, getServerProps or getStaticProps, depending on the page and its configuration
 *
 * @see MultiversalAppBootstrap for usage
 */
export declare type MultiversalAppBootstrapProps<PP extends MultiversalPageProps = MultiversalPageProps> = {
  pageProps: PP;
  err?: Error; // Only defined if there was an error

  // XXX Props that are somehow injected by the Next.js framework between _app:getInitialProps and _app:render
  //  They're marked as optional because they aren't defined in _app:getInitialProps but will be defined in _app:render
  Component?: NextComponentType<NextPageContext>; // Page component
  router?: NextRouter;

  // See https://github.com/zeit/next.js/discussions/12558#discussioncomment-9177
  __N_SSG?: boolean;
  __N_SSR?: boolean;
  __N_SSP?: boolean;
};
