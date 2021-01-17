---
layout: default
title: How to setup Storybook
parent: Storybook
grand_parent: Guides
nav_order: 10
---

# How to setup Storybook
{: .no_toc }

<div class="code-example" markdown="1">
Step-by-step guide about how to properly configure your own Storybook.
</div>

{% include page-toc.md %}

---

## Configuring Vercel

Storybook is hosted on Vercel. It uses a dedicated deployment file `vercel.storybook.json`.

Within that file, you'll need to change the `name`, `scope` and `alias`.

> By default, those are NRN's, and you won't be allowed to deploy your Storybook site onto NRN's Vercel account.

- The `name` is the Vercel project name you want to use, (it'll be created automatically on Vercel).
- The `scope` is your Vercel personal or team ID. You can find it as `orgId` in `.vercel/project.json`. If the `.vercel` folder doesn't exist yet, it's because you haven't run `yarn start` yet.
- The `alias` will be used by the Github Actions workflow to automatically alias the deployment.

## Configuring Cypress

Storybook is being tested using Cypress to make sure you don't break the whole production static site unknowingly.

> This Cypress test is not meant to test all components, we wrote tests for the `Btn` component and that's it. The goal is to detect fatal failures, so testing only one component is enough.
>
> Alternatively, if you wish to write your Components tests using Cypress this way, it's possible, but not the recommended way. It's much lighter/faster to write Cypress tests for components directly, without going through Storybook.

The Cypress configuration for Storybook uses a dedicated config file at `cypress/config-storybook.json`.

> We decided to use the same `cypress/` folder for all Cypress configuration, because using another folder would lead to complicating the webpack/babel config. It seemed easier this way.

Unless you use Cypress Dashboard feature, you don't have anything to change in `cypress/config-storybook.json`,
because Cypress is automatically executed on the Vercel deployment url, not the alias domain.

> If you use Cypress Dashboard feature, you'll need to change the `projectId` [accordingly](../testing/setup-cypress/#cypress-plans-and-pricing).

## Configuring Google Analytics

The Storybook static site has built-in analytics using the [`google-analytics` addon](https://github.com/storybookjs/storybook/tree/master/addons/google-analytics){:target="_blank"}.

> We decided to use Google Analytics instead of Amplitude for Storybook, because all the work has been done by other people, it's been done well, and we don't need the flexibility/complexity of Amplitude for the Storybook site.

You'll need to replace the `STORYBOOK_GA_ID` in `.storybook/manager.js`. (otherwise, you'll send your analytics events to us!)

