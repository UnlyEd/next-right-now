import { UserSession } from '@/modules/core/userSession/useUserSession';
import * as Sentry from '@sentry/node';

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
