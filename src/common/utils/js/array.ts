import isArray from 'lodash.isarray';

/**
 * Finds the previous item of the current item, in an array of items.
 *
 * @param {T} currentItem
 * @param {T[]} items
 * @return {T}
 */
export const findPreviousItem = <T>(currentItem: T, items: T[]): T => {
  if (!isArray(items) || !currentItem) {
    return null;
  }

  const currentItemIndex: number = items.indexOf(currentItem);
  let previousItemIndex = currentItemIndex - 1;

  if (previousItemIndex < 0) { // Handles array overflow
    previousItemIndex = items.length - 1;
  }

  return items[previousItemIndex];
};

/**
 * Finds the previous item of the current item, in an array of items.
 *
 * @param {T} currentItem
 * @param {T[]} items
 * @return {T}
 */
export const findNextItem = <T>(currentItem: T, items: T[]): T => {
  if (!isArray(items) || !currentItem) {
    return null;
  }

  const currentItemIndex: number = items.indexOf(currentItem);
  let nextItemIndex = currentItemIndex + 1;

  if (nextItemIndex >= items.length) { // Handles array overflow
    nextItemIndex = 0;
  }

  return items[nextItemIndex];
};
