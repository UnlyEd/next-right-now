import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import { ModChatbot } from '../../types/data/ModChatbot';
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
          modChatbot: {
            dialogIntroduction: 'test',
          },
        } as AirtableRecord<Customer>;
        const modChatbotFallback: Partial<ModChatbot> = {
          dialogIntroduction: null,
          homeButtonLabel: 'test',
        };
        const modChatbot = applyRecordFallback(customer, 'modChatbot', modChatbotFallback);

        test(`should mutate the original object, which should contain all properties from the fallback object that were missing from the original object`, async () => {
          expect(customer.modChatbot).toMatchObject({
            dialogIntroduction: 'test',
            homeButtonLabel: 'test',
          });
        });

        test(`should return the new object, which should contain all properties from the fallback object that were missing from the original object`, async () => {
          expect(modChatbot).toMatchObject({
            dialogIntroduction: 'test',
            homeButtonLabel: 'test',
          });
        });
      });
    });
  });
});
