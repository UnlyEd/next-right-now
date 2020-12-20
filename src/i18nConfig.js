/*
  XXX This file is loaded by "next.config.js" and cannot contain ES6+ code (import, etc.)
   Note that any change should/must be followed by a server restart, because it's used in "next.config.js"
 */

const defaultLocale = 'en';
const supportedLocales = [
  { name: 'fr', lang: 'fr' },
  { name: 'en-US', lang: 'en' },
  { name: 'en', lang: 'en' },
];
const supportedLanguages = supportedLocales.map((item) => {
  return item.lang;
});

// XXX Available through utils/i18n/i18n
module.exports = {
  defaultLocale: defaultLocale,
  supportedLocales: supportedLocales,
  supportedLanguages: [...new Set(supportedLanguages)], // Remove duplicates
};
