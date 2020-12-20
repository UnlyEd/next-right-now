import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { ThemeProvider } from 'emotion-theming';
import { i18n } from 'i18next';
import find from 'lodash.find';
import includes from 'lodash.includes';
import isEmpty from 'lodash.isempty';
import size from 'lodash.size';
import React, { useState } from 'react';
import ErrorPage from '../../pages/_error';
import { NO_AUTO_PREVIEW_MODE_KEY } from '../../pages/api/preview';
import customerContext from '../../stores/customerContext';
import datasetContext from '../../stores/datasetContext';
import i18nContext from '../../stores/i18nContext';
import previewModeContext from '../../stores/previewModeContext';
import quickPreviewContext from '../../stores/quickPreviewContext';
import { Customer } from '../../types/data/Customer';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { MultiversalAppBootstrapProps } from '../../types/nextjs/MultiversalAppBootstrapProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { SSRPageProps } from '../../types/pageProps/SSRPageProps';
import {
  i18nRedirect,
  stringifyQueryParameters,
} from '../../utils/app/router';
import { initCustomerTheme } from '../../utils/data/theme';
import deserializeSafe from '../../utils/graphCMSDataset/deserializeSafe';
import { GraphCMSDataset } from '../../utils/graphCMSDataset/GraphCMSDataset';
import { DEFAULT_LOCALE } from '../../utils/i18n/i18n';
import i18nextLocize from '../../utils/i18n/i18nextLocize';
import { configureSentryI18n } from '../../utils/monitoring/sentry';
import {
  startPreviewMode,
  stopPreviewMode,
} from '../../utils/nextjs/previewMode';
import { detectLightHouse } from '../../utils/quality/lighthouse';
import { detectCypress } from '../../utils/testing/cypress';
import Loader from '../animations/Loader';
import DefaultErrorLayout from '../errors/DefaultErrorLayout';
import ErrorDebug from '../errors/ErrorDebug';
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
      serializedDataset,
      i18nTranslations,
      lang,
      locale,
    }: SSGPageProps | SSRPageProps = pageProps;
    configureSentryI18n(lang, locale);

    if (typeof serializedDataset !== 'string') {
      return (
        <ErrorDebug
          error={new Error(`Fatal error - Unexpected "serializedDataset" passed as page props.\n
          Expecting string, but got "${typeof serializedDataset}".\n
          This error is often caused by returning an invalid "serializedDataset" from a getStaticProps/getServerSideProps.\n
          Make sure you return a correct value, using "serializeSafe".`)}
          context={{
            pageProps,
          }}
        />
      );
    }

    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
      // XXX It's too cumbersome to do proper typings when type changes
      //  The "customer" was forwarded as a JSON-ish string (using Flatten) in order to avoid circular dependencies issues (SSG/SSR)
      //  It now being converted back into an object to be actually usable on all pages
      // eslint-disable-next-line no-console
      console.debug('pageProps.serializedDataset length (bytes)', (serializedDataset as unknown as string)?.length);
      // console.debug('serializedDataset', serializedDataset);
    }

    const dataset: GraphCMSDataset = deserializeSafe(serializedDataset);
    const customer: Customer = find(dataset, { __typename: 'Customer' }) as Customer;
    let availableLanguages: string[] = customer?.availableLanguages;

    if (isEmpty(availableLanguages)) {
      // If no language have been set, apply default (fallback)
      // XXX Applying proper default is critical to avoid an infinite loop
      availableLanguages = [DEFAULT_LOCALE];
    }

    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && isBrowser()) {
      // eslint-disable-next-line no-console
      console.debug(`pageProps.dataset (${size(Object.keys(dataset))} items)`, dataset);
      // eslint-disable-next-line no-console
      console.debug('dataset.customer', customer);
    }

    // If the locale used to display the page isn't available for this customer
    // TODO This should be replaced by something better, ideally the pages for non-available locales shouldn't be generated at all and then this wouldn't be needed
    if (!includes(availableLanguages, locale) && isBrowser()) {
      // Then redirect to the same page using another locale (using the first available locale)
      // XXX Be extra careful with this kind of redirects based on remote data!
      //  It's easy to create an infinite redirect loop when the data aren't shaped as expected.
      i18nRedirect(availableLanguages?.[0] || DEFAULT_LOCALE, router);
      return null;
    }

    let isPreviewModeEnabled;
    let previewData;
    let isQuickPreviewPage;

    if ('preview' in pageProps) {
      // SSG
      isPreviewModeEnabled = pageProps?.preview;
      previewData = pageProps?.previewData;

      if (isBrowser()) {
        const queryParameters: string = stringifyQueryParameters(router);
        const isCypressRunning = detectCypress();
        const isLightHouseRunning = detectLightHouse();
        const noAutoPreviewMode = new URLSearchParams(window?.location?.search)?.get(NO_AUTO_PREVIEW_MODE_KEY) === 'true';

        // XXX If we are running in staging stage and the preview mode is not enabled, then we force enable it
        //  We do this to enforce the staging stage is being used as a "preview environment" so it satisfies our publication workflow
        //  If we're running in development, then we don't enforce anything
        //  If we're running in production, then we force disable the preview mode, because we don't want to allow it in production
        // XXX Also, don't enable preview mode when Cypress or LightHouse are running to avoid bad performances
        if (process.env.NEXT_PUBLIC_APP_STAGE === 'staging' && !isPreviewModeEnabled && !isCypressRunning && !isLightHouseRunning && !noAutoPreviewMode) {
          startPreviewMode(queryParameters);
        } else if (process.env.NEXT_PUBLIC_APP_STAGE === 'production' && isPreviewModeEnabled) {
          logger.error('Preview mode is not allowed in production, but was detected as enabled. It will now be disabled by force.');
          Sentry.captureMessage('Preview mode is not allowed in production, but was detected as enabled. It will now be disabled by force.', Sentry.Severity.Error);
          stopPreviewMode(queryParameters);
        }
      }
    } else {
      // SSR
      isPreviewModeEnabled = false;
      previewData = null;
      isQuickPreviewPage = pageProps?.isQuickPreviewPage;
    }

    if (!customer || !i18nTranslations || !lang || !locale) {
      let error = props.err || null;

      // Unrecoverable error, we can't even display the layout because we don't have the minimal required information to properly do so
      // This most likely means something went wrong, and we must display the error page in such case
      if (!error) {
        // The most-likely issue could be that we failed to fetch the customer related to "process.env.NEXT_PUBLIC_CUSTOMER_REF"
        // E.g: This will happens when an instance was deployed for a customer, but the customer.ref was changed since then.
        if (process.env.NEXT_PUBLIC_CUSTOMER_REF !== customer?.ref) {
          error = new Error(process.env.NEXT_PUBLIC_APP_STAGE === 'production' ?
            `An error happened, the app cannot start. (customer doesn't match)` :
            `Fatal error when bootstraping the app. The "customer.ref" doesn't match (expected: "${process.env.NEXT_PUBLIC_CUSTOMER_REF}", received: "${customer?.ref}".`,
          );
        } else {
          error = new Error(process.env.NEXT_PUBLIC_APP_STAGE === 'production' ?
            `An error happened, the app cannot start.` :
            `Fatal error when bootstraping the app. It might happen when lang/locale/translations couldn't be resolved.`,
          );
        }

        // If the error wasn't detected by Next, then we log it to Sentry to make sure we'll be notified
        Sentry.withScope((scope): void => {
          scope.setContext('props', props);
          Sentry.captureException(error);
        });
      } else {
        // If an error was detected by Next, then it means the current state is due to a top-level that was caught before
        // We don't have anything to do, as it's automatically logged into Sentry
      }

      return (
        <ErrorPage err={error} statusCode={500} isReadyToRender={true}>
          <DefaultErrorLayout
            error={error}
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
      <datasetContext.Provider value={dataset}>
        <quickPreviewContext.Provider value={{ isQuickPreviewPage }}>
          <previewModeContext.Provider value={{ isPreviewModeEnabled: isPreviewModeEnabled, previewData }}>
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
        </quickPreviewContext.Provider>
      </datasetContext.Provider>
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
