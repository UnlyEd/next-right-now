import { BaseTable } from '../../utils/api/fetchAirtableTable';

export type AirtableFieldMapping = {
  table: BaseTable;
  isArray: boolean;
};

/**
 * Mapping of Airtable fields
 *
 * Airtable doesn't tell us if a field "products" is supposed to be an instance of "Product"
 * This helps dynamically resolving such links (relationships) between records by manually defining which fields should be mapped to which entity
 *
 * For the sake of simplicity, DEFAULT_FIELDS_MAPPING contains all mappings (singular/plural)
 *
 * @example { customer: Customer, customers: Customer, products: Product }
 */
export type AirtableFieldsMapping = {
  [key: string]: AirtableFieldMapping;
}
