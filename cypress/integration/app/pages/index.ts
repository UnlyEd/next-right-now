const baseUrl = Cypress.config().baseUrl;

describe('Index page', () => {
  /**
   * Visits the home page before any test.
   */
  before(() => {
    cy.visit('/en');
  });

  /**
   * Prepare aliases before each test. (they're destroyed at the end of each test)
   */
  beforeEach(() => {
    cy.prepareDOMAliases();
  });

  it('should display a main title', () => {
    cy.get('h1').should('have.length', 1).should('have.text', 'Next Right Now Demo');
  });
});

export {};
