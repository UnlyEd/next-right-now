import { Customer } from '@/modules/core/data/types/Customer';

const baseUrl = Cypress.config().baseUrl;

describe('Common > Nav section', () => {
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

  it('should have 3 links in the navigation bar', () => {
    cy.get('#nav .navbar-nav > .nav-item').should('have.length', 5);
  });

  it('should have a link in the navbar that redirects to the home page', () => {
    cy.get<Customer>('@customer').then((customer: Customer) => {
      const isPageInEnglish = true;
      cy.get('#nav-link-home')
        .should('have.text', isPageInEnglish ? 'Home' : 'Accueil')
        .click();
      cy.url({ timeout: 10000 }).should('eq', `${baseUrl}/${isPageInEnglish ? 'en' : 'fr'}`);
    });
  });
});

export {};
