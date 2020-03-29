import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { ApolloProvider } from '@apollo/react-hooks';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import * as Sentry from '@sentry/node';
import universalLanguageDetect from '@unly/universal-language-detector';
import { ERROR_LEVELS } from '@unly/universal-language-detector/lib/utils/error';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { AmplitudeClient, Identify } from 'amplitude-js';
import 'animate.css/animate.min.css'; // Loads animate.css CSS file. See https://github.com/daneden/animate.css
import 'bootstrap/dist/css/bootstrap.min.css'; // Loads bootstrap CSS file. See https://stackoverflow.com/a/50002905/2391795
import { IncomingMessage } from 'http';
import get from 'lodash.get';
import { NextPageContext } from 'next';
import NextCookies from 'next-cookies';
import NextApp from 'next/app';
import 'rc-tooltip/assets/bootstrap.css';
import React, { ErrorInfo } from 'react';

import Layout from '../components/Layout';
import withUniversalGraphQLDataLoader from '../hoc/withUniversalGraphQLDataLoader';
import { AppInitialProps } from '../types/AppInitialProps';
import { AppRenderProps } from '../types/AppRenderProps';
import { Cookies } from '../types/Cookies';
import { LayoutProps } from '../types/LayoutProps';
import { PublicHeaders } from '../types/PublicHeaders';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';
import { prepareGraphCMSLocaleHeader } from '../utils/graphcms';
import { LANG_EN, resolveFallbackLanguage, SUPPORTED_LANGUAGES } from '../utils/i18n'; // XXX Init Sentry
import i18nextLocize, { fetchTranslations, I18nextResources } from '../utils/i18nextLocize';
import { getIframeReferrer, isRunningInIframe } from '../utils/iframe';
import '../utils/ignoreNoisyWarningsHacks'; // HACK
import '../utils/sentry';
import UniversalCookiesManager from '../utils/UniversalCookiesManager';

// See https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(
  faGithub,
);

const fileLabel = 'pages/_app';
const logger = createLogger({
  label: fileLabel,
});

