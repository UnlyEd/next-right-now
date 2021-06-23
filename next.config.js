const bundleAnalyzer = require('@next/bundle-analyzer');
const nextSourceMaps = require('@zeit/next-source-maps');
const createNextPluginPreval = require('next-plugin-preval/config');
const packageJson = require('./package');
const i18nConfig = require('./src/modules/core/i18n/i18nConfig');

const withNextPluginPreval = createNextPluginPreval();
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
const GIT_COMMIT_SHA_SHORT = typeof process.env.GIT_COMMIT_SHA === 'string' && process.env.GIT_COMMIT_SHA.substring(0, 8);

console.debug(`Building Next with NODE_ENV="${process.env.NODE_ENV}" NEXT_PUBLIC_APP_STAGE="${process.env.NEXT_PUBLIC_APP_STAGE}" for NEXT_PUBLIC_CUSTOMER_REF="${process.env.NEXT_PUBLIC_CUSTOMER_REF}" using GIT_COMMIT_SHA=${process.env.GIT_COMMIT_SHA} and GIT_COMMIT_REF=${process.env.GIT_COMMIT_REF}`);

const GIT_COMMIT_TAGS = (process.env.GIT_COMMIT_TAGS ? process.env.GIT_COMMIT_TAGS.trim() : '').replace('refs/tags/', '');
console.debug(`Deployment will be tagged automatically, using GIT_COMMIT_TAGS: "${GIT_COMMIT_TAGS}"`);

