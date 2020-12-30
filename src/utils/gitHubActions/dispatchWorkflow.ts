import { createLogger } from '@unly/utils-simple-logger';
import { WorkflowsAPIResponse } from '../../types/githubActions/WorkflowsAPIResponse';
import Sentry, { ALERT_TYPES } from '../monitoring/sentry';

const fileLabel = 'utils/githubActions/dispatchWorkflow';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Dispatches a GitHub Actions workflow.
 *
 * Uses "workflowFilePath" to resolve which workflow to trigger.
 *
 * @param workflowsList
 * @param platformReleaseRef
 * @param workflowFilePath
 */
export const dispatchWorkflow = async (workflowsList: WorkflowsAPIResponse, platformReleaseRef: string, workflowFilePath: string): Promise<void> => {
  const [workflowDetails] = workflowsList?.workflows?.filter((workflow) => workflow?.path === workflowFilePath);

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
      scope.setExtra('workflowFilePath', workflowFilePath);
      scope.setExtra('workflowDispatchRequestUrl', url);
      scope.setContext('workflowDispatchRequestBody', body);
      scope.setContext('workflowDetails', workflowDetails);
    });

    Sentry.withScope((scope): void => {
      scope.setTag('alertType', ALERT_TYPES.VERCEL_DEPLOYMENT_TRIGGERED);

      Sentry.captureEvent({
        message: 'Triggering Vercel deployment.',
        level: Sentry.Severity.Log,
      });
    });

    logger.debug(`Fetching "${url}", using workflow path: "${workflowFilePath}", with request body: ${JSON.stringify(body, null, 2)}`);
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
  } else {
    const errorMessage = `No GitHub Actions workflow could be found for file path: "${workflowFilePath}"`;
    Sentry.captureException(new Error(errorMessage));
    logger.error(errorMessage);
  }
};

export default dispatchWorkflow;
