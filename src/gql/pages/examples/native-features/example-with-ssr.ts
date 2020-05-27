import gql from 'graphql-tag';

import { asset } from '../fragments/asset';
import { product } from '../fragments/product';
import { theme } from '../fragments/theme';
import { layout } from '../fragments/layout'

/**
 * Used by /src/pages/[locale]/examples/native-features/example-with-ssr page
 */
export const EXAMPLE_WITH_SSR_QUERY = gql`
  query EXAMPLE_WITH_SSR_QUERY($customerRef: String!){
    products(where: {
      customer: {
        ref: $customerRef
      }
    }
      orderBy: status_DESC
    ){
      ...productFields
    }
    ...layoutFields
  }
  ${layout.layoutFields}
  ${asset.assetFields}
  ${product.productFields}
`;
