import { parse as parseSafe } from 'flatted';

export const deserializeSafe = <T>(serializedValue: string): T => {
  return parseSafe(serializedValue);

};

export default deserializeSafe;
