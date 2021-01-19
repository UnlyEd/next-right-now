import { Customer } from '@/modules/core/data/types/Customer';
import { CYPRESS_WINDOW_NS } from '@/modules/core/testing/cypress';

describe('Sanity checks > Browser data', () => {
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

  it(`should have "window.${CYPRESS_WINDOW_NS}.dataset" defined`, () => {
    cy.get('@dataset').then((dataset) => {
      assert.isDefined(dataset);
      expect(Object.keys(dataset).length).to.be.greaterThan(1);
    });
  });

  it(`should have "window.${CYPRESS_WINDOW_NS}.customer" defined`, () => {
    cy.get<Customer>('@customer').then((customer: Customer) => {
      assert.isDefined(customer.ref);
    });
  });
});
