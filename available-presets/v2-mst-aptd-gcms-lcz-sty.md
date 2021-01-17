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
{: .no_toc }

{% include preset/title.md %}

OFFICIAL
{: .label .label-purple }

May 2020
{: .label .label-blue }

{% include page-toc.md %}

---

### Overview

| Preset | Diff PR | Pricing concerns |
|:-------|:--------|:-----------------|
| `{{preset}}` - [Branch](https://github.com/UnlyEd/next-right-now/tree/{{preset}}) | [Compared to `v1-ssr-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/pull/68) | [Not free (Locize)](../reference/vendors) |

It is very similar to [`v2-mst-aptd-at-lcz-sty`](./v2-mst-aptd-at-lcz-sty) which came out in July, 2020.
Which uses a REST-ish API (featuring Airtable vendor) instead of GraphQL (featuring GraphCMS vendor).

Depending on what you need/like the most (GraphQL vs REST), you may choose one or the other.

Please note `v2-mst-aptd-at-lcz-sty` has since become the main preset, and provides a few very advanced features (e.g: Markdown as JSX), and a much better CMS (featuring Stacker CMS).

### Built-in features

List of built-in features **specific to this preset**.

> For an overview of features included in all presets, check out the ["Benefits" section](../#common-features-available-in-all-presets).

{% include features/features-table.md %}

### Demo

{% include preset/demo.md %}

### Storybook - UI components documentation

Check out the [online Storybook documentation](https://nrn-v2-mst-aptd-gcms-lcz-sty-storybook.vercel.app/){:target="_blank"} for this preset.

> Each preset has its own Storybook documentation, because a few components are different.

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
