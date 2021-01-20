import { parse as parseSafe } from 'flatted';
import { RawAirtableDataset } from '../data/types/RawAirtableDataset';
import { SanitizedAirtableDataset } from '../data/types/SanitizedAirtableDataset';

export const deserializeSafe = <T>(serializedValue: string): T => {
  return parseSafe(serializedValue);

};

export default deserializeSafe;
