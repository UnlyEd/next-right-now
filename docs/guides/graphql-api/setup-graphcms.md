---
layout: default
title: Setup GraphCMS
parent: GraphQL API
grand_parent: Guides
nav_order: 10
---

## Creating GraphCMS account

### Discount

> **Tip**: Using the coupon code **`unly-nrn`** will grant you a 3-month 15% discount on the premium plans.
>
> **Tip**: Free support is available on their [Slack channel](https://graphcms.slack.com) _(and they're awesome)_

- [Create a free account on GraphCMS](https://graphcms.com/?ref=unly-nrn)
- Create a new project
    - **Tip**: You only need to create one project, even if you use a multi-tenants setup, because all customers will be using the same API/Database
    - **Tip**: You could use one project per customer (if you use a multi-tenants setup), but beware the implications regarding migrating all your schemas one by one in the future. We recommend using one project for all customers when getting started.
- Make sure to select the right region, as it cannot be changed afterwards. The "right region" is the one that's closer to your customer
- Copy the `Master endpoint` and create a `Permanent Auth Token` (QUERY) from the GraphCMS **settings page** to the [`.env.build`](.env.build) (`GRAPHQL_API_ENDPOINT` and `GRAPHQL_API_KEY` respectively)

### GraphCMS configuration video tutorial (10 minutes)
[![GraphCMS configuration video tutorial](https://img.youtube.com/vi/ig5a7LXTiBM/maxresdefault.jpg)](http://youtu.be/ig5a7LXTiBM?hd=1)

> This video explains how to create a GraphCMS account and configure locales, versions, auth tokens and gives an overview of the settings

### Additional GraphCMS documentation

If you decide to keep GraphCMS, you'll need to read the official documentation if you're not already familiar with it.
GraphCMS is very powerful, and quite helpful. It handles your database, your CMS and your GraphQL API. It's a fully managed service.
It also provides a built-in assets management system, with on-the-fly image transformations.

It can be replaced by any other GraphQL endpoint though, if you prefer to manage those things yourself.

- See [Advanced GraphCMS usage](#advanced-graphcms-usage) for further explanation
- [Official "Getting started" guide](https://graphcms.com/docs/getting-started?ref=unly-nrn)
- I18n
    - [Official "I18n" guide](https://graphcms.com/docs/guides/i18n/)
    - [Querying localized content](https://graphcms.com/docs/api/content-api/#querying-localized-content)
- Assets
    - [Official "Assets" guide](https://graphcms.com/docs/assets/general)
    - [Dynamic asset transformations](https://graphcms.com/docs/assets/transformations)

### Network and reliability concerns

As all internet things, sometimes it breaks. It's also true with any third party providers, such as GraphCMS.

Downtime happen, it's not frequent, it's usually really short, but it's boring anyway, and it may be very harmful to your business.

We've used GraphCMS for more than a year, and it's really good overall. When downtime happen, they take care of it really fast and are good communicators (through Slack or in-app messages mostly)
Most of the 2019 issues were related to AWS itself, not even their own infrastructure.

Nevertheless, we've built another open source tool to help deal with this kind of things: [GraphCMS Cache Boilerplate](https://github.com/UnlyEd/GraphCMS-cache-boilerplate)

It uses a "reliability-first" design, to make sure that it always works, even if things are broken behind. It's basically a cache system on top of GraphCMS.

We use it since September 2019 and haven't suffered any downtime since then, no matter what.

### GraphQL API security concerns (token)

One thing that you must be aware of (amongst many other) is that the GraphQL token you use in this Next.js app is used by both the server (SSR) and the client (CSR).

Thus, it means that the client gets the token to authenticate to your GraphQL endpoint. And that can be a serious security issue, depending on how sensitive the data are.

In the current demo, all data are non-sensitive, so sharing the token with the client isn't an issue. But on our real app, it's a serious concern.

We use [GraphCMS Cache Boilerplate](https://github.com/UnlyEd/GraphCMS-cache-boilerplate) in between the client and the GraphQL API to serve as a proxy, all requests go to the GraphCMS Cache unauthenticated, and it's the proxy that provides the authentication credentials when fetching the API.

This way, the GraphQL API token is never shared on the client, it's managed and only used through our GraphCMS Cache proxy.

---
