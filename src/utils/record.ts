import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import cloneDeep from 'lodash.clonedeep';
import find from 'lodash.find';
import get from 'lodash.get';
import isArray from 'lodash.isarray';
import isEmpty from 'lodash.isempty';
import map from 'lodash.map';
import remove from 'lodash.remove';
import xOrBy from 'lodash.xorby';

import { GraphCMSSystemFields } from '../types/data/GraphCMSSystemFields';
import { SerializedRecord } from '../types/SerializedRecord';

const logger = createLogger({
  label: 'utils/record',
});

/**
 * Represents a generic record. (from GraphCMS DB)
 *
 * Base type, meant to be extended to create specialized types.
 */
export type Record = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow any key - See https://stackoverflow.com/a/47572701/2391795
} & GraphCMSSystemFields;

/**
 * When some queries rely on required variables, but no value is available, you can use this fake value to perform the query so it doesn't fail, but won't find any record
 * Basically acts as an optional value, because GraphQL doesn't seem to handle null variables, even if optional, if they're used at the top level
 * Can also be used for anything similar
 *
 * @type {string}
 */
export const NOT_FOUND = '__FAKE_VALUE_THAT_MUST_MATCH_NO_RECORD__';
export const UNDEFINED_ITEM_NO_IDENTIFIER = 'UNDEFINED_ITEM_NO_IDENTIFIER';
export const NULL_ITEM_NO_IDENTIFIER = 'NULL_ITEM_NO_IDENTIFIER';
export const NO_TYPE_FOUND = 'NO_TYPE_FOUND';

/**
 * Logging strategies
 *
 * Each strategy will cause a different behaviour (see "getValue" function)
 */
export enum LOGGING_STRATEGY {
  LOG_ERROR = 'LOG_ERROR',
  DO_NOTHING = 'DO_NOTHING',
}

export const STRATEGY_LOG_ERROR: LOGGING_STRATEGY = LOGGING_STRATEGY.LOG_ERROR;
export const STRATEGY_DO_NOTHING: LOGGING_STRATEGY = LOGGING_STRATEGY.DO_NOTHING;

/**
 * Find a record using the given field:value set
 * Searches into the "id" field by default
 *
 * @param {Array<T>} records
 * @param {string} value
 * @param {string} field
 * @return {T}
 */
