const withSourceMaps = require('@zeit/next-source-maps')();
const packageJson = require('./package');
const date = new Date();
const i18nConfig = require('./src/i18nConfig');
const supportedLocales = i18nConfig.supportedLocales.map((supportedLocale) => {
  return supportedLocale.name;
});

console.debug(`Building Next with NODE_ENV="${process.env.NODE_ENV}" APP_STAGE="${process.env.APP_STAGE}" for CUSTOMER_REF="${process.env.CUSTOMER_REF}"`);

module.exports = withSourceMaps({
  // target: 'serverless', // Automatically enabled on Vercel, you may need to manually opt-in if you're not using Vercel - See https://nextjs.org/docs/api-reference/next.config.js/build-target#serverless-target
  env: {
    // XXX Duplication of the environment variables, this is only used locally (See https://github.com/zeit/next.js#build-time-configuration)
    //  while now.json:build:env will be used on the Now platform (See https://zeit.co/docs/v2/build-step/#providing-environment-variables)
    NRN_PRESET: process.env.NRN_PRESET,
    CUSTOMER_REF: process.env.CUSTOMER_REF,
    APP_STAGE: process.env.APP_STAGE,
    GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
    GRAPHQL_API_KEY: process.env.GRAPHQL_API_KEY,
    LOCIZE_PROJECT_ID: process.env.LOCIZE_PROJECT_ID,
    LOCIZE_API_KEY: process.env.LOCIZE_API_KEY,
    AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,

    // Non duplicated environment variables (automatically resolved, must not be specified in the .env.build file)
    BUILD_TIME: date.toString(),
    BUILD_TIMESTAMP: +date,
    APP_NAME: packageJson.name,
    APP_VERSION: packageJson.version,
    UNLY_SIMPLE_LOGGER_ENV: process.env.APP_STAGE, // Used by @unly/utils-simple-logger - Fix missing staging logs because it believes we're in production
  },
  experimental: {
    redirects() {
      const redirects = [
        {
          // Redirect root link with trailing slash to non-trailing slash, avoids 404 - See https://github.com/zeit/next.js/discussions/10651#discussioncomment-8270
          source: '/:locale/',
          destination: '/:locale',
          permanent: process.env.APP_STAGE !== 'development', // Do not use permanent redirect locally to avoid browser caching when working on it
        },
        {
          // Redirect link with trailing slash to non-trailing slash (any depth), avoids 404 - See https://github.com/zeit/next.js/discussions/10651#discussioncomment-8270
          source: '/:locale/:path*/',
          destination: '/:locale/:path*',
          permanent: process.env.APP_STAGE !== 'development', // Do not use permanent redirect locally to avoid browser caching when working on it
        },
      ];

      if (process.env.APP_STAGE === 'development') {
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
          source: `/:locale((?!${supportedLocales.join('|')})[^/]+)(.*)`,
          destination: '/api/autoRedirectToLocalisedPage',
        },
      ];

      if (process.env.APP_STAGE === 'development') {
        console.info('Using experimental rewrites:', rewrites);
      }

      return rewrites;
    },
  },
  webpack: (config, { isServer, buildId }) => {
    const APP_VERSION_RELEASE = `${packageJson.version}_${buildId}`;

    // Dynamically add some "env" variables that will be replaced during the build
    config.plugins[1].definitions['process.env.APP_RELEASE'] = JSON.stringify(buildId);
    config.plugins[1].definitions['process.env.APP_VERSION_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);

    if (isServer) { // Trick to only log once
      console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}"`);
    }

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    // XXX See https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
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
});
