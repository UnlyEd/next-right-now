import map from 'lodash.map';
import { RawAirtableRecord } from './types/RawAirtableRecord';
import { RawAirtableRecordsSet } from './types/RawAirtableRecordsSet';
import { AirtableDatasets } from '../data/types/AirtableDatasets';

/**
 * Prepare the raw and sanitized airtable datasets.
 *
 * Each RawAirtableRecordsSet is basically the result of a full table fetch (a list of records sharing the same data structure).
 *
 * @param rawAirtableRecordsSets
 */
export const prepareAirtableDS = (rawAirtableRecordsSets: RawAirtableRecordsSet[]): AirtableDatasets => {
  const datasets: AirtableDatasets = {
    raw: {},
    sanitized: {},
  };

  map(rawAirtableRecordsSets, (rawRecordsSet: RawAirtableRecordsSet) => {
    map(rawRecordsSet.records, (record: RawAirtableRecord) => {
      datasets.raw[record.id] = {
        ...record,
        __typename: rawRecordsSet.__typename,
      };
    });
  });

  return datasets;
};

export default prepareAirtableDS;
