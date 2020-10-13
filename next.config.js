const bundleAnalyzer = require('@next/bundle-analyzer');
const nextSourceMaps = require('@zeit/next-source-maps');
const packageJson = require('./package');
const i18nConfig = require('./src/i18nConfig');

const withSourceMaps = nextSourceMaps();
const withBundleAnalyzer = bundleAnalyzer({ // Run with "yarn analyse:bundle" - See https://www.npmjs.com/package/@next/bundle-analyzer
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});
const supportedLocales = i18nConfig.supportedLocales.map((supportedLocale) => {
  return supportedLocale.name;
});
const noRedirectBlacklistedPaths = ['_next', 'api']; // Paths that mustn't have rewrite applied to them, to avoid the whole app to behave inconsistently
const publicBasePaths = ['robots', 'static', 'favicon.ico']; // All items (folders, files) under /public directory should be added there, to avoid redirection when an asset isn't found
const noRedirectBasePaths = [...supportedLocales, ...publicBasePaths, ...noRedirectBlacklistedPaths]; // Will disable url rewrite for those items (should contain all supported languages and all public base paths)
const date = new Date();

console.debug(`Building Next with NODE_ENV="${process.env.NODE_ENV}" NEXT_PUBLIC_APP_STAGE="${process.env.NEXT_PUBLIC_APP_STAGE}" for NEXT_PUBLIC_CUSTOMER_REF="${process.env.NEXT_PUBLIC_CUSTOMER_REF}"`);

