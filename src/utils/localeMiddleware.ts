import headerLanguage from './headerLanguage';
import { DEFAULT_LANG } from './i18n';
import redirect from './redirect';
import {allowedLocales} from '../i18nConfig';

export default (req, res): void => {
  const detections = headerLanguage(req);
  let localeFound; // Will contain the preferred browser locale (e.g: fr-FR, fr, en-US, en, etc.)

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
  console.debug('Locale resolved using browser headers:', localeFound, detections);

  if (!localeFound) {
    localeFound = DEFAULT_LANG;
  }

  console.debug('Locale applied:', localeFound);

  if (req.url === '/' || req.url === '/api/autoRedirectToLocalisedPage') {
    return redirect(res, 302, `/${localeFound}`);
  }

  if (req.url.charAt(0) === '/' && req.url.charAt(1) === '?') {
    return redirect(res, 302, `/${localeFound}${req.url.slice(1)}`);
  }

  return redirect(res, 302, `/${localeFound}${req.url}`);
};
