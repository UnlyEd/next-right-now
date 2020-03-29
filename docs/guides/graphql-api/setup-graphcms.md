---
layout: default
title: How to setup GraphCMS
parent: GraphQL API
grand_parent: Guides
nav_order: 10
---

# How to setup GraphCMS
{: .no_toc }

Step by step guide about how to create and properly configure your GraphCMS account.

---

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

## Tips

- Using the coupon code **`unly-nrn`** will grant you a 3-month 15% discount on the premium plans.
- Free support is available on their [Slack channel](https://graphcms.slack.com) _(and they're awesome)_

## Video tutorial (10 minutes)
[![GraphCMS configuration video tutorial](https://img.youtube.com/vi/ig5a7LXTiBM/maxresdefault.jpg)](http://youtu.be/ig5a7LXTiBM?hd=1)

> This video explains how to create a GraphCMS account and configure locales, versions, auth tokens and gives an overview of the settings.

---

## Create GraphCMS account

- [Create a free account on GraphCMS](https://graphcms.com/?ref=unly-nrn)
- Create a new project
    - **Make sure to select the right region**, as it cannot be changed afterwards.
    _The "right region" is the one that's the closest to your customers._

---

## GraphCMS concepts

#### Public API Permissions

By default, your `Public API Permissions` is set to **`PROTECTED`**.

But, it is also possible to allow anyone, without any authentication, to interact with your API.
This is managed using `Public API Permissions`:
- `QUERY`: Allow anyone to query the data. But won't allow to mutate any data. (read-only)
- `MUTATION`: Allows anyone to mutate the data. But won't allow to query any data. (write-only)
- `OPEN`: Allows any consumer to both query and mutate the data.
- **`PROTECTED`** (default): This means an authentication is required to perform any operation on the API, and the permission scope is managed using `Permanent Auth Token`.
    **This is what we will be using in this guide.**

> We considered the most common use case is to allow to fetch data from your API, protected by an auth token.

The decision eventually depends on your own requirements. But please bear with us for now and keep the default `PROTECTED` configuration.

#### Permanent Auth Token

You may allow each token a different permissions scope:
- `QUERY`: Allows any consumer to query the data. But won't allow to mutate any data. (read-only)
    **This is what we will be using in this guide, because we only need to fetch the data and not mutate them.**
- `MUTATION`: Allows any consumer to mutate the data. But won't allow to query any data. (write-only)
- `OPEN`: Allows any consumer to both query and mutate the data.

---

## Configure your GraphCMS project

- Copy the `Master endpoint` and update the `GRAPHQL_API_ENDPOINT` env variable in your `.env.build`
    - **Hint**: It starts with `https://api-euwest.graphcms.com/v1...`
- Create a `Permanent Auth Token` with `QUERY` permissions.
    - This will generate a token that can be used to authenticate to your GraphCMS API endpoint and fetch data.
    - Copy this token, you won't be able to see it again.
- Use the previously copied auth token and update the `GRAPHQL_API_KEY` env variable in your `.env.build`
- If you have already configured Zeit, and if you want to deploy your app online, you must also configure Zeit secrets
    - Replace the `GRAPHQL_API_ENDPOINT` in all `now.*.json` files (this is not a secret because it's not considered sensitive)
    - `now secrets add nrn-graphql-api-key YOUR_API_KEY`
- Your app is now properly configured and will be able to run GraphQL queries to fetch data from your app.

**Important note:**
Do not expect your app to actually work at this time, you've just created a new GraphCMS project which doesn't match the expected GraphQL API structure, all requests will fail and that's expected.

### (Optional) Replicating the GraphCMS data structure

If you want to replicate the online demo on your local computer, you will have to use the same GraphCMS schema structure so that queries can be executed successfully.

We use a particular GraphCMS [data structure for our demo](../../reference/demo-database-structure), you'll need to replicate it on your GraphCMS project.
- It is recommended to watch the video if you haven't done it already.
- It's basically WYSIWYG, creating new fields on GraphCMS models, all changes are applied immediately (CMS + API are dynamically updated when the GraphCMS schema is changed)

**Some considerations:**
- Any missing field will throw a GraphQL error. (querying a field that doesn't exist on the GraphCMS API)
- The field types must match. (Some mismatch would still succeed, like using a `Multi line text` or `Markdown` instead of `Single line text` because it doesn't affect the structure of the GraphQL query, but better use exactly the same types)
- You can have more fields on your GraphCMS schema. (Having more fields is not an issue, the GraphQL queries will work nonetheless)

Once you've created all fields on GraphCMS, you can run your app locally using `yarn start` and it should work properly.

---

<div class="pagination-section space-even">
    <span class="fs-4" markdown="1">
    [How to use GraphCMS >](./use-graphcms){: .btn .btn-purple }
    </span>
</div>
