import {
  Cache,
  CachedItem,
  CounterCacheFound,
  CounterCacheMiss,
  CounterCacheSet,
  Get,
  HybridCacheStorage,
  Reset,
  Set,
} from './hybridCacheStorage';

let cache: Cache = {};
export let counterCacheMiss: CounterCacheMiss = 0;
export let counterCacheFound: CounterCacheFound = 0;
export let counterCacheSet: CounterCacheSet = 0;

export const get: Get = async <T>(key: string): Promise<CachedItem<T>> => {
  if (typeof cache[key] !== 'undefined') {
    ++counterCacheFound;
  } else {
    ++counterCacheMiss;
  }

  return cache[key];
};

export const set: Set = async <T>(key: string, item: T): Promise<T> => {
  ++counterCacheSet;
  cache[key] = {
    timestamp: +new Date(),
    value: item,
  };

  return item;
};

export const reset: Reset = (): Promise<void> => {
  counterCacheFound = 0;
  counterCacheMiss = 0;
  counterCacheSet = 0;
  cache = {};

  return;
};

export const cacheStorage: HybridCacheStorage = {
  get,
  set,
};

