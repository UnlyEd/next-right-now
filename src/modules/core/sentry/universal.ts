import { createLogger } from '@/modules/core/logging/logger';
import { FLUSH_TIMEOUT } from '@/modules/core/sentry/config';
import { UserSession } from '@/modules/core/userSession/useUserSession';
import * as Sentry from '@sentry/node';

const fileLabel = 'modules/core/sentry/universal';
const logger = createLogger({
  fileLabel,
});

/**
 * Configure Sentry tags related to the current user.
 *
 * Allows to track all Sentry events related to a particular user.
 * The tracking remains anonymous, there are no personal information being tracked, only internal ids.
 *
 * @param userSession
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureSentryUserMetadata = (userSession: UserSession): void => {
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
 * Flushes Sentry queue in a safe way.
 *
 * It's necessary to flush all Sentry events on the server, because Vercel runs on AWS Lambda, see https://vercel.com/docs/platform/limits#streaming-responses
 * If you don't flush, then it's possible the Sentry events won't be sent.
 * This helper is meant to be used for backend-only usage. (not frontend)
 *
 * There is a potential bug in Sentry that throws an exception when flushing times out, causing API endpoints to fail.
 * @see https://github.com/getsentry/sentry/issues/26870
 */
export const flushSafe = async (): Promise<boolean> => {
  try {
    return await Sentry.flush(FLUSH_TIMEOUT);
  } catch (e) {
    logger.error(`[flushSafe] An exception was thrown while running Sentry.flush()`, e);
    return false;
  }
};
