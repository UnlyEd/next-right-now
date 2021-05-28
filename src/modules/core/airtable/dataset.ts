import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import find from 'lodash.find';

/**
 * Finds the customer within the dataset.
 *
 * @param dataset
 */
export const getCustomer = <T = AirtableRecord<Customer>>(dataset: SanitizedAirtableDataset): T => {
  return find(dataset, { __typename: 'Customer' }) as unknown as T;
};
