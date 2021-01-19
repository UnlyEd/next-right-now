import { createLogger } from '@unly/utils-simple-logger';
import { GITHUB_API_BASE_URL, GITHUB_OWNER_NAME, GITHUB_REPO_NAME } from '@/app/constants';
import { WorkflowsAPIResponse } from './types/WorkflowsAPIResponse';
import Sentry from '../sentry/sentry';
import dispatchWorkflow from './dispatchWorkflow';

const fileLabel = 'modules/core/githubActions/dispatchWorkflowByPath';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Endpoint to list the workflows of a repository.
 * Public if the repository is public.
 *
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#list-repository-workflows
 */
const GITHUB_API_LIST_PROJECT_WORKFLOWS = `${GITHUB_API_BASE_URL}/repos/${GITHUB_OWNER_NAME}/${GITHUB_REPO_NAME}/actions/workflows`;

type GitHubAPIError = {
  message?: string;
  documentation_url: string;
}

/**
 * Fetches all GitHub Actions workflows then dispatches the workflow referenced by "workflowFilePath".
 *
 * @param platformReleaseRef
 * @param workflowFilePath
 */
export const dispatchWorkflowByPath = async (platformReleaseRef: string, workflowFilePath: string): Promise<void> => {
  try {
    logger.debug(`Fetching "${GITHUB_API_LIST_PROJECT_WORKFLOWS}"`);

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    };

    if (process.env.GITHUB_DISPATCH_TOKEN) {
      // Authorization token, required if the repository is private, unnecessary if the repo is public
      options.headers['Authorization'] = `token ${process.env.GITHUB_DISPATCH_TOKEN}`;
    }

    const response = await fetch(GITHUB_API_LIST_PROJECT_WORKFLOWS, options);
    const results: WorkflowsAPIResponse | GitHubAPIError = await response.json();

    if (response.status !== 200) {
      // Something wrong happened
      const error: GitHubAPIError = results as GitHubAPIError;
      const message = error?.message + (error?.documentation_url ? ` - See ${error?.documentation_url}` : '');

      logger.error(message);
      Sentry.withScope((scope): void => {
        scope.setExtra('response (raw)', response);
        scope.setContext('results (parsed)', results);
        Sentry.captureException(message);
      });

      return Promise.resolve();
    } else {
      await dispatchWorkflow(results as WorkflowsAPIResponse, platformReleaseRef, workflowFilePath);
    }

  } catch (e) {
    Sentry.captureException(new Error(e));
    logger.error(e);
  }
};

export default dispatchWorkflowByPath;
