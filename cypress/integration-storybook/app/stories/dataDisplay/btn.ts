describe('Btn story', () => {
  /**
   * Visits the story page before any test.
   */
  before(() => {
    cy.visit('/?path=/story/next-right-now-welcome-to-nrn--page');
  });

  /**
   * XXX The role of this test is to make sure to detect regressions affecting the whole Storybook site.
   *  We don't intend to test all components here, we only want to be warned if we ever break Storybook.
   */
  it('should have a "Data display" menu on the left navigation panel', () => {
    cy.get('#next-right-now-data-display').should('have.length', 1).should('have.text', 'Data display').click();
  });

  it('should have a "Data display" > "Btn" story', () => {
    cy.get('#next-right-now-data-display-btn').should('have.length', 1).should('have.text', 'Btn').click();
  });

  it('should have a writable "#text" control property', () => {
    cy.get('#text').should('have.length', 1).should('have.text', 'Hello').type(' Cypress!');
  });

  it('should have changed the Btn text to "Hello Cypress!', () => {
    cy.findIframe('iframe#storybook-preview-iframe').find('#root button').should('have.text', 'Hello Cypress!')
  });
});

export {};
