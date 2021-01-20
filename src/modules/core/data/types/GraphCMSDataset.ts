import { Customer } from '@/modules/core/data/types/Customer';
import { Product } from '@/modules/core/data/types/Product';

/**
 * GraphCMS dataset
 */
export type GraphCMSDataset = {
  customer: Customer; // Always provided, on all pages
  products?: Product[]; // Only provided on product pages
}
