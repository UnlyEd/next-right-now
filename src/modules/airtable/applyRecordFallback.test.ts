import { AirtableRecord } from '../data/types/AirtableRecord';
import { Customer } from '../data/types/Customer';
import { Theme } from '../data/types/Theme';
import applyRecordFallback from './applyRecordFallback';

/**
 * @group unit
 * @group utils
 * @group module-fetch-airtable-dataset
 */
describe(`utils/airtableDataset/applyRecordFallback.ts`, () => {
  beforeEach(() => {
    // global.console = global.muteConsole();
  });

  describe(`applyRecordFallback`, () => {
    describe(`should apply a fallback object to the record, which replaces all missing properties with their fallback counterpart`, () => {
      describe(`when using the "simple" customer (simple relationships, no nested relationships)`, () => {
        const customer: AirtableRecord<Customer> = {
          ref: 'customer1',
          theme: {
            primaryColor: 'white',
          },
        } as AirtableRecord<Customer>;
        const themeFallback: Partial<Theme> = {
          primaryColor: null,
          secondaryColor: 'black',
        };
        const theme = applyRecordFallback(customer, 'theme', themeFallback);

        test(`should mutate the original object, which should contain all properties from the fallback object that were missing from the original object`, async () => {
          expect(customer.theme).toMatchObject({
            primaryColor: 'white',
            secondaryColor: 'black',
          });
        });

        test(`should return the new object, which should contain all properties from the fallback object that were missing from the original object`, async () => {
          expect(theme).toMatchObject({
            primaryColor: 'white',
            secondaryColor: 'black',
          });
        });
      });
    });
  });
});
