/**
 * Server side params provided to any Next.js native server-side function (SSG + SSR)
 *  - Static params provided to getStaticProps and getStaticPaths for static pages (when using SSG)
 *  - Dynamic params provided to getServerSideProps (when using SSR)
 *
 * Those params come from the route (url) being used, they are affected by "experimental.redirects" and the route name (e.g: "/folder/[id].tsx"
 *
 * @see next.config.js "experimental.redirects" section for url params
 */
export type CommonServerSideParams = {
  albumId?: string; // Used by album-[albumId]-with-ssg-and-fallback page
  locale?: string; // The first path of the url is the "locale"
};
