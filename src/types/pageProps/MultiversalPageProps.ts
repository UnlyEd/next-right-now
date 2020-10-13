import { I18nextResources } from '../../utils/i18n/i18nextLocize';
import { AirtableRecord } from '../data/AirtableRecord';
import { Customer } from '../data/Customer';

/**
 * Page properties available on all pages, whether they're rendered statically, dynamically, from the server or the client
 *
 * Multiversal page props are listed in MultiversalPageProps
 * Server-side page props are listed in SSRPageProps
 * Client-side page props are listed in SSGPageProps
 */
export type MultiversalPageProps<E extends {} = {}> = {
  bestCountryCodes: string[];
  customer: AirtableRecord<Customer>;
  customerRef: string;
  error?: Error; // Only defined if there was an error
  hasLocaleFromUrl: boolean;
  i18nTranslations: I18nextResources;
  isReadyToRender: boolean;
  lang: string;
  locale: string;
  statusCode?: number; // Provided by Next.js framework, sometimes
} & E;
