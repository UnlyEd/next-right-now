import * as Sentry from '@sentry/node';
import map from 'lodash.map';
import { AirtableRecord } from '../data/types/AirtableRecord';
import { GenericObject } from '../data/types/GenericObject';

/**
 * Resolve a fallback record and apply it as fallback using deep merge.
 * Useful to make a particular record properties fall back to another value that's coming from another record that shares the same properties.
 *
 * @param record
 * @param recordFieldName
 * @param fallbackRecord
 */
export const applyRecordFallback = <Fields extends GenericObject = GenericObject>(record: AirtableRecord<Fields>, recordFieldName: string, fallbackRecord: Partial<AirtableRecord<Fields>>): any => {
  // Iterate on "fallbackRecord" instead of "record" because there might be less fields and thus faster
  map(fallbackRecord, (fallbackValue: any, fieldName: string) => {
    const value: any = record?.[recordFieldName]?.[fieldName] ?? null; // Force coalesce nullish values to null

    try {
      if (value === null && fallbackValue !== null) {
        record[recordFieldName][fieldName] = fallbackValue;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      Sentry.captureException(e);
    }
  });

  return record[recordFieldName];
};

export default applyRecordFallback;
