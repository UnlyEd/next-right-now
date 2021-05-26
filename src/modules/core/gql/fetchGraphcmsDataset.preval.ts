import fetchGraphcmsDataset from '@/modules/core/gql/fetchGraphcmsDataset';
import preval from 'next-plugin-preval';

/**
 * Pre-fetches the GraphCMS dataset and stores the result in an cached internal JSON file.
 * Overall, this approach allows us to have some static app-wide data that will never update, and have real-time data wherever we want.
 *
 * This is very useful to avoid fetching the same data for each page during the build step.
 * By default, Next.js would call the GraphCMS API once per page built.
 * This was a huge pain for many reasons, because our app uses mostly static pages and we don't want those static pages to be updated.
 *
 * Also, even considering built time only, it was very inefficient, because Next was triggering too many API calls:
 * - More than 120 fetch attempts (locales * pages)
 *    - 3 locales (in supportedLocales)
 *    - lots of static pages (40+ demo pages)
 * - Our in-memory cache was helping but wouldn't completely conceal the over-fetching caused by Next.js
 * - We were generating pages for all supportedLocales, even if the customer hadn't enabled some languages (longer build + undesired pages leading to bad UX)
 * - We weren't able to auto-redirect only to one of the enabled customer locales, not without fetching GraphCMS (which is slower)
 *
 * The shared/static dataset is accessible to:
 * - All components
 * - All pages (both getStaticProps and getStaticPaths, and even in getServerSideProps is you wish to!)
 * - All API endpoints
 *
 * XXX The data are therefore STALE, they're not fetched in real-time.
 *  They won't update (the app won't display up-to-date data until the next deployment, for static pages).
 *
 * @example await import('@/modules/core/airtable/fetchRawAirtableDataset.preval')
 * @example const rawAirtableRecordsSets: RawAirtableRecordsSet[] = (await import('@/modules/core/airtable/fetchRawAirtableDataset.preval')) as unknown as RawAirtableRecordsSet[];
 *
 * @see https://github.com/ricokahler/next-plugin-preval
 */
export const dataset = preval(fetchGraphcmsDataset());

export default dataset;
