import { filterExternalAbsoluteUrl } from '@/modules/core/js/url';
import Sentry, { configureReq } from '@/modules/core/sentry/sentry';
import { createLogger } from '@unly/utils-simple-logger';
import appendQueryParameter from 'append-query';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const fileLabel = 'api/preview';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Key to use in order to force disable "auto preview mode".
 *
 * If a page is loaded with noAutoPreviewMode=true in query parameter, then it won't try to enable the Preview mode, even if it's disabled.
 *
 * @example ?noAutoPreviewMode=true
 */
export const NO_AUTO_PREVIEW_MODE_KEY = 'noAutoPreviewMode';

type EndpointRequestQuery = {
  /**
   * Whether to start/stop the Preview Mode.
   *
   * @example ?stop=true Will stop the preview mode.
   * @example ?stop=false Will start the preview mode.
   * @default ?stop=false
   */
  stop: string;

  /**
   * Url to redirect to once the preview mode has been started/stopped.
   *
   * @example ?redirectTo=/en
   * @example ?redirectTo=/fr/solutions
   * @default ?redirectTo=/
   */
  redirectTo: string;
}

type EndpointRequest = NextApiRequest & {
  query: EndpointRequestQuery;
};

/**
 * Preview Mode API.
 *
 * Enables and disables preview mode.
 *
 * The official example uses a security token to enable the preview mode, we don't.
 * This is a choice, as we don't need/want to protect our preview mode.
 * Protecting the preview mode makes most sense when this mode can be used in production, so that you can preview content served by Next.js from a CMS/tool of your choice.
 * Thus, it's strongly related to how you're planning on using it, and we decided to keep it simpler, by not using any kind of security.
 *
 * @param req
 * @param res
 * @method GET
 *
 * @see https://nextjs.org/docs/advanced-features/preview-mode#step-1-create-and-access-a-preview-api-route
 * @see https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies
 */
export const preview = async (req: EndpointRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    const {
      stop = 'false',
      redirectTo = '/',
    }: EndpointRequestQuery = req.query;
    // Add NO_AUTO_PREVIEW_MODE_KEY parameter to query, to avoid running into infinite loops if the Preview mode couldn't start
    // Useful when the cookie created by Next.js cannot be written (Incognito mode)
    const safeRedirectUrl = appendQueryParameter(filterExternalAbsoluteUrl(redirectTo as string), `${NO_AUTO_PREVIEW_MODE_KEY}=true`);

    // XXX We don't want to enable preview mode for the production stage, it's only allowed for non-production stages
    //  It's allowed during development for testing purpose
    //  It's allowed during staging because this stage is being used as a "preview environment"
    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
      if (stop === 'true') {
        res.clearPreviewData();

        logger.info('Preview mode stopped');
      } else {
        res.setPreviewData({});

        logger.info('Preview mode enabled');
      }
    } else {
      logger.error('Preview mode is not allowed in production');
      Sentry.captureMessage('Preview mode is not allowed in production', Sentry.Severity.Warning);
    }

    res.writeHead(307, { Location: safeRedirectUrl });
    res.end();
  } catch (e) {
    Sentry.captureException(e);
    logger.error(e.message);

    res.json({
      error: true,
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};

export default preview;
