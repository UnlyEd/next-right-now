import { convertRequestBodyToJSObject } from '@/modules/core/api/convertRequestBodyToJSObject';
import Sentry, {
  ALERT_TYPES,
  configureReq,
} from '@/modules/core/sentry/sentry';
import { createLogger } from '@unly/utils-simple-logger';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const fileLabel = 'api/webhooks/deploymentCompleted';
const logger = createLogger({
  label: fileLabel,
});

type EndpointRequestBody = {
  /**
   * Value that was typed in the GHA web page, as "Customer to deploy".
   *
   * If this value is defined, it means the deployment was manually triggered through the Github Actions page (by a human being).
   *
   * @example customer1
   * @see https://github.com/UnlyEd/next-right-now/actions
   */
  MANUAL_TRIGGER_CUSTOMER: string;

  /**
   * Ref of the customer that was actually deployed.
   *
   * Computed value at runtime (during CI), depending on MANUAL_TRIGGER_CUSTOMER.
   * Fallback to the default customer (defined in the vercel.json file).
   *
   * @example customer1
   */
  CUSTOMER_REF?: string;

  /**
   * Stage (production|staging) used for the deployment.
   *
   * @example production
   * @example staging
   */
  STAGE?: string;

  /**
   * SHA of the git commit used as deployment ref.
   *
   * Resolved by GitHub Action automatically, depending on which GIT_COMMIT_REF was used.
   *
   * @example 23ad5f7cc9a4b6c35e9c8d796fea13dcb3a08238
   */
  GIT_COMMIT_SHA?: string;

  /**
   * Ref (branch|tag) that was used as deployment ref.
   *
   * When the deployment was performed manually, it corresponds to the ref selected in the "Use workflow from" list (UI).
   * When the deployment was performed automatically (git push), it corresponds to the branch that was being used.
   *
   * @example refs/heads/master
   */
  GIT_COMMIT_REF?: string;

  /**
   * All tags associated with the git commit.
   *
   * Will contain the version number that was automatically assigned with the commit.
   *
   * @example v4.0.34-custom-webhooks-in-ci
   */
  GIT_COMMIT_TAGS?: string;
};

type EndpointRequest = NextApiRequest & {
  body: EndpointRequestBody;
};

/**
 * Webhook callback url, called automatically when a Vercel deployment has reached "READY" state.
 *
 * The call is performed by the GitHub Action "send-webhook-callback-once-deployment-ready" job.
 *
 * XXX This endpoint is an example and doesn't do anything in particular, it receives data upon a Vercel deployment and does nothing with it.
 *  It's up to you to decide how you'd use it.
 *
 * @param req
 * @param res
 * @method POST
 */
export const deploymentCompleted = async (req: EndpointRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    // eslint-disable-next-line no-console
    console.log(`Received body of type "${typeof req?.body}":`);
    // eslint-disable-next-line no-console
    console.log(req?.body);

    const parsedBody = convertRequestBodyToJSObject(req) as EndpointRequestBody;

    // eslint-disable-next-line no-console
    console.debug('body (parsed)', parsedBody);

    Sentry.withScope((scope): void => {
      scope.setTag('alertType', ALERT_TYPES.VERCEL_DEPLOYMENT_COMPLETED);

      Sentry.captureEvent({
        message: `[deploymentCompleted] Received webhook callback.`,
        level: Sentry.Severity.Log,
      });
    });

    res.status(200);
    res.end();
  } catch (e) {
    Sentry.captureException(e);
    logger.error(e.message);

    res.status(500);
    res.end();
  }
};

export default deploymentCompleted;
