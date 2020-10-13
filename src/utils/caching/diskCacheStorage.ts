import * as Sentry from '@sentry/node';
import path from 'path';

import {
  deleteFile,
  readFile,
  writeFile,
} from '../node/fs-utils';
import {
  CachedItem,
  Get,
  HybridCacheStorage as GenericCacheStorage,
  Reset,
  Set,
  StorageOptions as GenericStorageOptions,
} from './hybridCacheStorage';

type StorageOptions = GenericStorageOptions<{ filename: string }>;
type CacheStorage = GenericCacheStorage<any, StorageOptions>;

const PREFIX = '.nrn';

export const get: Get = async <T>(key: string, options: StorageOptions): Promise<CachedItem<T>> => {
  const { filename } = options;
  let content;

  try {
    content = await readFile(path.resolve(PREFIX + '-' + key + '-' + filename), 'utf8');
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

export const set: Set = async <T>(key: string, item: T, options: StorageOptions): Promise<T> => {
  const { filename } = options;
  const cachedItem: CachedItem = {
    timestamp: +new Date(),
    value: item,
  };

  await writeFile(path.resolve(PREFIX + '-' + key + '-' + filename), JSON.stringify(cachedItem), 'utf8');

  return item;
};

export const reset: Reset = async (key, options: StorageOptions): Promise<void> => {
  const { filename } = options;

  try {
    await deleteFile(PREFIX + '-' + key + '-' + filename);
  } catch (e) {
    // File doesn't exist (normal when cache has never been written)
  }
  return;
};

export const cacheStorage: CacheStorage = {
  get,
  set,
};

