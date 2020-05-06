import { NextComponentType, NextPageContext } from 'next';
import { NextRouter } from 'next/router';
import { MultiversalPageProps } from './MultiversalPageProps';

/**
 * Props that are returned by the main getInitialProps and then provided to the render function of the application
 *
 * The props that are being returned by getInitialProps are enhanced by the Next.js framework
 * Also, our HOC apply at the same moment and enhance even more the properties that the render function will receive
 *
 * @see _app:getInitialProps - Returns it (only pageProps)
 * @see _app:render - Use it (has access to all props)
 */
export declare type MultiversalPageBootstrapProps = {
  pageProps: MultiversalPageProps;
  err?: Error; // Only defined if there was an error

  // XXX Props that are somehow injected by the Next.js framework between _app:getInitialProps and _app:render
  //  They're marked as optional because they aren't defined in _app:getInitialProps but will be defined in _app:render
  Component?: NextComponentType<NextPageContext>; // Page component
  router?: NextRouter;

  // See https://github.com/zeit/next.js/discussions/12558#discussioncomment-9177
  __N_SSG?: boolean;
  __N_SSR?: boolean;
};
