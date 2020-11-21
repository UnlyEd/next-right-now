---
layout: default
title: Environments and Stages
parent: Concepts
nav_order: 10
---

# Understanding **Environments** and **Stages**
{: .no_toc }

<div class="code-example" markdown="1">
NRN relies on environment variables to function correctly.

Those variables are provided differently depending on the environment.
</div>

{% include page-toc.md %}

---

## **Development** environment vs **Vercel** environment
When working on the `development` environment (localhost), the variables from `.env` and `.env.local` are used by [the webpack configuration](./next.config.js), but the variable defined in `.env.local` take precedence over those in `.env` when they clash.

When deploying an instance to the Vercel's platform, the variables used are the one that belong to the configuration file related to that instance, such as:
- `yarn deploy:customer1`: This script will deploy an instance using the `vercel.customer1.staging.json` file.
- `yarn deploy:customer1:production`: This script will deploy an instance using the `vercel.customer1.production.json` file.

> In those files, it's the `build.env` part that is used at build time (build is done on Vercel), which basically replaces all references of every environment variable by the actual value (string replace at build time).

---

## **Public** environment variables vs **private** env variables
It can be very quick and easy to share some sensitive environment variable to the browser, usually by mistake.

In order to make it obvious what variables are meant to be shared with the browser (and thus, are public), [Next.js prefixes them with `NEXT_PUBLIC_`](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).

**As a good practice**, we strongly recommend to only have public variables in your `.env` file. All non-public variables should be defined in `.env.local` instead.

With this setup, it becomes clearer what's intended to be shared with the browser and what's actually private.
And, what should be private shouldn't be tracked by Git either, and thus only defined in the local config file.

> An exception to this rule is when an environment variable isn't public, but isn't sensitive either, and therefore conveniently stored in `.env` because it's just easier for collaboration.

---

## What is an **environment**?

> An environment is "where" the application is running.
> It can be either "development" (localhost) or "production" (on Vercel's servers).
>
> **The `environment` is defined by the `NODE_ENV` environment variable.**
>
> **Tip**: It is **not** possible to use any other value than `development` and `production`, [as enforced by Next](https://github.com/vercel/next.js/blob/master/errors/env-key-not-allowed.md)

When working on your local computer, you automatically use `NODE_ENV=developement`.

The environment affects how the application **is bundled**, it is defined at **build time**. (webpack, hot-reloading, etc.)

> e.g: When building the app using the `development` environment, you have access to PropTypes warnings, but you won't when using `production`.

---

## What is a **stage**?

> A stage is "how" the application is running.
> It can be either "development" (localhost), "staging" or "production" (on Vercel's servers) - _You can even add more if you need_
>
> **The `stage` is defined by the `NEXT_PUBLIC_APP_STAGE` environment variable.**
>
> **Tip**: You can use any stage name you like, there is no restriction.

- When working on your local computer, NRN automatically uses `NEXT_PUBLIC_APP_STAGE=developement` _(as defined in `.env`)_.
- When creating a Vercel preview deployment (e.g: when pushing a commit/branch (CD), or when using `yarn deploy`, etc.), NRN automatically uses `NEXT_PUBLIC_APP_STAGE=staging` _(as defined in `vercel.customer1.staging.json`)_.
- When creating a Vercel production deployment (e.g: when using `yarn deploy:customer1:production`, or when merging a PR to `master`, etc.), NRN automatically uses `NEXT_PUBLIC_APP_STAGE=production` _(as defined in `vercel.customer1.production.json`)_.

The stage changes the behaviour of the application, because we sometimes need the application to behave differently depending on the stage.

> The stage **isn't magically chosen by NRN**, it is **automated** but it's because of either your `.env`, or because **Github Actions** have been configured this way.
> (any push on **master** is considered as **production** stage, while any push on **any other branch** is considered as **staging** stage)

> e.g: In `production` stage, the Locize configuration uses the `production` version.
> When using another stage, it uses the `latest` version.

> e.g: We don't want to enable the same level of debugging in production environment.
> For instance, Locize is configured to be in `debug` mode only in non-production stages.

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Presets](./presets){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Tenancy >](./tenancy){: .btn .btn-purple }
    </span>
</div>
