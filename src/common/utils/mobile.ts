import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';

const logger = createLogger({
  label: 'utils/mobile',
});

/**
 * Returns whether running on a mobile device
 *
 * @return {boolean}
 */
export const isMobileDevice = (): boolean => {
  if (isBrowser()) {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } catch (e) {
      logger.error(e.message);
      Sentry.captureException(e);
    }
  } else {
    return false;
  }
};
