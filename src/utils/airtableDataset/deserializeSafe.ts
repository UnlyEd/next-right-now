import { parse as parseSafe } from 'flatted';
import { RawAirtableDataset } from '../../types/data/RawAirtableDataset';
import { SanitizedAirtableDataset } from '../../types/data/SanitizedAirtableDataset';

export const deserializeSafe = <T>(serializedValue: string): T => {
  return parseSafe(serializedValue);

};

export default deserializeSafe;
