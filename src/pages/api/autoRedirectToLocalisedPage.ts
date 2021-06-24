import { logEvent } from '@/modules/core/amplitude/amplitudeServerClient';
import {
  AMPLITUDE_API_ENDPOINTS,
  AMPLITUDE_EVENTS,
} from '@/modules/core/amplitude/events';
import localeMiddleware from '@/modules/core/i18n/middlewares/localeMiddleware';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

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
const autoRedirectToLocalisedPage = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await logEvent(AMPLITUDE_EVENTS.API_INVOKED, null, {
    apiEndpoint: AMPLITUDE_API_ENDPOINTS.AUTO_REDIRECT_TO_LOCALISED_PAGE,
  });

  return await localeMiddleware(req, res);
};

export default autoRedirectToLocalisedPage;

