import { AirtableDBTable } from '@/modules/core/airtable/types/AirtableDBTable';

/**
 * Fields available on all consolidated airtable records.
 */
export type AirtableRecordBaseFields = {
  id: string; // All consolidated records have an id field, which is a duplicate from the airtable native id
  __typename: AirtableDBTable; // All consolidated records have a __typename field, which is resolved based on the table name it came from
};
