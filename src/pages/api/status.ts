import { NowRequest, NowResponse } from '@now/node';
import { createLogger } from '@unly/utils-simple-logger';

import Sentry, { configureReq } from '../../utils/sentry';

const fileLabel = 'api/status';
const logger = createLogger({
  label: fileLabel,
});

export const status = async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    configureReq(req);

    res.json({
      nodejs: process.version,
      nodejsAWS: process.env.AWS_EXECUTION_ENV,
      regionNOW: process.env.NOW_REGION,
      regionAWS: process.env.AWS_REGION,
      timezone: process.env.TZ,
      memory: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      environment: process.env.NODE_ENV,
      stage: process.env.APP_STAGE,
      buildTime: process.env.BUILD_TIME,
      buildTimestamp: process.env.BUILD_TIMESTAMP,
      customer: process.env.CUSTOMER_REF,
    });
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

export default status;
