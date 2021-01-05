---
layout: default
title: How to use GraphCMS
parent: GraphQL API
grand_parent: Guides
nav_order: 20
---

# How to use GraphCMS
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding GraphCMS usage.
</div>

{% include page-toc.md %}

---

## Existing versions

### Legacy (AKA "v1")

[Legacy](https://legacy.graphcms.com/)

This version is known as the v1 and will shut down on February 1st, 2021.

It's the version that was used by the NRN Demos, until November 2020.
Note that some videos and content might still showcase this outdated version.

### Current (AKA "v2")
[https://graphcms.com/](https://graphcms.com/)

[Docs](https://graphcms.com/docs)

Released in early 2020.
Currently being used by the NRN Demo.

---

## Overview

GraphCMS is a 3-in-1 managed platform that provides you with:
- A CMS to manage your data visually (back office)
- A GraphQL API to manipulate your data
- A database (hidden behind the GraphQL API)

It's very simple to use and provides many benefits, especially for small businesses, because you don't have to manage any infrastructure.
It may not fit all needs, but you can use any GraphQL API anyway because it's based on the GraphQL [Specification](https://spec.graphql.org/).
You can always start with it and use your own self-managed GraphQL server later on. There is no lock-in.

[Read our review](../reference/vendors).

GraphCMS is very powerful, and quite helpful. It handles your database, your CMS and your GraphQL API. It's a fully managed service.
It also provides a built-in assets management system, with on-the-fly image transformations.

It can be replaced by any other GraphQL endpoint though, if you prefer to manage those things yourself.

- [Official "Getting started" guide](https://docs.graphcms.com/docs/getting-started?ref=unly-nrn)
- I18n
    - [Official "I18n" guide](https://docs.graphcms.com/docs/guides/i18n/?ref=unly-nrn)
    - [Querying localized content](https://docs.graphcms.com/docs/api/content-api/?ref=unly-nrn#querying-localized-content)
- Assets
    - [Official "Assets" guide](https://docs.graphcms.com/docs/assets/general?ref=unly-nrn)
    - [Dynamic asset transformations](https://docs.graphcms.com/docs/assets/transformations?ref=unly-nrn)

### Security concerns (token is public! :scream:)

One thing that **you must be aware of** (amongst many other) is that the GraphQL token you use in this Next.js app is **used by both the server (SSR) and the client (CSR)**.

Thus, it means that **the client gets the token to authenticate to your GraphQL endpoint**. And that **can be a serious security issue**, depending on how sensitive the data are.

In the current demo, all data are non-sensitive, so sharing the token with the client isn't an issue. But on our real app, it can be a serious concern.

To solve this issue, we use [GraphCMS Cache Boilerplate](https://github.com/UnlyEd/GraphCMS-cache-boilerplate?ref=unly-nrn) in between the client and the GraphQL API to serve as a proxy, all requests go to the GraphCMS Cache unauthenticated, and it's the proxy that provides the authentication credentials when fetching the API.

This way, the GraphQL API token is never shared on the client, it's managed and only used through our GraphCMS Cache proxy.

This is more advanced than what will cover in this boilerplate, and our `GraphCMS Cache Boilerplate` is just an implementation, you could implement your own from scratch, or use a different API or vendor.

- **Tip**: The next version of GraphCMS [should provide a way around that](https://docs.graphcms.com/docs/reference/authorization/?ref=unly-nrn), but it's not ready yet as of March 2020.

### Network and reliability concerns

As all internet-related things, sometimes it breaks. It's also true with any third party providers, such as GraphCMS.

Downtime happen, it's not frequent, it's usually really short, but it's boring anyway, and it may be very harmful to your business.

We've used GraphCMS for more than a year, and it's really good overall. When downtime happen, they take care of it really fast and are good communicators (through Slack or in-app messages mostly)
Most of the 2019 issues were related to AWS itself, not even their own infrastructure.

Nevertheless, we've built another open source tool to help deal with this kind of things: [GraphCMS Cache Boilerplate](https://github.com/UnlyEd/GraphCMS-cache-boilerplate)

It uses a "reliability-first" design, to make sure that it always works, even if things are broken behind. It's basically a cache system on top of GraphCMS.

We use it since September 2019 and haven't suffered any downtime since then, no matter what.

---

### Vercel integration

GraphCMS released a [Vercel integration](https://graphcms.com/blog/graphcms-vercel-integration) on January 6th, 2021.

---

### Dependencies

We use multiple libraries to fetch data from GraphCMS.

GraphCMS provides a GraphQL endpoint, so we use generic libraries to the GraphQL specification like `react-apollo`.

- **Tip**: [See full list of dependencies related to GraphCMS](../../reference/dependencies)

There are several ways of fetching data from a GraphQL API:
- [`react-hoc`](https://www.apollographql.com/docs/react/api/react-hoc/): HOC (High Order Components) can be used with an components (classes, functional), the GraphQL query is described in the function's wrapper, outside of its body.
    **Former way, tend to be deprecated in favor of `react-hooks` nowadays.**
    [List of known issues](https://reactjs.org/docs/higher-order-components.html#caveats).
- [`Render Props`](https://reactjs.org/docs/render-props.html): Never used it, fixes some issues one can encounter with HOC, but hooks are still better.
- [**`react-hooks`**](https://www.apollographql.com/docs/react/api/react-hooks): Hooks can only be used with Functional components (not classes), the GraphQL query is described in the function's body.

We used the hooks approach because it's just cleaner and simpler to understand.

---

##1 Fetching translations through GraphCMS

> When the content is fetched through GraphCMS, the content is automatically internationalized using the `gcms-locale` **HTTP header** provided in the HTTP request.
>
> This means that a given user will not fetch the same content (even though the GraphQL query is identical) based on the `gcms-locale` value.

The `gcms-locale` value is a string of the form `'FR, EN'`. _([case matters!](https://docs.graphcms.com/docs/api/content-api/?ref=unly-nrn#passing-a-header-flag))_
There is two locales defined in this example _(there can be more, but we only handle 2 locales at this time in this app)_.
- `FR` is the first and main locale. Content in French will therefore be loaded first.
- `EN` is the second and is a fallback locale. If the content is not found in the main locale, then fallback locales are used.

See the [official documentation](https://docs.graphcms.com/docs/api/content-api/?ref=unly-nrn#passing-a-header-flag) to learn more.

> **Tip:** Even though it is possible to also specify the language `per field`, our **default approach** is to translate all content at once based on the header,
> because it's so much simpler, and handles automated fallback, which is very useful if the content is not defined in the primary requested language.

