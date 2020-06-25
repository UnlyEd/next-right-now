import {
  defaultLocale,
  supportedLanguages,
  supportedLocales,
} from '../../i18nConfig';
import { I18nLocale } from '../../types/i18n/I18nLocale';

export const LANG_EN = 'en';
export const LANG_FR = 'fr';
export const SUPPORTED_LOCALES: I18nLocale[] = supportedLocales;
export const SUPPORTED_LANGUAGES: string[] = supportedLanguages;

/**
 * Language used by default if no user language can be resolved
 * We use English because it's the most used languages among those supported
 *
 * @type {string}
 */
export const DEFAULT_LOCALE: string = defaultLocale;

/**
 * The fallback language is used when a translation is not found in the primary language
 *
 * Simple fallback language implementation.
 * Only considers EN and FR languages.
 *
 * @param primaryLanguage
 */
export const resolveFallbackLanguage = (primaryLanguage: string): string => {
  if (primaryLanguage === LANG_FR) {
    return LANG_EN;
  } else {
    return LANG_FR;
  }
};

/**
 * Each customer may own its own variation of the translations.
 * Resolves the lang of the customer variation, based on the lang and the customer.
 *
 * XXX To define a customer variation language, you must create it on Locize manually
 *  @example fr-x-customer1
 *  @example en-x-customer1
 *
 * @param lang
 */
export const resolveCustomerVariationLang = (lang: string): string => {
  return `${lang}-x-${process.env.NEXT_PUBLIC_CUSTOMER_REF}`;
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
