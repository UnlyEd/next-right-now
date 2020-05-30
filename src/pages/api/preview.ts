import { NowRequest, NowResponse } from '@now/node';
import { createLogger } from '@unly/utils-simple-logger';

import Sentry, { configureReq } from '../../utils/monitoring/sentry';

const fileLabel = 'api/preview';
const logger = createLogger({
  label: fileLabel,
});

export const error = async (req: NowRequest, res: NowResponse & { setPreviewData: (any) => void }): Promise<void> => {
  try {
    configureReq(req);

    if (process.env.APP_STAGE !== 'production') {
      res.setPreviewData({});

      console.log('Preview mode enabled'); // eslint-disable-line no-console
    } else {
      console.error('Preview mode is not allowed in production'); // eslint-disable-line no-console
    }

    res.writeHead(307, { Location: '/' });
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

export default error;
