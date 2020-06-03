import { I18nextResources } from '../../utils/i18n/i18nextLocize';
import { Customer } from '../data/Customer';
import { Product } from '../data/Product';

/**
 * Page properties available on all pages, whether they're rendered statically, dynamically, from the server or the client
 *
 * Multiversal page props are listed in MultiversalPageProps
 * Server-side page props are listed in SSRPageProps
 * Client-side page props are listed in SSGPageProps
 */
export declare type MultiversalPageProps<E extends {} = {}> = {
  bestCountryCodes: string[];
  customer: Customer;
  customerRef: string;
  error?: Error; // Only defined if there was an error
  hasLocaleFromUrl: boolean;
  i18nTranslations: I18nextResources;
  isReadyToRender: boolean;
  lang: string;
  locale: string;
  products: Product[];
  statusCode?: number; // Provided by Next.js framework, sometimes
} & E;
