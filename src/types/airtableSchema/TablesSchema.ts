import { AirtableDBTable } from '../airtableDataset/AirtableDBTable';
import { TableSchema } from './TableSchema';

/**
 * Represents the schema of all Airtable tables.
 */
export type TablesSchema = {
  [tableName in AirtableDBTable]?: TableSchema;
}
