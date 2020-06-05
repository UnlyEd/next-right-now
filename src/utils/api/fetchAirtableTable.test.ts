import { CUSTOMER1 } from '../../mocks/airtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import hybridCache from '../caching/hybridCache';
import { reset as cacheReset } from '../caching/inMemoryCacheStorage';
import waitFor from '../timers/waitFor';
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
        expect(await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer')).toMatchOneOf([
          expectedShape,
          expectedShapeWithoutOptionalFields,
        ]);
      });
    });

    describe(`should not fetch multiple times in a row but rely on the cache instead`, () => {
      beforeEach(() => {
        cacheReset();
      });

      test(`when using the default TTL`, async () => {
        const cacheHitsBefore = require('../caching/inMemoryCacheStorage').cacheHits;
        const cacheMissBefore = require('../caching/inMemoryCacheStorage').cacheMiss;
        expect(await hybridCache('CustomerTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer'))).toMatchOneOf([
          expectedShape,
          expectedShapeWithoutOptionalFields,
        ]);
        expect(await hybridCache('CustomerTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer'))).toMatchOneOf([
          expectedShape,
          expectedShapeWithoutOptionalFields,
        ]);

        const cacheHitsAfter = require('../caching/inMemoryCacheStorage').cacheHits;
        const cacheMissAfter = require('../caching/inMemoryCacheStorage').cacheMiss;
        expect(cacheHitsAfter).toBeGreaterThan(cacheHitsBefore);
        expect(cacheMissAfter).toEqual(cacheMissBefore + 1); // Cache should have been missed only for the first call
      });

      describe(`should fetch multiple times and miss the cache`, () => {
        test(`when using TTL of 1 second and waiting more than 1 second between calls`, async () => {
          const cacheHitsBefore = require('../caching/inMemoryCacheStorage').cacheHits;
          const cacheMissBefore = require('../caching/inMemoryCacheStorage').cacheMiss;
          await waitFor(1001);
          expect(await hybridCache('CustomerTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer'), { ttl: 1 })).toMatchOneOf([
            expectedShape,
            expectedShapeWithoutOptionalFields,
          ]);
          await waitFor(1001);
          expect(await hybridCache('CustomerTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer'), { ttl: 1 })).toMatchOneOf([
            expectedShape,
            expectedShapeWithoutOptionalFields,
          ]);

          const cacheHitsAfter = require('../caching/inMemoryCacheStorage').cacheHits;
          const cacheMissAfter = require('../caching/inMemoryCacheStorage').cacheMiss;
          expect(cacheHitsAfter).toEqual(cacheHitsBefore + 1);
          expect(cacheMissAfter).toBeGreaterThan(cacheMissBefore);
        });
      });
    });
  });
});
