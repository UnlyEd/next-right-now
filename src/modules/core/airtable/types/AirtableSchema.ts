import { AirtableDBTable } from './AirtableDBTable';
import { TableSchema } from './TableSchema';

/**
 * Represents the schema of all Airtable tables.
 */
export type AirtableSchema = {
  [tableName in AirtableDBTable]?: TableSchema;
}
