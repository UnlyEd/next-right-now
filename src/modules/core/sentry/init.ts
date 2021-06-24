import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';

/**
 * Initialize Sentry and export it.
 *
 * Helper to avoid duplicating the init() call in every /pages/api file.
 * Also used in pages/_app for the client side, which automatically applies it for all frontend pages.
 *
 * Doesn't initialise Sentry if SENTRY_DSN isn't defined
 *
 * @see https://www.npmjs.com/package/@sentry/node
 */
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.NODE_ENV !== 'test',
    environment: process.env.NEXT_PUBLIC_APP_STAGE,
    release: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
  });

  if (!process.env.SENTRY_DSN && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error('Sentry DSN not defined');
  }

  // Scope configured by default, subsequent calls to "configureScope" will add additional data
  Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
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
  });
}

export default Sentry;
