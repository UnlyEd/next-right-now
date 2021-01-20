import * as Sentry from '@sentry/node';
import path from 'path';
import { deleteFile, readFile, writeFile } from '@/utils/fs-utils';
import {
  CachedItem,
  Get,
  HybridCacheStorage as GenericCacheStorage,
  Reset,
  Set,
  HybridStorageOptions as GenericStorageOptions,
} from './types/hybridCacheStorage';

export type DiskStorageOptions = GenericStorageOptions<{
  filename: string;
  prefix: string;
  suffix: string;
}>;
type CacheStorage = GenericCacheStorage<any, DiskStorageOptions>;

export const DEFAULT_PREFIX = 'hybrid-cache';
export const DEFAULT_SUFFIX = 'cache';

export const resolveCacheFile = (prefix: string, suffix: string, key: string, filename: string): string => {
  return path.resolve(`.${prefix || DEFAULT_PREFIX}-${key}-${filename}.${suffix || DEFAULT_SUFFIX}`);
};

export const get: Get = async <T>(key: string, options: DiskStorageOptions): Promise<CachedItem<T>> => {
  const { filename, prefix, suffix } = options;
  let content;

  try {
    content = await readFile(resolveCacheFile(prefix, suffix, key, filename), 'utf8');
  } catch (e) {
    // File doesn't exist (normal when cache has never been written)
  }

  let cachedItem: CachedItem;

  if (typeof content !== 'undefined') {
    try {
      cachedItem = JSON.parse(content);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      Sentry.captureException(e);
    }
  }

  return cachedItem;
};

export const set: Set = async <T>(key: string, item: T, options: DiskStorageOptions): Promise<T> => {
  const { filename, prefix, suffix } = options;
  const cachedItem: CachedItem = {
    timestamp: +new Date(),
    value: item,
  };

  await writeFile(path.resolve(resolveCacheFile(prefix, suffix, key, filename)), JSON.stringify(cachedItem), 'utf8');

  return item;
};

export const reset: Reset = async (key, options: DiskStorageOptions): Promise<void> => {
  const { filename, prefix, suffix } = options;

  try {
    await deleteFile(resolveCacheFile(prefix, suffix, key, filename));
  } catch (e) {
    // File doesn't exist (normal when cache has never been written)
  }
  return;
};

export const cacheStorage: CacheStorage = {
  get,
  set,
};

