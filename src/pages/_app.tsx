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
import MultiversalPageBootstrap from '../components/MultiversalPageBootstrap';
import '../utils/ignoreNoisyWarningsHacks'; // HACK This ignore warnings and errors I personally find too noisy and useless
import '../utils/sentry';
import { MultiversalPageBootstrapProps } from '../types/MultiversalPageBootstrapProps';

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

class MultiversalPageEntryPoint extends NextApp<MultiversalPageBootstrapProps, MultiversalPageBootstrapProps, AppState> {
  /**
   * Renders the whole application (providers, layout, etc.)
   *
   * XXX Executed both on server and client side
   *  req, res are not accessible here
   *
   * @return {JSX.Element}
   */
  render(): JSX.Element {
    return (
      <MultiversalPageBootstrap {...this.props} />
    );
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

export default MultiversalPageEntryPoint;
