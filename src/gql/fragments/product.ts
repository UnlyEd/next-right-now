import gql from 'graphql-tag';

import { asset } from './asset';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const product = {
  productFields: gql`
    fragment productFields on Product {
      stage
      id
      title
      description
      images {
        ...assetFields
      }
      price
    }
    ${asset.assetFields}
  `,
};
