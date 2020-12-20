import gql from 'graphql-tag';

/**
 * Used by /src/pages/[locale]/terms page
 */
export const TERMS_PAGE_QUERY = gql`
  query TERMS_PAGE_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef
    }){
      id
      label
      termsDescription {
        html
      }
    }
  }
`;
