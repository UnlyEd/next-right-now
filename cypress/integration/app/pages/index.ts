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

  it('should display at least one module card', () => {
    cy.get('.module-card').its('length').should('be.gte', 1);
  });
});

export {};
