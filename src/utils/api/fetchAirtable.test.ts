import map from 'lodash.map';
import { CUSTOMER1 } from '../../mocks/airtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import fetchAirtableTable, { GenericListApiResponse } from './fetchAirtableTable';

describe(`utils/api/fetchAirtable.ts`, () => {
  const expectedResults = {
      records: [
        CUSTOMER1,
      ],
    }
  ;
  describe(`fetchAirtableTable`, () => {
    describe(`should fetch correctly`, () => {
      test(`when not using any option`, async () => {
        const results = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer');

        // Make some fields optional
        // Awaiting better implementation - See https://github.com/Dean177/jest-to-match-shape-of/issues/75
        map(results, (result: AirtableRecord<Customer>, i: number) => {
          results[i] = {
            ...result,
            fields: {
              labelEN: '',
              labelFR: '',
              termsEN: '',
              termsFR: '',
            },
          };
        });

        expect(results).toMatchShapeOf(expectedResults);
      });
    });
  });
});
