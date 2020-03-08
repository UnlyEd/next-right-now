import gql from 'graphql-tag';

import { asset } from '../fragments/asset';
import { product } from '../fragments/product';
import { theme } from '../fragments/theme';

/**
 * Used for /index page
 */
export const INDEX_PAGE_QUERY = gql`
  query INDEX_PAGE_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef
    }){
      id
      label
      theme {
        ...themeFields
      }
    }
    products(where: {
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
