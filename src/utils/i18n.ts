export const LANG_EN = 'en';
export const LANG_FR = 'fr';
export const SUPPORTED_LANGUAGES = [
  LANG_EN,
  LANG_FR,
];

/**
 * Language used by default if no user language can be resolved
 * We use English because it's the most used languages among those supported
 *
 * @type {string}
 */
export const DEFAULT_LANG: string = LANG_EN;

export const resolveFallbackLanguage = (primaryLanguage: string): string => {
  if (primaryLanguage === LANG_FR) {
    return LANG_EN;
  } else {
    return LANG_FR;
  }
};

/**
 * Detects the browser locale (from "accept-language" header) and returns an array of locales by order of importance
 *
 * TODO Should be re-implemented using https://github.com/UnlyEd/universal-language-detector
 *  or https://www.npmjs.com/package/accept-language-parser or similar
 *  because current implementation is undecipherable and doesn't have any test
 *
 * @param req
 * @see https://codesandbox.io/s/nextjs-i18n-staticprops-new-pbwjj?file=/src/static-translations/apiUtils/headerLanguage.js
 */
export const acceptLanguageHeaderLookup = (req): string[] | undefined => {
  let found: string[];

  if (typeof req !== 'undefined') {
    const { headers } = req;
    if (!headers) return found;

    const locales = [];
    const acceptLanguage = headers['accept-language'];

    if (acceptLanguage) {
      const lngs = [];
      let i;
      let m;
      const rgx = /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi;

      do {
        m = rgx.exec(acceptLanguage);
        if (m) {
          const lng = m[1];
          const weight = m[5] || '1';
          const q = Number(weight);
          if (lng && !isNaN(q)) {
            lngs.push({ lng, q });
          }
        }
      } while (m);

      lngs.sort((a, b) => b.q - a.q);

      for (i = 0; i < lngs.length; i++) {
        locales.push(lngs[i].lng);
      }

      if (locales.length) found = locales;
    }
  }

  return found;
};
