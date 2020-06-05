import path from 'path';
import { readFile, writeFile } from '../node/fs-utils';
import {
  CachedItem,
  CacheHits,
  CacheMiss,
  CacheStorage as GenericCacheStorage,
  Get,
  Reset,
  Set,
  StorageOptions as GenericStorageOptions,
} from './cacheStorage';

type StorageOptions = GenericStorageOptions<{ filename: string }>;
type CacheStorage = GenericCacheStorage<any, StorageOptions>;

export let cacheHits: CacheHits = 0;
export let cacheMiss: CacheMiss = 0;

export const get: Get = async <T>(key: string, options: StorageOptions): Promise<CachedItem<T>> => {
  const { filename } = options;
  const content = await readFile(path.resolve(filename + '-' + key), 'utf8');
  console.log('content', content);
  const cachedItem: CachedItem = JSON.parse(content);

  if (typeof cachedItem !== 'undefined') {
    ++cacheHits;
  }

  return cachedItem;
};

export const set: Set = async <T>(key: string, item: T, options: StorageOptions): Promise<T> => {
  const { filename } = options;
  const cachedItem: CachedItem = {
    timestamp: +new Date(),
    value: item,
  };

  ++cacheMiss;

  await writeFile(filename + '-' + key, JSON.stringify(cachedItem), 'utf8');

  return item;
};

export const reset: Reset = (): Promise<void> => {
  cacheHits = 0;
  cacheMiss = 0;
  // TODO

  return;
};

export const cacheStorage: CacheStorage = {
  get,
  set,
};

