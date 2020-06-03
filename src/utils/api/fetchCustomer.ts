import find from 'lodash.find';
import map from 'lodash.map';
import { AirtableDataset } from '../../types/data/AirtableDataset';
import { AirtableRecord } from '../../types/data/AirtableRecord';
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
const fetchCustomer = async (preferredLocales: string[]): Promise<AirtableRecord<Customer>> => {
  const customerRef = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const { records: airtableCustomers } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer');
  const { records: airtableThemes } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Theme>>>('Theme');
  const { records: airtableProducts } = await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Product>>>('Product');
  const dataset: AirtableDataset = {};

  map(airtableCustomers, (airtableCustomer) => {
    dataset[airtableCustomer.id] = { ...airtableCustomer, __typename: 'Customer' };
  });

  map(airtableThemes, (airtableTheme) => {
    dataset[airtableTheme.id] = { ...airtableTheme, __typename: 'Theme' };
  });

  map(airtableProducts, (airtableProduct) => {
    dataset[airtableProduct.id] = { ...airtableProduct, __typename: 'Product' };
  });

  const airtableCustomer = find(airtableCustomers, { fields: { ref: customerRef } });

  return sanitizeRecord<Customer>(airtableCustomer, dataset, preferredLocales);
};

export default fetchCustomer;
