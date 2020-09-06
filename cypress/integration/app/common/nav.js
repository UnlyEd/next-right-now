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
    cy.get('#nav-link-home')
      .should('have.text', 'Home')
      .click();
    cy.url({ timeout: 10000 }).should('eq', `${baseUrl}/en`);
  });

  it('should have a link in the navbar that redirects to the built-in feature "Static I18n"', () => {
    cy.get('#nav-link-examples')
      .should('have.text', 'Examples')
      .click();
    cy.get('#nav-link-examples-static-i-18-n')
      .should('have.text', 'Static i18n')
      .click();
    cy.url({ timeout: 45000 }).should('eq', `${baseUrl}/en/examples/built-in-features/static-i18n`);
    cy.get('h1').should('have.length', 1).should('have.text', 'Static i18n examples, using i18next and Locize vendor');
  });

  it('should have a link in the navbar that redirects to the native feature "SSR"', () => {
    cy.get('#nav-link-examples')
      .should('have.text', 'Examples')
      .click();
    cy.get('#nav-link-examples-ssr-get-server-side-props')
      .should('have.text', 'SSR (getServerSideProps)')
      .click();
    cy.url({ timeout: 45000 }).should('eq', `${baseUrl}/en/examples/native-features/example-with-ssr`);
    cy.get('h1').should('have.length', 1).should('have.text', 'Example, using SSR');
  });
});
