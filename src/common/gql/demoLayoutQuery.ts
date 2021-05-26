import gql from 'graphql-tag';

import { theme } from './fragments/theme';

/**
 * Used in all pages of the "demo" layout.
 */
export const DEMO_LAYOUT_QUERY = gql`
  query DEMO_LAYOUT_QUERY($customerRef: String!){
    customer(where: {
      ref: $customerRef,
    }){
      stage
      id
      label
      availableLanguages
      theme {
        ...themeFields
      }
      privacyDescription {
        html
      }
    }
  }
  ${theme.themeFields}
`;
