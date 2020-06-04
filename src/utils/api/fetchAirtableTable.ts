import deepmerge from 'deepmerge';
import size from 'lodash.size';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import fetchJSON from './fetchJSON';

const AT_API_BASE_PATH = 'https://api.airtable.com';
const AT_API_VERSION = 'v0';

export type ApiOptions = {
  additionalHeaders?: { [key: string]: string };
  baseId?: string;
  maxRecords?: number;
}

/**
 * Response returned by Airtable when fetching a table (list of records)
 */
export type GenericListApiResponse<Record extends AirtableRecord = AirtableRecord> = {
  records: Record[];
}

/**
 * List of tables available in the AT Base
 */
export type BaseTable = 'Customer' | 'Product' | 'Theme' | 'Asset';

const defaultApiOptions: ApiOptions = {
  additionalHeaders: {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  },
  baseId: process.env.AIRTABLE_BASE_ID,
  maxRecords: 10000,
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
 *  const { records: customers } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer');
 *  const { records: products } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Product>>>('Product');
 *
 * If you prefer to use their official API:
 *  Alternatively, you can use the official Airtable JS API at https://github.com/airtable/airtable.js/
 *  Async/Await example - https://github.com/UnlyEd/airtable-backups-boilerplate/blob/master/src/utils/airtableParser.js
 */
const fetchAirtableTable: <ListApiResponse extends GenericListApiResponse = GenericListApiResponse>(
  table: BaseTable,
  options?: ApiOptions,
) => Promise<ListApiResponse> = async (table: BaseTable, options?: ApiOptions) => {
  options = deepmerge(defaultApiOptions, options || {});
  const { additionalHeaders, baseId } = options;
  const url = `${AT_API_BASE_PATH}/${AT_API_VERSION}/${baseId}/${table}`;

  // eslint-disable-next-line no-console
  console.debug(`Fetching airtable API at "${url}" with headers`, additionalHeaders);
  const results = await fetchJSON(url, {
    headers: additionalHeaders,
  });

  // eslint-disable-next-line no-console
  console.debug(`[${table}] ${size(results?.records)} airtable API records fetched`);

  return results;
};

export default fetchAirtableTable;
