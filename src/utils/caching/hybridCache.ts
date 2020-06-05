import { createLogger } from '@unly/utils-simple-logger';
import deepmerge from 'deepmerge';
import { CachedItem, HybridCacheStorage, StorageOptions } from './hybridCacheStorage';

const fileLabel = 'utils/cache/cache';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

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

const hybridCache = async <T>(keyResolver: string | (() => string), fct: () => T, options: Partial<Options> = defaultOptions): Promise<T> => {
  const { ttl, enabled, storage } = deepmerge(defaultOptions, options);

  if (!enabled) { // Bypasses cache completely
    // eslint-disable-next-line no-console
    console.debug('Cache is disabled, bypassing');
    return fct();
  }
  let cacheStorage: HybridCacheStorage;
  let storageOptions: StorageOptions = {};

  if (storage.type === 'memory') {
    cacheStorage = require('./inMemoryCacheStorage');
  } else {
    cacheStorage = require('./inDiskCacheStorage');
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
      logger.debug('Cache key has expired');
    }
  } else {
    logger.debug('Cache key does not exist');
  }

  const unMemoizedResult: T = await fct();
  return cacheStorage.set(key, unMemoizedResult, storageOptions);
};

export default hybridCache;
