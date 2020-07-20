---
layout: default
title: v1-ssr-mst-aptd-gcms-lcz-sty
parent: Available presets
nav_order: 20
---

{% capture preset %}{{ page.title }}{% endcapture %}
{% assign rendering = 'ssr' %}
{% assign tenancy = 'mst' %}
{% assign hosting = 'vercel' %}
{% assign i18n = 'locize' %}
{% assign gql-api = 'gcms' %}
{% assign monitoring = 'sentry' %}
{% assign analytics = 'amplitude' %}

## `{{preset}}`
{: .no_toc }

{% include preset/title.md %}

DEPRECATED
{: .label .label-red }

OFFICIAL
{: .label .label-purple }

March 2020
{: .label .label-blue }

{% include page-toc.md %}

---

### Overview

> **This preset has been deprecated** in favor of [`v2-mst-aptd-gcms-lcz-sty`](./v2-mst-aptd-gcms-lcz-sty)

| Preset | Diff PR | Pricing concerns |
|:-------|:--------|:-----------------|
| `{{preset}}` - [Branch](https://github.com/UnlyEd/next-right-now/tree/{{preset}}) | Identical | [Not free (Locize)](../reference/vendors) |

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
