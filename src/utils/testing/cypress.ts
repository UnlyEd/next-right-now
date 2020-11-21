/**
 * Detects whether Cypress is running on the page or not.
 *
 * Returns null when not executed from the browser.
 *
 * @see https://docs.cypress.io/faq/questions/using-cypress-faq.html#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress
 */
export const detectCypress = (): boolean | null => {
  if (typeof window) {
    return !!window['Cypress'];
  }

  return null;
};
