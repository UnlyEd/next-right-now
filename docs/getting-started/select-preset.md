---
layout: default
title: Find my preset
parent: Getting started
nav_order: 30
---

# Find and use your preset
{: .no_toc }

<div class="code-example" markdown="1">
Comprehensive list of all the available presets of the NRN boilerplate.

This list is **meant to help you find the preset that best fit your needs**, depending on the **built-in features** that comes with each,
and help you get started to build your own project based on this preset.

- Make sure you understand [**what's a preset**](../concepts/presets) before going further.
- Make sure you're up-to-date with the [terminology](../reference/terminology) being used.
</div>

{% include page-toc.md %}

---

## How do I know which preset is best for me?

[Check our guide](../concepts/presets#how-do-i-know-which-preset-is-best-for-me)

---

## Common to all presets

You can get metadata at `/api/status` on any demo, because all presets provide this API (even those that aren't tagged with `ssr`)

**Quick reminders**:
- The rendering mode (SSR/SSG) only affect how `pages` are served, it doesn't affect the API.
- All `/api/*` endpoints are serverless functions, running under AWS Lambda
- Next.js allows a hybrid design, thus allowing a per-page rendering mode (SSG or SSR)
- The [database schema structure](../reference/demo-database-structure) is the same for all presets

> We don't have examples using SSG at this time, but it is planned soon, don't hesitate to contribute!

---

{% capture preset %}v1-ssr{% endcapture %}
## `{{preset}}` - **Default preset**

DEFAULT
{: .label .label-purple }

STABLE
{: .label .label-green }

March 2020
{: .label .label-blue }

### Overview

| Preset | Branch | Diff PR | Pricing concerns |
|:--------|:-------|:--------|:-----------------|
| `{{preset}}` | [`{{preset}}` - Source code](https://github.com/UnlyEd/next-right-now/tree/{{preset}}) | Identical | [Not free (Locize)](../reference/vendors) |

It is the main preset at this time.
It is also the most complicated and feature-rich, as it contains all available features built-in.

The plan is to release simpler presets soon.

### Built-in features

> [Reminder: Terminology](../reference/terminology)

| Feature | Availability | Notes |
|:--------|:-------------|:------|
| SSR vs SSG | **SSR** | SSR by default for all pages (through `pages/_app`), SSG not available |
| Tenancy | **MST** (Hybrid MT/ST) | Deploys 2 tenants on different domains (ST), sharing the same DB and API endpoint (MT) |
| GraphQL API (GraphCMS) | :heavy_check_mark: | Advanced GraphCMS support |
| Dynamic i18n support (GraphCMS) | :heavy_check_mark: | Content from GraphCMS is localised (db records) |
| Static i18n support (Locize) | :heavy_check_mark: | Content for the platform is localised using Locize (menu, links, etc.) |
| Monitoring (Sentry) | :heavy_check_mark: | Errors are sent to Sentry in real-time (both frontend and backend) |
| Analytics (Amplitude) | :heavy_check_mark: | Fine-grained analytics is processed in real-time (1mn graph latency on free plans) |

### Demo

This preset uses a MST design.

Therefore, there are 2 different demo available at:
- [https://nrn-{{preset}}-customer1.now.sh/](https://nrn-{{preset}}-customer1.now.sh/)
- [https://nrn-{{preset}}-customer2.now.sh/](https://nrn-{{preset}}-customer2.now.sh/)

<div class="code-example" markdown="1">
Both demo have been generated using the same source code, the two demo live in a completely separated server and won't be affected by each other (MST design)

The same database is used by both tenants (MT design), but the displayed content is specific to each tenant (colors, etc.)

Requests are performed in real-time (SSR), each request send a GraphQL query (put aside client/server caching)

Overall, we use a hybrid tenancy design that uses both MST and MT approaches, which is due to a compromise between complexity (only one DB/API) and security/performances/risk (multiple servers to avoid massive downtime of all customers at once)

Of course, if the DB itself gets down, all tenants would be impacted (browser cache may help in such scenario, but what we really rely on in order to protect ourselves against such massive outage is [a proxy server cache](https://github.com/UnlyEd/GraphCMS-cache-boilerplate))
</div>

### Built-in 3rd party vendors

{% include vendors/vendor-table.md preset=preset zeit=true graphcms=true locize=true amplitude=true sentry=true  %}

### Clone locally

```sh
git clone https://github.com/UnlyEd/next-right-now.git nrn-preset-{{preset}} && cd nrn-demo && git checkout {{preset}}
```

This will create a `nrn-preset-{{preset}}` folder in your current directory and checkout the `{{preset}}` git branch automatically.

### Local installation guide

{% include installation-guide-full.md preset=preset %}

#### Advanced configuration

{% include installation-guide-tips.md %}

#### Want to learn more?

- Make sure to check our ["How to use" guides](../guides) for any of the vendor used above!

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
