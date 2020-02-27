import gql from 'graphql-tag';

import { asset } from '../fragments/asset';
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
      title
      description
      images {
        ...assetFields
      }
    }
  }
  ${theme.themeFields}
  ${asset.assetFields}
`;
