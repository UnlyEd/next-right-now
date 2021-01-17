import * as Sentry from '@sentry/node';
import deepmerge from 'deepmerge';
import map from 'lodash.map';
import size from 'lodash.size';
import { AirtableDBTable } from './types/AirtableDBTable';
import { GenericAirtableRecordsListApiResponse } from './types/GenericAirtableRecordsListApiResponse';
import fetchJSON from '../api/fetchJSON';

const AT_API_BASE_PATH = 'https://api.airtable.com';
const AT_API_VERSION = 'v0';

export type ApiOptions = {
  additionalHeaders?: { [key: string]: string };
  baseId?: string;
  maxRecords?: number;
  fields?: string[];
  filterByFormula?: string;
}

const defaultApiOptions: ApiOptions = {
  additionalHeaders: {
    'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
  baseId: process.env.AIRTABLE_BASE_ID,
  fields: [],
};

const encodeFields = (fields: string[]): string => {
  const encodedFields: string[] = map(fields, (field: string) => {
    return `fields%5B%5D=${encodeURIComponent(field)}`;
  });

  return encodedFields.join('&');
};

/**
 * Fetches Airtable API to retrieve all records within the given table
 * Super simple implementation that only takes care of fetching a whole table
 *
 * Uses NRN own implementation instead of the official Airtable JS API
 *  - Ours is much smaller (lightweight) vs theirs - See https://bundlephobia.com/result?p=airtable@0.8.1
 *  - We only need to perform "table wide reads" and don't need all the extra create/update/delete features
 *  - Their TS definitions sucks and are out-of-sync, according to other people - See https://github.com/Airtable/airtable.js/issues/34#issuecomment-630632566
 *
 * @example TS types will be automatically inferred, you can also alias "records" to a more obvious name
 *  const { records: customers } = await fetchAirtableTable<GenericAirtableRecordsListApiResponse<AirtableRecord<Customer>>>('Customer');
 *  const { records: products } = await fetchAirtableTable<GenericAirtableRecordsListApiResponse<AirtableRecord<Product>>>('Product');
 *
 * If you prefer to use their official API:
 *  Alternatively, you can use the official Airtable JS API at https://github.com/airtable/airtable.js/
 *  Async/Await example - https://github.com/UnlyEd/airtable-backups-boilerplate/blob/master/src/utils/airtableParser.js
 */
const fetchAirtableTable: <ListApiResponse extends GenericAirtableRecordsListApiResponse = GenericAirtableRecordsListApiResponse>(
  table: AirtableDBTable,
  options?: ApiOptions,
) => Promise<ListApiResponse> = async (table: AirtableDBTable, options?: ApiOptions) => {
  options = deepmerge(defaultApiOptions, options || {});
  const { additionalHeaders, baseId, fields, filterByFormula } = options;
  // TODO Current implementation doesn't handle recursive calls when there are more than 100 items returned at once - See https://community.airtable.com/t/receive-more-than-100-records/12847/11?u=tfp
  let url = `${AT_API_BASE_PATH}/${AT_API_VERSION}/${baseId}/${table}`;
  const queryParameters: string[] = [];

  if (size(fields)) {
    queryParameters.push(encodeFields(fields));
  }

  if (size(filterByFormula)) {
    queryParameters.push(`filterByFormula=${encodeURIComponent(filterByFormula)}`);
  }

  if (size(queryParameters)) {
    url += `?` + map(queryParameters, (param: string) => param).join('&');
  }

  if (!baseId) {
    // eslint-disable-next-line no-console
    console.error(`process.env.AIRTABLE_BASE_ID is not defined. Fetching airtable API will fail. Check your ".env.local" if working locally, or "vercel.**.json" file if this error happens on Vercel.`);
  }

  if (!process.env.AIRTABLE_API_KEY) {
    // eslint-disable-next-line no-console
    console.error(`process.env.AIRTABLE_API_KEY is not defined. Fetching airtable API will fail. Check your ".env.local" if working locally, or "vercel.**.json" file if this error happens on Vercel.`);
  }

  try {
    // console.debug(`Fetching airtable API at "${url}" with headers`, additionalHeaders);
    // eslint-disable-next-line no-console
    console.debug(`Fetching airtable API at "${url}"`);
    const results = await fetchJSON(url, {
      headers: additionalHeaders,
    });

    // eslint-disable-next-line no-console
    console.debug(`[${table}] ${size(results?.records)} airtable API records fetched`);

    return results;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    Sentry.captureException(e);
  }

};

export default fetchAirtableTable;
