/**
 * Localisation naming is quite tricky. Some people refer to "locale" as "language", other as "country/regional locale", other need additional variants.
 *
 * A locale is composed of:
 *  - A language code
 *  - Country/Region code (optional)
 *  - Variant code (optional)
 *
 * We tried to keep it simple by using a "name", which represents whatever you want to represent.
 * In our case, we allow/use both language-based (i.e: fr) and country-based (i.e: fr-FR)
 * We believe it's the most common way to get started with localisation
 * (and if you just need the language, you can just remove country-based locales in ../i18nConfig.js)
 *
 * @see i18nConfig.js Application locales configuration
 */
export type I18nLocale = {
  lang: string; // Locale language (e.g: fr)
  name: string; // Locale name (e.g: fr-FR)
}
