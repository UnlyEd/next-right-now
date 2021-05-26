import fetchLocizeTranslations from '@/modules/core/i18n/fetchLocizeTranslations';
import preval from 'next-plugin-preval';

/**
 * Pre-fetches the Locize translations for all languages and stores the result in an cached internal JSON file.
 * Overall, this approach allows us to have some static app-wide data that will never update, and have real-time data wherever we want.
 *
 * This is very useful to avoid fetching the same data for each page during the build step.
 * By default, Next.js would call the Locize API once per page built.
 * This was a huge pain for many reasons, because our app uses mostly static pages and we don't want those static pages to be updated.
 *
 * Also, even considering built time only, it was very inefficient, because Next was triggering too many API calls:
 * - More than 40 fetch attempts (40+ demo pages)
 * - Our in-memory cache was helping but wouldn't completely conceal the over-fetching caused by Next.js
 * - Locize API has on-demand pricing, each call costs us money
 *
 * The shared/static dataset is accessible to:
 * - All components
 * - All pages (both getStaticProps and getStaticPaths, and even in getServerSideProps is you wish to!)
 * - All API endpoints
 *
 * XXX The data are therefore STALE, they're not fetched in real-time.
 *  They won't update (the app won't display up-to-date data until the next deployment, for static pages).
 *
 * @example const allStaticLocizeTranslations = await getAllStaticLocizeTranslations();
 *
 * @see https://github.com/ricokahler/next-plugin-preval
 */
export const locizeTranslations = preval(fetchLocizeTranslations());

export default locizeTranslations;
