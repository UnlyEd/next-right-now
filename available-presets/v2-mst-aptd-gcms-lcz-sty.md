---
layout: default
title: v2-mst-aptd-gcms-lcz-sty
parent: Available presets
nav_order: 10
---

{% capture preset %}{{ page.title }}{% endcapture %}
{% assign rendering = 'hybrid' %}
{% assign tenancy = 'mst' %}
{% assign hosting = 'vercel' %}
{% assign i18n = 'locize' %}
{% assign gql-api = 'gcms' %}
{% assign monitoring = 'sentry' %}
{% assign analytics = 'amplitude' %}

## `{{preset}}`
{% include preset/title.md %}

OFFICIAL
{: .label .label-purple }

May 2020
{: .label .label-blue }

### Overview

| Preset | Diff PR | Pricing concerns |
|:-------|:--------|:-----------------|
| `{{preset}}` - [Branch](https://github.com/UnlyEd/next-right-now/tree/{{preset}}) | [Compared to `v1-ssr-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/pull/68) | [Not free (Locize)](../reference/vendors) |

It is the main preset at this time.
It is also the most complicated and feature-rich, as it contains all available features built-in.

### Built-in features

{% include features/features-table.md %}

### Demo

{% include preset/demo.md %}

### Built-in 3rd party vendors

{% include vendors/vendors-table.md %}

### Clone locally

```sh
git clone https://github.com/UnlyEd/next-right-now.git nrn-{{preset}} && cd nrn-{{preset}} && git checkout {{preset}}
```

This will create a `nrn-{{preset}}` folder in your current directory and checkout the `{{preset}}` git branch automatically.

Cloning it once is enough, but it may be simpler to use one clone per preset if you're trying out multiple presets locally :wink:

### Local installation guide

{% include installation-guide-full.md %}

### Advanced configuration

{% include installation-guide-tips.md %}
