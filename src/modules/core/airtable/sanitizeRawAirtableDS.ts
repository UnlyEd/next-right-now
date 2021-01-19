import * as Sentry from '@sentry/node';
import cloneDeep from 'lodash.clonedeep';
import filter from 'lodash.filter';
import find from 'lodash.find';
import get from 'lodash.get';
import isArray from 'lodash.isarray';
import map from 'lodash.map';
import size from 'lodash.size';
import { AirtableDBTable } from './types/AirtableDBTable';
import { RawAirtableAttachmentBaseFields } from './types/RawAirtableAttachmentBaseFields';
import { RawAirtableRecord } from './types/RawAirtableRecord';
import { AirtableSchema } from './types/AirtableSchema';
import { FieldSchema } from './types/FieldSchema';
import { TableSchema } from './types/TableSchema';
import { AirtableAttachment } from '../data/types/AirtableAttachment';
import { AirtableDatasets } from '../data/types/AirtableDatasets';
import { AirtableRecord } from '../data/types/AirtableRecord';
import { RawAirtableDataset } from '../data/types/RawAirtableDataset';
import { SanitizedAirtableDataset } from '../data/types/SanitizedAirtableDataset';
import { getFieldBestAvailableTranslation } from './airtableField';

const warnWhenMissingTypename = (rawRecord: RawAirtableRecord) => {
  if (!rawRecord?.__typename) {
    const message = `Couldn't resolve typename for raw airtable record:`;
    // eslint-disable-next-line no-console
    console.warn(message, JSON.stringify(rawRecord, null, 2));

    Sentry.withScope((scope): void => {
      scope.setContext('rawAirtableRecord', rawRecord);
      Sentry.captureMessage(message, Sentry.Severity.Warning);
    });
  }
};

/**
 * Run transformations on the raw airtable dataset that are meant to sanitize the dataset.
 *
 * Those transformations are only applied to the fields described in the airtable schema.
 * Those transformations dp not mutate the rawAirtableDataset.
 *
 * Performs transformations for every field in every table, in the following order:
 *  Phase A (each transformation applies once per record):
 *    1) isExtendedAttachmentTable: Resolve special extended attachment table
 *  Phase B (each transformation applies once per field):
 *    1) transformRawValue: Transform the value, this is very handy when the airtable API doesn't return the value using your desired shape.
 *    2) defaultRawValue: Apply a default value if the current value is null|undefined.
 *    3) asSingleRecord: If true and the value is an array, will convert the array into a single entity (Asset[] => Asset)
 *    4) asAttachment: If set, will resolve airtable's native attachment fields
 *    5) isI18n: If true, will consider the field as an i18n field (e.g: FR/EN field variants)
 *        and resolve the best available translation based on the available translations
 *    6) transformSanitizedValue: Transform the sanitized value.
 *    7) defaultSanitizedValue: Apply a default value if the sanitized value is null|undefined.
 *    7) Replace "\n" by "null" to avoid false-positive "non-empty" content, because Airtable automatically adds a breakline to all Long Text fields when they're empty.
 *    9) built-in: Handle automated default value to protect against exception during serialization. ([]|null)
 *    10) renameAs: Rename the field
 *
 * @param airtableSchema
 * @param airtableDatasets
 * @param preferredLocalesOrLanguages
 * @param filterByPredicate Optional lodash.filter predicate to filter the whole raw dataset (after it's been fetched).
 *  Different than per-table filterByFormula which is applied directly by the Airtable API).
 *  See https://lodash.com/docs/4.17.15#filter
 */
