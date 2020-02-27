import { Customer } from './data/Customer';
import { LayoutProps } from './LayoutProps';

/**
 * Properties that are available by any Next.js page
 *
 * The layout properties (LayoutProps) are enhanced by the Layout
 */
export declare type PageProps = {
  customer: Customer;
} & LayoutProps;
