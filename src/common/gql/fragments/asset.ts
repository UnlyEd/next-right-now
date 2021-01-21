import gql from 'graphql-tag';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const asset = {
  assetFields: gql`
    fragment assetFields on Asset {
      stage
      id
      url
      mimeType
    }
  `,
};
