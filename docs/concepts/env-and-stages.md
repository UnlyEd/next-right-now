---
layout: default
title: Environments and Stages
parent: Concepts
nav_order: 10
---

# Understanding **Environments** and **Stages**

<div class="code-example" markdown="1">
NRN relies on environment variables to function correctly.

Those variables are provided differently depending on the environment.

> The following examples use the [`v1-ssr`](../getting-started/pick-variant.html#v1-ssr---default-variant) variant, which uses a MST design.
</div>

---

When working on the `development` environment (localhost), the variables from [`.env.build`](.env.build) are used by [the webpack configuration](./next.config.js),
also, the [`now.json`](./now.json) configuration file is used _(it's always a symlink to another staging `now.*.json` file, i.e: `now.customer1.staging.json`)_, but the variable defined in `.env.build` take precedence.

When deploying an instance to the Zeit's platform, the variables used are the one that belong to that instance, such as:
- `yarn deploy:customer1`: This script will deploy an instance using the `now.customer1.staging.json` file.
- `yarn deploy:customer1:production`: This script will deploy an instance using the `now.customer1.production.json` file.

> In those files, it's the `build.env` part that is used at build time (build is done on Zeit), which basically replaces all references of every environment variable by the actual value (string replace at build time).

---

## What is an **environment**?

> An environment is "where" the application is running.
> It can be either "development" (localhost) or "production" (on Zeit's servers).
>
> **The `environment` is defined by the `NODE_ENV` environment variable.**
>
> **N.B**: It is **not** possible to use any other value, [as enforced by Next](https://github.com/zeit/next.js/blob/master/errors/env-key-not-allowed.md)

When working on your local computer, you automatically use `NODE_ENV=developement`.

The environment affects how the application **is bundled**, it is defined at **build time**. (webpack, hot-reloading, etc.)

> i.e: When building the app using the `development` environment, you have access to PropTypes warnings, but you won't when using `production`.

---

## What is a **stage**?

> A stage is "how" the application is running.
> It can be either "development" (localhost), "staging" or "production" (on Zeit's servers) - _You can even add more if you need_
>
> **The `stage` is defined by the `APP_STAGE` environment variable.**
>
> **N.B**: You can use any stage name you like, there is no restriction.

- When working on your local computer, NRN automatically uses `APP_STAGE=developement` _(as defined in `.env.build`)_.
- When creating a Zeit preview deployment (i.e: when pushing a commit/branch (CD), or when using `yarn deploy`, etc.), NRN automatically uses `APP_STAGE=staging` _(as defined in `now.customer1.staging.json`)_.
- When creating a Zeit production deployment (i.e: when using `yarn deploy:customer1:production`, or when merging a PR to `master`, etc.), NRN automatically uses `APP_STAGE=production` _(as defined in `now.customer1.production.json`)_.

The stage changes the behaviour of the application, because we sometimes need the application to behave differently depending on the stage.

> The stage **isn't magically chosen by NRN**, it is **automated** but it's because of either your `.env.build`, or because **Github Actions** have been configured this way.
> (any push on **master** is considered as **production** stage, while any push on **any other branch** is considered as **staging** stage)

> i.e: In `production` stage, the Locize configuration uses the `production` version.
> When using another stage, it uses the `latest` version.

> i.e: We don't want to enable the same level of debugging in production environment.
> For instance, Locize is configured to be in `debug` mode only in non-production stages.

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Variants](./variants){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Tenancy >](./tenancy){: .btn .btn-purple }
    </span>
</div>
