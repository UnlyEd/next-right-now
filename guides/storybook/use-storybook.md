---
layout: default
title: How to use Storybook
parent: Storybook
grand_parent: Guides
nav_order: 20
---

# How to use Stacker
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Storybook usage.
</div>

{% include page-toc.md %}

---

## Usage

We won't cover how to write your own Storybook "Stories" in this documentation.
Please refer to their [official documentation](https://storybook.js.org/?ref=unly-nrn).

> If you need support, check out [their Support page](https://storybook.js.org/support/), they have a Discord channel.

### Working locally

Run `yarn storybook` (or `yarn sb` for short).

This will start the Storybook site on your computer, and automatically open it on the browser.

You can edit your components and see changes go live. You can also add Storybook Stories (in `src/stories`) to preview different Stories for each component.

### Online site (Vercel)

When you push some code on GitHub, the `.github/workflows/deploy-vercel-storybook.yml` is automatically triggered and will build a static version of the
Storybook site, and then host it on Vercel.

The static site will be deployed at the domain(s) specified by `vercel.storybook.json`.

### Deploying the static site manually

Although everything is automated, you can also deploy your static site manually by running:
- `yarn deploy:sb:gha` Exports the static site (into `storybook-static` folder) and deploy it to Vercel. (It's the command being called by GitHub Actions)
- `yarn deploy:sb:gha:fast` Deploys the `storybook-static` folder (doesn't build), useful if you've already exported the site (faster)

## Package maintenance

### Upgrading all Storybook packages at once

Run `yarn sb:upgrade`, this makes sure you use the same version for all packages (e.g: react, addons `@storybook/*`), which is strongly recommended by officials.
