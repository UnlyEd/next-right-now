import { Customer } from '../../types/data/Customer';
import { Product } from '../../types/data/Product';

/**
 * GraphCMS dataset
 */
export type GraphCMSDataset = {
  customer: Customer; // Always provided, on all pages
  products?: Product[]; // Only provided on product pages
}
