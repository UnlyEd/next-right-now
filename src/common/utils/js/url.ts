import * as Sentry from '@sentry/node';
import StringifySafe from 'json-stringify-safe';

/**
 * Converts a JSON object into a string that is url-friendly
 *
 * @param {object} data
 * @return {string}
 */
export const encodeQueryParameter = (data: object): string => {
  return encodeURIComponent(StringifySafe(data)); // Use StringifySafe to avoid crash on circular dependencies
};

/**
 * Converts a string into a JSON object
 *
 * If the parsing fails, returns an empty object instead and log the error to Sentry
 *
 * @param {string} query
 * @return {object}
 */
export const decodeQueryParameter = (query: string): object => {
  const decodedQueryParameter: string = decodeURIComponent(query);

  // Parsing the simulation could fail for various reason, the most expected use case being a bad/truncated/malformed URL
  try {
    return JSON.parse(decodedQueryParameter);
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtra('decodedQueryParameter', decodedQueryParameter); // Useful for debug
      Sentry.captureException(error);
    });

    // Return an empty object, we consider there was no data
    return {};
  }
};
