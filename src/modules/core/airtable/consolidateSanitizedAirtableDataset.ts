import get from 'lodash.get';
import isArray from 'lodash.isarray';
import map from 'lodash.map';
import size from 'lodash.size';
import { AirtableDBTable } from './types/AirtableDBTable';
import { AirtableSchema } from './types/AirtableSchema';
import { FieldSchema } from './types/FieldSchema';
import { TableSchema } from './types/TableSchema';
import { AirtableRecord } from '../data/types/AirtableRecord';
import { SanitizedAirtableDataset } from '../data/types/SanitizedAirtableDataset';
import { handleUnresolvedRelationship } from './handleUnresolvedRelationship';

/**
 * Consolidate a single sanitized airtable record.
 *
 * Resolves all relationship fields within the record.
 * The relationships will create circular references.
 *
 * Due to the circular references, the result must be serialized using Flatten.stringify before being sent to the browser.
 * Then, the browser must deserialize using Flatten.parse, to allow the consolidated record to be rebuilt from the browser once it has transited through the network.
 *
 * XXX Experience feedback:
 *  After spending days on this, there are 2 ways to go with circular references and nested relationships
 *  1) Update the source dataset by reference (mutate) while consolidating the record:
 *    => This has the huge advantage of building circular references, which is great if you need to access deeply nested data.
 *    => You can't JSON.stringify the result though, because of the circular references.
 *    => You can't send it from the server to the browser either, because serialisation using JSON.stringify will fail.
 *    => But you can use Flatten.stringify to serialize it safely from the server, and Flatten.parse to deserialize it safely from the browser.
 *    => It will eat the minimal amount of memory, because references don't take memory space, as they're just pointers.
 *    => That's what we eventually decided to do.
 *  2) Not mutate the source dataset, but only the record:
 *    => There are no circular reference because each relationship is a deep clone, but you can only go as deep as you cloned them.
 *    => You can JSON.stringify the result.
 *    => You can send it from the server to the browser.
 *    => It will eat a HUGE amount of memory, which depends on how many depth level you go.
 *      Tests have shown 150Ko, 250Ko, 550Ko, 5Mo, 12Mo, 180Mo of space taken by a dataset of 150 entities, from depth 1 to 6.
 *      Mind that more than 6Mo will crash Vercel, because AWS limit is 6Mo of (total) data from server to browser.
 *    => That's what we did at first and it's not the way, it's unreliable and unoptimized.
 *  The best way seems to use circular references and serialize the result into a string that gets sent to the browser and deserialized there.
 *  This way, the server does all the work (but it does it once, when generating the static page) and the browser perfs are better.
 *  Also, the memory consumption is much lower than alternative 2), which was crashing Cypress due to an out-of-memory issue.
 *
 * @param airtableSchema
 * @param sanitizedDataset
 */
