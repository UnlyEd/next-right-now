export type CachedItem<T = any> = {
  timestamp: number;
  value: T;
};

let cache: {
  [key: string]: CachedItem;
} = {};
export let cacheHits = 0;
export let cacheMiss = 0;

export const set = <T>(key: string, item: T): T => {
  ++cacheMiss;
  cache[key] = {
    timestamp: +new Date(),
    value: item,
  };

  return item;
};

export const get = <T>(key: string): CachedItem<T> => {
  if (typeof cache[key] !== 'undefined') {
    ++cacheHits;
  }

  return cache[key];
};

export const reset = (): void => {
  cacheHits = 0;
  cacheMiss = 0;
  cache = {};
};

export default cache;
