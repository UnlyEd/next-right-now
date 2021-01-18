import isPlainObject from 'lodash.isplainobject';
import map from 'lodash.map';
import size from 'lodash.size';
import { GenericObject } from '../data/types/GenericObject';

/**
 * Replace all occurrences in a string.
 *
 * Meant to be used with string that contain "dynamic" data, such as "Hello {name}", where "name" is meant to be a variable
 *
 * @example replaceAllOccurrences('Hello {name}', { name: 'Unly' }) => "Hello Unly"
 *
 * @param initialString
 * @param variables
 * @param {string} prefix
 * @param {string} suffix
 * @return {string}
 */
export const replaceAllOccurrences = (initialString: string, variables: GenericObject<string>, prefix = '{', suffix = '}'): string => {
  if (typeof initialString === 'string' && size(initialString) && isPlainObject(variables) && size(Object.keys(variables))) {
    let replacedString = initialString;

    // For each key to replace, replace it by its matching value, in the initial string
    map(variables, (value, key) => {
      const needle = `${prefix}${key}${suffix}`;
      const replacement = variables[key];
      const re = new RegExp(needle, 'gi');

      replacedString = replacedString.replace(re, replacement);
    });
    return replacedString;
  }

  return initialString;
};

/**
 * Airtable encodes "<" into "&#x3C;" and we need to decode it to display proper HTML content
 *
 * @param {string} string
 * @return {string}
 */
export const unescapeHtml = (string: string): string => {
  return replaceAllOccurrences(string, {
    '&#x3C;': '<',
  }, '', '');
};

/**
 * Remove the trailing slash of a string
 *
 * Useful for urls, in particular
 *
 * @param string
 */
export const removeTrailingSlash = (string: string): string => {
  if (string[size(string) - 1] === '/') {
    return string.slice(0, -1);
  }

  return string;
};
