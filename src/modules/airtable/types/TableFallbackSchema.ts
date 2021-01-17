/**
 * Represents the schema of a table fallback.
 *
 * A table can configure another table as its own fallback table.
 * A fallback table acts as a mirror to the source table,
 * and all fields that aren't defined in the source table will automatically use the fields defined in the fallback table.
 *
 * This allows to automatically synchronize default values between fields that belong to different tables.
 */
export type TableFallbackSchema = {
  fallbackFieldName: string;
  fields: string[];
}
