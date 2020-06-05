import find from 'lodash.find';
import { AirtableDataset } from '../../types/data/AirtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import { Product } from '../../types/data/Product';
import { Theme } from '../../types/data/Theme';
import { buildDataset } from '../data/airtableDataset';
import { sanitizeRecord } from '../data/airtableRecord';
import memoizeWithTTL from '../memoization/memoizeWithTTL';
import fetchAirtableTable, { GenericListApiResponse } from './fetchAirtableTable';

/**
 * Fetches all Airtable tables and returns a consolidated Customer object with all relations resolved
 *
 * Relations are only resolved on the main level (to avoid circular dependencies)
 */
const fetchCustomer = async (preferredLocales: string[]): Promise<AirtableRecord<Customer>> => {
  const customerRef = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const { records: airtableCustomers } = await memoizeWithTTL('CustomerTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer'), { enabled: !!process.env.IS_SERVER_INITIAL_BUILD && process.env.NODE_ENV !== 'development' });
  const { records: airtableThemes } = await memoizeWithTTL('ThemeTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Theme>>>('Theme'), { enabled: !!process.env.IS_SERVER_INITIAL_BUILD && process.env.NODE_ENV !== 'development' });
  const { records: airtableProducts } = await memoizeWithTTL('ProductTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Product>>>('Product'), { enabled: !!process.env.IS_SERVER_INITIAL_BUILD && process.env.NODE_ENV !== 'development' });
  const dataset: AirtableDataset = buildDataset([
    { records: airtableCustomers, __typename: 'Customer' },
    { records: airtableThemes, __typename: 'Theme' },
    { records: airtableProducts, __typename: 'Product' },
  ]);

  const airtableCustomer = find(airtableCustomers, { fields: { ref: customerRef } });

  return sanitizeRecord<Customer>(airtableCustomer, dataset, preferredLocales);
};

export default fetchCustomer;
