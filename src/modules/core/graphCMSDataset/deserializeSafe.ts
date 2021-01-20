import { parse as parseSafe } from 'flatted';

/**
 * Deserializes a serialized dataset.
 *
 * The serialized dataset must be created using the Flatter library.
 *
 * @param serializedValue
 * @see serializeSafe
 */
export const deserializeSafe = <T>(serializedValue: string): T => {
  if(typeof serializedValue !== 'string'){
    throw new Error(`The deserialization expects the serializedValue to be of type "string, got ${typeof serializedValue}`);
  }

  return parseSafe(serializedValue);
};

export default deserializeSafe;
