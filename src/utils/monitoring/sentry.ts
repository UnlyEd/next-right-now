import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { NextApiRequest } from 'next';

import { UserSession } from '../../hooks/useUserSession';

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
    scope.setTag('appVersion', process.env.NEXT_PUBLIC_APP_VERSION);
    scope.setTag('appNameVersion', process.env.NEXT_PUBLIC_APP_NAME_VERSION);
    scope.setTag('appVersionRelease', process.env.NEXT_PUBLIC_APP_VERSION_RELEASE);
    scope.setTag('appBuildTime', process.env.NEXT_PUBLIC_APP_BUILD_TIME);
    scope.setTag('appBuildId', process.env.NEXT_PUBLIC_APP_BUILD_ID);
    scope.setTag('nodejs', process.version);
    scope.setTag('nodejsAWS', process.env.AWS_EXECUTION_ENV || null); // Optional - Available on production environment only
    scope.setTag('memory', process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || null); // Optional - Available on production environment only
    scope.setTag('runtimeEngine', isBrowser() ? 'browser' : 'server');
  });
}

/**
 * Configure Sentry tags for the current user.
 *
 * Allows to track all Sentry events related to a particular user.
 * The tracking remains anonymous, there are no personal information being tracked, only internal ids.
 *
 * @param userSession
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureSentryUser = (userSession: UserSession): void => {
  if (process.env.SENTRY_DSN) {
    Sentry.configureScope((scope) => {
      scope.setTag('userId', userSession?.id);
      scope.setTag('userDeviceId', userSession?.deviceId);
      scope.setContext('user', userSession);
    });
  }
};

/**
 * Configure Sentry tags for the currently used lang/locale.
 *
 * @param lang
 * @param locale
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureSentryI18n = (lang: string, locale: string): void => {
  if (process.env.SENTRY_DSN) {
    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      scope.setTag('lang', lang);
      scope.setTag('locale', locale);
    });
  }
};

/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
 *
 * @param req
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureReq = (req: NextApiRequest): void => {
  Sentry.configureScope((scope) => {
    scope.setTag('host', req?.headers?.host);
    scope.setTag('url', req?.url);
    scope.setTag('method', req?.method);
    scope.setContext('query', req?.query);
    scope.setContext('cookies', req?.cookies);
    scope.setContext('body', req?.body);
    scope.setContext('headers', req?.headers);
  });
};

export default Sentry;
