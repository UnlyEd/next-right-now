import gql from 'graphql-tag';

import { theme } from '../fragments/theme';

/**
 * Used in all pages
 */
export const LAYOUT_QUERY = gql`
  query LAYOUT_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef,
    }){
      stage
      documentInStages(includeCurrent: true){
        id
        label
        theme {
          ...themeFields
        }
      }
      id
      label
      theme {
        ...themeFields
      }
    }
  }
  ${theme.themeFields}
`;
