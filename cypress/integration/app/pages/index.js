const baseUrl = Cypress.config().baseUrl;

describe('Index page', () => {
  /*
  * Visits the home page before any test
  */
  before(() => {
    cy.visit('/en');
  });

  it('should display a main title', () => {
    cy.get('h1').should('have.length', 1).should('have.text', 'Next Right Now Demo');
  });
});
