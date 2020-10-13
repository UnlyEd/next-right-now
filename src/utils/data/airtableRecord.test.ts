import deepmerge from 'deepmerge';
import dataset, {
  CUSTOMER2,
  PRODUCT2,
  THEME1,
} from '../../mocks/airtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { sanitizeRecord } from './airtableRecord';
import { GenericRecord } from './record';

/**
 * @group unit
 * @group utils
 */
describe(`utils/data/airtableRecord.ts`, () => {
  const preferredLocales = ['fr', 'en'];
  const record: AirtableRecord = CUSTOMER2;
  const results: GenericRecord = {
    id: 'recZEMyznL19CPD5b',
    fields: {
      terms: 'Qui a envie de lire des **CGU** ? -\\_-\n',
      termsEN: 'Who wanna get bothered with **terms**? Come on!\n',
      termsFR: 'Qui a envie de lire des **CGU** ? -\\_-\n',
      label: 'Customer 2',
      labelEN: 'Customer 2',
      products: [
        deepmerge(PRODUCT2, {
          // Relationships of the 2nd level must be resolved
          fields: {
            title: 'Kiunyu (fr)',
            description: 'Syrupy and heavy\n',
            customer: CUSTOMER2,
          },
          __typename: 'Product',
        }),
      ],
      theme: deepmerge(THEME1, {
        // Relationships of the 2nd level must be resolved
        fields: {
          customer: CUSTOMER2,
          logo: THEME1.fields.logo[0],
        },
        __typename: 'Theme',
      }),
      ref: 'customer2',
    },
    createdTime: '2020-06-02T14:01:51.000Z',
    __typename: 'Customer',
  };

  describe(`sanitizeRecord`, () => {
    describe(`should sanitize correctly`, () => {
      test(`when not using any option`, async () => {
        const result = sanitizeRecord(record, dataset, preferredLocales);
        expect(result).toMatchObject(results);
      });
    });
  });
});
