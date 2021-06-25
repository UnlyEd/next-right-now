import * as Sentry from '@sentry/nextjs';
import { isBrowser } from '@unly/utils';

/**
 * Configure Sentry default scope.
 *
 * Used by both sentry config files (client/server).

 * Also configures the default scope, subsequent calls to "configureScope" will enrich the scope.
 * Must only contain tags/contexts/extras that are universal (not server or browser specific).
 *
 * The Sentry scope will be enriched by:
 * - BrowserPageBootstrap, for browser-specific metadata.
 * - ServerPageBootstrap, for server-specific metadata.
 * - API endpoints, for per-API additional metadata.
 * - React components, for per-component additional metadata.
 *
 * Doesn't initialize Sentry if SENTRY_DSN isn't defined.
 * Re-exports the Sentry object to make it simpler to consume by developers (DX).
 *
 * Automatically applied on the browser, thanks to @sentry/nextjs.
 * Automatically applied on the server, thanks to @sentry/nextjs, when "withSentry" HOC is used.
 *
 * @see https://www.npmjs.com/package/@sentry/nextjs
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/usage
 */
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: process.env.NODE_ENV !== 'test',
    environment: process.env.NEXT_PUBLIC_APP_STAGE,
    // release: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE, // Uses the environment variable `SENTRY_RELEASE`, which is also attached to the source maps
    debug: process.env.NODE_ENV === 'development', // You'll need to configure "debug" in sentry.x.config.js files as well as next.config.js
    tracesSampleRate: 1.0,
  });

  Sentry.configureScope((scope) => {
    scope.setTag('customerRef', process.env.NEXT_PUBLIC_CUSTOMER_REF);
    scope.setTag('appStage', process.env.NEXT_PUBLIC_APP_STAGE);
    scope.setTag('appName', process.env.NEXT_PUBLIC_APP_NAME);
    scope.setTag('appBaseUrl', process.env.NEXT_PUBLIC_APP_BASE_URL);
    scope.setTag('appVersion', process.env.NEXT_PUBLIC_APP_VERSION);
    scope.setTag('appNameVersion', process.env.NEXT_PUBLIC_APP_NAME_VERSION);
    scope.setTag('appBuildTime', process.env.NEXT_PUBLIC_APP_BUILD_TIME);
    scope.setTag('buildTimeISO', (new Date(process.env.NEXT_PUBLIC_APP_BUILD_TIME || null)).toISOString());
    scope.setTag('appBuildId', process.env.NEXT_PUBLIC_APP_BUILD_ID);
    scope.setTag('nodejs', process.version);
    scope.setTag('nodejsAWS', process.env.AWS_EXECUTION_ENV || null); // Optional - Available on production environment only
    scope.setTag('memory', process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || null); // Optional - Available on production environment only
    scope.setTag('runtimeEngine', isBrowser() ? 'browser' : 'server');
    scope.setTag('isServerInitialBuild', process.env.IS_SERVER_INITIAL_BUILD || '0');
  });
} else {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error(`Sentry DSN not defined, events (exceptions, messages, etc.) won't be sent to Sentry.`);
  }
}

export default Sentry;
