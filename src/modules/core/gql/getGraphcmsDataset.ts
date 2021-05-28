import { DEMO_LAYOUT_QUERY } from '@/common/gql/demoLayoutQuery';
import { initializeApollo } from '@/modules/core/apollo/apolloClient';
import { GraphCMSDataset } from '@/modules/core/data/types/GraphCMSDataset';
import { StaticDataset } from '@/modules/core/gql/types/StaticDataset';
import { createLogger } from '@/modules/core/logging/logger';
import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  NormalizedCacheObject,
} from '@apollo/client';
import { QueryOptions } from '@apollo/client/core/watchQueryOptions';

const fileLabel = 'modules/core/airtable/getGraphcmsDataset';
const logger = createLogger({
  fileLabel,
});

/**
 * Returns the whole dataset, based on the app-wide static/shared/stale data fetched at build time.
 *
 * This dataset is STALE. It will not update, ever.
 * The dataset is created at build time, using the "next-plugin-preval" webpack plugin.
 *
 * @example const dataset: StaticDataset = await getStaticGraphcmsDataset();
 */
export const getStaticGraphcmsDataset = async (): Promise<StaticDataset> => {
  return (await import('@/modules/core/gql/fetchStaticGraphcmsDataset.preval')) as unknown as StaticDataset;
};

/**
 * Returns the GraphCMS dataset by fetching it in real-time.
 * It runs the DEMO_LAYOUT_QUERY query by default.
 *
 * This operation is expensive and might take a lot of time (several seconds).
 * Unless absolutely necessary, using the static dataset is usually preferred.
 *
 * @param gcmsLocales
 * @param query
 */
export const getLiveGraphcmsDataset = async <T>(gcmsLocales: string, query?: DocumentNode): Promise<T> => {
  const customerRef: string = process.env.NEXT_PUBLIC_CUSTOMER_REF;
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  const variables = {
    customerRef,
  };
  const queryOptions: QueryOptions & { displayName: string } = {
    displayName: 'DEMO_LAYOUT_QUERY',
    query: query || DEMO_LAYOUT_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locales': gcmsLocales,
      },
    },
  };

  const {
    data,
    errors,
    loading,
    networkStatus,
    ...rest
  }: ApolloQueryResult<T> = await apolloClient.query(queryOptions);

  if (errors) {
    // eslint-disable-next-line no-console
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  return data;
};

/**
 * Returns the Airtable dataset by either returning the static dataset (stale data) or performing a live query (real-time).
 *
 * @param gcmsLocales
 * @param query
 * @param forceRealTimeFetch
 */
export const getGraphcmsDataset = async (gcmsLocales: string, query?: DocumentNode, forceRealTimeFetch = false): Promise<GraphCMSDataset | StaticDataset> => {
  if (forceRealTimeFetch || process.env.NODE_ENV === 'development') {
    // When preview mode is enabled or working locally, we want to make real-time API requests to get up-to-date data
    // Because using the "next-plugin-preval" plugin worsen developer experience in dev - See https://github.com/UnlyEd/next-right-now/discussions/335#discussioncomment-792821
    return await getLiveGraphcmsDataset(gcmsLocales, query);
  } else {
    // Otherwise, we fallback to the app-wide shared/static data (stale)
    return await getStaticGraphcmsDataset();
  }
};

