---
layout: default
title: v2-mst-aptd-at-lcz-sty
parent: Available presets
nav_order: 9
---

{% capture preset %}{{ page.title }}{% endcapture %}
{% assign rendering = 'hybrid' %}
{% assign tenancy = 'mst' %}
{% assign hosting = 'vercel' %}
{% assign i18n = 'locize' %}
{% assign gql-api = 'airtable' %}
{% assign monitoring = 'sentry' %}
{% assign analytics = 'amplitude' %}

## `{{preset}}`
{: .no_toc }

{% include preset/title.md %}

OFFICIAL
{: .label .label-purple }

July 2020
{: .label .label-blue }

{% include page-toc.md %}

---

### Overview

| Preset | Diff PR | Pricing concerns |
|:-------|:--------|:-----------------|
| `{{preset}}` - [Branch](https://github.com/UnlyEd/next-right-now/tree/{{preset}}) | [Compared to `v2-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/pull/86) | [Not free (Locize, Stacker)](../reference/vendors) |

It was released in July 2020 to take over [`v2-mst-aptd-gcms-lcz-sty`](./v2-mst-aptd-gcms-lcz-sty) preset and provides a few more features CMS-related.

In comparison, this preset features a built-in CMS (featuring Stacker) which plays very nicely with Airtable as a database (but can also use SalesForce and Google Sheets!).
Also, it features "Markdown as JSX" advanced use-case, which may be very handy.

### Built-in features

List of built-in features **specific to this preset**.

> For an overview of features included in all presets, check out the ["Benefits" section](../#common-features-available-in-all-presets).

{% include features/features-table.md %}

### Demo

{% include preset/demo.md %}

### Storybook - UI components documentation

Check out the [online Storybook documentation](https://nrn-v2-mst-aptd-at-lcz-sty-storybook.vercel.app/){:target="_blank"} for this preset.

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
