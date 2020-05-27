import gql from 'graphql-tag';
import { product } from '../../../fragments/product';

/**
 * Used by /src/pages/[locale]/examples/native-features/example-with-ssg page
 */
export const EXAMPLE_WITH_SSG_QUERY = gql`
  query EXAMPLE_WITH_SSG_QUERY($customerRef: String!){
    products(where: {
      customer: {
        ref: $customerRef
      }
    }){
      ...productFields
    }
  }
  ${product.productFields}
`;
