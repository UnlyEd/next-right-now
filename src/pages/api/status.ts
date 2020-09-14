import { createLogger } from '@unly/utils-simple-logger';
import { NextApiRequest, NextApiResponse } from 'next';

import Sentry, { configureReq } from '../../utils/monitoring/sentry';

const fileLabel = 'api/status';
const logger = createLogger({
  label: fileLabel,
});

export const status = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req);

    res.json({
      name: process.env.NEXT_PUBLIC_APP_NAME,
      version: process.env.NEXT_PUBLIC_APP_VERSION,
      buildId: process.env.NEXT_PUBLIC_APP_BUILD_ID,
      release: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
      nodejs: process.version,
      nodejsAWS: process.env.AWS_EXECUTION_ENV,
      regionNOW: process.env.NOW_REGION,
      regionAWS: process.env.AWS_REGION,
      timezone: process.env.TZ,
      memory: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      environment: process.env.NODE_ENV,
      stage: process.env.NEXT_PUBLIC_APP_STAGE,
      preset: process.env.NEXT_PUBLIC_NRN_PRESET,
      buildTime: process.env.NEXT_PUBLIC_BUILD_TIME,
      buildTimestamp: process.env.NEXT_PUBLIC_BUILD_TIMESTAMP,
      customer: process.env.NEXT_PUBLIC_CUSTOMER_REF,
    });
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

export default status;
