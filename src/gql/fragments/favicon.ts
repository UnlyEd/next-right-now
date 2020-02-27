import gql from 'graphql-tag';

// XXX https://www.apollographql.com/docs/react/advanced/fragments
export const favicon = {
  faviconFields: gql`
    fragment faviconFields on Asset {
      url
      mimeType
    }
  `,
};
