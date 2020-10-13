import { createLogger } from '@unly/utils-simple-logger';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import Sentry, { configureReq } from '../../utils/monitoring/sentry';

const fileLabel = 'api/error';
const logger = createLogger({
  label: fileLabel,
});

export const error = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req);

    throw Error('Fake error - Sentry test from /api/error');
  } catch (e) {
    logger.error(e.message);

    Sentry.withScope((scope): void => {
      scope.setTag('fileLabel', fileLabel);
      Sentry.captureException(e);
    });

    res.json({
      error: true,
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};

export default error;
