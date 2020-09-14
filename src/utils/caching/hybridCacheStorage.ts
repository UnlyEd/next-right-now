/**
 * Generic definition of a cache storage
 *
 * Meant to be used to build various cache storage implementations
 */
export type CachedItem<T = any> = {
  timestamp: number;
  value: T;
};

export type StorageOptions<Options extends {} = {}> = Options;
export type Get<T = any, Options extends StorageOptions = {}> = <T>(key: string, options?: Options) => Promise<CachedItem<T>>;
export type Set<T = any, Options extends StorageOptions = {}> = <T>(key: string, item: T, options?: Options) => Promise<T>;
export type Reset<Options extends StorageOptions = {}> = (string?, options?: Options) => Promise<void>;
export type Cache<T = any> = {
  [key: string]: CachedItem<T>;
}
export type CounterCacheFound = number;
export type CounterCacheMiss = number;
export type CounterCacheSet = number;

export type HybridCacheStorage<T = any, Options extends StorageOptions = {}> = {
  get: Get<T, Options>;
  set: Set<T, Options>;
};