export const findRecordByField = <T extends Record>(records: Array<T>, value: string, field = 'id'): T => {
  return find(records, { [field]: value } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type FallbackConfigTransformProps = {
  record: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  fallbacks: Array<FallbackConfig>;
  defaultValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

/**
 * Fallback record
 *
 * Meant to be used with "getValueFallback"
 */
export type FallbackConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: Record;
  key: string; // Key to find within the "record", same as lodash.get "path"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?(value: string | object | any, props: FallbackConfigTransformProps): any; // Transformation applied if that fallback is selected (key found in record)
}

/**
 * Attempts to resolve the type of a given record
 * Checks for the native apollo field "__typename" first
 * If no identifier found, fallback to stringify the given record to allow further debug
 *
 * @param record
 * @returns {string}
 */
export const resolveRecordType = (record: Record): string => {
  if (typeof record === 'undefined') {
    return UNDEFINED_ITEM_NO_IDENTIFIER;
  }
  if (record === null) {
    return NULL_ITEM_NO_IDENTIFIER;
  }

  if (get(record, '__typename', false)) {
    return record.__typename;
  } else {
    const warning = `No identifier found for ${JSON.stringify(record, null, 2)}, returning "${NO_TYPE_FOUND}"`;
    logger.warn(warning, 'resolveRecordType');
    Sentry.captureMessage(warning, Sentry.Severity.Warning);
    return NO_TYPE_FOUND;
  }
};

/**
 * Attempts to resolve the identifiable properties of a given record
 * The goal is mostly to extract only values that can be used to identify the record, for debug purposes
 *
 * @param record
 * @param applyFallbackIfNotFound
 * @returns {*}
 */
export const resolvedIdentifiableProperties = (record: Record, applyFallbackIfNotFound = true): Record => {
  const identifiableItem = {};
  // List of properties that are meaningful to developers and can help find "which data is causing issues"
  const meaningfulProperties = [
    'id',
    'name',
    'path',
    'kind',
    'label',
    'labelFR',
    'labelEN',
    'url',
    'fileName',
  ];

  map(meaningfulProperties, (prop) => {
    if (typeof get(record, prop, undefined) !== 'undefined') {
      identifiableItem[prop] = record[prop];
    }
  });

  if (applyFallbackIfNotFound && isEmpty(identifiableItem)) {
    return record; // Fallback to full object if no meaningful property was found
  }

  return identifiableItem;
};

/**
 * Log a warning with details regarding the missing property
 *
 * @param {Record} record
 * @param {string} propertyPath
 * @param {string} caller
 */
export const warnMissingProp = (record: Record, propertyPath: string, caller: string): void => {
  const errorMessage = `Unable to resolve the property "${propertyPath}" in GraphQL object "${resolveRecordType(record)}" for ${JSON.stringify(resolvedIdentifiableProperties(record), null, 2)}`;
  logger.warn(errorMessage, caller);

  if (process.env.NODE_ENV !== 'test') {
    Sentry.captureException(Error(errorMessage));
  }
};

/**
 * Get a property's value of an record, using a given path, while ensuring it doesn't throw any Exception at runtime (safe)
 *
 * It is a much safer way of using a data's (sub)property, which assumes the property may not exist and will deal with it gracefully, with sane fallback value
 * Alternatively, take a look at "hasValue" if you just want to know whether a value exists (is defined with proper value)
 *
 * @example Accessing "modelData.some.data" will fail hard (throw exception, that will likely break the whole app) when "modelData.some" is not defined
 *  Instead, using "getValue(modelData, 'some.data', 0)" will not break and will return "0" as fallback value
 *
 * If the property isn't found then apply a strategy behavior based on the given level
 *  STRATEGY_LOG_ERROR: The property should exist, the error is sent to Epsagon. This likely means there is a data misconfiguration
 *  STRATEGY_DO_NOTHING: The property is optional and it's not an issue if it's missing, nothing is logged
 *
 * @param record
 * @param propertyPath
 * @param defaultValue
 * @param missingPropStrategy
 * @returns {*}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValue = (record: Record, propertyPath: string, defaultValue: null | any = null, missingPropStrategy: LOGGING_STRATEGY = STRATEGY_LOG_ERROR): string | object | any => {
  if (typeof propertyPath !== 'string') {
    propertyPath = null; // Force null if property path is not of the expected type to avoid edge cases (0 would be an edge case)
  }

  let value = get(record, propertyPath, NOT_FOUND);

  // If returned value is null, then it's considered as it was not found
  if (value === null) {
    value = NOT_FOUND;
  }

  if (value === NOT_FOUND) {
    if (defaultValue !== null) {
      value = defaultValue;

    } else {
      value = null; // Clean value which has been changed to NOT_FOUND
    }

    if (missingPropStrategy === STRATEGY_LOG_ERROR) {
      warnMissingProp(record, propertyPath, 'getValue');
    }
  }

  return value;
};

/**
 * Check if the value is defined and not "empty" or "invalid"
 *
 * If the value is falsy then it's considered undefined, unless it's
 *  - "0" (number)
 *  - "false" (boolean)
 *
 * '<p></p>' is a special use case due to the nature of GraphCMS, which will store '<p></p>' in any RichText that has been "touched", even though it's technically "empty"
 * It's therefore considered in our app as a "false positive", and thus treated as if it was empty
 *
 * @param record
 * @param propertyPath
 */
export const hasValue = (record: Record, propertyPath: string): boolean => {
  const value = get(record, propertyPath, NOT_FOUND);

  if ((value === NOT_FOUND || value === '' || value === '<p></p>' || (typeof value === 'object' && isEmpty(value))) && value !== 0 && value !== false) {
    return false;
  } else {
    return !!value;
  }
};

/**
 * Similar to getValue, but handles an array of fallbacks instead of an object
 * Returns the first record that has a valid value
 *
 * This is meant to be used instead of "ternary hell conditions" when trying to resolve a property from different data sources, while dealing with a "priority order"
 *
 * P.S: Function's name kinda sucks, don't hesitate to propose a better alternative
 *
 * @param {Array<FallbackConfig>} fallbacks
 * @param {any | null} defaultValue
 * @param {string} missingPropStrategy
 * @return {any}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValueFallback = (fallbacks: Array<FallbackConfig>, defaultValue: null | any = null, missingPropStrategy: LOGGING_STRATEGY = STRATEGY_LOG_ERROR): any => {
  let value = defaultValue;
  let foundFallback;

  if (isArray(fallbacks)) {
    for (const fallback of fallbacks) {
      const record = fallback.record;
      const key = fallback.key;
      const transform = fallback.transform || null;

      if (record !== null && record !== undefined && key !== null && key !== undefined) {
        if (hasValue(record, key)) {
          if (transform) {
            value = transform(getValue(record, key, defaultValue), { fallbacks, record, key, defaultValue });
          } else {
            value = getValue(record, key, defaultValue);
          }
          foundFallback = true;
          break;
        }
      } else {
        // Invalid fallback, try next one
      }
    }

  } else {
    const errorMessage = `Unable to resolve the fallback value (expecting array, got "${typeof fallbacks}") for ${JSON.stringify(fallbacks, null, 2)}`;
    logger.warn(errorMessage, 'getValueFallback');

    if (process.env.NODE_ENV !== 'test') {
      Sentry.captureException(Error(errorMessage));
    }
  }

  if (!foundFallback && missingPropStrategy === STRATEGY_LOG_ERROR) {
    const errorMessage = `Unable to resolve any fallback value for ${JSON.stringify(fallbacks, null, 2)}`;
    logger.warn(errorMessage, 'getValueFallback');

    if (process.env.NODE_ENV !== 'test') {
      Sentry.captureException(Error(errorMessage));
    }
  }

  return value;
};

/**
 * Filters records that have been selected already.
 *
 * Used to filter a list of records without already-selected items, in order to avoid clutter from the list.
 *
 * The option "forceKeepRecord" is meant to use when we want to keep a record, even though it's present in the selected list.
 * This option is meant to be used when an record is the currently selected record, and we still want to display it on the list instead of filtering it out.
 *
 * @param {EducationalProgram[]} allRecords
 * @param {EducationalProgram[]} selectedRecords
 * @param {EducationalProgram} forceKeepRecord
 * @return {EducationalProgram[]}
 */
export const filterSelectedRecords = (
  allRecords: Record[],
  selectedRecords: Record[],
  forceKeepRecord?: Record,
): Record[] => {
  const clonedSelectedRecords = cloneDeep(selectedRecords);

  // In case we want to force keep a record in the list, we remove it from the selected list so that it doesn't get removed by the xOr operation (kinda ignored)
  if (forceKeepRecord) {
    remove(clonedSelectedRecords, (record: Record) => { // XXX "remove" mutates the array
      return record.id === forceKeepRecord.id;
    });
  }

  return xOrBy(allRecords, clonedSelectedRecords || [], 'id');
};

/**
 * Transform a Record into a SerializedRecord, so that it can be forwarded on the network
 * with minimal identifiable properties, thus ensuring it can be reconstituted eventually
 *
 * @param {T} record
 * @param {string} field
 * @return {SerializedRecord}
 */
export const serializeRecord = <T extends Record>(record: T, field = 'name'): SerializedRecord => {
  return getValue(record, field, undefined, STRATEGY_LOG_ERROR);
};

/**
 * Deserialize a serialized record back to its original value
 *
 * Basically finds the serialized record within a set or records, using it's identifiable property field
 *
 * @param {SerializedRecord} serializedRecord
 * @param {T[]} records
 * @param {string} field
 * @return {T}
 */
export const deserializeRecord = <T extends Record>(serializedRecord: SerializedRecord, records: T[], field = 'name'): T => {
  return findRecordByField(records, serializedRecord, field);
};
