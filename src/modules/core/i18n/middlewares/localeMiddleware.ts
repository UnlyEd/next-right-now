import {
  StaticCustomer,
  StaticDataset,
} from '@/modules/core/gql/fetchGraphcmsDataset';
import { getStaticGraphcmsDataset } from '@/modules/core/gql/getGraphcmsDataset';
import { createLogger } from '@/modules/core/logging/logger';
import redirect from '@/utils/redirect';
import includes from 'lodash.includes';
import size from 'lodash.size';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import {
  acceptLanguageHeaderLookup,
  DEFAULT_LOCALE,
} from '../i18n';

const fileLabel = 'modules/core/i18n/localeMiddleware';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
});

/**
 * Detects the browser locale and redirects to the requested page.
 * Only used when the locale isn't specified in the url (called through /api/autoRedirectToLocalisedPage).
 *
 * @example / => /fr
 * @example /terms => /fr/terms
 *
 * @param req
 * @param res
 */
export const localeMiddleware = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  logger.debug('Detecting browser locale...');
  const detections: string[] = acceptLanguageHeaderLookup(req) || [];
  let localeFound; // Will contain the most preferred browser locale (e.g: fr-FR, fr, en-US, en, etc.)
  const staticDataset: StaticDataset = await getStaticGraphcmsDataset();
  const staticCustomer: StaticCustomer = staticDataset?.customer;

  if (detections && !!size(detections)) {
    detections.forEach((language) => {
      if (localeFound || typeof language !== 'string') return;

      if (includes(staticCustomer?.availableLanguages, language)) {
        localeFound = language;
      }
    });

    logger.debug(`Locale resolved using browser headers: "${localeFound}", with browser locales: [${detections.join(', ')}]`);
  } else {
    logger.debug(`Couldn't detect any locales in "accept-language" header. (This will happens with robots, e.g: Cypress E2E)`);
  }

  if (!localeFound) {
    localeFound = staticCustomer?.availableLanguages?.[0] || DEFAULT_LOCALE;
  }

  logger.debug(`Locale applied: "${localeFound}", for url "${req.url}"`);

  let redirectTo: string;

  if (req.url === '/' || req.url === '/api/autoRedirectToLocalisedPage') {
    redirectTo = `/${localeFound}`;
  } else if (req.url.charAt(0) === '/' && req.url.charAt(1) === '?') {
    // XXX Other routes (e.g: "/fr/terms?utm=source", "/terms?utm=source") are properly handled (they don't need custom routing/rewrites)
    redirectTo = `/${localeFound}${req.url.slice(1)}`;
  } else {
    redirectTo = `/${localeFound}${req.url}`;
  }

  logger.debug(`Redirecting to "${redirectTo}" ...`);

  return redirect(res, redirectTo);
};

export default localeMiddleware;
