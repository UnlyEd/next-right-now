import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { ThemeProvider } from 'emotion-theming';
import { i18n } from 'i18next';
import React from 'react';
import customerContext from '../../stores/customerContext';
import i18nContext from '../../stores/i18nContext';
import { Theme } from '../../types/data/Theme';
import { MultiversalAppBootstrapProps } from '../../types/nextjs/MultiversalAppBootstrapProps';
import { MultiversalPageProps } from '../../types/pageProps/MultiversalPageProps';
import { UniversalSSGPageProps } from '../../types/pageProps/UniversalSSGPageProps';
import { UniversalSSRPageProps } from '../../types/pageProps/UniversalSSRPageProps';
import { initCustomerTheme } from '../../utils/data/theme';
import i18nextLocize from '../../utils/i18n/i18nextLocize';
import BrowserPageBootstrap, { BrowserPageBootstrapProps } from './BrowserPageBootstrap';
import ServerPageBootstrap, { ServerPageBootstrapProps } from './ServerPageBootstrap';
import UniversalGlobalStyles from './UniversalGlobalStyles';

const fileLabel = 'components/appBootstrap/MultiversalAppBootstrap';
const logger = createLogger({
  label: fileLabel,
});

export type Props = MultiversalAppBootstrapProps<UniversalSSGPageProps> | MultiversalAppBootstrapProps<UniversalSSRPageProps>;

/**
 * Bootstraps a page and renders it
 *
 * Basically does everything a Page component needs to be rendered.
 * All behaviors defined here are applied across the whole application (they're common to all pages)
 *
 * @param props
 */
const MultiversalAppBootstrap: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    Component,
    err,
    pageProps,
  } = props;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  if (isBrowser()) { // Avoids log clutter on server
    console.debug('MultiversalAppBootstrap.props', props);
  }

  if (pageProps.isReadyToRender || pageProps.statusCode === 404) {
    console.info('MultiversalAppBootstrap - App is ready, rendering...');
    const {
      customer,
      i18nTranslations,
      lang,
      locale,
    }: MultiversalPageProps = pageProps;
    const i18nextInstance: i18n = i18nextLocize(lang, i18nTranslations); // Apply i18next configuration with Locize backend
    const theme: Theme = initCustomerTheme(customer);

    /*
     * We split the rendering between server and browser
     * There are actually 3 rendering modes, each of them has its own set of limitations
     *  1. SSR (doesn't have access to browser-related features (LocalStorage), but it does have access to request-related data (cookies, HTTP headers))
     *  2. Server during SSG (doesn't have access to browser-related features (LocalStorage), nor to request-related data (cookies, localStorage, HTTP headers))
     *  3. Static rendering (doesn't have access to server-related features (HTTP headers), but does have access to request-related data (cookie) and browser-related features (LocalStorage))
     *
     * What we do here, is to avoid rendering browser-related stuff if we're not running in a browser, because it cannot work properly.
     * (e.g: Generating cookies will work, but they won't be stored on the end-user device, and it would create "Text content did not match" warnings, if generated from the server during SSG)
     *
     * So, the BrowserPageBootstrap does browser-related stuff and then call the PageBootstrap which takes care of stuff that is universal (identical between browser and server)
     *
     * XXX If you're concerned regarding React rehydration, read our talk with Josh, author of https://joshwcomeau.com/react/the-perils-of-rehydration/
     *  https://twitter.com/Vadorequest/status/1257658553361408002
     *
     * XXX There may be more rendering modes - See https://github.com/zeit/next.js/discussions/12558#discussioncomment-12303
     */
    let browserPageBootstrapProps: BrowserPageBootstrapProps;
    let serverPageBootstrapProps: ServerPageBootstrapProps;

    if (isBrowser()) {
      browserPageBootstrapProps = {
        ...props,
        pageProps: {
          ...pageProps,
          i18nextInstance,
          theme,
        },
      };
    } else {
      serverPageBootstrapProps = {
        ...props,
        pageProps: {
          ...pageProps,
          i18nextInstance,
          theme,
        },
      };
    }

    return (
      <i18nContext.Provider value={{ lang, locale }}>
        <customerContext.Provider value={customer}>
          {/* XXX Global styles that applies to all pages go there */}
          <UniversalGlobalStyles theme={theme} />

          <ThemeProvider theme={theme}>
            {
              isBrowser() ? (
                <BrowserPageBootstrap
                  {...browserPageBootstrapProps}
                />
              ) : (
                <ServerPageBootstrap
                  {...serverPageBootstrapProps}
                />
              )
            }
          </ThemeProvider>
        </customerContext.Provider>
      </i18nContext.Provider>
    );

  } else {
    // We wait for out props to contain "isReadyToRender: true", which means they've been set correctly by either getInitialProps/getStaticProps/getServerProps
    // This helps avoid multiple useless renders (especially in development mode) and thus avoid noisy logs
    // XXX I've recently tested without it and didn't notice any more logs than expected/usual. Maybe this was from a time where there were multiple full-renders? It may be removed if so (TODO later with proper testing)
    console.info('MultiversalAppBootstrap - App is not ready yet, waiting for isReadyToRender');
    return null;
  }
};

export default MultiversalAppBootstrap;
