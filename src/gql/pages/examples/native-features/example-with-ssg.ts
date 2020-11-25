import gql from 'graphql-tag';

/**
 * Used by /src/pages/[locale]/examples/native-features/example-with-ssg page
 */
export const EXAMPLE_WITH_SSG_QUERY = gql`
  query EXAMPLE_WITH_SSG_QUERY($customerRef: String!){
    products(where: {
      customer: {
        ref: $customerRef
      }
    }){
      documentInStages(includeCurrent: true, stages: [DRAFT, PUBLISHED]){
        stage
        id
        title
        description
        images {
          stage
          id
          url
          mimeType
        }
        price
      }
      stage
      id
      title
      description
      images {
        stage
        id
        url
        mimeType
      }
      price
    }
  }
`;
