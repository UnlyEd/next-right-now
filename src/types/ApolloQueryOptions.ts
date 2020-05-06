import { QueryOptions } from 'apollo-client';

export type ApolloQueryOptions = QueryOptions & {
  displayName: string; // Missing in official definition
}
