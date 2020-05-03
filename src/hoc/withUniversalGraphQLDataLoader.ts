import { getDataFromTree } from '@apollo/react-ssr';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import withApollo, { InitApolloOptions } from 'next-with-apollo';
import { getStandaloneApolloClient } from '../utils/graphql';

/**
 * Export a HOC from next-with-apollo
 *
 * Universal, works both on client and server sides
 * Doesn't fetch any data by itself, but provides a client that allows to do it in children components
 *
 * @see https://www.npmjs.com/package/next-with-apollo
 */
export default withApollo(
  ({ initialState }: InitApolloOptions<NormalizedCacheObject>) =>
    getStandaloneApolloClient(initialState), {
    getDataFromTree,
  },
);
