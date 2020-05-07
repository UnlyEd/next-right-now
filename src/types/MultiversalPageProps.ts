import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { I18nextResources } from '../utils/i18nextLocize';
import { Customer } from './data/Customer';

/**
 * Page properties available on all pages, whether they're rendered statically, dynamically, from the server or the client
 */
export declare type MultiversalPageProps<E extends {} = {}> = {
  apolloState: NormalizedCacheObject;
  bestCountryCodes: string[];
  customer: Customer;
  customerRef: string;
  i18nTranslations: I18nextResources;
  error?: Error; // Only defined if there was an error
  gcmsLocales: string;
  hasLocaleFromUrl: boolean;
  isReadyToRender: boolean;
  lang: string;
  locale: string;
  statusCode?: number;
} & E;
