import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBook, faBookReader, faCoffee, faHome, faUserCog } from '@fortawesome/free-solid-svg-icons';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import 'animate.css/animate.min.css'; // Loads animate.css CSS file. See https://github.com/daneden/animate.css
import 'bootstrap/dist/css/bootstrap.min.css'; // Loads bootstrap CSS file. See https://stackoverflow.com/a/50002905/2391795
import NextApp from 'next/app';
import 'rc-tooltip/assets/bootstrap.css';
import React, { ErrorInfo } from 'react';
import { AppRenderProps } from '../types/AppRenderProps';
import '../utils/ignoreNoisyWarningsHacks'; // HACK
import '../utils/sentry';

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

class NRNApp extends NextApp {
  /**
   * Renders the whole application (providers, layout, etc.)
   *
   * XXX Executed both on server and client side
   *  req, res are not accessible here
   *
   * @return {JSX.Element}
   */
  render(): JSX.Element {
    const { Component, pageProps, err }: AppRenderProps = this.props;

    if (isBrowser()) { // Avoids log clutter on server
      console.debug('_app.render.pageProps', pageProps);
    }

    if (pageProps.isReadyToRender || pageProps.isSSRReadyToRender || pageProps.statusCode === 404) {
      console.info('_app.render - App is ready, rendering...');
      return (
        <Component
          {...pageProps}
          error={err}
        />
      );
    } else {
      console.info('_app.render - App is not ready yet, waiting for isReadyToRender');
      return null;
    }
  }

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
    super.componentDidCatch(error, errorInfo);
  }
}

export default NRNApp;
