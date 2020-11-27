import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import localeMiddleware from '../../middlewares/localeMiddleware';

/**
 * I18n language/locale auto-detection.
 *
 * Meant to be used to redirect a non i18n-page towards its i18n page counterpart.
 * Used automatically by Next.js "rewrites" rules (next.config.js) that match the pattern.
 *
 * @param req
 * @param res
 * @method GET
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => localeMiddleware(req, res);

