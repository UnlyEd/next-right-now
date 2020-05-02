import headerLanguage from './headerLanguage';
import { DEFAULT_LANG } from './i18n';
import redirect from './redirect';
import {allowedLocales} from '../i18nConfig';

export default (req, res): void => {
  const detections = headerLanguage(req);
  let languageFound;

  if (detections && detections.length) {
    detections.forEach((language) => {
      if (languageFound || typeof language !== 'string') return;

      const lookedUpLocale = allowedLocales.find(
        (allowedLocale) => allowedLocale.name === language,
      );

      if (lookedUpLocale) {
        languageFound = lookedUpLocale.lang;
      }
    });
  }
  console.log('lang found 1', languageFound);

  if (!languageFound) {
    languageFound = DEFAULT_LANG;
  }

  console.log('lang found 2', languageFound);
  console.log('url', req.url);

  if (req.url === '/' || req.url === '/api/autoRedirectToLocalisedPage') {
    return redirect(res, 302, `/${languageFound}`);
  }

  if (req.url.charAt(0) === '/' && req.url.charAt(1) === '?') {
    return redirect(res, 302, `/${languageFound}${req.url.slice(1)}`);
  }

  return redirect(res, 302, `/${languageFound}${req.url}`);
};
