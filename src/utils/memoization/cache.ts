import deepmerge from 'deepmerge';
import { CachedItem, CacheStorage, StorageOptions } from './cacheStorage';

type Options = {
  ttl?: number; // In seconds
  storage?: {
    type: 'memory';
  } | {
    type: 'disk';
    options: {
      filename: string;
    };
  };
  enabled: boolean;
}

const defaultOptions: Required<Options> = {
  ttl: 30,
  storage: {
    type: 'memory',
  },
  enabled: true,
};

/**
 * Returns the elapsed time between two timestamps, in seconds
 *
 * @param oldTimestamp
 * @param newTimestamp
 */
const getTimestampsElapsedTime = (oldTimestamp: number, newTimestamp: number): number => (newTimestamp - oldTimestamp) / 1000;

const cache = async <T>(keyResolver: string | (() => string), fct: () => T, options: Partial<Options> = defaultOptions): Promise<T> => {
  const { ttl, enabled, storage } = deepmerge(defaultOptions, options);

  if (!enabled) { // Bypasses cache completely
    // eslint-disable-next-line no-console
    console.debug('Cache is disabled, bypassing');
    return fct();
  }
  let cacheStorage: CacheStorage;
  let storageOptions: StorageOptions = {};

  if (storage.type === 'memory') {
    cacheStorage = require('./inMemoryCacheStorage');
  } else {
    cacheStorage = require('./inFileCacheStorage');
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

    if (getTimestampsElapsedTime(timestamp, +new Date()) < ttl) {
      return value;
    } else {
      // eslint-disable-next-line no-console
      console.debug('Cache key has expired');
    }
  } else {
    // eslint-disable-next-line no-console
    console.debug('Cache key does not exist');
    // eslint-disable-next-line no-console
    console.debug(cacheStorage);
  }

  const unMemoizedResult: T = await fct();
  return cacheStorage.set(key, unMemoizedResult, storageOptions);
};

export default cache;
