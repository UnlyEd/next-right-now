import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: process.env.GRAPHQL_API_ENDPOINT,

  // Headers applied here will be applied for all requests
  // See the use of the "options" when running a graphQL query to specify options per-request at https://www.apollographql.com/docs/react/api/react-hooks/#options
  headers: {
    'gcms-locale-no-default': false,
    'authorization': `Bearer ${process.env.GRAPHQL_API_KEY}`,
  },
  credentials: 'same-origin', // XXX See https://www.apollographql.com/docs/react/recipes/authentication#cookie
});

export const getStandaloneApolloClient = (initialState = {}): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: link,

    // XXX Very important to provide the initialState, otherwise the client will replay the query upon loading,
    //  which is useless as the data were already fetched by the server (SSR)
    cache: new InMemoryCache().restore(initialState || {}), // Rehydrate the cache using the initial data passed from the server
  });
};
