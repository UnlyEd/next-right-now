---
layout: default
title: Pick your variant
parent: Getting started
nav_order: 30
---

# Find and pick your variant
{: .no_toc }

<div class="code-example" markdown="1">
Comprehensive list of all the available variants of the NRN boilerplate.

This list is **meant to help you find the variant that best fit your needs**, depending on the **built-in features** that comes with each,
and help you get started to build your own project based on this variant.

- Make sure you understand [**what's a variant**](../concepts/variants) before going further.
- Make sure you're up-to-date with the [terminology](../reference/terminology) being used.
</div>

---

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

## Common to all variants

You can get metadata at `/api/status` on any demo, because all variants provide this API (even those that aren't tagged with `ssr`)

**Quick reminders**:
- All `/api/*` endpoints are serverless functions, running under AWS Lambda
- Even when the build configuration doesn't use SSR, because Next.js allows a hybrid design, it stills allows some page to be served from a server
    - All API endpoints are obviously always served by an actual server, they're not affected by SSG configuration, for instance.
    - When pages don't use SSR, it only affects `/pages`, not the api endpoints themselves
- The [database schema structure](../reference/demo-database-structure) is the same for all variants

> We don't have examples using SSG at this time, but it is planned soon, don't hesitate to contribute!

---

{% capture variant %}v1-ssr{% endcapture %}
## `{{variant}}` - **Default variant**

DEFAULT
{: .label .label-purple }

STABLE
{: .label .label-green }

March 2020
{: .label .label-blue }

> It is the main variant at this time.
> It is also the most complicated and feature-rich, as it contains all available features built-in.
>
> The plan is to release simpler variants soon.

### Demo

This variant uses a Multiple Single-Tenants design. Therefore, there are 2 almost identical demo available at:
- [https://nrn-{{variant}}-customer1.now.sh/](https://nrn-{{variant}}-customer1.now.sh/)
- [https://nrn-{{variant}}-customer2.now.sh/](https://nrn-{{variant}}-customer2.now.sh/)

> Both demo have been generated using the same source code, the two demo live in a completely separated server and won't be affected by each other (MST design)
>
> The same database is used by both tenants (MT design), but the displayed content is specific to each tenant (colors, etc.)
>
> Requests are performed in real-time (SSR), each request send a GraphQL query (put aside client/server caching)
>
> Overall, we use a hybrid tenancy design that uses both MST and MT approaches, which is due to a compromise between complexity (only one DB/API) and security/performances/risk (multiple servers to avoid massive downtime of all customers at once)
>
> Of course, if the DB itself gets down, all tenants would be impacted (browser cache may help in such scenario, but what we really rely on in order to protect ourselves against such massive outage is [a proxy server cache](https://github.com/UnlyEd/GraphCMS-cache-boilerplate))

### Built-in 3rd party vendors

{% include vendors/vendor-table.md variant=variant zeit=true graphcms=true locize=true amplitude=true sentry=true  %}

### Local installation guide

{% include installation-guide-full.md variant=variant %}

### Online deployment guide

{% include zeit-online-deployment-full.md variant=variant %}

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Quick start](./quick-start){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [< Concepts](../concepts){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Guides >](../guides){: .btn .btn-purple }
    </span>
</div>
