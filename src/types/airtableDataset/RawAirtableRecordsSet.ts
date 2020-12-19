import { RawAirtableRecord } from '../airtableNativeAPI/RawAirtableRecord';
import { AirtableDBTable } from './AirtableDBTable';

export type RawAirtableRecordsSet = {
  records: RawAirtableRecord[];
  __typename: AirtableDBTable;
}
