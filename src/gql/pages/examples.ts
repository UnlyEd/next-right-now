import gql from 'graphql-tag';
import { product } from '../fragments/product';

/**
 * Used for /examples page
 */
export const EXAMPLES_PAGE_QUERY = gql`
  query EXAMPLES_PAGE_QUERY($customerRef: String!){
    products(where: {
      status: PUBLISHED
      customer: {
        ref: $customerRef
      }
    }){
      ...productFields
    }
  }
  ${product.productFields}
`;
