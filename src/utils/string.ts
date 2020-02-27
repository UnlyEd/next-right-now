import isPlainObject from 'lodash.isplainobject';
import map from 'lodash.map';

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
export const replaceAllOccurrences = (initialString: string, variables: object, prefix = '{', suffix = '}'): string => {
  if (isPlainObject(variables) && Object.keys(variables).length) {
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
