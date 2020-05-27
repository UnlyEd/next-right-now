import gql from 'graphql-tag';

import { theme } from './theme';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const layout = {
  layoutFields: gql`
    fragment layoutFields on Query {
      customer(where: {
          ref: $customerRef,
      }){
        id
        label
        theme {
          ...themeFields
        }
      }
    }
    ${theme.themeFields}
  `,
};
