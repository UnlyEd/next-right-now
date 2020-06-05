import deepmerge from 'deepmerge';
import cache, { CachedItem, get, set } from './inMemoryCache';

type Options = {
  ttl?: number; // In seconds
  storage?: {
    type: 'memory';
  } | {
    type: 'disk';
    filename: string;
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

const memoizeWithTTL = async <T>(keyResolver: string | (() => string), fct: () => T, options: Partial<Options> = defaultOptions): Promise<T> => {
  const { ttl, enabled, storage } = deepmerge(defaultOptions, options);

  if (!enabled) { // Bypasses cache completely
    // eslint-disable-next-line no-console
    console.debug('Cache is disabled, bypassing');
    return fct();
  }

  let key: string;

  if (typeof keyResolver === 'function') {
    key = keyResolver();
  } else {
    key = keyResolver;
  }

  const cachedItem: CachedItem = get(key);

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
    console.debug(cache);
  }

  const unMemoizedResult: T = await fct();
  return set(key, unMemoizedResult);
};

export default memoizeWithTTL;
