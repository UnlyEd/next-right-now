/*
  XXX This file is loaded by "next.config.js" and cannot contain ES6+ code (import, etc.)
   Note that any change should/must be followed by a server restart, because it's used in "next.config.js"
 */

/**
 * Select the "supportedLocales.name" you want to use by default in your app.
 * This value will be used as a fallback value, when the user locale cannot be resolved.
 *
 * @example en
 * @example en-US
 *
 * @type {string}
 */
const defaultLocale = 'en';

/**
 * List of all supported locales by your app.
 *
 * If a user tries to load your site using non-supported locales, the default locale is used instead.
 *
 * @type {({name: string, lang: string}|{name: string, lang: string}|{name: string, lang: string})[]}
 */
const supportedLocales = [
  {
    name: 'fr',
    lang: 'fr',
  },
  {
    name: 'en-US',
    lang: 'en',
  },
  {
    name: 'en',
    lang: 'en',
  },
];

/**
 * Returns the list of all supported languages.
 * Basically extracts the "lang" parameter from the supported locales array.
 *
 * @type {string[]}
 */
const supportedLanguages = supportedLocales.map((item) => {
  return item.lang;
});

/**
 * Resolves the lang associated to a locale.
 *
 * @param localeToFind
 * @return {string}
 */
const getLangFromLocale = (localeToFind) => {
  return (supportedLocales.find((locale) => locale.name === localeToFind)).name;
};

// XXX Available through utils/i18n/i18n
module.exports = {
  defaultLocale,
  supportedLocales,
  supportedLanguages: [...new Set(supportedLanguages)], // Remove duplicates
  getLangFromLocale,
};
