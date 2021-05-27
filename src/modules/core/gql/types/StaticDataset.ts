import { Customer } from '@/modules/core/data/types/Customer';

export type StaticCustomer = Pick<Customer, 'availableLanguages'>;
export type StaticDataset = {
  customer: StaticCustomer;
};
