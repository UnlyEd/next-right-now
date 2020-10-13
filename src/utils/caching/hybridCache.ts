import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import deepmerge from 'deepmerge';

import getTimestampsElapsedTime from '../time/getTimestampsElapsedTime';
import {
  CachedItem,
  HybridCacheStorage,
  StorageOptions,
} from './hybridCacheStorage';

const fileLabel = 'utils/cache/hybridCache';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type HybridCacheOptions = {
  ttl?: number; // Default: 30 (seconds). If 0 then cache won't be invalidated (no TTL)
  storage?: {
    type: 'memory'; // Default
  } | {
    type: 'disk';
    options: {
      filename: string;
    };
  };
  enabled: boolean; // Enabled by default
}

const defaultHybridCacheOptions: Required<HybridCacheOptions> = {
  ttl: 30,
  storage: {
    type: 'memory',
  },
  enabled: true,
};

/**
 * Hybrid cache, can use in-memory storage or on-disk storage.
 *
 * You can select the kind of storage you want through the options.
 *
 * Algorithm:
 *  - Check if cache exist for key, if not then call the dataResolver and cache the result.
 *  - If cache exists and record age is lower than TTL (default: 30 seconds), then return cached data. Otherwise, call the dataResolver and cache the result.
 *
 * Special considerations:
 *  - If options.ttl is 0, then TTL is disabled and data will live indefinitely
 *  - Memory cache storage is selected by default
 *  - Memory cache storage will not work if you want to cache data at build time, when building the pages (typically: SSG). You must use the disk for this kind of usage.
 *  - Disk cache storage works on Vercel, you need a writable file system
 *
 * @example With default (in-memory, TTL 30 secs)
 *  const stuff = await hybridCache('CustomerTable', async () => await fetchMyStuff());
 *
 * @example Using disk storage with no TTL, meant to cache stuff once for all pages during server initial build (for SSG, typically - IS_SERVER_INITIAL_BUILD comes from next.config.js)
 *  const stuff = await hybridCache('CustomerTable', async () => await fetchMyStuff(), { enabled: !!process.env.IS_SERVER_INITIAL_BUILD && process.env.NODE_ENV !== 'development', storage: {type: 'disk', options: {filename: 'my-stuff'}} });
 *
 * @param keyResolver string | Function Key used to store the data in the cache
 * @param dataResolver Function Has to be implemented by the caller and is supposed to take care of fetching the data
 * @param options HybridCacheOptions
 */
const hybridCache = async <T>(keyResolver: string | (() => string), dataResolver: () => T, options: Partial<HybridCacheOptions> = defaultHybridCacheOptions): Promise<T> => {
  const { ttl, enabled, storage } = deepmerge(defaultHybridCacheOptions, options);

  if (!enabled) { // Bypasses cache completely
    // eslint-disable-next-line no-console
    logger.debug('Cache is disabled, bypassing');
    return dataResolver();
  }
  let cacheStorage: HybridCacheStorage;
  let storageOptions: StorageOptions = {};

  if (storage.type === 'memory') {
    cacheStorage = require('./memoryCacheStorage');
  } else {
    cacheStorage = require('./diskCacheStorage');
    const { options } = storage;
    storageOptions = options;
  }

  let key: string;

  if (typeof keyResolver === 'function') {
    key = keyResolver();
  } else {
    key = keyResolver;
  }

  const cachedItem: CachedItem = await cacheStorage.get(key, storageOptions);

  if (typeof cachedItem !== 'undefined') {
    const { value, timestamp } = cachedItem;
    const elapsedSeconds: number = getTimestampsElapsedTime(timestamp, +new Date());

    // If TTL is disabled or if the cached value has not expired, then use the cache
    if (ttl === 0 || elapsedSeconds < ttl) {
      return value;
    } else {
      logger.debug('Cache key has expired');
    }
  } else {
    logger.debug('Cache key does not exist');
  }

  const unMemoizedResult: T = await dataResolver();

  try {
    // Attempt to cache the results, could fail if no write access to disk
    return cacheStorage.set(key, unMemoizedResult, storageOptions);

  } catch (e) {
    // In case of failure, catch error and process it, then return the expected results (caching won't work, but the app won't crash)
    logger.error(e);
    Sentry.withScope((scope) => {
      scope.setExtra('key', key); // Useful for debug
      Sentry.captureException(e);
    });

    return unMemoizedResult;
  }
};

export default hybridCache;
