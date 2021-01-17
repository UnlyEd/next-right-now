import { isBrowser } from '@unly/utils';
import { AirtableDBTable } from './types/AirtableDBTable';
import {
  DEFAULT_UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY,
  FieldSchema,
  UnresolvedRelationshipReferenceStrategy,
} from './types/FieldSchema';
import { AirtableRecord } from '../data/types/AirtableRecord';

const unresolvedRelationshipWarnings = [];

/**
 * Whether to log about unresolved dependency.
 *
 * Only logs on the browser, to avoid server logs being cluttered.
 * Helps avoid logs clutter by showing the warning only once per unresolved relationship (per combination of table, field name and record id).
 *
 * @param tableName
 * @param fieldName
 * @param relatedRecordId
 */
export const shouldWarnAboutUnresolvedRelationship = (tableName: AirtableDBTable, fieldName: string, relatedRecordId: string): boolean => {
  if (isBrowser()) {
    if (unresolvedRelationshipWarnings?.[`${tableName}-${fieldName}-${relatedRecordId}`]) {
      return false;
    } else {
      unresolvedRelationshipWarnings[`${tableName}-${fieldName}-${relatedRecordId}`] = true;

      return true;
    }
  } else {
    return false;
  }
};

/**
 * When a relationship has not been resolved, keep it or remove it based on the strategy to use.
 *
 * Unresolved relationships are likely to happen when top-level filters like "filterByFormula" have been used,
 * because the records might reference relationships that have not been fetched, and will therefore be missing from the dataset.
 *
 * @param fieldSchema
 * @param fieldName
 * @param fieldValue
 * @param relatedRecordId
 * @param sanitizedRecord
 * @param tableName
 */
export const handleUnresolvedRelationship = (fieldSchema: FieldSchema, fieldName: string, fieldValue: string | string[], relatedRecordId: string, sanitizedRecord: AirtableRecord, tableName: AirtableDBTable): void => {
  const strategy: UnresolvedRelationshipReferenceStrategy = fieldSchema?.relationship?.unresolvedRelationshipReferenceStrategy ?? DEFAULT_UNRESOLVED_RELATIONSHIP_REFERENCE_STRATEGY;

  if (strategy === 'keep') {
    sanitizedRecord[fieldName] = fieldValue;

    if (shouldWarnAboutUnresolvedRelationship(tableName, fieldName, relatedRecordId)) {
      // eslint-disable-next-line no-console
      console.debug(`Record "${relatedRecordId}" was not found in dataset for "${fieldName}" in "${tableName}" table (relationship: "${fieldSchema?.relationship?.table}") using "${strategy}" strategy. The unresolved reference was kept.`);
    }
  } else if (strategy === 'remove') {
    if (shouldWarnAboutUnresolvedRelationship(tableName, fieldName, relatedRecordId)) {
      // eslint-disable-next-line no-console
      console.debug(`Record "${relatedRecordId}" was not found in dataset for "${fieldName}" in "${tableName}" table (relationship: "${fieldSchema?.relationship?.table}") using "${strategy}" strategy. The unresolved reference was removed.`);
    }
  } else {
    throw new Error(`Unhandled "unresolvedRelationshipReferenceStrategy" with value "${strategy}" for "${fieldName}" in "${tableName}" table (relationship: "${fieldSchema?.relationship?.table}"). Make sure you use a valid strategy.`);
  }
};
