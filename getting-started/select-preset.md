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
