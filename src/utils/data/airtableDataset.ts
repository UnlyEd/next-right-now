import map from 'lodash.map';
import { AirtableDataset } from '../../types/data/AirtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { BaseTableType } from '../api/fetchAirtableTable';

type recordsSet = {
  records: AirtableRecord[];
  __typename: BaseTableType;
}

/**
 * Consolidate a dataset based on multiple recordsSets
 *
 * Each recordsSet is basically the result of a full table fetch (a list of records sharing the same data structure)
 *
 * @param recordsSets
 */
export const buildDataset = (recordsSets: recordsSet[]): AirtableDataset => {
  const dataset: AirtableDataset = {};

  map(recordsSets, (recordsSet) => {
    map(recordsSet.records, (record: AirtableRecord) => {
      dataset[record.id] = {
        ...record,
        __typename: recordsSet.__typename,
      };
    });
  });

  return dataset;
};
