import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import size from 'lodash.size';
import { RawAirtableRecord } from './types/RawAirtableRecord';

/**
 * Resolve the best translation for a given field, based on the available data within its own record
 *
 * It will return the first available value, based on the order of the preferred locales
 *
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour', labelEN: 'Hi' }, 'labelFR', ['en', 'fr']) => { genericLocalisedFieldName: 'label', value: 'Bonjour' }
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour', labelEN: 'Hi' }, 'labelEN', ['en', 'fr']) => { genericLocalisedFieldName: 'label', value: 'Hi' }
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour' }, 'labelFR', ['en', 'fr']) => { genericLocalisedFieldName: 'label', value: 'Bonjour' }
 * @example getFieldBestAvailableTranslation({ labelFR: 'Bonjour' }, 'labelEN', ['en', 'fr']) => { genericLocalisedFieldName: 'label', value: 'Bonjour' }
 *
 * @param rawRecord Sanitized Airtable record, we use the consolidated record because it contains the resolved relationships
 * @param genericFieldName Generic i18n field name for which the best available translation is being resolved
 * @param preferredLocalesOrLanguages Locales/languages in preferred order, will be used to resolve which value should i18n fields use depending on the available translations
 */
export const getFieldBestAvailableTranslation = (rawRecord: RawAirtableRecord, genericFieldName: string, preferredLocalesOrLanguages: string[]): string => {
  // Resolve value to use, depending on what values are available and the preferred locales order
  // Basically, if the current locale is "FR" and we got a value for a "labelFR" then we use it
  // If we don't have a value in "labelFR" then we fallback to `label${DEFAULT_LOCALE}` (i.e: labelEN)
  for (let i = 0; i < size(preferredLocalesOrLanguages); i++) {
    const locale: string = preferredLocalesOrLanguages[i];
    const value: string = get(rawRecord?.fields, `${genericFieldName}${locale.toUpperCase()}`);

    // Return the first non-empty value found
    if (!isEmpty(value)) {
      return value;
    }
  }

  // If no value is found (no translation provided), then return null
  // XXX Important for serialization ("undefined" can't be serialised)
  return null;
};
