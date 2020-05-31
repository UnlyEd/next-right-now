import { createLogger } from '@unly/utils-simple-logger';
import { NextApiRequest, NextApiResponse } from 'next';

import { PreviewData } from '../../types/nextjs/PreviewData';
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

    // XXX You may want to enable preview mode during non-production stages only
    // if (process.env.APP_STAGE !== 'production') {
    if (stop === 'true') {
      res.clearPreviewData();

      logger.info('Preview mode stopped');
    } else {
      res.setPreviewData({});

      logger.info('Preview mode enabled');
    }
    // } else {
    //   logger.error('Preview mode is not allowed in production');
    //   Sentry.captureMessage('Preview mode is not allowed in production', Sentry.Severity.Warning);
    // }

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
      message: process.env.APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};

export default preview;
