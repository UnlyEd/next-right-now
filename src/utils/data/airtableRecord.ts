import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import get from 'lodash.get';
import isArray from 'lodash.isarray';
import map from 'lodash.map';
import { AirtableDataset } from '../../types/data/AirtableDataset';
import {
  AirtableFieldMapping,
  AirtableFieldsMapping,
} from '../../types/data/AirtableFieldsMapping';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import {
  DEFAULT_FIELDS_MAPPING,
  getFieldBestAvailableTranslation,
} from './airtableField';

const fileLabel = 'utils/data/airtableRecord';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Sanitize an airtable record into a proper type.
 * Avoids manipulating Airtable's weird object, and resolve fields linking.
 *
 * Note that Airtable always returns an array of ids for relationships, even if that relationship is single (same for assets)
 * (yup, maybe they should learn about proper data structure, that makes it harder for no good reason)
 * @example A Customer can have one Theme, but will get { theme: ['id'] } instead of { theme: 'id' }
 *
 * @param record
 * @param dataset
 * @param preferredLocales
 * @param fieldsMapping
 * @param resolveRelations
 */
export const sanitizeRecord = <Record>(record: AirtableRecord<Record>, dataset: AirtableDataset, preferredLocales: string[], fieldsMapping: AirtableFieldsMapping = DEFAULT_FIELDS_MAPPING, resolveRelations = true): AirtableRecord<Record> => {
  const sanitizedRecord: AirtableRecord = {
    id: record.id,
    fields: {
      // XXX Opinionated - Duplicate the record id, so that all entities always have an "id" field, even if it'll get overridden if there is an "id" column in Airtable
      //  This ensures all "fields" have an "id" props, for the sake of consistency and DX
      id: record.id,
    },
    createdTime: record.createdTime,
    __typename: record.__typename,
  };

  // Resolve the main record type if it wasn't provided
  if (!record.__typename) {
    sanitizedRecord.__typename = dataset[record.id].__typename;
  }

  if (!sanitizedRecord.__typename) {
    const message = `Couldn't resolve typename for record:`;
    logger.warn(message, JSON.stringify(record, null, 2));

    Sentry.withScope((scope): void => {
      scope.setContext('record', record);
      Sentry.captureMessage(message, Sentry.Severity.Warning);
    });
  }

  // Resolve relationships
  map(record?.fields, (fieldValue: any | any[], fieldName: string) => {
    // If the field exists in the tableLinks, then it's a relation to resolve
    const fieldMapping: AirtableFieldMapping | null = get(fieldsMapping, fieldName, null);

    if (fieldMapping) {
      if (fieldMapping.isArray) {
        map(fieldValue, (subFieldValue: any, subFieldName: string) => {
          const linkedRecord = typeof subFieldValue === 'string' ? dataset[subFieldValue] : subFieldValue; // If subFieldValue is not a string, then it's an asset (object)

          // Init array if not yet init
          if (!sanitizedRecord.fields[fieldName]) {
            sanitizedRecord.fields[fieldName] = [];
          }

          // If a linked record has been resolved, apply it
          if (typeof linkedRecord !== 'undefined') {
            const unresolvedRelationshipField = {
              ...linkedRecord,
              __typename: fieldMapping.table,
            };

            // Resolve relationships on relationships for their first level only (which is the 2nd level compared to main record)
            if (resolveRelations) {
              sanitizedRecord.fields[fieldName].push(sanitizeRecord(unresolvedRelationshipField, dataset, preferredLocales, fieldsMapping, false));
            } else {
              sanitizedRecord.fields[fieldName].push(unresolvedRelationshipField);
            }
          } else {
            // Otherwise, keep the existing data
            // It's possible the "dataset" doesn't contain the related field
            sanitizedRecord.fields[fieldName] = fieldValue; // TODO optimisation, currently applied as many times as there are items, could be done only once
          }
        });
      } else {
        const id = isArray(fieldValue) ? fieldValue[0] : fieldValue;
        const linkedRecord = typeof id === 'string' ? dataset[id] : fieldValue[0];
        sanitizedRecord.fields[fieldName] = linkedRecord;

        // If a linked record has been resolved, apply it
        if (typeof linkedRecord !== 'undefined') {
          const unresolvedRelationshipField = {
            ...linkedRecord,
            __typename: fieldMapping.table,
          };

          // Resolve relationships on relationships for their first level only (which is the 2nd level compared to main record)
          if (resolveRelations) {
            sanitizedRecord.fields[fieldName] = sanitizeRecord(unresolvedRelationshipField, dataset, preferredLocales, fieldsMapping, false);
          } else {
            sanitizedRecord.fields[fieldName] = unresolvedRelationshipField;
          }
        } else {
          // Otherwise, keep the existing data
          // It's possible the "dataset" doesn't contain the related field
          sanitizedRecord.fields[fieldName] = fieldValue;
        }
      }
    } else {
      // Otherwise, it's a normal field and must be copied over
      sanitizedRecord.fields[fieldName] = fieldValue;
    }

    // Resolve field localisation
    const { genericLocalisedField, value } = getFieldBestAvailableTranslation(record, fieldName, preferredLocales);
    if (genericLocalisedField) {
      sanitizedRecord.fields[genericLocalisedField] = value;
    }
  });

  return sanitizedRecord;
};
