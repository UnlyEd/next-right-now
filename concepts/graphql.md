---
layout: default
title: GraphQL
parent: Concepts
nav_order: 30
---

# GraphQL
{: .no_toc }

<div class="code-example" markdown="1">
GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

<span style="float: right">
[Source](https://graphql.org/learn/)
</span>
</div>

{% include page-toc.md %}

---

## Why GraphQL over REST?

Some of the REST(ful/-ish) issues are as follows:
- We often call multiple endpoints to fetch the data required for one page, screen or for a particular component tree.
- The data returned is non-negotiable. We cannot opt to not receive certain return values unless we explicitly code it in the route handling logic. This will in turn introduce more complexity to the request body.
- If an endpoint is updated with a different response value, all installed apps or front-end clients will also need to be updated to handle that change. To overcome this, versioning has become a standard practice with RESTful APIs, along with managing deprecation for an entire API version, rather than just particular endpoints.
- Although global validation mechanisms such as authentication can be handled through middleware, validating request bodies on a per-endpoint basis is often repetitive and introduces more boilerplate code.

## Want more?

If you're not familiar with the differences between REST and GraphQL:
- [https://goodapi.co/blog/rest-vs-graphql](https://goodapi.co/blog/rest-vs-graphql)
- [https://medium.com/@rossbulat/graphql-in-javascript-an-introduction-f50b8dc6e92](https://medium.com/@rossbulat/graphql-in-javascript-an-introduction-f50b8dc6e92)

- **Tip**: Make sur to check the official [GraphQL tutorial](https://graphql.org/learn/) if you want to learn more about it!
    - You should probably focus on the "client" usage, and use a Headless CMS that manages the server for you, it's much less work! :wink:

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Tenancy](./tenancy){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Guides: GraphQL API](../guides/graphql-api){: .btn .btn-blue }
    </span>
    <span class="fs-4" markdown="1">
    [I18n >](./i18n){: .btn .btn-purple }
    </span>
</div>
