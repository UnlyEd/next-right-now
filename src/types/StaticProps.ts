import { I18nextResources } from '../utils/i18nextLocize';

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 */
export type StaticProps = {
  bestCountryCodes: string[];
  customerRef: string;
  defaultLocales: I18nextResources;
  err?: Error; // Only defined if there was an error
  gcmsLocales: string;
  isStaticRendering: boolean;
  isReadyToRender: boolean;
  lang: string;
  statusCode?: number;
};
