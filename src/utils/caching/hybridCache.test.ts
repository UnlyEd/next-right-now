import waitFor from '../timers/waitFor';
import { reset as inDiskCacheReset } from './diskCacheStorage';
import cache from './hybridCache';
import { StorageOptions } from './hybridCacheStorage';
import { reset as inMemoryCacheReset } from './memoryCacheStorage';

/**
 * @group unit
 * @group utils
 */
describe(`utils/memoization/cache.ts`, () => {
  beforeEach(() => {
    global.console = global.muteConsole();
  });

  describe(`cache`, () => {
    describe(`should not fetch multiple times in a row but rely on the cache instead`, () => {
      afterEach(() => {
        inMemoryCacheReset();
      });
      const expectedResult = { key: 'value' };

      describe(`when using in-memory storage`, () => {
        describe(`should fetch once and use the cache for subsequent calls`, () => {
          test(`when using the default TTL and calls are made before TTL expires`, async () => {
            const counterCacheMissBefore = require('./memoryCacheStorage').counterCacheMiss;
            const counterCacheFoundBefore = require('./memoryCacheStorage').counterCacheFound;
            const counterCacheSetBefore = require('./memoryCacheStorage').counterCacheSet;
            let counterDataResolverCalls = 0;

            // The first call should yield a cache miss and a cache set
            expect(await cache('key', async () => {
              ++counterDataResolverCalls;
              return expectedResult;
            })).toEqual(expectedResult);
            expect(counterDataResolverCalls).toEqual(1); // Should be called to resolve data
            // The second call should yield a cache found
            expect(await cache('key', async () => {
              ++counterDataResolverCalls;
              return Promise.resolve(expectedResult);
            })).toEqual(expectedResult);
            expect(counterDataResolverCalls).toEqual(1); // Shouldn't be called but use data from cache instead

            const counterCacheMissAfter = require('./memoryCacheStorage').counterCacheMiss;
            const counterCacheFoundAfter = require('./memoryCacheStorage').counterCacheFound;
            const counterCacheSetAfter = require('./memoryCacheStorage').counterCacheSet;
            expect(counterCacheMissAfter).toEqual(counterCacheMissBefore + 1); // Cache should have been missed only once, during first call
            expect(counterCacheFoundAfter).toEqual(counterCacheFoundBefore + 1); // Cache should have been found only once, during second call
            expect(counterCacheSetAfter).toEqual(counterCacheSetBefore + 1); // Cache should have been set only once, during first call
          });
        });

        describe(`should fetch multiple times and miss the cache`, () => {
          const expectedResult = { key2: 'value2' };

          test(`when using TTL of 1 second and waiting more than 1 second between calls`, async () => {
            const counterCacheMissBefore = require('./memoryCacheStorage').counterCacheMiss;
            const counterCacheFoundBefore = require('./memoryCacheStorage').counterCacheFound;
            const counterCacheSetBefore = require('./memoryCacheStorage').counterCacheSet;
            let counterDataResolverCalls = 0;

            // The first call should yield a cache miss and a cache set
            expect(await cache('key2', async () => {
              ++counterDataResolverCalls;
              return Promise.resolve(expectedResult);
            }, { ttl: 1 })).toEqual(expectedResult);
            expect(counterDataResolverCalls).toEqual(1); // Should be called to resolve data
            await waitFor(1001);
            // The second call should yield a cache found but a cache set too, because TTL has expired and cache shouldn't be used
            expect(await cache('key2', async () => {
              ++counterDataResolverCalls;
              return Promise.resolve(expectedResult);
            }, { ttl: 1 })).toEqual(expectedResult);
            expect(counterDataResolverCalls).toEqual(2); // Should have been called to resolve data again

            const counterCacheMissAfter = require('./memoryCacheStorage').counterCacheMiss;
            const counterCacheFoundAfter = require('./memoryCacheStorage').counterCacheFound;
            const counterCacheSetAfter = require('./memoryCacheStorage').counterCacheSet;
            expect(counterCacheMissAfter).toEqual(counterCacheMissBefore + 1); // Cache should have been missed only once, during first call
            expect(counterCacheFoundAfter).toEqual(counterCacheFoundBefore + 1); // Cache should have been found only once, during second call (but was not used because expired)
            expect(counterCacheSetAfter).toEqual(counterCacheSetBefore + 2); // Cache should have been set twice, during first call (cache miss) and second call (TTL expired)
          });

          test(`when using TTL of 0 second (cache is disabled)`, async () => {
            const counterCacheMissBefore = require('./memoryCacheStorage').counterCacheMiss;
            const counterCacheFoundBefore = require('./memoryCacheStorage').counterCacheFound;
            const counterCacheSetBefore = require('./memoryCacheStorage').counterCacheSet;
            let counterDataResolverCalls = 0;

            // The first call should yield a cache miss and a cache set
            expect(await cache('key2', async () => {
              ++counterDataResolverCalls;
              return Promise.resolve(expectedResult);
            }, { ttl: 0 })).toEqual(expectedResult);
            // await waitFor(1001); // Waiting or not waiting shouldn't change anything, so we don't wait to make test faster
            // The second call should yield a cache found
            expect(await cache('key2', async () => {
              ++counterDataResolverCalls;
              return Promise.resolve(expectedResult);
            }, { ttl: 0 })).toEqual(expectedResult);
            expect(counterDataResolverCalls).toEqual(1); // Shouldn't be called but should use data from cache instead

            const counterCacheMissAfter = require('./memoryCacheStorage').counterCacheMiss;
            const counterCacheFoundAfter = require('./memoryCacheStorage').counterCacheFound;
            const counterCacheSetAfter = require('./memoryCacheStorage').counterCacheSet;
            expect(counterCacheMissAfter).toEqual(counterCacheMissBefore + 1); // Cache should have been missed only once, during first call
            expect(counterCacheFoundAfter).toEqual(counterCacheFoundBefore + 1); // Cache should have been found only once, during second call
            expect(counterCacheSetAfter).toEqual(counterCacheSetBefore + 1); // Cache should have been set only once, during first call
          });
        });
      });

      describe(`when using file storage (on disk)`, () => {
        const storageOptions: StorageOptions = { storage: { type: 'disk', options: { filename: 'test-cache1.cache' } } };
        const key = 'key';

        test(`when using the default TTL`, async () => {
          expect(await cache(key, async () => {
            return expectedResult;
          }, storageOptions)).toEqual(expectedResult);
          expect(await cache(key, async () => {
            return Promise.resolve(expectedResult);
          }, storageOptions)).toEqual(expectedResult);

          await inDiskCacheReset(key, storageOptions);
        });

        describe(`should fetch multiple times and miss the cache`, () => {
          const expectedResult = { key2: 'value2' };
          const key = 'key2';

          test(`when using TTL of 1 second and waiting more than 1 second between calls`, async () => {
            await waitFor(1001);
            expect(await cache(key, async () => {
              return Promise.resolve(expectedResult);
            }, storageOptions)).toEqual(expectedResult);
            await waitFor(1001);
            expect(await cache(key, async () => {
              return Promise.resolve(expectedResult);
            }, storageOptions)).toEqual(expectedResult);

            await inDiskCacheReset(key, storageOptions);
          });
        });
      });
    });
  });
});
