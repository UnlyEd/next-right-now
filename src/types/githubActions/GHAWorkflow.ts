/**
 * GitHub Actions Workflow.
 *
 * Represents a single Workflow.
 *
 * @see https://developer.github.com/v3/actions/workflows/#response
 */
export type GHAWorkflow = {
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