/**
 * This file is for advanced configuration of the Next.js framework.
 *
 * The below config applies to the whole application.
 * next.config.js gets used by the Next.js server and build phases, and it's not included in the browser build.
 *
 * XXX Not all configuration options are listed below, we only kept those of most interest.
 *  You'll need to dive into Next.js own documentation to find out about what's not included.
 *  Basically, we focused on options that seemed important for a SSG/SSR app running on serverless mode (Vercel).
 *  Also, we included some options by are not using them, this is mostly to help make you aware of those options, in case you'd need them.
 *
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
module.exports = withBundleAnalyzer(withSourceMaps({
  // basepath: '', // If you want Next.js to cover only a subsection of the domain. See https://nextjs.org/docs/api-reference/next.config.js/basepath
  // target: 'serverless', // Automatically enabled on Vercel, you may need to manually opt-in if you're not using Vercel. See https://nextjs.org/docs/api-reference/next.config.js/build-target#serverless-target
  // trailingSlash: false, // By default Next.js will redirect urls with trailing slashes to their counterpart without a trailing slash. See https://nextjs.org/docs/api-reference/next.config.js/trailing-slash

  /**
   * React's Strict Mode is a development mode only feature for highlighting potential problems in an application.
   * It helps to identify unsafe lifecycles, legacy API usage, and a number of other features.
   *
   * Officially suggested by Next.js:
   * We strongly suggest you enable Strict Mode in your Next.js application to better prepare your application for the future of React.
   *
   * If you or your team are not ready to use Strict Mode in your entire application, that's OK! You can incrementally migrate on a page-by-page basis using <React.StrictMode>.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
   */
  // reactStrictMode: true, // XXX Disabled for now, but we should enable it

  /**
   * Environment variables added to JS bundle
   *
   * XXX All env variables defined in ".env*" files that aren't public (those that don't start with "NEXT_PUBLIC_") MUST manually be made available at build time below.
   *  They're necessary on Vercel for runtime execution (SSR, SSG with revalidate, everything that happens server-side will need those).
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
   */
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    LOCIZE_API_KEY: process.env.LOCIZE_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,

    // Dynamic env variables
    NEXT_PUBLIC_APP_BUILD_TIME: date.toString(),
    NEXT_PUBLIC_APP_BUILD_TIMESTAMP: +date,
    NEXT_PUBLIC_APP_NAME: packageJson.name,
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
    NEXT_PUBLIC_APP_NAME_VERSION: `${packageJson.name}-${packageJson.version}`,
    UNLY_SIMPLE_LOGGER_ENV: process.env.NEXT_PUBLIC_APP_STAGE, // Used by @unly/utils-simple-logger - Fix missing staging logs because otherwise it believes we're in production
  },

  /**
   * Headers allow you to set custom HTTP headers for an incoming request path.
   *
   * Headers allow you to set route specific headers like CORS headers, content-types, and any other headers that may be needed.
   * They are applied at the very top of the routes.
   *
   * @return {Promise<Array<{ headers: [{value: string, key: string}], source: string }>>}
   * @see https://nextjs.org/docs/api-reference/next.config.js/headers
   * @since 9.5 - See https://nextjs.org/blog/next-9-5#headers
   */
  async headers() {
    const headers = [];

    console.info('Using headers:', headers);

    return headers;
  },

  /**
   * Rewrites allow you to map an incoming request path to a different destination path.
   *
   * Rewrites are only available on the Node.js environment and do not affect client-side routing.
   * Rewrites are the most commonly used form of custom routing — they're used for dynamic routes (pretty URLs), user-land routing libraries (e.g. next-routes), internationalization, and other advanced use cases.
   *
   * For example, the route /user/:id rendering a specific user's profile page is a rewrite.
   * Rendering your company's about page for both /about and /fr/a-propos is also a rewrite.
   * The destination url can be internal, or external.
   *
   * @return { Promise<Array<{ destination: string, source: string, headers: Array<{ key: string, value: string }> }>> }
   * @see https://nextjs.org/docs/api-reference/next.config.js/rewrites
   * @since 9.5 - See https://nextjs.org/blog/next-9-5#rewrites
   */
  async rewrites() {
    const rewrites = [
      // I18n rewrites
      {
        // XXX Doesn't work locally (maybe because of rewrites), but works online
        source: '/',
        destination: '/api/autoRedirectToLocalisedPage',
      },
      {
        source: `/:locale((?!${noRedirectBasePaths.join('|')})[^/]+)(.*)`,
        destination: '/api/autoRedirectToLocalisedPage',
      },

      // Robots rewrites
      {
        source: `/robots.txt`,
        destination: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? `/robots/production.txt` : '/robots/!production.txt',
      },
    ];

    console.info('Using rewrites:', rewrites);

    return rewrites;
  },

  /**
   * Redirects allow you to redirect an incoming request path to a different destination path.
   *
   * Redirects are only available on the Node.js environment and do not affect client-side routing.
   * By redirects, we mean HTTP Redirects (aka URL forwarding).
   * Redirects are most commonly used when a website is reorganized — ensuring search engines and bookmarks are forwarded to their new locations.
   * The destination url can be internal, or external.
   *
   * @return { Promise<Array<{ permanent: boolean, destination: string, source: string, statusCode?: number }>> }
   * @see https://nextjs.org/docs/api-reference/next.config.js/redirects
   * @since 9.5 - See https://nextjs.org/blog/next-9-5#redirects
   */
  async redirects() {
    const redirects = [
      // I18n redirects
      {
        // Redirect root link with trailing slash to non-trailing slash, avoids 404 - See https://github.com/vercel/next.js/discussions/10651#discussioncomment-8270
        source: '/:locale/',
        destination: '/:locale',
        permanent: process.env.NEXT_PUBLIC_APP_STAGE !== 'development', // Do not use permanent redirect locally to avoid browser caching when working on it
      },
      {
        // Redirect link with trailing slash to non-trailing slash (any depth), avoids 404 - See https://github.com/vercel/next.js/discussions/10651#discussioncomment-8270
        source: '/:locale/:path*/',
        destination: '/:locale/:path*',
        permanent: process.env.NEXT_PUBLIC_APP_STAGE !== 'development', // Do not use permanent redirect locally to avoid browser caching when working on it
      },
    ];

    console.info('Using redirects:', redirects);

    return redirects;
  },

  /**
   *
   * The webpack function is executed twice, once for the server and once for the client.
   * This allows you to distinguish between client and server configuration using the isServer property.
   *
   * @param config Current webpack config. Useful to reuse parts of what's already configured while overridding other parts.
   * @param buildId The build id, used as a unique identifier between builds.
   * @param dev Indicates if the compilation will be done in development.
   * @param isServer It's true for server-side compilation, and false for client-side compilation.
   * @param defaultLoaders Default loaders used internally by Next.js:
   *  - babel Default babel-loader configuration
   * @see https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   */
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    if (isServer) {
      // IS_SERVER_INITIAL_BUILD is meant to be defined only at build time and not at run time, and therefore must not be "made public"
      process.env.IS_SERVER_INITIAL_BUILD = '1';
    }

    const APP_VERSION_RELEASE = `${packageJson.version}_${buildId}`;
    config.plugins.map((plugin, i) => {
      if (plugin.definitions) { // If it has a "definitions" key, then we consider it's the DefinePlugin where ENV vars are stored
        // Dynamically add some "public env" variables that will be replaced during the build through "DefinePlugin"
        // Those variables are considered public because they are available at build time and at run time (they'll be replaced during initial build, by their value)
        plugin.definitions['process.env.NEXT_PUBLIC_APP_BUILD_ID'] = JSON.stringify(buildId);
        plugin.definitions['process.env.NEXT_PUBLIC_APP_VERSION_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);
      }
    });

    if (isServer) { // Trick to only log once
      console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}" using NODE_ENV="${process.env.NODE_ENV}" ${process.env.IS_SERVER_INITIAL_BUILD ? 'with IS_SERVER_INITIAL_BUILD="1"' : ''}`);
    }

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    // XXX See https://github.com/vercel/next.js/blob/canary/examples/with-sentry-simple/next.config.js
    // In `pages/_app.js`, Sentry is imported from @sentry/node. While
    // @sentry/browser will run in a Node.js environment, @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs#customizing-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
  },

  /**
   * Next.js uses a constant id generated at build time to identify which version of your application is being served.
   *
   * This can cause problems in multi-server deployments when next build is ran on every server.
   * In order to keep a static build id between builds you can provide your own build id.
   *
   * XXX We documented this function in case you might want to use it, but we aren't using it.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id
   */
  // generateBuildId: async () => {
  //   // You can, for example, get the latest git commit hash here
  //   return 'my-build-id'
  // },

  /**
   * Next.js exposes some options that give you some control over how the server will dispose or keep in memory built pages in development.
   *
   * XXX We documented this function in case you might want to use it, but we aren't using it.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
   */
  // onDemandEntries: {
  //   // period (in ms) where the server will keep pages in the buffer
  //   maxInactiveAge: 25 * 1000,
  //   // number of pages that should be kept simultaneously without being disposed
  //   pagesBufferLength: 2,
  // },

  poweredByHeader: 'Next Right Now - With love - https://github.com/UnlyEd/next-right-now', // See https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
}));
