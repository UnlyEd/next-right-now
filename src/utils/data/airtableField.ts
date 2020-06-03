import endsWith from 'lodash.endswith';
import get from 'lodash.get';
import map from 'lodash.map';
import { AirtableFieldsMapping } from '../../types/data/AirtableFieldsMapping';
import { DEFAULT_LOCALE } from '../i18n/i18n';
import { GenericRecord } from './record';

/**
 * Default field mappings between entities (helps resolve relationships)
 *
 * The key (left) represents a field name
 * The value (right) represents an Airtable entity (table)
 *
 * It can be extended for advanced use case
 * (like when a field with a generic name like "items" is linked to a table "Product")
 */
export const DEFAULT_FIELDS_MAPPING: AirtableFieldsMapping = {
  customer: 'Customer',
  customers: 'Customer',
  product: 'Product',
  products: 'Product',
  theme: 'Theme',
  themes: 'Theme',
};

/**
 * If the field ends with any of the locales then it's considered as a localised field
 *
 * @param fieldName
 * @param locales
 */
export const isLocalisedField = (fieldName: string, locales: string[]): boolean => {
  let isLocalisedField = false;

  map(locales, (locale: string) => {
    if (endsWith(fieldName, locale.toUpperCase())) {
      isLocalisedField = true;
    }
  });

  return isLocalisedField;
};

/**
 * Resolve the generic name of a localised field
 * The generic name will eventually be used to contain the value we want to display to the end-user, based on localisation
 *
 * @example getGenericLocalisedFieldName('labelEN') => 'label'
 * @example getGenericLocalisedFieldName('descriptionFR') => 'description'
 *
 * @param fieldName
 */
export const getGenericLocalisedFieldName = (fieldName: string): string => {
  return fieldName.slice(0, fieldName.length - DEFAULT_LOCALE.length); // This only works if all locales use the same number of chars (2, currently)
};

/**
 * Resolve whether the record contains a generic localised field
 * If it does, it means the a higher priority localised value has been applied already
 *
 * @param record
 * @param fieldName
 */
export const hasGenericLocalisedField = (record: GenericRecord, fieldName: string): boolean => {
  const NOT_FOUND = '__FAKE_VALUE_THAT_MUST_MATCH_NO_FIELD__';
  return get(record, getGenericLocalisedFieldName(fieldName), NOT_FOUND) !== NOT_FOUND;
};
