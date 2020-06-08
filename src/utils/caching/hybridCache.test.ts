import waitFor from '../timers/waitFor';
import cache from './hybridCache';
import { StorageOptions } from './hybridCacheStorage';
import { reset as inDiskCacheReset } from './diskCacheStorage';
import { reset as inMemoryCacheReset } from './memoryCacheStorage';

describe(`utils/memoization/cache.ts`, () => {
  beforeEach(() => {
    global.console = global.muteConsole();
  });

  describe(`cache`, () => {
    describe(`should not fetch multiple times in a row but rely on the cache instead`, () => {
      afterEach(() => {
        inMemoryCacheReset();
      });
      const expectationResult = { key: 'value' };

      describe(`when using in-memory storage`, () => {
        test(`when using the default TTL`, async () => {
          const cacheHitsBefore = require('./memoryCacheStorage').cacheHits;
          const cacheMissBefore = require('./memoryCacheStorage').cacheMiss;
          expect(await cache('key', async () => {
            await waitFor(1);
            return expectationResult;
          })).toEqual(expectationResult);
          expect(await cache('key', async () => {
            await waitFor(1);
            return Promise.resolve(expectationResult);
          })).toEqual(expectationResult);

          const cacheHitsAfter = require('./memoryCacheStorage').cacheHits;
          const cacheMissAfter = require('./memoryCacheStorage').cacheMiss;
          expect(cacheHitsAfter).toBeGreaterThan(cacheHitsBefore);
          expect(cacheMissAfter).toEqual(cacheMissBefore + 1); // Cache should have been missed only for the first call
        });

        describe(`should fetch multiple times and miss the cache`, () => {
          const expectationResult = { key2: 'value2' };

          test(`when using TTL of 1 second and waiting more than 1 second between calls`, async () => {
            const cacheHitsBefore = require('./memoryCacheStorage').cacheHits;
            const cacheMissBefore = require('./memoryCacheStorage').cacheMiss;
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

            const cacheHitsAfter = require('./memoryCacheStorage').cacheHits;
            const cacheMissAfter = require('./memoryCacheStorage').cacheMiss;
            expect(cacheHitsAfter).toEqual(cacheHitsBefore + 1);
            expect(cacheMissAfter).toBeGreaterThan(cacheMissBefore);
          });
        });
      });

      describe(`when using file storage (on disk)`, () => {
        const storageOptions: StorageOptions = { storage: { type: 'disk', options: { filename: 'test-cache1.cache' } } };
        const key = 'key';

        test(`when using the default TTL`, async () => {
          expect(await cache(key, async () => {
            await waitFor(1);
            return expectationResult;
          }, storageOptions)).toEqual(expectationResult);
          expect(await cache(key, async () => {
            await waitFor(1);
            return Promise.resolve(expectationResult);
          }, storageOptions)).toEqual(expectationResult);

          await inDiskCacheReset(key, storageOptions);
        });

        describe(`should fetch multiple times and miss the cache`, () => {
          const expectationResult = { key2: 'value2' };
          const key = 'key2';

          test(`when using TTL of 1 second and waiting more than 1 second between calls`, async () => {
            await waitFor(1001);
            expect(await cache(key, async () => {
              await waitFor(1);
              return Promise.resolve(expectationResult);
            }, storageOptions)).toEqual(expectationResult);
            await waitFor(1001);
            expect(await cache(key, async () => {
              await waitFor(1);
              return Promise.resolve(expectationResult);
            }, storageOptions)).toEqual(expectationResult);

            await inDiskCacheReset(key, storageOptions);
          });
        });
      });
    });
  });
});
