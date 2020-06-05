import { CUSTOMER1 } from '../../mocks/airtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import fetchAirtableTable, { GenericListApiResponse } from './fetchAirtableTable';

describe(`utils/api/fetchAirtable.ts`, () => {
  beforeEach(() => {
    // Silent console log (used by logger.debug)
    // @ts-ignore-error
    global.console = { debug: jest.fn(), log: jest.fn() };
  });

  const expectedShape = {
    records: [
      CUSTOMER1,
    ],
  };
  const expectedShapeWithoutOptionalFields = {
    records: [
      {
        ...CUSTOMER1,
        fields: { // Only list required fields, so that if Airtable API doesn't return optional fields, then the test still passes
          products: CUSTOMER1.fields.products,
          theme: CUSTOMER1.fields.theme,
          ref: CUSTOMER1.fields.ref,
        },
      },
    ],
  };

  describe(`fetchAirtableTable`, () => {
    describe(`should fetch correctly`, () => {
      test(`when not using any option`, async () => {
        const results = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer');
        expect(results).toMatchOneOf([expectedShape, expectedShapeWithoutOptionalFields]);
      });
    });
  });
});
