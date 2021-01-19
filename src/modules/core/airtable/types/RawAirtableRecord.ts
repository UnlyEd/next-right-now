import { AirtableDBTable } from './AirtableDBTable';
import { RawAirtableRecordBaseFields } from './RawAirtableRecordBaseFields';

/**
 * Airtable record shaped the way the API returns it (AKA "raw")
 *
 * A raw record doesn't have any dependency resolved.
 * All relationships are typed as string[], even for single items.
 * (yup, they designed their API that way, go figure)
 *
 * Raw airtable records aren't used by the application, not really.
 * They're mostly used/useful for testing because they represent real API data.
 */
export type RawAirtableRecord<Fields extends RawAirtableRecordBaseFields = RawAirtableRecordBaseFields> = {
  id: string;
  createdTime: string;
  fields: Partial<Fields>;
  __typename?: AirtableDBTable; // Field not preset upon fetch, but dynamically injected through "initDatasets" and available even before sanitization
};
