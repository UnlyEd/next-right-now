import redirect from '@/common/utils/redirect';
import dispatchWorkflowByPath from '@/modules/core/githubActions/dispatchWorkflowByPath';
import Sentry, {
  ALERT_TYPES,
  configureReq,
} from '@/modules/core/sentry/sentry';
import { createLogger } from '@unly/utils-simple-logger';
import size from 'lodash.size';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const fileLabel = 'api/startVercelDeployment';
const logger = createLogger({
  label: fileLabel,
});

type EndpointRequestQuery = {
  /**
   * Customer authentication token. (security)
   *
   * Used to make sure "naked" calls to the endpoint won't trigger a production deployment.
   *  E.g: A bot calling "/api/startVercelDeployment" will not trigger a deployment, because no token is provided.
   *
   * Used to make sure the request is authenticated, by using a token that belongs to the current customer.
   *  E.g: A customer A might call the "/api/startVercelDeployment" endpoint of another customer B, using the token of customer A will not work.
   *
   * @example ?customerAuthToken=customer1 Token for customer1
   * @example ?customerAuthToken=customer2 Token for customer2
   */
  customerAuthToken: string;

  /**
   * Release reference of the platform.
   * Basically, a Git commit hash, branch name, or tag.
   *
   * The ref used will be used to locate what version of the source code should be used for the deployment.
   *
   * XXX By design, should use the same ref as the one used by the staging environment, by default.
   *  This way, a customer who deploys a new version always use the same source code version as the staging version they have tested upon.
   *
   * @example ?platformReleaseRef=main
   * @example ?platformReleaseRef=nrn-v2-mst-aptd-gcms-lcz-sty-c1
   * @example ?platformReleaseRef=my-git-branch
   * @example ?platformReleaseRef=my-git-tag
   * @example ?platformReleaseRef=252b76314184fbeaa236c336c70ea42ca89e0e87
   */
  platformReleaseRef?: string;

  /**
   * Url to redirect to, once the deployment has been triggered.
   *
   * Will not wait for the actual deployment to be done, will not return whether the trigger was successful either.
   *
   * XXX We can't wait for the deployment to be performed by Vercel, as it'd definitely be longer than the maximum allowed serverless function running time (10-60sec depending on your Vercel plan).
   *  Thus, we redirect as early as possible and don't wait for any kind of feedback.
   *
   * XXX You'll need to implement your own business logic if you want to subscribe to the GitHub Action.
   *  Implementing a dedicated GitHub Action workflow, which in turn will calls your own API to update the status of each steps might be the way to go.
   *
   * @default "/"
   * @example ?redirectTo=/
   * @example ?redirectTo=https://google.com
   */
  redirectTo?: string;

  /**
   * Force option to avoid being redirected.
   *
   * Meant to be used when debugging, to avoid being redirected all the time, but stay on the page instead.
   * XXX Using any non-empty value will enable this option. (prefer using "true")
   *
   * @example ?forceNoRedirect=true Will not redirect
   * @example ?forceNoRedirect=1 Will not redirect
   * @example ?forceNoRedirect=false Will not redirect
   */
  forceNoRedirect?: string;
};

type EndpointRequest = NextApiRequest & {
  query: EndpointRequestQuery;
};

const GITHUB_ACTION_WORKFLOW_FILE_PATH_PRODUCTION = '.github/workflows/deploy-vercel-production.yml';
const GITHUB_ACTION_WORKFLOW_FILE_PATH_STAGING = '.github/workflows/deploy-vercel-staging.yml';

/**
 * Starts a new Vercel deployment, for the current customer.
 *
 * Meant to be used from an external web platform (e.g: CMS, Back Office, etc.)
 * to trigger a new production deployment that will replace the currently deployed instance, once deployed.
 *
 * Endpoint meant to be integrated into 3rd party tools, so it might be used by non-technical people.
 * (e.g: customer "editor" role, customer success, customer support, etc.)
 *
 * XXX Technical staff can use a similar feature by running the GitHub Actions directly through the GitHub UI, and don't necessarily need to use this endpoint.
 *  (e.g: https://github.com/UnlyEd/next-right-now/actions)
 *
 * @example http://localhost:8888/api/startVercelDeployment?forceNoRedirect=true&customerAuthToken=customer1 For easier debug, using valid token for customer1
 * @example http://localhost:8888/api/startVercelDeployment?forceNoRedirect=true&customerAuthToken=customer2 For easier debug, using valid token for customer2
 *
 * @param req
 * @param res
 * @method GET
 */
const startVercelDeployment = async (req: EndpointRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    Sentry.withScope((scope): void => {
      scope.setTag('alertType', ALERT_TYPES.VERCEL_DEPLOYMENT_INVOKED);

      Sentry.captureEvent({
        message: 'API endpoint "startVercelDeployment" invoked.',
        level: Sentry.Severity.Log,
      });
    });

    const {
      customerAuthToken,
      platformReleaseRef = process.env.NEXT_PUBLIC_NRN_PRESET, // XXX Because the NEXT_PUBLIC_NRN_PRESET contains the branch's name, it's suitable as a good default, for NRN. (But, you won't want this default in a private fork)
      redirectTo = '/',
    }: EndpointRequestQuery = req?.query;
    const forceNoRedirect = !!size(req?.query?.forceNoRedirect); // Any non-empty value is considered as true
    const statusCode = forceNoRedirect ? 200 : 302; // Using a statusCode of 200 will break the redirection, making it ineffective

    // XXX For the sake of simplicity, our "customerAuthToken" is the same as the customer ref.
    //  This is better than using no token at all, but it's still a rather weak security check.
    //  Feel free to implement your own authentication protocol.
    if (customerAuthToken !== process.env.NEXT_PUBLIC_CUSTOMER_REF) {
      const errorMessage = `Query parameter "customerAuthToken" is not valid (using "${customerAuthToken}"). Access refused.`;
      Sentry.captureException(new Error(errorMessage));
      logger.error(errorMessage);

      return redirect(res, redirectTo, statusCode);
    }

    if (!process.env.GITHUB_DISPATCH_TOKEN) {
      let errorMessage;

      switch (process.env.NEXT_PUBLIC_APP_STAGE) {
        case 'development':
          errorMessage = `Env variable "GITHUB_DISPATCH_TOKEN" is not defined. Please define it in your ".env.local" file.`;
          break;
        case 'staging':
        case 'production':
          errorMessage = `Env variable "GITHUB_DISPATCH_TOKEN" is not defined. Please create a Vercel secret using "vercel secrets add nrn-github-dispatch-token YOUR_TOKEN".`;
          break;
      }
      Sentry.captureException(new Error(errorMessage));
      logger.error(errorMessage);

      return redirect(res, redirectTo, statusCode);
    }

    if (!platformReleaseRef) {
      const errorMessage = `Query parameter "platformReleaseRef" is not defined.`;
      Sentry.captureException(new Error(errorMessage));
      logger.error(errorMessage);

      return redirect(res, redirectTo, statusCode);
    }

    // Dispatch the GitHub Actions workflow, which will then trigger the Vercel deployment
    await dispatchWorkflowByPath(platformReleaseRef, process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? GITHUB_ACTION_WORKFLOW_FILE_PATH_PRODUCTION : GITHUB_ACTION_WORKFLOW_FILE_PATH_STAGING);

    // Redirect the end-user
    redirect(res, redirectTo, statusCode);
  } catch (e) {
    Sentry.captureException(e);
    logger.error(e.message);

    res.json({
      error: true,
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};

export default startVercelDeployment;
