import Sentry, { configureReq } from '@/modules/core/sentry/sentry';
import { createLogger } from '@unly/utils-simple-logger';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const fileLabel = 'api/error';
const logger = createLogger({
  label: fileLabel,
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

    throw Error('Fake error - Sentry test from /api/error');
  } catch (e) {
    Sentry.captureException(e);
    logger.error(e.message);

    res.json({
      error: true,
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};

export default error;
