import { I18nextResources } from "../utils/i18nextLocize";

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 */
export type StaticProps = {
  lang: string;
  isStaticRendering: boolean;
  customerRef: string;
  bestCountryCodes: string[];
  gcmsLocales: string;
  defaultLocales: I18nextResources;
};
