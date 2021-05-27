import gql from 'graphql-tag';

/**
 * Pre-fetched data available in every component, pages and APIs.
 *
 * Used by src/modules/core/gql/fetchStaticGraphcmsDataset.preval.ts
 */
export const DEMO_STATIC_DATA_QUERY = gql`
  query DEMO_STATIC_DATA_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef,
    }){
      stage
      availableLanguages
    }
  }
`;
