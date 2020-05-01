import { I18nextResources } from "../utils/i18nextLocize";

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 */
export type StaticProps = {
  bestCountryCodes: string[];
  customerRef: string;
  defaultLocales: I18nextResources;
  gcmsLocales: string;
  isStaticRendering: boolean;
  lang: string;
};
