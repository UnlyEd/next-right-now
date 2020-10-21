import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { ThemeProvider } from 'emotion-theming';
import { i18n } from 'i18next';
import isEmpty from 'lodash.isempty';
import React, { useState } from 'react';

import ErrorPage from '../../pages/_error';
import customerContext from '../../stores/customerContext';
import i18nContext from '../../stores/i18nContext';
import previewModeContext from '../../stores/previewModeContext';
import { Customer } from '../../types/data/Customer';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { MultiversalAppBootstrapProps } from '../../types/nextjs/MultiversalAppBootstrapProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { SSRPageProps } from '../../types/pageProps/SSRPageProps';
import { stringifyQueryParameters } from '../../utils/app/router';
import { initCustomerTheme } from '../../utils/data/theme';
import i18nextLocize from '../../utils/i18n/i18nextLocize';
import { configureSentryI18n } from '../../utils/monitoring/sentry';
import {
  startPreviewMode,
  stopPreviewMode,
} from '../../utils/nextjs/previewMode';
import Loader from '../animations/Loader';
import DefaultErrorLayout from '../errors/DefaultErrorLayout';
import BrowserPageBootstrap, { BrowserPageBootstrapProps } from './BrowserPageBootstrap';
import MultiversalGlobalStyles from './MultiversalGlobalStyles';
import ServerPageBootstrap, { ServerPageBootstrapProps } from './ServerPageBootstrap';

const fileLabel = 'components/appBootstrap/MultiversalAppBootstrap';
const logger = createLogger({
  label: fileLabel,
});

export type Props = MultiversalAppBootstrapProps<SSGPageProps> | MultiversalAppBootstrapProps<SSRPageProps>;

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
    pageProps,
    router,
  } = props;
  // When using SSG with "fallback: true" and the page hasn't been generated yet then isSSGFallbackInitialBuild is true
  const [isSSGFallbackInitialBuild] = useState<boolean>(isEmpty(pageProps) && router?.isFallback === true);

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  if (isBrowser() && process.env.NEXT_PUBLIC_APP_STAGE !== 'production') { // Avoids log clutter on server
    console.debug('MultiversalAppBootstrap.props', props); // eslint-disable-line no-console
  }

  // Display a loader (we could use a skeleton too) when this happens, so that the user doesn't face a white page until the page is generated and displayed
  if (isSSGFallbackInitialBuild && router.isFallback) { // When router.isFallback becomes "false", then it'll mean the page has been generated and rendered and we can display it, instead of the loader
    return (
      <Loader />
    );
  }

  if (pageProps.isReadyToRender || pageProps.statusCode === 404) {
    if (!process.env.IS_SERVER_INITIAL_BUILD) { // Avoids noise when building the whole app
      logger.info('MultiversalAppBootstrap - App is ready, rendering...');
    }

    const {
      customer: airtableCustomer,
      i18nTranslations,
      lang,
      locale,
    }: SSGPageProps | SSRPageProps = pageProps;
    configureSentryI18n(lang, locale);

    const customer: Customer = airtableCustomer?.fields;
    let preview,
      previewData;

    if ('preview' in pageProps) {
      // SSG
      preview = pageProps.preview;
      previewData = pageProps.previewData;

      if (isBrowser()) {
        const queryParameters: string = stringifyQueryParameters(router);

        // XXX If we are running in staging stage and the preview mode is not enabled, then we force enable it
        //  We do this to enforce the staging stage is being used as a "preview environment" so it satisfies our publication workflow
        //  If we're running in development, then we don't enforce anything
        //  If we're running in production, then we force disable the preview mode, because we don't want to allow it in production
        if (process.env.NEXT_PUBLIC_APP_STAGE === 'staging' && !preview) {
          startPreviewMode(queryParameters);
        } else if (process.env.NEXT_PUBLIC_APP_STAGE === 'production' && preview) {
          logger.error('Preview mode is not allowed in production, but was detected as enabled. It will now be disabled by force.');
          Sentry.captureMessage('Preview mode is not allowed in production, but was detected as enabled. It will now be disabled by force.', Sentry.Severity.Error);
          stopPreviewMode(queryParameters);
        }
      }
    } else {
      // SSR
      preview = false;
      previewData = null;
    }

    if (!customer || !i18nTranslations || !lang || !locale) {
      // Unrecoverable error, we can't even display the layout because we don't have the minimal required information to properly do so
      // This most likely means something went wrong, and we must display the error page in such case
      if (!props.err) {
        // If the error wasn't detected by Next, then we log it to Sentry to make sure we'll be notified

        Sentry.withScope((scope): void => {
          scope.setContext('props', props);
          Sentry.captureMessage(`Unexpected fatal error happened, the app cannot render properly, fallback to the Error page. Check props.`, Sentry.Severity.Warning);
        });

      } else {
        // If an error was detected by Next, then it means the current state is due to a top-level that was caught before
        // We don't have anything to do, as it's automatically logged into Sentry
      }

      return (
        <ErrorPage err={props.err} statusCode={500} isReadyToRender={true}>
          <DefaultErrorLayout
            error={props.err}
          />
        </ErrorPage>
      );
    }

    const i18nextInstance: i18n = i18nextLocize(lang, i18nTranslations); // Apply i18next configuration with Locize backend
    const customerTheme: CustomerTheme = initCustomerTheme(customer);

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
     * XXX There may be more rendering modes - See https://github.com/vercel/next.js/discussions/12558#discussioncomment-12303
     */
    let browserPageBootstrapProps: BrowserPageBootstrapProps;
    let serverPageBootstrapProps: ServerPageBootstrapProps;

    if (isBrowser()) {
      browserPageBootstrapProps = {
        ...props,
        router,
        pageProps: {
          ...pageProps,
          i18nextInstance,
          isSSGFallbackInitialBuild: isSSGFallbackInitialBuild,
          customerTheme,
        },
      };
    } else {
      serverPageBootstrapProps = {
        ...props,
        router,
        pageProps: {
          ...pageProps,
          i18nextInstance,
          isSSGFallbackInitialBuild: isSSGFallbackInitialBuild,
          customerTheme,
        },
      };
    }

    return (
      <previewModeContext.Provider value={{ preview, previewData }}>
        <i18nContext.Provider value={{ lang, locale }}>
          <customerContext.Provider value={customer}>
            {/* XXX Global styles that applies to all pages go there */}
            <MultiversalGlobalStyles customerTheme={customerTheme} />

            <ThemeProvider theme={customerTheme}>
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
      </previewModeContext.Provider>
    );

  } else {
    // We wait for out props to contain "isReadyToRender: true", which means they've been set correctly by either getInitialProps/getStaticProps/getServerProps
    // This helps avoid multiple useless renders (especially in development mode) and thus avoid noisy logs
    // XXX I've recently tested without it and didn't notice any more logs than expected/usual. Maybe this was from a time where there were multiple full-renders? It may be removed if so (TODO later with proper testing)
    // eslint-disable-next-line no-console
    console.info('MultiversalAppBootstrap - App is not ready yet, waiting for isReadyToRender');
    return null;
  }
};

export default MultiversalAppBootstrap;
