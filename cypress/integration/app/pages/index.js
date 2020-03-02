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
  it('should have 3 links in the navigation bar', () => {
    cy.get('#nav a.nav-link').should('have.length', 3);
  });

  it('should have a link in the navbar that redirects to the examples page', () => {
    cy.url().should('eq', `${baseUrl}/`);
    cy.get('#nav-link-examples')
      .should('have.text', 'Examples')
      .click();
    cy.url().should('eq', `${baseUrl}/examples`);
  });
});
