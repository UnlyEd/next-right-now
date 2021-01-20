import { TableFallbackSchema } from './TableFallbackSchema';

/**
 * Represents the schema of several tables fallback.
 */
export type TablesFallbackSchema = {
  [fieldName: string]: TableFallbackSchema;
}
