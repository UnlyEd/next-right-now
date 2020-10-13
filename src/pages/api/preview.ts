import { createLogger } from '@unly/utils-simple-logger';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { filterExternalAbsoluteUrl } from '../../utils/js/url';
import Sentry, { configureReq } from '../../utils/monitoring/sentry';

const fileLabel = 'api/preview';
const logger = createLogger({
  label: fileLabel,
});

type PreviewModeAPIQuery = {
  stop: string;
  redirectTo: string;
}

/**
 * Preview Mode API
 *
 * Enables and disables preview mode
 *
 * The official example uses a security token to enable the preview mode, we don't.
 * This is a choice, as we don't need/want to protect our preview mode.
 * Protecting the preview mode makes most sense when this mode can be used in production, so that you can preview content served by Next.js from a CMS/tool of your choice.
 * Thus, it's strongly related to how you're planning on using it, and we decided to keep it simpler, by not using any kind of security.
 *
 * @param req
 * @param res
 *
 * @see https://nextjs.org/docs/advanced-features/preview-mode#step-1-create-and-access-a-preview-api-route
 * @see https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies
 */
export const preview = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req);

    const {
      stop = 'false',
      redirectTo = '/',
    }: PreviewModeAPIQuery = req.query as PreviewModeAPIQuery;
    const safeRedirectUrl = filterExternalAbsoluteUrl(redirectTo as string);

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

export default preview;
