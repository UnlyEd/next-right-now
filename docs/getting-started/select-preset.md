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

{% capture version %}v1{% endcapture %}
{% capture rendering %}ssr{% endcapture %}
{% capture tenancy %}mst{% endcapture %}
{% capture hosting %}zeit{% endcapture %}
{% capture i18n %}locize{% endcapture %}
{% capture gql-api %}gcms{% endcapture %}
{% capture monitoring %}sentry{% endcapture %}
{% capture analytics %}amplitude{% endcapture %}
{% capture preset %}{{version}}-{{rendering}}-{{tenancy}}{% if include.analytics == amplitude %}-aptd{% endif %}{% if include.gql-api == gcms %}-gcms{% endif %}{% if include.i18n == locize %}-lcz{% endif %}{% if include.monitoring == sentry %}-sty{% endif %}{% endcapture %}
## **[DEFAULT]** `{{preset}}` - {% include preset/title.md %}

DEFAULT
{: .label .label-yellow }

OFFICIAL
{: .label .label-purple }

March 2020
{: .label .label-blue }

### Overview

| Preset | Diff PR | Pricing concerns |
|:-------|:--------|:-----------------|
| `{{preset}}` - [Branch](https://github.com/UnlyEd/next-right-now/tree/{{preset}}) | Identical | [Not free (Locize)](../reference/vendors) |

It is the main preset at this time.
It is also the most complicated and feature-rich, as it contains all available features built-in.

The plan is to release simpler presets soon.

### Built-in features

{% include features/features-table.md %}

### Demo

{% include preset/demo.md %}

### Built-in 3rd party vendors

{% include vendors/vendors-table.md %}

### Clone locally

```sh
git clone https://github.com/UnlyEd/next-right-now.git nrn-{{preset}} && cd nrn-demo && git checkout {{preset}}
```

This will create a `nrn-{{preset}}` folder in your current directory and checkout the `{{preset}}` git branch automatically.

### Local installation guide

{% include installation-guide-full.md %}

### Advanced configuration

{% include installation-guide-tips.md %}

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
