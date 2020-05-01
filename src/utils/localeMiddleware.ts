import headerLanguage from './headerLanguage';
import { DEFAULT_LANG } from './i18n';
import redirect from './redirect';

export default (req, res) => {
  const allowedLocales = [
    { name: 'fr-FR', locale: 'fr' },
    { name: 'fr', locale: 'fr' },
    { name: 'en-AU', locale: 'en' },
    { name: 'en-IN', locale: 'en' },
    { name: 'en-CA', locale: 'en' },
    { name: 'en-NZ', locale: 'en' },
    { name: 'en-US', locale: 'en' },
    { name: 'en-ZA', locale: 'en' },
    { name: 'en-GB', locale: 'en' },
    { name: 'en', locale: 'en' },
  ];

  const detections = headerLanguage(req);

  let found;

  if (detections && detections.length) {
    detections.forEach((language) => {
      if (found || typeof language !== 'string') return;

      const lookedUpLocale = allowedLocales.find(
        (allowedLocale) => allowedLocale.name === language,
      );

      if (lookedUpLocale) {
        found = lookedUpLocale.locale;
      }
    });
  }
  console.log('locale found 1', found);

  if (!found) {
    found = DEFAULT_LANG;
  }

  console.log('locale found 2', found);
  console.log('url', req.url);

  if (req.url === '/' || req.url === '/api/autoRedirectToLocalisedPage') {
    return redirect(res, 302, `/${found}`);
  }

  if (req.url.charAt(0) === '/' && req.url.charAt(1) === '?') {
    return redirect(res, 302, `/${found}${req.url.slice(1)}`);
  }

  return redirect(res, 302, `/${found}${req.url}`);
};
