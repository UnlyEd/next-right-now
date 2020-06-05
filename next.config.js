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

module.exports = withBundleAnalyzer(withSourceMaps({
  // target: 'serverless', // Automatically enabled on Vercel, you may need to manually opt-in if you're not using Vercel - See https://nextjs.org/docs/api-reference/next.config.js/build-target#serverless-target
  env: {
    // XXX All env variables defined in ".env*" files that aren't public (don't start with "NEXT_PUBLIC_") must manually be made available at build time below
    //  See https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    // XXX Duplication of the environment variables, this is only used locally
    //  while now.json:build:env will be used on the Now platform (See https://vercel.com/docs/v2/build-step/#providing-environment-variables)
    GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
    GRAPHQL_API_KEY: process.env.GRAPHQL_API_KEY,
    LOCIZE_API_KEY: process.env.LOCIZE_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,

    // Dynamic env variables
    NEXT_PUBLIC_BUILD_TIME: date.toString(),
    NEXT_PUBLIC_BUILD_TIMESTAMP: +date,
    NEXT_PUBLIC_APP_NAME: packageJson.name,
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
    UNLY_SIMPLE_LOGGER_ENV: process.env.NEXT_PUBLIC_APP_STAGE, // Used by @unly/utils-simple-logger - Fix missing staging logs because otherwise it believes we're in production
  },
  experimental: {
    redirects() {
      const redirects = [
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

      if (process.env.NEXT_PUBLIC_APP_STAGE === 'development') {
        console.info('Using experimental redirects:', redirects);
      }

      return redirects;
    },
    rewrites() {
      const rewrites = [
        {
          // XXX Doesn't work locally (maybe because of rewrites), but works online
          source: '/',
          destination: '/api/autoRedirectToLocalisedPage',
        },
        {
          source: `/:locale((?!${noRedirectBasePaths.join('|')})[^/]+)(.*)`,
          destination: '/api/autoRedirectToLocalisedPage',
        },
      ];

      if (process.env.NEXT_PUBLIC_APP_STAGE === 'development') {
        console.info('Using experimental rewrites:', rewrites);
      }

      return rewrites;
    },
  },
  webpack: (config, { isServer, buildId }) => {
    const APP_VERSION_RELEASE = `${packageJson.version}_${buildId}`;
    config.plugins.map((plugin, i) => {
      if (plugin.definitions) { // If it has a "definitions" key, then we consider it's the DefinePlugin where ENV vars are stored
        // Dynamically add some "env" variables that will be replaced during the build in "DefinePlugin"
        plugin.definitions['process.env.NEXT_PUBLIC_APP_BUILD_ID'] = JSON.stringify(buildId);
        plugin.definitions['process.env.NEXT_PUBLIC_APP_VERSION_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);
      }
    });

    if (isServer) { // Trick to only log once
      console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}" using NODE_ENV="${process.env.NODE_ENV}"`);
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
  poweredByHeader: 'NRN - With love',
}));
