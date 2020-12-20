import { stringify as stringifySafe } from 'flatted';
import { Flatted } from '../../types/Flatted';
import { GenericObject } from '../../types/GenericObject';

/**
 * Serializes a dataset.
 *
 * The dataset should be a JS object.
 * The serialized dataset must be deserialized using Flatted library.
 *
 * XXX Serializing objects when sharing them from server to browser is a very efficient way to avoid serialization errors.
 *  When Next.js encounters a JS object that is returned as page props, it will serialize it automatically, using JSON.stringify.
 *  But, JSON.stringify will fail if the object contains circular references.
 *  Using Flatted is a more robust way to serialize data, and is required when using circular references.
 *
 * @param value
 * @see deserializeSafe
 */
export const serializeSafe = <T>(value: GenericObject | any[]): Flatted<T> => {
  return stringifySafe(value);
};

export default serializeSafe;
