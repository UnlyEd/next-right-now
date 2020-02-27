import gql from 'graphql-tag';

import { asset } from '../fragments/asset';
import { theme } from '../fragments/theme';

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
  ${theme.themeFields}
`;
