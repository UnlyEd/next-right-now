import { NowRequest } from '@now/node/dist';
import * as Sentry from '@sentry/node';
import get from 'lodash.get';
import { isBrowser } from '@unly/utils';

/**
 * Initialize Sentry and export it.
 *
 * Helper to avoid duplicating the init() call in every /pages/api file.
 * Also used in pages/_app for the client side, which automatically applies it for all frontend pages.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV !== 'test',
  environment: process.env.APP_STAGE,
  release: process.env.APP_VERSION_RELEASE,
});

if (!process.env.SENTRY_DSN && process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  console.error('Sentry DSN not defined');
}

// Scope configured by default, subsequent calls to "configureScope" will add additional data
Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
  scope.setTag('nodejs', process.version);
  scope.setTag('nodejsAWS', process.env.AWS_EXECUTION_ENV || null); // Optional - Available on production environment only
  scope.setTag('memory', process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || null); // Optional - Available on production environment only
  scope.setTag('runtimeEngine', isBrowser() ? 'browser' : 'server');
  scope.setTag('buildTime', process.env.BUILD_TIME);
});

/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
 *
 * @param req
 */
export const configureReq = (req: NowRequest): void => {
  Sentry.configureScope((scope) => {
    scope.setTag('host', get(req, 'headers.host'));
    scope.setTag('url', get(req, 'url'));
    scope.setTag('method', get(req, 'method'));
    scope.setContext('query', get(req, 'query'));
    scope.setContext('cookies', get(req, 'cookies'));
    scope.setContext('body', get(req, 'body'));
    scope.setContext('headers', get(req, 'headers'));
  });
};

export default Sentry;