export const consolidateSanitizedAirtableDataset = (airtableSchema: AirtableSchema, sanitizedDataset: SanitizedAirtableDataset): SanitizedAirtableDataset => {
  // Loop over each record in the dataset
  map(sanitizedDataset, (sanitizedRecord: AirtableRecord) => {
    const tableName: AirtableDBTable = sanitizedRecord.__typename;
    const tableSchema: TableSchema = get(airtableSchema, tableName);

    // Resolve all direct relationships for each record and mutate the dataset
    map(tableSchema?.fields, (fieldSchema: FieldSchema, fieldSchemaName: string) => {
      const isFieldNameToRename = typeof fieldSchema?.transformations?.renameAs === 'string' && size(fieldSchema?.transformations?.renameAs);
      // The field might have been renamed during sanitization and we must use it then, because the raw value stored in the fieldSchemaName would have been deleted in favor of the new name
      const fieldName: string = isFieldNameToRename ? fieldSchema?.transformations?.renameAs : fieldSchemaName;
      const relationshipToResolve: string | string[] = sanitizedRecord?.[fieldName];
      const asSingleRecord: boolean = fieldSchema?.transformations?.asSingleRecord;
      let consolidatedRelationship: AirtableRecord | AirtableRecord[] = asSingleRecord ? null : [];

      if (fieldSchema?.relationship) {
        if (fieldSchema?.transformations?.asSingleRecord) {
          const relatedRecordId: string = isArray(relationshipToResolve) ? relationshipToResolve[0] : relationshipToResolve; // If the value is an array and it's meant to be a single record, then extract the first element and ignore other elements in the array

          if (relatedRecordId) {
            const relatedRecord = typeof relatedRecordId === 'string' ? sanitizedDataset?.[relatedRecordId] : relatedRecordId;

            // If a relationship has been resolved, apply it
            if (typeof relatedRecord !== 'undefined') {
              consolidatedRelationship = relatedRecord;
            } else {
              handleUnresolvedRelationship(fieldSchema, fieldName, relationshipToResolve, relatedRecordId, sanitizedRecord, tableName);
            }
          }
        } else {
          map(relationshipToResolve, (relatedRecordId: string) => {
            if (relatedRecordId) {
              const relatedRecord = sanitizedDataset?.[relatedRecordId];

              // If a relationship has been resolved, apply it
              if (typeof relatedRecord !== 'undefined') {
                consolidatedRelationship.push(relatedRecord);
              } else {
                handleUnresolvedRelationship(fieldSchema, fieldName, relatedRecordId, relatedRecordId, sanitizedRecord, tableName);
              }
            }
          });
        }

        sanitizedRecord[fieldName] = consolidatedRelationship;
      }
    });
  });

  // Loop over each record in the dataset
  map(sanitizedDataset, (sanitizedRecord: AirtableRecord) => {
    const tableName: AirtableDBTable = sanitizedRecord.__typename;
    const tableSchema: TableSchema = get(airtableSchema, tableName);

    // Handle transformations once the whole dataset has been consolidated
    map(tableSchema?.fields, (fieldSchema: FieldSchema, fieldSchemaName: string) => {
      const isFieldNameToRename = typeof fieldSchema?.transformations?.renameAs === 'string' && size(fieldSchema?.transformations?.renameAs);
      // The field might have been renamed during sanitization and we must use it then, because the raw value stored in the fieldSchemaName would have been deleted in favor of the new name
      const fieldName: string = isFieldNameToRename ? fieldSchema?.transformations?.renameAs : fieldSchemaName;
      let sanitizedFieldValue = sanitizedRecord?.[fieldName];

      // Handle transformation of the consolidated value
      if (fieldSchema?.consolidations?.transformConsolidatedValue) {
        if (typeof fieldSchema?.consolidations?.transformConsolidatedValue === 'function') {
          sanitizedFieldValue = fieldSchema?.consolidations?.transformConsolidatedValue({
            airtableSchema,
            sanitizedDataset,
            tableName,
            tableSchema,
            fieldSchemaName,
            fieldName,
            fieldSchema,
            sanitizedFieldValue,
            sanitizedRecord,
          });
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Warning - "${tableName}.${fieldSchemaName}" has defined a "transformConsolidatedValue" option for that field, but "transformConsolidatedValue" is not a function and has therefore been ignored.`);
        }
      }

      // Resolve consolidated field default value, if the current value is undefined|null and a default value is defined in the schema
      if (fieldSchema?.consolidations?.defaultConsolidatedValue !== 'undefined' && (sanitizedFieldValue === null || typeof sanitizedFieldValue === 'undefined')) {
        if (typeof fieldSchema?.consolidations?.defaultConsolidatedValue === 'function') {
          // In this case, "defaultSanitizedValue" is a function that dynamically returns the default value to use
          sanitizedFieldValue = fieldSchema?.consolidations?.defaultConsolidatedValue({
            airtableSchema,
            sanitizedDataset,
            tableName,
            tableSchema,
            fieldSchemaName,
            fieldName,
            fieldSchema,
            sanitizedFieldValue,
            sanitizedRecord,
          });
        } else {
          // In this case, the default value is stored in "defaultSanitizedValue"
          sanitizedFieldValue = fieldSchema?.consolidations?.defaultConsolidatedValue;
        }
      }

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

      sanitizedRecord[fieldName] = sanitizedFieldValue;
    });
  });

  return sanitizedDataset;
};

export default consolidateSanitizedAirtableDataset;
