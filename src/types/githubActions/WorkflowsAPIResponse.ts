import { GHAWorkflow } from "./GHAWorkflow";

/**
 * GitHub Actions Workflows API response.
 *
 * @see https://developer.github.com/v3/actions/workflows/#response
 */
export type WorkflowsAPIResponse = {
  total_count: number;
  workflows: GHAWorkflow[];
}
