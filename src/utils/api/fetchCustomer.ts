import find from 'lodash.find';
import { AirtableRecord } from '../../types/data/Airtable';
import { AirtableDataset } from '../../types/data/AirtableDataset';
import { Customer } from '../../types/data/Customer';
import { Product } from '../../types/data/Product';
import { Theme } from '../../types/data/Theme';
import { sanitizeRecord } from '../data/airtableRecord';
import fetchAirtableTable, { GenericListApiResponse } from './fetchAirtableTable';

/**
 * Fetches all Airtable tables and returns a consolidated Customer object with all relations resolved
 *
 * Relations are only resolved on the main level (to avoid circular dependencies)
 */
const fetchCustomer = async (preferredLocales: string[]): Promise<Customer> => {
  const customerRef = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const { records: airtableCustomers } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer');
  const { records: airtableThemes } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Theme>>>('Theme');
  const { records: airtableProducts } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Product>>>('Product');
  const dataset: AirtableDataset = {
    Customer: airtableCustomers,
    Theme: airtableThemes,
    Product: airtableProducts,
  };
  const airtableCustomer = find(airtableCustomers, { fields: { ref: customerRef } });

  return sanitizeRecord(airtableCustomer, dataset, preferredLocales);
};

export default fetchCustomer;
