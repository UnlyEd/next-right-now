import gql from 'graphql-tag';

import { asset } from '../fragments/asset';
import { product } from '../fragments/product';
import { theme } from '../fragments/theme';

/**
 * Used for /examples page
 */
export const EXAMPLES_PAGE_QUERY = gql`
  query INDEX_PAGE_QUERY($customerRef: String!){
    products(where: {
      status: PUBLISHED
      customer: {
        ref: $customerRef
      }
    }){
      ...productFields
    }
  }
  ${theme.themeFields}
  ${asset.assetFields}
  ${product.productFields}
`;
