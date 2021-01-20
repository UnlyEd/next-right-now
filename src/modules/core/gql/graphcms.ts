/**
 * GraphCMS country codes separator expected in the header
 *
 * @see https://graphcms.com/docs/content-api/localization#http-header
 * @type {string}
 */
export const LANGUAGES_SEP = ', ';

/**
 * Convert an array of languages into a GraphCMS-compatible locale header
 * @see https://graphcms.com/docs/content-api/localization#http-header
 *
 * XXX Beware, lowercase is very important as it will completely crash if not lower-cased! (e.g: "ApolloError: Network error: Response not successful: Received status code 500")
 *
 * @param {string[]} languages
 * @return {string}
 */
export const prepareGraphCMSLocaleHeader = (languages: string[]): string => {
  return languages.join(LANGUAGES_SEP).toLowerCase();
};
