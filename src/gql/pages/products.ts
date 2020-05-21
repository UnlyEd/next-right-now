import gql from 'graphql-tag';

import { asset } from '../fragments/asset';
import { product } from '../fragments/product';
import { theme } from '../fragments/theme';

/**
 * Used for /products page
 */
export const PRODUCTS_PAGE_QUERY = gql`
  query PRODUCTS_PAGE_QUERY($customerRef: String!) {
    customer(where: { ref: $customerRef }) {
      id
      label
      theme {
        ...themeFields
      }
    }
    products(where: { customer: { ref: $customerRef } }, orderBy: status_DESC) {
      ...productFields
    }
  }
  ${theme.themeFields}
  ${asset.assetFields}
  ${product.productFields}
`;
