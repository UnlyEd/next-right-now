import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import { createLogger } from '@/modules/core/logging/logger';
import * as Sentry from '@sentry/node';
import universalLanguageDetect from '@unly/universal-language-detector';
import { ERROR_LEVELS } from '@unly/universal-language-detector/lib/utils/error';
import { IncomingMessage } from 'http';
import size from 'lodash.size';
import { NextApiRequest } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  defaultLocale,
  supportedLanguages,
  supportedLocales,
} from './i18nConfig';
import { I18nLocale } from './types/I18nLocale';

const fileLabel = 'modules/core/i18n/i18n';
const logger = createLogger({
  fileLabel,
});

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
 * Resolves locale from query.
 * Fallback to browser headers.
 *
 * Must only be used from "getServerSideProps".
 *
 * @param query
 * @param req
 * @param readonlyCookies
 */
export const resolveSSRLocale = (query: ParsedUrlQuery, req: IncomingMessage, readonlyCookies: Cookies): string => {
  const hasLocaleFromUrl = !!query?.locale;

  return hasLocaleFromUrl ? query?.locale as string : universalLanguageDetect({
    supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: DEFAULT_LOCALE, // Fallback language in case the user's language cannot be resolved
    acceptLanguageHeader: req?.headers?.['accept-language'], // Optional - Accept-language header will be used when resolving the language on the server side
    serverCookies: readonlyCookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
    errorHandler: (error: Error, level: ERROR_LEVELS, origin: string, context: GenericObject): void => {
      Sentry.withScope((scope): void => {
        scope.setExtra('level', level);
        scope.setExtra('origin', origin);
        scope.setContext('context', context);
        Sentry.captureException(error);
      });
      logger.error(error.message);
    },
  });
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
export const acceptLanguageHeaderLookup = (req: NextApiRequest): string[] | undefined => {
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
            lngs.push({
              lng,
              q,
            });
          }
        }
      } while (m);

      lngs.sort((a, b) => b.q - a.q);

      for (i = 0; i < size(lngs); i++) {
        locales.push(lngs[i].lng);
      }

      if (size(locales)) found = locales;
    }
  }

  return found;
};
