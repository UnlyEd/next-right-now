import gql from 'graphql-tag';

import { asset } from '../../../fragments/asset';
import { product } from '../../../fragments/product';
import { theme } from '../../../fragments/theme';

/**
 * Used by /src/pages/[locale]/examples/native-features/example-with-ssr page
 */
export const EXAMPLE_WITH_SSR_QUERY = gql`
  query EXAMPLE_WITH_SSR_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef,
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
    }
    ){
      ...productFields
    }
  }
  ${theme.themeFields}
  ${asset.assetFields}
  ${product.productFields}
`;
