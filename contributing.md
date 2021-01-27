---
layout: default
title: CONTRIBUTING
nav_order: 90
---

# Contributing
{: .no_toc }

{% include page-toc.md %}

---

## Contributing about documentation

Our documentation lives in the `docs/` folder. It is generated and hosted on Github Pages.

Only the [`gh-pages`](https://github.com/UnlyEd/next-right-now/tree/gh-pages) branch generates the online documentation. (it's our default branch)

It uses [Jekyll](https://jekyllrb.com/) behind the wheel, and [`just-the-docs`](https://pmarsceill.github.io/just-the-docs/) theme for Jekyll.

---

### Installing Jekyll locally

In order to contribute to the docs, you may need to install Jekyll locally (especially for non-trivial changes).
Jekyll needs Ruby binary.

1. Install and configure Jekyll on your computer, follow [https://jekyllrb.com/docs/](https://jekyllrb.com/docs/)
1. Once Jekyll is installed, you can install all Ruby gems using `yarn doc:gem:install`
1. Once gems are installed, you can run the local Jekyll server by using `yarn doc:start` which will start the server at localhost:4000

---

### Configuring Jekyll properly

Jekyll configuration uses 2 different files.
- [`docs/_config.yml`](docs/_config.yml) used by Github Pages
- [`docs/_config-development.yml`](docs/_config-development.yml) used by your local installation

There are a few, but important differences between both. The custom configuration must be written at the top of each config file.
The shared configuration must be written below.

> **Tip**: If you add custom/shared configuration, don't forget to update both config files, as needed.

---

### Reference

Jekyll theme used: [`just-the-docs`](https://pmarsceill.github.io/just-the-docs/)

#### How to build a custom TOC

See [just-the-docs documentation](https://pmarsceill.github.io/just-the-docs/docs/navigation-structure/#in-page-navigation-with-table-of-contents)

#### How to write comments in Markdown files

```md
[//]: # (Some markdown comment)
```

---

### Known issues

- Using `yarn doc:start` will rebuild the whole documentation, but it's slower. Using `yarn doc:start:fast` won't rebuild the whole thing, and it's faster.
  If you're working on the navigation menu, be warned the fast mode won't apply changes, and your menu links won't update.

---

## Contributing about the source code

If you mean to contribute on any preset by adding a new feature, or update existing ones, etc. please see our [open RFC about contributing](https://github.com/UnlyEd/next-right-now/issues/57).

Please open an issue first before contributing, so that we may discuss your contribution beforehand.
This isn't necessary for small changes, but non-trivial changes should be agreed upon first.

Also, if you provide a PR, please [configure CI on your GitHub repository](./guides/ci-cd/gha-deploy-vercel) first, otherwise we'll need to "fork" your PR into NRN to test it first, and that takes time.

Additionally, please allow us to update your PR's code for easier collaboration.

## Requesting a new Preset

If you need a preset that isn't supported yet, you can request one through [Github issues](https://github.com/UnlyEd/next-right-now/issues/new).

- Please check first if there isn't an **existing request**, you can use the [Github label `"request preset"`](https://github.com/UnlyEd/next-right-now/issues?q=is%3Aopen+is%3Aissue+label%3A%22request+preset%22) to filter them out.
- Please check first which presets [**won't be worked on by the NRN team**](./concepts/presets.html#which-presets-arent-being-considered) and must come from contributions.

---

<div class="pagination-section space-even">
    <span class="fs-4" markdown="1">
    [TESTIMONIALS](./testimonials){: .btn .btn }
    </span>
    <span class="fs-4" markdown="1">
    [FAQ](./faq){: .btn .btn }
    </span>
    <span class="fs-4" markdown="1">
    [CHANGELOG](./changelog){: .btn .btn }
    </span>
</div>