// Iterate over all tags and extract the first the match "v*"
const APP_RELEASE_TAG = GIT_COMMIT_TAGS ? GIT_COMMIT_TAGS.split(' ').find((tag) => tag.startsWith('v')) : `unknown-${GIT_COMMIT_SHA_SHORT}`;
console.debug(`Release version resolved from tags: "${APP_RELEASE_TAG}" (matching first tag starting with "v")`);

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
module.exports = withNextPluginPreval(withBundleAnalyzer(withSourceMaps({
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
  reactStrictMode: true,

  /**
   * Environment variables added to JS bundle
   *
   * XXX All env variables defined in ".env*" files that aren't public (those that don't start with "NEXT_PUBLIC_") MUST manually be made available at build time below.
   *  They're necessary on Vercel for runtime execution (SSR, SSG with revalidate, everything that happens server-side will need those).
   *
   * XXX This is a duplication of the environment variables.
   *  The variables defined below are only used locally, while those in "vercel.*.json:build:env" will be used on the Vercel platform.
   *  See https://vercel.com/docs/v2/build-step/#providing-environment-variables
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
   */
  env: {
    GITHUB_DISPATCH_TOKEN: process.env.GITHUB_DISPATCH_TOKEN,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    LOCIZE_API_KEY: process.env.LOCIZE_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,

    // Vercel env variables - See https://vercel.com/docs/environment-variables#system-environment-variables
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    CI: process.env.CI,

    // Dynamic env variables
    NEXT_PUBLIC_APP_DOMAIN: process.env.VERCEL_URL, // Alias
    NEXT_PUBLIC_APP_BASE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:8888',
    NEXT_PUBLIC_APP_BUILD_TIME: date.toString(),
    NEXT_PUBLIC_APP_BUILD_TIMESTAMP: +date,
    NEXT_PUBLIC_APP_NAME: packageJson.name,
    NEXT_PUBLIC_APP_NAME_VERSION: `${packageJson.name}-${APP_RELEASE_TAG}`,
    GIT_COMMIT_SHA_SHORT,
    GIT_COMMIT_SHA: process.env.GIT_COMMIT_SHA, // Resolve commit hash from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
    GIT_COMMIT_REF: process.env.GIT_COMMIT_REF, // Resolve commit ref (branch/tag) from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
    GIT_COMMIT_TAGS: process.env.GIT_COMMIT_TAGS || '', // Resolve commit tags/releases from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
  },

  /**
   * Headers allow you to set custom HTTP headers for an incoming request path.
   *
   * Headers allow you to set route specific headers like CORS headers, content-types, and any other headers that may be needed.
   * They are applied at the very top of the routes.
   *
   * @example source: '/(.*?)', // Match all paths, including "/"
   * @example source: '/:path*', // Match all paths, excluding "/"
   *
   * @return {Promise<Array<{ headers: [{value: string, key: string}], source: string }>>}
   * @see https://nextjs.org/docs/api-reference/next.config.js/headers
   * @since 9.5 - See https://nextjs.org/blog/next-9-5#headers
   */
  async headers() {
    // XXX We need to embed our website into external websites for the NRN demo, but you might want to disable this
    const DISABLE_IFRAME_EMBED_FROM_3RD_PARTIES = false;

    const headers = [
      {
        // Make all fonts immutable and cached for one year
        'source': '/static/fonts/(.*?)',
        'headers': [
          {
            'key': 'Cache-Control',
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            'value': `public, max-age=31536000, immutable`,
          },
        ],
      },
      {
        // Make all other static assets immutable and cached for one hour
        'source': '/static/(.*?)',
        'headers': [
          {
            'key': 'Cache-Control',
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            'value': `public, max-age=3600, immutable`,
          },
        ],
      },
      {
        source: '/(.*?)', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
        headers: [
          // This directive helps protect against some XSS attacks
          // See https://infosec.mozilla.org/guidelines/web_security#x-content-type-options
          {
            key: 'X-Content-Type-Options',
            value: `nosniff`,
          },
        ],
      },
      {
        source: '/(.*?)', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
        headers: [
          // This directive helps protect user's privacy and might avoid leaking sensitive data in urls to 3rd parties (e.g: when loading a 3rd party asset)
          // See https://infosec.mozilla.org/guidelines/web_security#referrer-policy
          // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          // See https://scotthelme.co.uk/a-new-security-header-referrer-policy/
          {
            key: 'Referrer-Policy',
            // "no-referrer-when-downgrade" is the default behaviour
            // XXX You might want to restrict even more the referrer policy
            value: `no-referrer-when-downgrade`,
          },
        ],
      },
    ];

    /**
     * Because the NRN demo uses Stacker provider to show our app as an embedded iframe, we need to allow our pages to be embedded by other websites.
     *
     * In staging, we don't want to allow any website to embed our app by default, to avoid customers mistakenly use our preview URL in their production app.
     * Although, we want to allow Stacker to do it, so we can preview our website from Stacker (quick-preview).
     *
     * In production, we want to allow any website to embed our app by default, because we don't want to manage the list of websites that might embed our content.
     * Alternatively, we could also generate the CSP dynamically by pre-fetching the allowed websites from our CMS/API.
     */
    if (!DISABLE_IFRAME_EMBED_FROM_3RD_PARTIES && process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
      headers.push({
        source: '/(.*?)', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *.stacker.app *.airportal.app', // Airportal is the former name of Stacker
          },
        ],
      });
    }

    // When 3rd party embeds are forbidden, only allow same origin to embed iframe by default
    // This is a stronger default, if you don't to embed your site in any external website
    if (DISABLE_IFRAME_EMBED_FROM_3RD_PARTIES) {
      headers.push({
        // This directive's "ALLOW-FROM" option is deprecated in favor of "Content-Security-Policy" "frame-ancestors"
        // So, we use a combination of both the CSP directive and the "X-Frame-Options" for browser that don't support CSP
        // See https://infosec.mozilla.org/guidelines/web_security#x-frame-options
        key: 'X-Frame-Options',
        value: `SAMEORIGIN`,
      });
      headers.push({
        source: '/(.*?)', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
        // See https://infosec.mozilla.org/guidelines/web_security#x-frame-options
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self`,
          },
        ],
      });
    }

    console.info('Using headers:', JSON.stringify(headers, null, 2));

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

  // See https://nextjs.org/docs/messages/webpack5
  // Necessary to manually specify to use webpack 5, because we use a custom "webpack" config (see below)
  webpack5: true,

  resolve: {
    fallback: {
      // Fixes npm packages that depend on `fs` module
      fs: false,
    },
  },

  /**
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
  webpack: (config, {
    buildId,
    dev,
    isServer,
    defaultLoaders,
  }) => {
    if (isServer) {
      /**
       * This special server-only environment variable isn't string-replaced by webpack during bundling (it isn't added to the DefinePlugin definitions).
       *
       * Therefore, it's:
       * - Always '1' on the server, during development
       * - Always '1' on the server, during the Next.js build step
       * - Always undefined on the browser
       * - Always undefined in API endpoints
       * - Always undefined during static pages re-generations (ISG) and server-side pages
       *
       * It can be useful when performing processing that should only happen during the initial build, or not during the initial build.
       */
      process.env.IS_SERVER_INITIAL_BUILD = '1';
    }

    const APP_VERSION_RELEASE = APP_RELEASE_TAG || buildId;
    config.plugins.map((plugin, i) => {
      // Inject custom environment variables in "DefinePlugin" - See https://webpack.js.org/plugins/define-plugin/
      if (plugin.__proto__.constructor.name === 'DefinePlugin') {
        // Dynamically add some "public env" variables that will be replaced during the build through "DefinePlugin"
        // Those variables are considered public because they are available at build time and at run time (they'll be replaced during initial build, by their value)
        plugin.definitions['process.env.NEXT_PUBLIC_APP_BUILD_ID'] = JSON.stringify(buildId);
        plugin.definitions['process.env.NEXT_PUBLIC_APP_VERSION_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);
      }
    });

    if (isServer) { // Trick to only log once
      console.debug(`[webpack] Building release "${APP_VERSION_RELEASE}" using NODE_ENV="${process.env.NODE_ENV}" ${process.env.IS_SERVER_INITIAL_BUILD ? 'with IS_SERVER_INITIAL_BUILD="1"' : ''}`);
    }

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

  poweredByHeader: false, // See https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
})));
