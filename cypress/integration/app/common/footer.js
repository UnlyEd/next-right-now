const baseUrl = Cypress.config().baseUrl;

describe('Common > Footer section', () => {
  /*
  * Visits the home page before any test
  */
  before(() => {
    cy.visit('/en');
  });

  it('should have the Unly logo in the footer', () => {
    cy.get('#footer-logo-unly-brand').should('have.length', 1);
  });

  it('should have the customer logo in the footer', () => {
    cy.get('#footer-logo-organisation-brand').should('have.length', 1);
  });

  it('should have a button to change the language which changes the language upon click', () => {
    cy.get('.btn-change-locale').should('have.length', 1).click();
    cy.url().should('eq', `${baseUrl}/fr`);
  });
});
