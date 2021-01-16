const baseUrl = Cypress.config().baseUrl;

describe('Sanity checks > Domain', () => {
  /*
  * Visits the home page before any test
  */
  before(() => {
    cy.visit('/');
  });

  it(`should be running on the domain "${baseUrl}"`, () => {
    cy.url().then((url) => {
      cy.log(`Expected to be running on:`);
      cy.log(baseUrl);
      cy.log(`Actually running at:`);
      cy.log(url);
      cy.url({ timeout: 300000 }).should('contains', baseUrl); // Wait at least 5 minute before timing out
    });
  });
});

export {};
