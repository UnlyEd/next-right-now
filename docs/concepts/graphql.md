---
layout: default
title: GraphQL
parent: Concepts
nav_order: 30
---

# [GraphCMS](https://graphcms.com/?ref=unly-nrn)

## Discount

> Using the coupon code **`unly-nrn`** will grant you a 3-month 15% discount on the premium plans.

## Fetching data from GraphCMS

> We use multiple libraries to fetch data from GraphCMS. GraphCMS provides a GraphQL endpoint, so we use generic libraries to the GraphQL specification like `react-apollo`.
>
> [See full list of dependencies related to GraphCMS](README_DEPENDENCIES.md)

There are several ways of fetching data from a GraphQL API:
- [`react-hoc`](https://www.apollographql.com/docs/react/api/react-hoc/): HOC (High Order Components) can be used with an components (classes, functional), the GraphQL query is described in the function's wrapper, outside of its body.
    **Former way, tend to be deprecated in favor of `react-hooks` nowadays.**
    [List of known issues](https://reactjs.org/docs/higher-order-components.html#caveats).
- [`Render Props`](https://reactjs.org/docs/render-props.html): Never used it, fixes some issues one can encounter with HOC, but hooks are still better.
- [**`react-hooks`**](https://www.apollographql.com/docs/react/api/react-hooks): Hooks can only be used with Functional components (not classes), the GraphQL query is described in the function's body.

We used the hooks approach because it's just cleaner and simpler to understand.

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Tenancy](./tenancy){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [I18n >](./i18n){: .btn .btn-purple }
    </span>
</div>
