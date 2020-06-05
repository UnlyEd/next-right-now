import cache from '../memoization/cache';
import { reset as cacheReset } from '../memoization/inMemoryCacheStorage';
import waitFor from '../timers/waitFor';
import { StorageOptions } from './cacheStorage';

describe(`utils/memoization/cache.ts`, () => {
  beforeEach(() => {
    // Silent console log (used by logger.debug)
    // @ts-ignore-error
    global.console = { debug: jest.fn(), log: jest.fn() };
  });

  describe(`cache`, () => {
    describe(`should not fetch multiple times in a row but rely on the cache instead`, () => {
      beforeEach(() => {
        cacheReset();
      });
      const expectationResult = { key: 'value' };

      describe(`when using in-memory storage`, () => {
        test(`when using the default TTL`, async () => {
          const cacheHitsBefore = require('../memoization/inMemoryCacheStorage').cacheHits;
          const cacheMissBefore = require('../memoization/inMemoryCacheStorage').cacheMiss;
          expect(await cache('key', async () => {
            await waitFor(1);
            return expectationResult;
          })).toEqual(expectationResult);
          expect(await cache('key', async () => {
            await waitFor(1);
            return Promise.resolve(expectationResult);
          })).toEqual(expectationResult);

          const cacheHitsAfter = require('../memoization/inMemoryCacheStorage').cacheHits;
          const cacheMissAfter = require('../memoization/inMemoryCacheStorage').cacheMiss;
          expect(cacheHitsAfter).toBeGreaterThan(cacheHitsBefore);
          expect(cacheMissAfter).toEqual(cacheMissBefore + 1); // Cache should have been missed only for the first call
        });

        describe(`should fetch multiple times and miss the cache`, () => {
          const expectationResult = { key2: 'value2' };

          test(`when using TTL of 1 second and waiting more than 1 second between calls`, async () => {
            const cacheHitsBefore = require('../memoization/inMemoryCacheStorage').cacheHits;
            const cacheMissBefore = require('../memoization/inMemoryCacheStorage').cacheMiss;
            await waitFor(1001);
            expect(await cache('key2', async () => {
              await waitFor(1);
              return Promise.resolve(expectationResult);
            })).toEqual(expectationResult);
            await waitFor(1001);
            expect(await cache('key2', async () => {
              await waitFor(1);
              return Promise.resolve(expectationResult);
            })).toEqual(expectationResult);

            const cacheHitsAfter = require('../memoization/inMemoryCacheStorage').cacheHits;
            const cacheMissAfter = require('../memoization/inMemoryCacheStorage').cacheMiss;
            expect(cacheHitsAfter).toEqual(cacheHitsBefore + 1);
            expect(cacheMissAfter).toBeGreaterThan(cacheMissBefore);
          });
        });
      });

      describe(`when using file storage (on disk)`, () => {
        const storageOptions: StorageOptions = { storage: { type: 'disk', options: { filename: '.test-cache1' } } };

        test(`when using the default TTL`, async () => {
          const cacheHitsBefore = require('../memoization/inMemoryCacheStorage').cacheHits;
          const cacheMissBefore = require('../memoization/inMemoryCacheStorage').cacheMiss;
          expect(await cache('key', async () => {
            await waitFor(1);
            return expectationResult;
          }, storageOptions)).toEqual(expectationResult);
          expect(await cache('key', async () => {
            await waitFor(1);
            return Promise.resolve(expectationResult);
          }, storageOptions)).toEqual(expectationResult);

          const cacheHitsAfter = require('../memoization/inMemoryCacheStorage').cacheHits;
          const cacheMissAfter = require('../memoization/inMemoryCacheStorage').cacheMiss;
          expect(cacheHitsAfter).toBeGreaterThan(cacheHitsBefore);
          expect(cacheMissAfter).toEqual(cacheMissBefore + 1); // Cache should have been missed only for the first call
        });

        describe(`should fetch multiple times and miss the cache`, () => {
          const expectationResult = { key2: 'value2' };

          test(`when using TTL of 1 second and waiting more than 1 second between calls`, async () => {
            const cacheHitsBefore = require('../memoization/inMemoryCacheStorage').cacheHits;
            const cacheMissBefore = require('../memoization/inMemoryCacheStorage').cacheMiss;
            await waitFor(1001);
            expect(await cache('key2', async () => {
              await waitFor(1);
              return Promise.resolve(expectationResult);
            }, storageOptions)).toEqual(expectationResult);
            await waitFor(1001);
            expect(await cache('key2', async () => {
              await waitFor(1);
              return Promise.resolve(expectationResult);
            }, storageOptions)).toEqual(expectationResult);

            const cacheHitsAfter = require('../memoization/inMemoryCacheStorage').cacheHits;
            const cacheMissAfter = require('../memoization/inMemoryCacheStorage').cacheMiss;
            expect(cacheHitsAfter).toEqual(cacheHitsBefore + 1);
            expect(cacheMissAfter).toBeGreaterThan(cacheMissBefore);
          });
        });
      });
    });
  });
});
