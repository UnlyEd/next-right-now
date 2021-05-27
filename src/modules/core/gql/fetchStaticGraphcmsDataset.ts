import { DEMO_STATIC_DATA_QUERY } from '@/common/gql/demoStaticDataQuery';
import { initializeApollo } from '@/modules/core/apollo/apolloClient';
import { Customer } from '@/modules/core/data/types/Customer';
import { createLogger } from '@/modules/core/logging/logger';
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';

const fileLabel = 'modules/core/airtable/fetchStaticGraphcmsDataset';
const logger = createLogger({
  fileLabel,
});

export type StaticCustomer = Pick<Customer, 'availableLanguages'>;
export type StaticDataset = {
  customer: StaticCustomer;
};

/**
 * Fetches the GraphCMS dataset.
 * Invoked by fetchStaticGraphcmsDataset.preval.ts file at build time (during Webpack bundling).
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

export default fetchStaticGraphcmsDataset;
