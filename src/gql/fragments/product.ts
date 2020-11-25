import gql from 'graphql-tag';

import { asset } from './asset';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const product = {
  productFields: gql`
    fragment productFields on Product {
      documentInStages(includeCurrent: false, stages: [PUBLISHED]){
        stage
        id
        title
        description
        images {
          ...assetFields
        }
        price
      }
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
