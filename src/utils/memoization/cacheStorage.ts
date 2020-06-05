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
export type Reset<> = () => Promise<void>;
export type Cache<T = any> = {
  [key: string]: CachedItem<T>;
}
export type CacheHits = number;
export type CacheMiss = number;

export type CacheStorage<T = any, Options extends StorageOptions = {}> = {
  get: Get<T, Options>;
  set: Set<T, Options>;
};
