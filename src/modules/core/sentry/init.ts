import * as Sentry from '@sentry/nextjs';
import { isBrowser } from '@unly/utils';

/**
 * Configure Sentry default scope.
 *
 * Used by both sentry config files (client/server).
 * Doesn't configure Sentry if NEXT_PUBLIC_SENTRY_DSN isn't defined.
 *
 * Automatically applied on the browser, thanks to @sentry/nextjs.
 * Automatically applied on the server, thanks to @sentry/nextjs, when "withSentry" HOC is used.
 *
 * @see https://www.npmjs.com/package/@sentry/nextjs
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/usage
 */
export const configureSentry = (): void => {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.warn(`Sentry DSN not defined, Sentry won't be configured and there won't be any error reporting.`);
  }

  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Scope configured by default, subsequent calls to "configureScope" will add additional data
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
    });
  }
};
