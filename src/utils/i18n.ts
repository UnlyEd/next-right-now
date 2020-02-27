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
