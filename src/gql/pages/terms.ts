import gql from 'graphql-tag';

/**
 * Used for /terms page
 */
export const TERMS_PAGE_QUERY = gql`
  query TERMS_PAGE_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef
    }){
      id
      label
      terms {
        html
      }
    }
  }
`;
