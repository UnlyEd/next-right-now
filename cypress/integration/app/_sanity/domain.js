const baseUrl = Cypress.config().baseUrl;

describe('Sanity checks > Domain', {
  retries: {
    runMode: 2, // Allows 2 retries (for a total of 3 attempts) to reduce the probability of failing the whole tests suite because Vercel hasn't finished to deploy yet (which makes Cypress fail by trying to test the Vercel "waiting page", instead of our app)
  }
}, () => {
  /*
  * Visits the home page before any test
  */
  before(() => {
    cy.visit('/en');
  });

  it('should be running on the right domain', () => {
    cy.url().then((url) => {
      cy.log(`Expected to be running on:`);
      cy.log(baseUrl);
      cy.log(`Actually running at:`);
      cy.log(url);
      cy.url({ timeout: 300000 }).should('contains', baseUrl); // Wait at least 5 minute before timing out
    });
  });
});
