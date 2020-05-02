/*
  XXX This file is loaded by "next.config.js" and cannot contain ES6+ code (import, etc.)
   Note that any change should/must be followed by a server restart, because it's used in "next.config.js"
 */

const defaultLocale = 'en';
const allowedLocales = [
  { name: 'fr-FR', lang: 'fr' },
  { name: 'fr', lang: 'fr' },
  { name: 'en-US', lang: 'en' },
  { name: 'en', lang: 'en' },
];
const allowedLanguages = allowedLocales.map((item) => {
  return item.lang;
});

module.exports = {
  defaultLocale: defaultLocale,
  allowedLocales: allowedLocales,
  allowedLanguages: [...new Set(allowedLanguages)], // Remove duplicates
};
