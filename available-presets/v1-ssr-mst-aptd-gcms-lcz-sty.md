---
layout: default
title: v1-ssr-mst-aptd-gcms-lcz-sty
parent: Available presets
nav_order: 20
---

{% capture preset %}{{ page.title }}{% endcapture %}

## `{{preset}}` - {% include preset/title.md %}

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
