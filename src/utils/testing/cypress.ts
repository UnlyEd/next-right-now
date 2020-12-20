/**
 * Name of the Cypress namespace within the "window" global object.
 */
export const CYPRESS_WINDOW_NS = '__CYPRESS_DATA__';

/**
 * Detects whether Cypress is running on the page or not.
 *
 * Returns null when not executed from the browser.
 *
 * @see https://docs.cypress.io/faq/questions/using-cypress-faq.html#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress
 */
export const detectCypress = (): boolean | null => {
  if (typeof window !== 'undefined') {
    return !!window['Cypress'];
  }

  return null;
};
