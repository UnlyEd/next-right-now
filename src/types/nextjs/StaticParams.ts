/**
 * Static params provided to getStaticProps and getStaticPaths for static pages (using SSG)
 *
 * Those params come from the route (url) being used
 *
 * @see next.config.js "experimental.redirects" section for url params
 */
export type StaticParams = {
  albumId?: string; // Used by album-[albumId]-with-ssg-and-fallback page
  locale?: string; // The first path of the url is the "locale"
};
