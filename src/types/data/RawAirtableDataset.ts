import { AirtableDBTable } from '../airtableDataset/AirtableDBTable';
import { RawAirtableRecord } from '../airtableNativeAPI/RawAirtableRecord';

/**
 * Dataset containing all raw airtable records indexed by their airtable "id" field
 *
 * @example { 'reci9HYsoqd1xScsi': { __typename: 'Customer', id: 'reci9HYsoqd1xScsi', fields: { aid: 1 } } }
 */
export type RawAirtableDataset = {
  [id: string]: RawAirtableRecord & {
    __typename: AirtableDBTable
  };
}
