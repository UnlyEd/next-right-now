import { Cache, CachedItem, CacheHits, CacheMiss, Get, HybridCacheStorage, Reset, Set } from './hybridCacheStorage';

let cache: Cache = {};
export let cacheHits: CacheHits = 0;
export let cacheMiss: CacheMiss = 0;

export const get: Get = async <T>(key: string): Promise<CachedItem<T>> => {
  if (typeof cache[key] !== 'undefined') {
    ++cacheHits;
  }

  return cache[key];
};

export const set: Set = async <T>(key: string, item: T): Promise<T> => {
  ++cacheMiss;
  cache[key] = {
    timestamp: +new Date(),
    value: item,
  };

  return item;
};

export const reset: Reset = (): Promise<void> => {
  cacheHits = 0;
  cacheMiss = 0;
  cache = {};

  return;
};

export const cacheStorage: HybridCacheStorage = {
  get,
  set,
};

