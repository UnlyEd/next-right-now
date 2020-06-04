import endsWith from 'lodash.endswith';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import map from 'lodash.map';
import { AirtableFieldsMapping } from '../../types/data/AirtableFieldsMapping';
import { AirtableRecord } from '../../types/data/AirtableRecord';
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
  customer: {
    table: 'Customer',
    isArray: false,
  },
  customers: {
    table: 'Customer',
    isArray: true,
  },
  product: {
    table: 'Product',
    isArray: false,
  },
  products: {
    table: 'Product',
    isArray: true,
  },
  theme: {
    table: 'Theme',
    isArray: false,
  },
  themes: {
    table: 'Theme',
    isArray: true,
  },
  logo: {
    table: 'Asset',
    isArray: false,
  },
  images: {
    table: 'Asset',
    isArray: true,
  },
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
export const hasGenericLocalisedField = (record: AirtableRecord<GenericRecord>, fieldName: string): boolean => {
  const NOT_FOUND = '__FAKE_VALUE_THAT_MUST_MATCH_NO_FIELD__';
  return get(record, `fields.${getGenericLocalisedFieldName(fieldName)}`, NOT_FOUND) !== NOT_FOUND;
};

/**
 * Resolve the best translation for a given field, based on the available data within its own record
 *
 * It will return the first available value, based on the order of the preferred locales
 *
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour', labelEN: 'Hi' }, 'labelFR', ['en', 'fr']) => { genericLocalisedField: 'label', value: 'Hi' }
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour', labelEN: 'Hi' }, 'labelEN', ['en', 'fr']) => { genericLocalisedField: 'label', value: 'Hi' }
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour' }, 'labelFR', ['en', 'fr']) => { genericLocalisedField: 'label', value: 'Bonjour' }
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour' }, 'labelEN', ['en', 'fr']) => { genericLocalisedField: 'label', value: 'Bonjour' }
 *
 * @param record
 * @param fieldName
 * @param preferredLocales
 */
export const getFieldBestAvailableTranslation = (record: AirtableRecord<GenericRecord>, fieldName: string, preferredLocales: string[]): { genericLocalisedField?: string; value?: string } => {
  let result = {};

  // If the record contains the generic localised field, then it's been resolved already in a previous loop iteration (ignore)
  const hasBeenLocalised = isLocalisedField(fieldName, preferredLocales) ? hasGenericLocalisedField(record, fieldName) : false;

  // Resolve value to use, depending on what value is available
  // Basically, if the current locale is "FR" and we got a value for a "labelFR" then we use it
  // If we don't have a value in "labelFR" then we fallback to `label${DEFAULT_LOCALE}` (i.e: labelEN)
  if (isLocalisedField(fieldName, preferredLocales) && !hasBeenLocalised) {
    const genericLocalisedField = getGenericLocalisedFieldName(fieldName);

    map(preferredLocales, (locale: string) => {
      if (isEmpty(result)) { // TODO Optimisation, should break loop when result is found instead
        const hasBeenLocalised = isLocalisedField(fieldName, preferredLocales) ? hasGenericLocalisedField(record, fieldName) : false;
        const value = get(record, `fields.${genericLocalisedField}${locale.toUpperCase()}`); // Look into the record, because field may not have been copied onto sanitizedFields yet

        if (value && !hasBeenLocalised) {
          result = {
            genericLocalisedField,
            value,
          };
        }
      }
    });
  }

  return result;
};
