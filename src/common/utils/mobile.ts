import { createLogger } from '@/modules/core/logging/logger';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';

const fileLabel = 'common/utils/mobile';
const logger = createLogger({
  fileLabel,
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
