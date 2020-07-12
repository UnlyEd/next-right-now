const baseUrl = Cypress.config().baseUrl;

describe('Common > Nav section', () => {
  /*
  * Visits the home page before any test
  */
  beforeEach(() => {
    cy.visit('/en');
  });

  it('should have 5 links in the navigation bar', () => {
    cy.get('#nav .navbar-nav > .nav-item').should('have.length', 5);
  });

  it('should have a link in the navbar that redirects to the home page', () => {
    cy.url().should('eq', `${baseUrl}/en`);
    cy.get('#nav-link-examples')
      .should('have.text', 'Examples')
      .click();
    cy.get('#nav-link-examples-static-i-18-n')
      .should('have.text', 'Static i18n')
      .click();
    cy.url({ timeout: 10000 }).should('eq', `${baseUrl}/en/examples/built-in-features/static-i18n`);
  });
});
