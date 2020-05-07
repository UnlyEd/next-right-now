import { MultiversalPageProps } from './MultiversalPageProps';

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 */
export type UniversalSSGPageProps<E extends {} = {}> = {
  isStaticRendering: boolean;
} & MultiversalPageProps & E;
