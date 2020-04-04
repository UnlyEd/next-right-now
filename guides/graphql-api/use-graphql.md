---
layout: default
title: How to use GraphQL
parent: GraphQL API
grand_parent: Guides
nav_order: 20
---

# How to use GraphQL
{: .no_toc }

Advices and "must-know" things regarding GraphQL usage.

{% include page-toc.md %}

---

## Overview

### Dependencies

#### GraphQL deps

- [`graphql`](https://www.npmjs.com/package/graphql): Client for connecting to a GraphQL endpoint.
- [`graphql-tag`](https://www.npmjs.com/package/graphql-tag): Helpful utilities for parsing GraphQL queries.
  Useful to write plain-text GraphQL query using the `gql` tag, that can be validated by other tools, such as **JS GraphQL IntelliJ Plugin**.



#### `react-apollo` deps

We use [Apollo](https://github.com/apollographql/react-apollo) to manipulate our GraphQL endpoint.

React Apollo allows you to fetch data from your GraphQL server and use it in building complex and reactive UIs using the React framework. React Apollo may be used in any context that React may be used.

- [`apollo-boost`](https://www.npmjs.com/package/apollo-boost): Apollo Boost is a zero-config way to start using Apollo Client. It includes some sensible defaults, such as our recommended InMemoryCache and HttpLink, which come configured for you with our recommended settings.
  **Even though it may seems unused, this package is required as peer-dependency**.
- [`apollo-cache-inmemory`](https://www.npmjs.com/package/apollo-cache-inmemory): Recommended cache implementation for Apollo Client 2.0. InMemoryCache is a normalized data store that supports all of Apollo Client 1.0's features without the dependency on Redux.
- [`apollo-client`](https://www.npmjs.com/package/apollo-client): Apollo Client is a fully-featured caching GraphQL client with integrations for React, Angular, and more. It allows you to easily build UI components that fetch data via GraphQL.
- [`apollo-link-http`](https://www.npmjs.com/package/apollo-link-http): The http link is a terminating link that fetches GraphQL results from a GraphQL endpoint over an http connection.
- [`react-apollo`](https://www.npmjs.com/package/react-apollo): React Apollo allows you to fetch data from your GraphQL server and use it in building complex and reactive UIs using the React framework. React Apollo may be used in any context that React may be used. In the browser, in React Native, or in Node.js when you want to do server-side rendering.

Our implementation is based on [this example](https://github.com/tomanagle/GraphQL-Apollo-Next.js) and uses the [`react hooks`](https://reactjs.org/docs/hooks-intro.html) recent feature.

> It works fine with both SSR and client-side navigation.
>
> A universal [HOC](https://reactjs.org/docs/higher-order-components.html) is used to fetch data from our GraphQL endpoint: [withUniversalGraphQLDataLoader](src/hoc/withUniversalGraphQLDataLoader.ts). (both from browser and SSR)
>
> We provide some headers on-the-fly (for I18n), that are added per-query basis.