class NRNApp extends NextApp {
  /**
   * Initialise the application
   *
   * XXX Executed both on server and client side, but with different props (req, res are undefined on the client-side)
   *
   * @param props
   * @see https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle
   */
  static async getInitialProps(props: AppInitialProps): Promise<AppRenderProps> {
    const { ctx }: AppInitialProps = props;
    const { req, res }: NextPageContext = ctx;
    const readonlyCookies: Cookies = NextCookies(ctx); // Parses Next.js cookies in a universal way (server + client)
    const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res);
    const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
    const customerRef: string = process.env.CUSTOMER_REF;
    let publicHeaders: PublicHeaders = {};

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      scope.setTag('customer', customerRef);
      scope.setTag('userId', userSession.id);
      scope.setContext('userSession', userSession);
      scope.setContext('cookies', readonlyCookies);
    });

    Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
      category: fileLabel,
      message: `Preparing app (${isBrowser() ? 'browser' : 'server'})`,
      level: Sentry.Severity.Debug,
    });

    if (req) {
      const { headers }: IncomingMessage = req;
      publicHeaders = {
        'accept-language': get(headers, 'accept-language'),
        'user-agent': get(headers, 'user-agent'),
        'host': get(headers, 'host'),
      };

      Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
        scope.setContext('headers', headers);
      });
    }

    // Resolves the lang, will first check in cookies, and then browser settings
    const lang: string = universalLanguageDetect({
      supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
      fallbackLanguage: LANG_EN, // Fallback language in case the user's language cannot be resolved
      acceptLanguageHeader: get(req, 'headers.accept-language'), // Optional - Accept-language header will be used when resolving the language on the server side
      serverCookies: readonlyCookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
      errorHandler: (error: Error, level: ERROR_LEVELS, origin: string, context: object): void => {
        Sentry.withScope((scope): void => {
          scope.setExtra('level', level);
          scope.setExtra('origin', origin);
          scope.setContext('context', context);
          Sentry.captureException(error);
        });
        logger.error(error.message);
      },
    });
    const bestCountryCodes: string[] = [lang, resolveFallbackLanguage(lang)];
    const gcmsLocales: string = prepareGraphCMSLocaleHeader(bestCountryCodes);
    if (!customerRef) {
      throw Error(`Unable to resolve customerRef with "${customerRef}"`);
    }

    // Calls page's `getInitialProps` and fills `appProps.pageProps` - XXX See https://nextjs.org/docs#custom-app
    const appProps: AppRenderProps = await NextApp.getInitialProps(props);
    const defaultLocales: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      scope.setExtra('lang', lang);
    });

    appProps.pageProps = {
      ...appProps.pageProps,
      customerRef,
      headers: publicHeaders, // Publicly available headers - whitelist
      readonlyCookies,
      userSession,
      bestCountryCodes, // i.e: ['en', 'fr']
      gcmsLocales, // i.e: 'EN, FR' XXX MUST BE UPPERCASED - See https://docs.graphcms.com/docs/api/content-api/#passing-a-header-flag
      lang, // i.e: 'en'
      defaultLocales,
      isSSRReadyToRender: true,
    };

    return { ...appProps };
  }

  /**
   * Renders the whole application (providers, layout, etc.)
   *
   * XXX Executed both on server and client side
   *  req, res are not accessible here
   *
   * @return {JSX.Element}
   */
  render(): JSX.Element {
    const {
      Component,
      pageProps,
      apollo,
      router,
      err,
    }: AppRenderProps = this.props;

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      // Only track meaningful data from router, as it contains lots of noise
      scope.setContext('router', {
        route: router.route,
        pathname: router.pathname,
        query: router.query,
        asPath: router.asPath,
      });
    });

    Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
      category: fileLabel,
      message: `Rendering app for Component "${get(Component, 'name', 'unknown')}" (${isBrowser() ? 'browser' : 'server'})`,
      level: Sentry.Severity.Debug,
    });

    const i18nextInstance = i18nextLocize(pageProps.lang, pageProps.defaultLocales); // Apply i18next configuration with Locize backend

    // Build initial layout properties, they may be enhanced later on depending on the runtime engine
    const layoutProps: LayoutProps = {
      ...pageProps,
      err,
      router,
      i18nextInstance,
    };

    // XXX For an unknown reason, I noticed 2 render() calls. (each render call starts a new graphql request, and it makes debugging harder)
    //  The first one doesn't contain any data from the server (no data, almost nothing) and therefore result in errors along the react sub tree
    //  The second contains the expected data
    //  Due to this behaviour, an "isSSRReadyToRender" variable has been introduced, to make sure we only render the components when all the data have been provided
    if (layoutProps.isSSRReadyToRender) {
      /**
       * App rendered both on client or server (universal/isomorphic)
       *
       * @return {JSX.Element}
       * @constructor
       */
      const UniversalApp = (): JSX.Element => (
        <ApolloProvider client={apollo}>
          <Layout
            {...layoutProps}
          >
            <Component
              // XXX This "Component" is a dynamic Next.js page which depends on the current route
            />
          </Layout>
        </ApolloProvider>
      );

      // On the browser, we render additional things, such as Amplitude (data analytics)
      if (isBrowser()) {
        const userId = get(layoutProps, 'userSession.id', 'NOT_SET');
        const isInIframe: boolean = isRunningInIframe();
        const iframeReferrer: string = getIframeReferrer();

        Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
          scope.setTag('iframe', `${isInIframe}`);
          scope.setExtra('iframe', isInIframe);
          scope.setExtra('iframeReferrer', iframeReferrer);
        });

        // XXX Amplitude is disabled on the server side, it's only used on the client side
        //  (avoids double events + amplitude-js isn't server-side compatible anyway)
        const amplitude = require('amplitude-js'); // eslint-disable-line @typescript-eslint/no-var-requires
        const amplitudeInstance: AmplitudeClient = amplitude.getInstance();

        // https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
        amplitudeInstance.init(process.env.AMPLITUDE_API_KEY, null, {
          userId,
          logLevel: process.env.APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
          includeGclid: true,
          includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
          includeUtm: true,
          // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
          onError: (error): void => {
            Sentry.captureException(error);
            console.error(error); // eslint-disable-line no-console
          },
        });

        amplitudeInstance.setVersionName(process.env.APP_VERSION); // i.e: 1.0.0

        // Inject additional variables in the layout
        layoutProps.isInIframe = isInIframe;
        layoutProps.amplitudeInstance = amplitudeInstance;

        // We're only doing this when detecting a new session, as it won't be executed multiple times for the same session anyway, and it avoids noise
        if (amplitudeInstance.isNewSession()) {
          // Store whether the visitor originally came from an iframe (and from where)
          const visitor: Identify = new amplitudeInstance.Identify();
          // XXX See https://github.com/amplitude/Amplitude-JavaScript/issues/223
          visitor.setOnce('initial_lang', pageProps.lang); // DA Helps figuring out if the initial language (auto-detected) is changed afterwards
          // DA This will help track down the users who discovered our platform because of an iframe
          visitor.setOnce('initial_iframe', isInIframe);
          visitor.setOnce('initial_iframeReferrer', iframeReferrer);

          // XXX We must set all other "must-have" properties here (instead of below, as userProperties), because react-amplitude will send the next "page-displayed" event BEFORE sending the $identify event
          //  Thus, it'd store the first event with an associated user who has not defined "customer.ref", "lang", etc... and that'd break our stats (following events would be correct, only the first event of a new user would be wrong)
          visitor.setOnce('customer.ref', layoutProps.customerRef);
          visitor.setOnce('lang', pageProps.lang);
          visitor.setOnce('iframe', isInIframe);
          visitor.setOnce('iframeReferrer', iframeReferrer);

          amplitudeInstance.identify(visitor); // Send the new identify event to amplitude (updates user's identity)
        }

        return (
          <AmplitudeProvider
            amplitudeInstance={amplitudeInstance}
            apiKey={process.env.AMPLITUDE_API_KEY}
            userId={userId}
          >
            <Amplitude
              // DA Event props and user props are sometimes duplicated to ease the data analysis through Amplitude
              //  Because charts are sometimes easier to build using events props, or user users props
              eventProperties={{
                app: {
                  name: process.env.APP_NAME,
                  version: process.env.APP_VERSION,
                  stage: process.env.APP_STAGE,
                },
                page: {
                  url: location.href,
                  path: location.pathname,
                  origin: location.origin,
                  name: null,
                },
                customer: {
                  ref: layoutProps.customerRef,
                },
                lang: pageProps.lang,
                iframe: isInIframe,
                iframeReferrer: iframeReferrer,
              }}
              // userProperties={{}} XXX Do not use this, add default user-related properties above
            >
              <UniversalApp />
            </Amplitude>
          </AmplitudeProvider>
        );
      } else {
        // On the server, we just render the universal app without additional stuff (for now)
        return (
          <UniversalApp />
        );
      }
    } else {
      return null;
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
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

// Wraps all components in the tree with the data provider
export default withUniversalGraphQLDataLoader(NRNApp);
