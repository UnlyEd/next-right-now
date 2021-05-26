import gql from 'graphql-tag';

/**
 * Pre-fetched data available in every component, pages and APIs.
 *
 * Used by src/modules/core/gql/fetchGraphcmsDataset.preval.ts
 */
export const SHARED_DEMO_DATA_QUERY = gql`
  query SHARED_DEMO_DATA_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef,
    }){
      stage
      availableLanguages
    }
  }
`;
