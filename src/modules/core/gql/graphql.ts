import {
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

export const createApolloClient = (initialState = {}, ctx = undefined): ApolloClient<NormalizedCacheObject> => {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: process.env.GRAPHQL_API_ENDPOINT, // Server URL (must be absolute)
      // Headers applied here will be applied for all requests
      // See the use of the "options" when running a graphQL query to specify options per-request at https://www.apollographql.com/docs/react/api/react-hooks/#options
      headers: {
        authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
      },
      credentials: 'same-origin', // XXX See https://www.apollographql.com/docs/react/recipes/authentication#cookie
      fetch, // Switches between unfetch & node-fetch for client & server.
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

export default createApolloClient;
