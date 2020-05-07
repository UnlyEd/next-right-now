import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBook, faBookReader, faCoffee, faHome, faUserCog } from '@fortawesome/free-solid-svg-icons';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import 'animate.css/animate.min.css'; // Loads animate.css CSS file. See https://github.com/daneden/animate.css
import 'bootstrap/dist/css/bootstrap.min.css'; // Loads bootstrap CSS file. See https://stackoverflow.com/a/50002905/2391795
import NextApp from 'next/app';
import 'rc-tooltip/assets/bootstrap.css';
import React, { ErrorInfo } from 'react';
import MultiversalAppBootstrap from '../common/components/appBootstrap/MultiversalAppBootstrap';
import { MultiversalAppBootstrapProps } from '../common/types/nextjs/MultiversalAppBootstrapProps';
import '../common/utils/app/ignoreNoisyWarningsHacks'; // HACK This ignore warnings and errors I personally find too noisy and useless
import '../common/utils/monitoring/sentry';

// See https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(
  faGithub,
  faBook, faBookReader, faCoffee, faHome, faUserCog,
);

const fileLabel = 'pages/_app';
const logger = createLogger({
  label: fileLabel,
});

type AppState = {}

/**
 * This file is the entry point for all pages, it initialize all pages.
 *
 * It can be executed server side or browser side.
 * It can be executed from a static build (SSG) or dynamically per request (SSR).
 *
 * We use "_app" to handle root errors and configure common behaviours and configurations across all pages.
 * Some of those behaviours/config are applied based on the runtime engine (browser vs server) and on the rendering mode (dynamic vs static)
 *
 * NRN Definitions:
 * - Universal: A universal code (AKA isomorphic) runs anywhere (on both browsers and servers), it is compatible with both, but may behave slightly differently
 * - Multiversal: A multiversal code is universal (runs anywhere) and also handles all rendering modes (dynamic and static)
 *    The concept of "Multiversal" has been invented by myself, because we lack proper definition for this kind of things (it's fairly new, feel free to propose better)
 *    It's very important for developers to know when a particular piece of code is gonna be executed (server? browser? static? dynamic request? etc.)
 *
 * Next.js provides huge capabilities, but with such comes complexity.
 * You may have a hard time knowing for sure if a particular function will run identically on browser + server + statically + dynamically
 * For instance, if you depend on cookies, then you'll have a different behaviour whether executing the code:
 *  - During the SSG rendering (server side, but no request and no access to user-data or request-data)
 *  - During a server side request (no access to browser data (localstorage, browser cookies)
 *  - During a client side request (no access to server data (server cookies, HTTP headers)
 *
 * XXX It's easy to get lost. The term of "Multiversal" is used to make it obvious that a particular piece of code runs in any situation.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app Custom _app
 * @see https://nextjs.org/docs/basic-features/typescript#custom-app TypeScript for _app
 * @see https://stackoverflow.com/a/43862885/2391795 Some "Universal" definition (feel free to disagree)
 */
class MultiversalPageEntryPoint extends NextApp<MultiversalAppBootstrapProps, MultiversalAppBootstrapProps, AppState> {

  /**
   * XXX We have disabled the use of getInitialProps by default with NRN, because it's what's recommended since v9.3,
   *  feel free to use it if needed, but beware you'll opt-out of automated static optimization for all pages by doing so.
   *
   * By default, all pages will be served statically (using automated static optimization)
   * If the page uses "getStaticProps", then it will use SSG. (a static build will be generated in production, in development it'll simulate a static build)
   * If the page uses "getServerSideProps" or "getInitialProps", then it will use SSR. (your request will be served dynamically by a Serverless Function (AKA AWS Lambda))
   *
   * From the official doc:
   * If you're using Next.js 9.3 or newer, we recommend that you use getStaticProps or getServerSideProps instead of getInitialProps.
   * These new data fetching methods allow you to have a granular choice between static generation and server-side rendering.
   *
   * @see https://nextjs.org/docs/api-reference/data-fetching/getInitialProps Recommendations regarding "getInitialProps"
   * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation "getStaticProps" doc
   * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering "getServerSideProps" doc
   */
  // static async getInitialProps(props: AppInitialProps): Promise<MultiversalAppBootstrapProps> {}

  /**
   * Renders the whole page
   * For the sake of readability/maintainability, we have decoupled what happens in the "render" to our "MultiversalAppBootstrap" component.
   *
   * All props returned by "getInitialProps", "getServerSideProps" or "getStaticProps" are available in "this.props.pageProps".
   * The "Component" prop within "this.props.pageProps" contains the page that is being rendered.
   *
   * XXX Multiversal - Executed in any case
   *  req, res are not accessible here
   *
   * @return {JSX.Element}
   */
  render(): JSX.Element {
    return (
      <MultiversalAppBootstrap {...this.props} />
    );
  }

  /**
   * TODO See https://github.com/zeit/next.js/discussions/12562 to know if this needs to be reimplemented - I'm not confident with the quality of the current implementation (works, but may be done better)
   *
   * @param error
   * @param errorInfo
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.debug('_app.componentDidCatch - Unexpected error caught', error, errorInfo);

    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo); // XXX This seems to be deprecated in v9.3.7
  }
}

export default MultiversalPageEntryPoint;
