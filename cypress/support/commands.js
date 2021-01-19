// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { CYPRESS_WINDOW_NS } from '@/modules/core/testing/cypress';

/**
 * Prepare DOM aliases by fetching the customer data from the browser window and aliasing them for later use.
 *
 * @example cy.prepareDOMAliases();
 */
Cypress.Commands.add('prepareDOMAliases', () => {
  return cy.window().then((window) => {
    cy.get('.page-wrapper').then(() => { // Wait for the DOM element to be created by Next.js before trying to read any dynamic data from the "window" object
      cy.log(`window[${CYPRESS_WINDOW_NS}]`, window[CYPRESS_WINDOW_NS]);

      const {
        customer,
        dataset,
      } = window[CYPRESS_WINDOW_NS];

      // Use aliases to make our variables reusable across tests - See https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Sharing-Context
      cy.wrap(customer).as('customer');
      cy.wrap(dataset).as('dataset');
    });
  });
});

/**
 * Finds an iframe and returns it "body" HTML element.
 *
 * XXX Alternatively, look for the cypress-iframe NPM plugin if you need more iframe-related features! See https://www.npmjs.com/package/cypress-iframe
 *
 * @example cy.findIframe();
 * @see https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
 */
Cypress.Commands.add('findIframe', (iframeSelector) => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  cy.log('findIframe')

  return cy
    .get(iframeSelector, { log: false })
    .its('0.contentDocument.body', { log: false }).should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then((body) => cy.wrap(body, { log: false }))
})
