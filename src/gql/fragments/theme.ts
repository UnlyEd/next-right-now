import gql from 'graphql-tag';

import { asset } from './asset';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const theme = {
  themeFields: gql`
    fragment themeFields on Theme {
      stage
      primaryColor
      logo {
        ...assetFields
      }
    }
    ${asset.assetFields}
  `,
};
