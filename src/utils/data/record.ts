import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import cloneDeep from 'lodash.clonedeep';
import find from 'lodash.find';
import get from 'lodash.get';
import isArray from 'lodash.isarray';
import isEmpty from 'lodash.isempty';
import remove from 'lodash.remove';
import xOrBy from 'lodash.xorby';

import { GenericObject } from '../../types/GenericObject';
import { SerializedRecord } from '../../types/SerializedRecord';

const logger = createLogger({
  label: 'utils/data/record',
});

/**
 * Represents a generic record.
 *
 * Base type, meant to be extended to create specialized types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericRecord<E extends { [key: string]: any } = { [key: string]: any }> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow any key - See https://stackoverflow.com/a/47572701/2391795
};

/**
 * When some queries rely on required variables, but no value is available, you can use this fake value to perform the query so it doesn't fail, but won't find any record
 * Basically acts as an optional value, because GraphQL doesn't seem to handle null variables, even if optional, if they're used at the top level
 * Can also be used for anything similar
 *
 * @type {string}
 */
export const NOT_FOUND = '__FAKE_VALUE_THAT_MUST_MATCH_NO_RECORD__';

/**
 * Logging strategies
 *
 * Each strategy will cause a different behaviour (see "getValue" function)
 */
export type LOGGING_STRATEGY = 'LOG_ERROR' | 'DO_NOTHING';
export const STRATEGY_LOG_ERROR: LOGGING_STRATEGY = 'LOG_ERROR';
export const STRATEGY_DO_NOTHING: LOGGING_STRATEGY = 'DO_NOTHING';

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
  record: GenericRecord;
  key: string; // Key to find within the "record", same as lodash.get "path"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?(value: string | GenericObject | any, props: FallbackConfigTransformProps): any; // Transformation applied if that fallback is selected (key found in record)
}

/**
 * Find a record using the given field:value set
 * Searches into the "id" field by default
 *
 * @param {Array<T>} records
 * @param {string} value
 * @param {string} field
 * @return {T}
 */
export const findRecordByField = <T extends GenericRecord>(records: Array<T>, value: string, field = 'id'): T => {
  return find(records, { [field]: value } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
};

/**
 * Check if the value is defined and not "empty" or "invalid"
 *
 * If the value is falsy then it's considered undefined, unless it's
 *  - "0" (number)
 *  - "false" (boolean)
 *
 * '<p></p>' is a special use case we want to consider as empty when manipulating HTML nodes
 *
 * @param record
 * @param propertyPath
 */
export const hasValue = (record: GenericRecord, propertyPath: string): boolean => {
  const value = get(record, propertyPath, NOT_FOUND);

  if ((value === NOT_FOUND || value === '' || value === '<p></p>' || (typeof value === 'object' && isEmpty(value))) && value !== 0 && value !== false) {
    return false;
  } else {
    return !!value;
  }
};

/**
 * Similar to lodash.get, but handles an array of fallbacks instead of an object
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
export const getValueFallback = (fallbacks: Array<FallbackConfig>, defaultValue: null | any = null, missingPropStrategy: LOGGING_STRATEGY = STRATEGY_DO_NOTHING): any => {
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
            value = transform(get(record, key, defaultValue), { fallbacks, record, key, defaultValue });
          } else {
            value = get(record, key, defaultValue);
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
 * @param {GenericRecord[]} allRecords
 * @param {GenericRecord[]} selectedRecords
 * @param {GenericRecord} forceKeepRecord
 * @return {GenericRecord[]}
 */
export const filterSelectedRecords = (
  allRecords: GenericRecord[],
  selectedRecords: GenericRecord[],
  forceKeepRecord?: GenericRecord,
): GenericRecord[] => {
  const clonedSelectedRecords = cloneDeep(selectedRecords);

  // In case we want to force keep a record in the list, we remove it from the selected list so that it doesn't get removed by the xOr operation (kinda ignored)
  if (forceKeepRecord) {
    remove(clonedSelectedRecords, (record: GenericRecord) => { // XXX "remove" mutates the array
      return record.id === forceKeepRecord.id;
    });
  }

  return xOrBy(allRecords, clonedSelectedRecords || [], 'id');
};

/**
 * Transform a GenericRecord into a SerializedRecord, so that it can be forwarded on the network
 * with minimal identifiable properties, thus ensuring it can be reconstituted eventually
 *
 * @param {T} record
 * @param {string} field
 * @return {SerializedRecord}
 */
export const serializeRecord = <T extends GenericRecord>(record: T, field = 'name'): SerializedRecord => {
  return get(record, field, undefined);
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
export const deserializeRecord = <T extends GenericRecord>(serializedRecord: SerializedRecord, records: T[], field = 'name'): T => {
  return findRecordByField(records, serializedRecord, field);
};
