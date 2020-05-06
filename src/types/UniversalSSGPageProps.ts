import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { I18nextResources } from '../utils/i18nextLocize';
import { Customer } from './data/Customer';

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 */
export type UniversalSSGPageProps = {
  apolloState: NormalizedCacheObject;
  bestCountryCodes: string[];
  customer: Customer;
  customerRef: string;
  defaultLocales: I18nextResources;
  error?: Error; // Only defined if there was an error
  gcmsLocales: string;
  hasLocaleFromUrl: boolean;
  isReadyToRender: boolean;
  isStaticRendering: boolean;
  lang: string;
  locale: string;
  statusCode?: number;
};
