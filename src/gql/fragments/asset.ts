import gql from 'graphql-tag';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const asset = {
  assetFields: gql`
    fragment assetFields on Asset {
      id
      url
      mimeType
    }
  `,
};
