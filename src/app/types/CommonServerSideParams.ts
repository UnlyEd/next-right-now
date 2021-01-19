import { ParsedUrlQuery } from 'querystring';

/**
 * Server side params provided to any page (SSG or SSR)
 *  - Static params provided to getStaticProps and getStaticPaths for static pages (when building SSG pages)
 *  - Dynamic params provided to getServerSideProps (when using SSR)
 *
 * Those params come from the route (url) being used, they are affected by "redirects" and the route name (e.g: "/folder/[id].tsx"
 *
 * @see next.config.js "redirects" section for url params
 */
export type CommonServerSideParams<E extends ParsedUrlQuery = ParsedUrlQuery> = {
  albumId?: string; // Used by album-[albumId]-with-ssg-and-fallback page
  locale?: string; // The first path of the url is the "locale"
} & E;
