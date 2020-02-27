import { NowRequest, NowResponse } from '@now/node';
import { createLogger } from '@unly/utils-simple-logger';

import Sentry, { configureReq } from '../../utils/sentry';

const fileLabel = 'api/error';
const logger = createLogger({
  label: fileLabel,
});

export const error = async (req: NowRequest, res: NowResponse): Promise<void> => {
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
      message: process.env.APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};

export default error;
