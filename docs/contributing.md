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

Our documentation lives in the `docs/` folder. It is generated and hosted by Github Pages.

Only the `master` branch generates the online documentation.

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

> **N.B**: If you add custom/shared configuration, don't forget update both config files, as needed.

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

- Using `yarn doc:start` will rebuild the whole documentation but it's slower. Using `yarn doc:start:fast` won't rebuild the whole thing and it's faster.
  If you're working on the navigation menu, be warned the fast mode won't apply changes and your menu links won't update.

---

<div class="pagination-section space-even">
    <span class="fs-4" markdown="1">
    [CHANGELOG](./changelog){: .btn .btn }
    </span>
</div>
