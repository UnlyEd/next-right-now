const baseUrl = Cypress.config().baseUrl;

describe('Index page', () => {
  /*
  * Visits the page before each test
  */
  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * Footer section
   */
  it('should have the Unly logo in the footer', () => {
    cy.get('#footer-logo-unly-brand').should('have.length', 1);
  });

  it('should have the customer logo in the footer', () => {
    cy.get('#footer-logo-organisation-brand').should('have.length', 1);
  });

  /**
   * Navbar section
   */
  it('should have 6 links in the navigation bar', () => {
    cy.get('#nav .navbar-nav > .nav-item').should('have.length', 6);
  });

  it('should have a link in the navbar that redirects to the examples page', () => {
    cy.url().should('eq', `${baseUrl}/en`);
    cy.get('#nav-link-examples')
      .should('have.text', 'Examples')
      .click();
    cy.get('#nav-link-examples-static-i-18-n')
      .should('have.text', 'Static i18n')
      .click();
    cy.url().should('eq', `${baseUrl}/en/examples/built-in-features/static-i18n`);
  });
});
