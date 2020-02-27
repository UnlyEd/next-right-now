import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import withApollo, { InitApolloOptions } from 'next-with-apollo';

// XXX This config is used on the FRONTEND (from the browser) or on the BACKEND (server), depending on whether it's loaded from SSR or client-side
const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: process.env.GRAPHQL_API_ENDPOINT,

  // Headers applied here will be applied for all requests
  // See the use of the "options" when running a graphQL query to specify options per-request at https://www.apollographql.com/docs/react/api/react-hooks/#options
  headers: {
    'gcms-locale-no-default': false,
    'authorization': process.env.GRAPHQL_API_KEY,
  },
  credentials: 'same-origin', // XXX See https://www.apollographql.com/docs/react/recipes/authentication#cookie
});

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
    new ApolloClient({
      link: link,

      // XXX Very important to provide the initialState, otherwise the client will replay the query upon loading,
      //  which is useless as the data were already fetched by the server (SSR)
      cache: new InMemoryCache().restore(initialState || {}), // rehydrate the cache using the initial data passed from the server
    }),
);
