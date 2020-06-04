export type CachedItem<T = any> = {
  timestamp: number;
  value: T;
};

let memoizeWithTTLCache: {
  [key: string]: CachedItem;
} = {};
export let cacheHits = 0;
export let cacheMiss = 0;

export const set = <T>(key: string, item: T): T => {
  ++cacheMiss;
  memoizeWithTTLCache[key] = {
    timestamp: +new Date(),
    value: item,
  };

  return item;
};

export const get = <T>(key: string): CachedItem<T> => {
  if (typeof memoizeWithTTLCache[key] !== 'undefined') {
    ++cacheHits;
  }

  return memoizeWithTTLCache[key];
};

export const reset = (): void => {
  cacheHits = 0;
  cacheMiss = 0;
  memoizeWithTTLCache = {};
};

export default memoizeWithTTLCache;
