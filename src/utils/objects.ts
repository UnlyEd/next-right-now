import every from 'lodash.every';
import isEmpty from 'lodash.isempty';

/**
 * Converts the given object to null if it's an empty object, or if all its properties are "empty"
 *
 * Returns the initial object untouched otherwise
 *
 * FIXME Doesn't work properly, not used ATM
 *
 * @param {object} obj
 * @return {object | null}
 */
export const nullifyEmptyNested = (obj: object): object | null => {
  if (isEmpty(obj)) {
    return null;
  } else {
    if (every(obj, isEmpty)) {
      return null;
    } else {
      return obj;
    }
  }
};
