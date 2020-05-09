import { MultiversalPageProps } from './MultiversalPageProps';

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 *
 * Multiversal page props are listed in MultiversalPageProps
 * Server-side page props are listed in SSRPageProps
 * Client-side page props are listed in SSGPageProps
 */
export type SSGPageProps<E extends {} = {}> = {
  isStaticRendering: boolean;
} & MultiversalPageProps & E;
