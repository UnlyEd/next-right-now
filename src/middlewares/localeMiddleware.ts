import { createLogger } from '@unly/utils-simple-logger';
import { allowedLocales } from '../i18nConfig';
import { acceptLanguageHeaderLookup, DEFAULT_LANG } from '../utils/i18n';
import redirect from '../utils/redirect';

const fileLabel = 'utils/localeMiddleware';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Detects the browser locale and redirects to the requested page
 * Only used when the locale isn't specified in the url (called through /api/autoRedirectToLocalisedPage)
 *
 * @example / => /fr
 * @example /terms => /fr/terms
 *
 * @param req
 * @param res
 */
export const localeMiddleware = (req, res): void => {
  logger.debug('Detecting browser locale...');
  const detections: string[] | undefined = acceptLanguageHeaderLookup(req);
  let localeFound; // Will contain the most preferred browser locale (e.g: fr-FR, fr, en-US, en, etc.)

  if (detections && detections.length) {
    detections.forEach((language) => {
      if (localeFound || typeof language !== 'string') return;

      const lookedUpLocale = allowedLocales.find(
        (allowedLocale) => allowedLocale.name === language,
      );

      if (lookedUpLocale) {
        localeFound = lookedUpLocale.lang;
      }
    });
  }
  logger.debug(`Locale resolved using browser headers: "${localeFound}", with browser locales: [${detections.join(', ')}]`);

  if (!localeFound) {
    localeFound = DEFAULT_LANG;
  }

  logger.debug(`Locale applied: "${localeFound}", for url "${req.url}"`);

  const redirectStatusCode = 302;
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

  return redirect(res, redirectStatusCode, redirectTo);
};

export default localeMiddleware;
