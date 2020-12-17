import { createLogger } from '@unly/utils-simple-logger';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import Sentry, { configureReq } from '../../utils/monitoring/sentry';

const fileLabel = 'api/status';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Status endpoint - Prints the "status" of the deployed instance.
 *
 * Prints useful information regarding the deployment.
 * Meant to be used for debugging purposes.
 * Can also be used as "ping endpoint" to make sure the app is online.
 *
 * @param req
 * @param res
 * @method GET
 */
export const status = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    res.json({
      appStage: process.env.NEXT_PUBLIC_APP_STAGE,
      appName: process.env.NEXT_PUBLIC_APP_NAME,
      appVersion: process.env.NEXT_PUBLIC_APP_VERSION,
      appRelease: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
      appBuildTime: process.env.NEXT_PUBLIC_APP_BUILD_TIME,
      appBuildTimestamp: process.env.NEXT_PUBLIC_APP_BUILD_TIMESTAMP,
      appBuildId: process.env.NEXT_PUBLIC_APP_BUILD_ID,
      nodejs: process.version,
      nodejsAWS: process.env.AWS_EXECUTION_ENV,
      regionVERCEL: process.env.VERCEL_REGION,
      regionAWS: process.env.AWS_REGION,
      timezone: process.env.TZ,
      memory: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      environment: process.env.NODE_ENV,
      preset: process.env.NEXT_PUBLIC_NRN_PRESET,
      customerRef: process.env.NEXT_PUBLIC_CUSTOMER_REF,
      GIT_COMMIT_SHA: process.env.GIT_COMMIT_SHA,
      GIT_COMMIT_REF: process.env.GIT_COMMIT_REF,
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