export const sanitizeRawAirtableDS = (airtableSchema: AirtableSchema, airtableDatasets: AirtableDatasets, preferredLocalesOrLanguages: string[], filterByPredicate?: any): SanitizedAirtableDataset => {
  let rawAirtableDataset: RawAirtableDataset;
  if (filterByPredicate) {
    rawAirtableDataset = filter(airtableDatasets.raw, filterByPredicate);
  }
  rawAirtableDataset = rawAirtableDataset ?? airtableDatasets.raw;
  const sanitizedAirtableDataset: SanitizedAirtableDataset = cloneDeep(rawAirtableDataset);

  map(rawAirtableDataset, (rawRecord: RawAirtableRecord) => {
    warnWhenMissingTypename(rawRecord);

    const sanitizedRecord: AirtableRecord = {
      __typename: rawRecord?.__typename,
      id: rawRecord?.id,
    };
    const tableName: AirtableDBTable = rawRecord?.__typename;
    const tableSchema: TableSchema | null = get(airtableSchema, tableName, null);

    // Run transformations
    map(tableSchema?.fields, (fieldSchema: FieldSchema, fieldSchemaName: string) => {
      const rawRecord = find(rawAirtableDataset, { id: sanitizedRecord?.id });
      // The raw value mustn't be mutated, only the sanitizedFieldValue should be changed
      const rawFieldValue = rawRecord?.fields?.[fieldSchemaName];
      let sanitizedFieldValue = cloneDeep(rawFieldValue);
      const isFieldNameToRename = typeof fieldSchema?.transformations?.renameAs === 'string' && size(fieldSchema?.transformations?.renameAs);
      // Final name of the field, might be different from fieldSchemaName if the field will be renamed
      const fieldName: string = isFieldNameToRename ? fieldSchema?.transformations?.renameAs : fieldSchemaName;

      // [Step B-1] Handle transformation of the "raw" value, which is used to actually change the "sanitized" value
      if (fieldSchema?.transformations?.transformRawValue) {
        if (typeof fieldSchema?.transformations?.transformRawValue === 'function') {
          sanitizedFieldValue = fieldSchema?.transformations?.transformRawValue({
            airtableSchema,
            rawAirtableDataset,
            tableName,
            tableSchema,
            fieldSchemaName,
            fieldName,
            fieldSchema,
            rawRecord,
            rawFieldValue,
            sanitizedFieldValue,
            preferredLocalesOrLanguages,
          });
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Warning - "${tableName}.${fieldSchemaName}" has defined a "transformRawValue" option for that field, but "transformRawValue" is not a function and has therefore been ignored.`);
        }
      }

      // [Step B-2] Resolve raw field default value, if the current value is undefined|null and a default value is defined in the schema
      if (fieldSchema?.transformations?.defaultRawValue !== 'undefined' && (sanitizedFieldValue === null || typeof sanitizedFieldValue === 'undefined')) {
        if (typeof fieldSchema?.transformations?.defaultRawValue === 'function') {
          // In this case, "defaultRawValue" is a function that dynamically returns the default value to use
          sanitizedFieldValue = fieldSchema?.transformations?.defaultRawValue({
            airtableSchema,
            rawAirtableDataset,
            tableName,
            tableSchema,
            fieldSchemaName,
            fieldName,
            fieldSchema,
            rawRecord,
            rawFieldValue,
            sanitizedFieldValue,
            preferredLocalesOrLanguages,
          });
        } else {
          // In this case, the default value is stored in "defaultRawValue"
          sanitizedFieldValue = fieldSchema?.transformations?.defaultRawValue;
        }
      }

      // [Step B-3] Convert arrays to single record
      if (fieldSchema?.transformations?.asSingleRecord && isArray(sanitizedFieldValue)) {
        sanitizedFieldValue = sanitizedFieldValue?.[0] || null;
      }

      // [Step B-4] Resolve field as native airtable attachment
      if (fieldSchema?.transformations?.asAttachment) {
        if (typeof sanitizedFieldValue !== 'undefined') {
          // Convert to array, because it's easier to process this way
          const attachments: RawAirtableAttachmentBaseFields[] = isArray(sanitizedFieldValue) ? sanitizedFieldValue : [sanitizedFieldValue];
          let attachmentsWithAllowedFields: Partial<RawAirtableAttachmentBaseFields>[] = attachments;

          // If fields are specified, then only keep those fields and filter other fields
          if (fieldSchema?.transformations?.asAttachment?.fields) {
            attachmentsWithAllowedFields = map(attachments, (attachment: RawAirtableAttachmentBaseFields) => {
              const attachmentFields = {};

              map(fieldSchema?.transformations?.asAttachment?.fields, (field: string) => {
                attachmentFields[field] = attachment[field];
              });

              return attachmentFields;
            });
          }

          if (fieldSchema?.transformations?.asSingleRecord) {
            sanitizedFieldValue = attachmentsWithAllowedFields?.[0];
          } else {
            sanitizedFieldValue = attachmentsWithAllowedFields;
          }
        }
      }

      // [Step B-5] Resolve field localisation
      // If the field is localised, it will resolve the best available translation
      if (fieldSchema?.isI18n) {
        sanitizedFieldValue = getFieldBestAvailableTranslation(rawRecord, fieldSchemaName, preferredLocalesOrLanguages);
      }

      // [Step B-6] Handle transformation of the sanitized value
      if (fieldSchema?.transformations?.transformSanitizedValue) {
        if (typeof fieldSchema?.transformations?.transformSanitizedValue === 'function') {
          sanitizedFieldValue = fieldSchema?.transformations?.transformSanitizedValue({
            airtableSchema,
            rawAirtableDataset,
            tableName,
            tableSchema,
            fieldSchemaName,
            fieldName,
            fieldSchema,
            rawRecord,
            rawFieldValue,
            sanitizedFieldValue,
            preferredLocalesOrLanguages,
            sanitizedRecord,
          });
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Warning - "${tableName}.${fieldSchemaName}" has defined a "transformSanitizedValue" option for that field, but "transformSanitizedValue" is not a function and has therefore been ignored.`);
        }
      }

      // [Step B-7] Resolve sanitized field default value, if the current value is undefined|null and a default value is defined in the schema
      if (fieldSchema?.transformations?.defaultSanitizedValue !== 'undefined' && (sanitizedFieldValue === null || typeof sanitizedFieldValue === 'undefined')) {
        if (typeof fieldSchema?.transformations?.defaultSanitizedValue === 'function') {
          // In this case, "defaultSanitizedValue" is a function that dynamically returns the default value to use
          sanitizedFieldValue = fieldSchema?.transformations?.defaultSanitizedValue({
            airtableSchema,
            rawAirtableDataset,
            tableName,
            tableSchema,
            fieldSchemaName,
            fieldName,
            fieldSchema,
            rawRecord,
            rawFieldValue,
            sanitizedFieldValue,
            preferredLocalesOrLanguages,
            sanitizedRecord,
          });
        } else {
          // In this case, the default value is stored in "defaultSanitizedValue"
          sanitizedFieldValue = fieldSchema?.transformations?.defaultSanitizedValue;
        }
      }

      // [Step B-8] Convert text fields that contains exactly "\n" to null, to avoid believing they're not empty when they are
      if(typeof sanitizedFieldValue === 'string' && sanitizedFieldValue === '\n'){
        sanitizedFieldValue = null;
      }

      // [Step B-9] Handle automated default value
      // XXX No value should be left "undefined" because it'll crash Next.js during serialization.
      //  Instead, all values that aren't defined will be set to "null", except those that are meant to be arrays
      if (typeof sanitizedFieldValue === 'undefined') {
        // Handle automated default value for relationships, when a relationship is defined but has no relation
        if (size(fieldSchema?.relationship?.table)) {
          if (fieldSchema?.transformations?.asSingleRecord) {
            sanitizedFieldValue = null;
          } else {
            sanitizedFieldValue = [];
          }
        } else {
          // Handle all other fields (all besides relationships)
          sanitizedFieldValue = null;
        }
      }

      // [Step B-10] Rename the field, if the field should be renamed
      // XXX This is done at last, to avoid messing up other steps that might rely on the "fieldName/fieldSchemaName"
      if (isFieldNameToRename) {
        // If a value exists already, then we warn about it because that means there already exist a field and it will be overridden (it's likely to be a coding issue)
        if (typeof sanitizedRecord[fieldSchema?.transformations?.renameAs] !== 'undefined') {
          // eslint-disable-next-line no-console
          console.warn(
            `Warning - "${tableName}.${fieldSchemaName}" has defined a "renameAs" option for that field ("${fieldSchema?.transformations?.renameAs}"), but a value already exists there. ("${sanitizedRecord[fieldSchema?.transformations?.renameAs]}").
          The existing value will be replaced, but this might be unintentional.`,
          );
        }

        // Rename the field
        // I18n fields don't need any special consideration, because they've been previously resolved
        sanitizedRecord[fieldSchema?.transformations?.renameAs] = sanitizedRecord[fieldSchemaName];
        delete sanitizedRecord[fieldSchemaName];
      }

      if (sanitizedRecord?.[fieldName]) {
        // eslint-disable-next-line no-console
        console.warn(`Warning - "${tableName}.${fieldSchemaName}" will overwrite the existing value "${sanitizedRecord?.[fieldName]}" in "${tableName}.${fieldName}" with "${sanitizedFieldValue}". This can happen for various reasons ("isExtendedAttachmentTable" adds native airtable attachment fields in the sanitized object, "renameAs" might rename a property while the property exists already, etc.).`);
      }

      // Save the value directly into the record, not into the "fields" sub-object
      sanitizedRecord[fieldName] = sanitizedFieldValue;
    });

    // [Step A-1] Resolve special extended attachment table
    if (tableSchema?.isExtendedAttachmentTable) {
      // Always take only the first asset, an extended attachment field can only be related to one asset only
      // If needs be to handle several assets, then it'll be handled through the relationship with the extended attachment table directly
      const attachmentFields: AirtableAttachment = sanitizedRecord?.[tableSchema?.attachmentFieldName]?.[0];

      // When there is an attachment, merge all airtable native attachment fields into the consolidated record
      if (attachmentFields) {
        attachmentFields.attachmentId = attachmentFields?.['id'] || null;
        delete attachmentFields?.['id']; // Delete the id field so that it won't override the record id (it'll still be available as "attachmentId")
        delete sanitizedRecord[tableSchema?.attachmentFieldName]; // Delete the attachment altogether to avoid noise (all props will be copied to the sanitized record)

        // Add the native Airtable attachment fields
        map(attachmentFields, (attachmentFieldValue: any, attachmentFieldName: string) => {
          sanitizedRecord[attachmentFieldName] = attachmentFieldValue;
        });
      } else {
        // When there is no attachment in the attachment field, then do nothing
      }
    }

    sanitizedAirtableDataset[sanitizedRecord?.id] = sanitizedRecord;
  });

  return sanitizedAirtableDataset;
};

export default sanitizeRawAirtableDS;
