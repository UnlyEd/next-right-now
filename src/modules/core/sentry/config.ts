/**
 * Alert types, meant to be assigned to "alertType" tag when reporting a message/exception/event to Sentry.
 *
 * Then, you can configure your own Sentry Alerts using the "alertType" tag and perform specific data processing.
 * @example If the event's tags match "alertType equals 'vercel-deployment-invoked'", then send it to a dedicated Slack channel.
 *
 * @see https://sentry.io/organizations/unly/alerts/next-right-now/new/
 */
export const ALERT_TYPES = {
  VERCEL_DEPLOYMENT_INVOKED: 'vercel-deployment-invoked',
  VERCEL_DEPLOYMENT_TRIGGER_ATTEMPT: 'vercel-deployment-trigger-attempt',
  VERCEL_DEPLOYMENT_TRIGGER_ATTEMPT_FAILED: 'vercel-deployment-trigger-attempt-failed',
  VERCEL_DEPLOYMENT_TRIGGER_ATTEMPT_SUCCEEDED: 'vercel-deployment-trigger-attempt-succeeded',
  VERCEL_DEPLOYMENT_COMPLETED: 'vercel-deployment-completed',
};

/**
 * Maximum time in ms the Sentry client (browser or server) should wait.
 *
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/_error.js#L45
 * @see https://vercel.com/docs/platform/limits#streaming-responses
 */
export const FLUSH_TIMEOUT = 2000;
