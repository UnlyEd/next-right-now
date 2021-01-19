import { createLogger } from '@unly/utils-simple-logger';
import { WorkflowsAPIResponse } from './types/WorkflowsAPIResponse';
import Sentry, { ALERT_TYPES } from '../sentry/sentry';

const fileLabel = 'modules/core/githubActions/dispatchWorkflow';
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
  try {
    const [workflowDetails] = workflowsList?.workflows?.filter((workflow) => workflow?.path === workflowFilePath);

    if (workflowDetails) {
      /**
       * Creates a workflow dispatch event.
       *
       * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#create-a-workflow-dispatch-event
       */
      const url = `${workflowDetails?.url}/dispatches`;
      const body = {
        inputs: {
          customer: process.env.NEXT_PUBLIC_CUSTOMER_REF,
        },
        ref: platformReleaseRef,
      };
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(body),
      };

      if (process.env.GITHUB_DISPATCH_TOKEN) {
        // Authorization token, required if the repository is private, unnecessary if the repo is public
        options.headers['Authorization'] = `token ${process.env.GITHUB_DISPATCH_TOKEN}`;
      }

      Sentry.configureScope((scope): void => {
        scope.setExtra('workflowFilePath', workflowFilePath);
        scope.setExtra('workflowDispatchRequestUrl', url);
        scope.setExtra('platformReleaseRef', platformReleaseRef);
        scope.setContext('workflowDispatchRequestBody', body);
        scope.setContext('workflowDetails', workflowDetails);
      });

      Sentry.withScope((scope): void => {
        scope.setTag('alertType', ALERT_TYPES.VERCEL_DEPLOYMENT_TRIGGER_ATTEMPT);

        Sentry.captureEvent({
          message: `Attempting to trigger a Vercel deployment using "${workflowFilePath}" with version "${platformReleaseRef}".`,
          level: Sentry.Severity.Log,
        });
      });

      logger.debug(`Fetching "${url}", using workflow path: "${workflowFilePath}", with request body: ${JSON.stringify(body, null, 2)}`);
      const response = await fetch(url, options);

      // If the response status isn't 2XX, then something wrong happened
      if (!response?.status?.toString()?.startsWith('2')) {
        let errorMessage;

        try {
          // Response might contain JSON or plain text, attempt to stringify JSON, will fail if no valid JSON found
          const result = await response.json();
          errorMessage = JSON.stringify(result, null, 2);

          Sentry.captureException(new Error(errorMessage));
          logger.error(errorMessage);
        } catch (e) {
          // Stringifying JSON failed, attempt to retrieve the plain text error message
          Sentry.captureException(e);
          logger.error(e);

          errorMessage = await response.text();
          Sentry.captureException(errorMessage);
          logger.error(errorMessage);
        } finally {
          Sentry.withScope((scope): void => {
            scope.setTag('alertType', ALERT_TYPES.VERCEL_DEPLOYMENT_TRIGGER_ATTEMPT_FAILED);

            Sentry.captureEvent({
              message: `Failed to trigger a Vercel deployment using "${workflowFilePath}" with version "${platformReleaseRef}". Error: "${errorMessage}"`,
              level: Sentry.Severity.Error,
            });
          });
        }
      } else {
        Sentry.withScope((scope): void => {
          scope.setTag('alertType', ALERT_TYPES.VERCEL_DEPLOYMENT_TRIGGER_ATTEMPT_SUCCEEDED);

          Sentry.captureEvent({
            message: `Successfully triggered a Vercel deployment using "${workflowFilePath}" with version "${platformReleaseRef}".`,
            level: Sentry.Severity.Log,
          });
        });
      }
    } else {
      const errorMessage = `No GitHub Actions workflow could be found for file path: "${workflowFilePath}"`;
      Sentry.captureException(new Error(errorMessage));
      logger.error(errorMessage);
    }
  } catch (e) {
    Sentry.captureException(e);
    logger.error(e);
  }
};

export default dispatchWorkflow;
