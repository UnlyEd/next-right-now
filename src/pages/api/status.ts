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

const fileLabel = 'api/status';
const logger = createLogger({
  fileLabel,
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

    await logEvent(AMPLITUDE_EVENTS.API_INVOKED, null, {
      apiEndpoint: AMPLITUDE_API_ENDPOINTS.STATUS,
    });

    res.json({
      appStage: process.env.NEXT_PUBLIC_APP_STAGE,
      appName: process.env.NEXT_PUBLIC_APP_NAME,
      appRelease: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
      appBuildTime: process.env.NEXT_PUBLIC_APP_BUILD_TIME,
      appBuildTimeISO: (new Date(process.env.NEXT_PUBLIC_APP_BUILD_TIME || null)).toISOString(),
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
      GIT_COMMIT_TAGS: process.env.GIT_COMMIT_TAGS,
      NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
      IS_SERVER_INITIAL_BUILD: process.env.IS_SERVER_INITIAL_BUILD, // Shouldn't be displayed, because should always be undefined in APIs
    });
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

export default status;
