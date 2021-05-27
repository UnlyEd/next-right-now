import { DEMO_STATIC_DATA_QUERY } from '@/common/gql/demoStaticDataQuery';
import { initializeApollo } from '@/modules/core/apollo/apolloClient';
import { Customer } from '@/modules/core/data/types/Customer';
import { StaticDataset } from '@/modules/core/gql/types/StaticDataset';
import { createLogger } from '@/modules/core/logging/logger';
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
import preval from 'next-plugin-preval';

const fileLabel = 'modules/core/gql/fetchStaticGraphcmsDataset.preval';
const logger = createLogger({
  fileLabel,
});

/**
 * Fetches the GraphCMS dataset.
 *
 * Only fetches non-i18n data, because i18n data should use the built-in "i18n resolver" using "gcms-locales" header.
 * We only fetch the "availableLanguages" of the customer, because that's what we really need app-wide, in order to generate only needed pages, etc.
 *
 * XXX Must be a single export file otherwise it can cause issues - See https://github.com/ricokahler/next-plugin-preval/issues/19#issuecomment-848799473
 */
export const fetchStaticGraphcmsDataset = async (): Promise<StaticDataset> => {
  const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'APP_WIDE_QUERY',
    query: DEMO_STATIC_DATA_QUERY,
    variables,
  };

  const {
    data,
    errors,
    loading,
    networkStatus,
    ...rest
  }: ApolloQueryResult<{
    customer: Customer;
  }> = await apolloClient.query(queryOptions);

  if (errors) {
    // eslint-disable-next-line no-console
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  const {
    customer,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned
  const dataset = {
    customer,
  };

  return dataset;
};

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
 * @example const dataset: StaticDataset = await getStaticGraphcmsDataset();
 *
 * @see https://github.com/ricokahler/next-plugin-preval
 */
export default preval(fetchStaticGraphcmsDataset());
