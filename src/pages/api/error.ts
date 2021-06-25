import { logEvent } from '@/modules/core/amplitude/amplitudeServerClient';
import {
  AMPLITUDE_API_ENDPOINTS,
  AMPLITUDE_EVENTS,
} from '@/modules/core/amplitude/events';
import { createLogger } from '@/modules/core/logging/logger';
import { configureReq } from '@/modules/core/sentry/server';
import { flushSafe } from '@/modules/core/sentry/universal';
import * as Sentry from '@sentry/node';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const fileLabel = 'api/error';
const logger = createLogger({
  fileLabel,
});

/**
 * Error endpoint - Throws an error upon being called.
 *
 * Mock API endpoint whose sole purpose is to throw an error, nothing else.
 * Meant to be used to check whether monitoring (Sentry) works as expected.
 *
 * @param req
 * @param res
 * @method GET
 */
export const error = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    await logEvent(AMPLITUDE_EVENTS.API_INVOKED, null, {
      apiEndpoint: AMPLITUDE_API_ENDPOINTS.ERROR,
    });

    throw Error('Fake error - Sentry test from /api/error');
  } catch (e) {
    Sentry.captureException(e);
    logger.error(e.message);

    await flushSafe();

    res.json({
      error: true,
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};

export default error;
