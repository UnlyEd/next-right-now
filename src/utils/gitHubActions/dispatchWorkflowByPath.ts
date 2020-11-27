import { createLogger } from '@unly/utils-simple-logger';
import {
  GITHUB_API_BASE_URL,
  GITHUB_OWNER_NAME,
  GITHUB_REPO_NAME,
} from '../../constants';
import { WorkflowsAPIResponse } from '../../types/githubActions/WorkflowsAPIResponse';
import dispatchWorkflow from './dispatchWorkflow';

const fileLabel = 'utils/githubActions/dispatchWorkflowByPath';
const logger = createLogger({
  label: fileLabel,
});

const GITHUB_API_LIST_PROJECT_WORKFLOWS = `${GITHUB_API_BASE_URL}repos/${GITHUB_OWNER_NAME}/${GITHUB_REPO_NAME}/actions/workflows`;

/**
 * Fetches all GitHub Actions workflows then dispatches the workflow referenced by "workflowFilePath".
 *
 * @param platformReleaseRef
 * @param workflowFilePath
 */
export const dispatchWorkflowByPath = async (platformReleaseRef: string, workflowFilePath: string): Promise<void> => {
  try {
    logger.debug(`Fetching "${GITHUB_API_LIST_PROJECT_WORKFLOWS}"`);
    const response = await fetch(GITHUB_API_LIST_PROJECT_WORKFLOWS);
    const results: WorkflowsAPIResponse = await response.json();

    await dispatchWorkflow(results, platformReleaseRef, workflowFilePath);
  } catch (e) {

  }
};

export default dispatchWorkflowByPath;
