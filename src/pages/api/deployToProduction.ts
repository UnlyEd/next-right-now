import { createLogger } from '@unly/utils-simple-logger';
import size from 'lodash.size';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import redirect from '../../utils/app/redirect';

import Sentry, { configureReq } from '../../utils/monitoring/sentry';

const fileLabel = 'api/deployToProduction';
const logger = createLogger({
  label: fileLabel,
});

type EndpointRequest = NextApiRequest & {
  query: {
    /**
     * Customer authentication token. (security)
     *
     * Used to make sure "naked" calls to the endpoint won't trigger a production deployment.
     *  E.g: A bot calling "/api/deployToProduction" will not trigger a deployment, because no token is provided.
     *
     * Used to make sure the request is authenticated, by using a token that belongs to the current customer.
     *  E.g: A customer A might call the "/api/deployToProduction" endpoint of another customer B, using the token of customer A will not work.
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
     * Will return early, not waiting for the actual deployment to be done, will not know whether the trigger was successful either.
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
  }
};

const GITHUB_API_BASE_URL = 'https://api.github.com/';
const GITHUB_OWNER_NAME = 'UnlyEd';
const GITHUB_REPO_NAME = 'next-right-now';
const GITHUB_API_LIST_PROJECT_WORKFLOWS = `${GITHUB_API_BASE_URL}repos/${GITHUB_OWNER_NAME}/${GITHUB_REPO_NAME}/actions/workflows`;
const GITHUB_ACTION_WORKFLOW_FILE_PATH = '.github/workflows/deploy-vercel-production.yml';

/**
 * Deploys a new instance of the project to production, for the current customer.
 *
 * Meant to be used from an external web platform (e.g: CMS, Back Office, etc.)
 * to trigger a new production deployment that will replace the currently deployed instance, once deployed.
 *
 * Meant to be used by non-technical people (e.g: customer "editor" role, customer success, customer support, etc.).
 *
 * @param req
 * @param res
 * @method GET
 */
const deployToProduction = async (req: EndpointRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req);

    const {
      customerAuthToken,
      platformReleaseRef = process.env.NEXT_PUBLIC_NRN_PRESET, // XXX Because the NEXT_PUBLIC_NRN_PRESET contains the branch's name, it's suitable as a good default, for NRN. (But, you won't want this default in a private fork)
      redirectTo = '/',
    } = req?.query;
    const forceNoRedirect = !!size(req?.query?.forceNoRedirect);
    const statusCode = forceNoRedirect ? 200 : 302;

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

    // Redirect early
    redirect(res, redirectTo, statusCode);

    logger.debug(`Fetching "${GITHUB_API_LIST_PROJECT_WORKFLOWS}"`);
    fetch(GITHUB_API_LIST_PROJECT_WORKFLOWS)
      .then((plainData) => plainData.json())
      .then((data) => {
        dispatchWorkflow(data, platformReleaseRef);
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

/**
 *
 * @see https://developer.github.com/v3/actions/workflows/#response
 */
type Workflow = {
  id: number;
  node_id: string;
  name: string;
  path: string;
  state: 'active'; // "inactive"?
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string;
  badge_url: string;
}

type WorkflowsList = {
  total_count: number;
  workflows: Workflow[];
}

const dispatchWorkflow = async (workflowsList: WorkflowsList, platformReleaseRef: string) => {
  const [workflowDetails] = workflowsList?.workflows?.filter((workflow) => workflow?.path === GITHUB_ACTION_WORKFLOW_FILE_PATH);

  if (workflowDetails) {
    const body = {
      inputs: {
        customer: process.env.NEXT_PUBLIC_CUSTOMER_REF,
      },
      ref: platformReleaseRef,
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: `token ${process.env.GITHUB_DISPATCH_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify(body),
    };
    const url = `${workflowDetails?.url}/dispatches`;

    Sentry.configureScope((scope): void => {
      scope.setContext('workflowDetails', workflowDetails);
      scope.setContext('requestBody', body);
    });

    logger.debug(`Fetching "${url}" with request body: ${JSON.stringify(body, null, 2)}`);
    const response = await fetch(url, options);

    if (!response?.status.toString().startsWith('2')) {
      // If the response status isn't 2XX, then something wrong happened
      try {
        const result = await response.json();
        const errorMessage = JSON.stringify(result, null, 2);

        Sentry.captureException(new Error(errorMessage));
        logger.error(errorMessage);
      } catch (e) {
        Sentry.captureException(e);
        logger.error(e);

        const result = await response.text();
        Sentry.captureException(result);
        logger.error(result);
      }
    }
  }
};

export default deployToProduction;
