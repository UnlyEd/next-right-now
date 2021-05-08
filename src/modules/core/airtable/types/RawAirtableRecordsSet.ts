import { AirtableDBTable } from './AirtableDBTable';
import { RawAirtableRecord } from './RawAirtableRecord';

export type RawAirtableRecordsSet = {
  records: RawAirtableRecord[];
  __typename: AirtableDBTable;
}
