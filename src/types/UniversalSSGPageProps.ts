import { MultiversalPageProps } from './MultiversalPageProps';

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 */
export type UniversalSSGPageProps = {
  isStaticRendering: boolean;
} & MultiversalPageProps;
