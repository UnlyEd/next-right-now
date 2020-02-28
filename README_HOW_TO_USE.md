<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>

How to use
===

> A step by step guide explaining how to use this project yourself, from installing requirements to deploying to production.

---

<!-- toc -->

- [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Local installation](#local-installation)
    + [Super quick local installation (for local-only testing purpose, without Zeit account)](#super-quick-local-installation-for-local-only-testing-purpose-without-zeit-account)
    + [Full local installation](#full-local-installation)
      - [Prerequisites third parties](#prerequisites-third-parties)
  * [Creating Zeit account](#creating-zeit-account)
  * [Configuring Zeit staging/production stages](#configuring-zeit-stagingproduction-stages)
    + [Configuring your own Zeit account](#configuring-your-own-zeit-account)
    + [Configuring Zeit secrets](#configuring-zeit-secrets)
    + [**Advanced** - When using multiple customers (B2B multi-tenants)](#advanced---when-using-multiple-customers-b2b-multi-tenants)
  * [Deploying on Zeit (manually)](#deploying-on-zeit-manually)
    + [Staging deployments](#staging-deployments)
    + [Production deployment](#production-deployment)
  * [Creating Locize account](#creating-locize-account)
    + [Locize configuration video tutorial (12 minutes)](#locize-configuration-video-tutorial-12-minutes)
  * [Creating GraphCMS account](#creating-graphcms-account)
  * [Discount](#discount)
    + [GraphCMS configuration video tutorial (10 minutes)](#graphcms-configuration-video-tutorial-10-minutes)

<!-- tocstop -->

---

# Getting started

## Prerequisites

The following binaries are expected to be installed on your computer.

- [`nvm`](https://github.com/nvm-sh/nvm) (optional, recommended)

## Local installation

> This assumes you've cloned the project on your own computer.
>
> **Tip**: If there are tools that you don't need/like, read our [guide about how to remove them](README_HOW_TO_REMOVE.md).

- Duplicate the [`.env.build.example`](./.env.build.example) and rename it `.env.build` _(this file is only used on your local computer)_

### Super quick local installation (for local-only testing purpose, without Zeit account)

> Follow this guide **if you just want to try it out** on your local machine
>
> **Tip**: Using now@17+ is required for CI to work properly, but you don't care about that if you just want to get started quickly.

- `nvm use` - Selects the right node.js version based on our [`.nvmrc`](./.nvmrc) file
- `yarn add -D now@16.7.3`, now@17+ requires to be authenticated to Zeit in order to launch the project, even if only working locally, so you must use now@16 instead
- `yarn` - Installs all deps from [`package.json`](./package.json)
- `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
- That's it! The project now works on your local computer, and should be identical to the online demo
    Note that it's still using the demo GraphCMS/GraphQL endpoint,

> **Tip**: You can enable **Locize in-context editor mode** in order to localise your static content, by appending `?locize=true` to the url, see [https://nrn-customer1.now.sh/?locize=true](https://nrn-customer1.now.sh/?locize=true) _(this is only enabled in development and staging stages, not in production)_
>
> **Tip**: You can start the project in **debug mode** (built-in for WebStorm only) [by running the WebStorm "Debug" configuration in debug mode](https://youtu.be/3vbkiRAT4e8)
>
> **Tip**: You can change **which customer is started by default** by changing the [`./now.json`](./now.json) symlink (ie: `ln -s ./now.customer2.staging.json ./now.json`)

### Full local installation

> Follow this guide **if you want to deep-dive into the demo**, deploy it to staging/production, change the source code, basically make this project your own.

#### Prerequisites third parties

- [Create a Zeit account](#creating-zeit-account)
- **Tip**: You can continue to use our default `LOCIZE_PROJECT_ID`, `GRAPHQL_API_ENDPOINT` and `GRAPHQL_API_KEY` when deploying to staging/production, or you can overwrite them with your own (you will need to create your own accounts then, see [tutorials](#creating-locize-account) below)


---

## Creating Zeit account

> Creating a Zeit account is **necessary** to deploy the application online (staging/production stages)

[Create a free account on Zeit](https://zeit.co/signup?ref=unly-nrn)

TODO

## Configuring Zeit staging/production stages

> Your setup works locally, but now you want to deploy it online. We will do so by hosting it on the Zeit platform.

### Configuring your own Zeit account

1. Go to [https://zeit.co/signup](https://zeit.co/signup?ref=unly-nrn) and create your account, a free account will do just fine for now
1. _(Optional)_ Run `npx now login` and follow the login steps (this will allow you to use the Now CLI locally and deploy to your Zeit account).

### Configuring Zeit secrets

1. Configuring [Zeit Secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets?query=secre#adding-secrets), open [`now.customer1.staging.json`](./now.customer1.staging.json)
    - Each secret must be added manually, one by one
    - A secret starts with `@`
    - Secrets are global to the whole team, that's why they're all prefixed by `nrn-`, so that they don't conflict with other projects _(Zeit is working on this, to avoid leaking secrets from one project to another, but hasn't released anything yet)_
    - Take a look at [.env.build.example](.env.build.example) for secrets to use by default (you can use them for testing purpose, it's fine, they're not sensitive)
    - Example: `now secrets add nrn-locize-project-id 658fc999-dfa8-4307-b9d7-b4870ad5b968`
1. **Advanced** - If you want to deploy multiple customers, you will need to add `GITHUB_CI_PR_COMMENT` and `ZEIT_TOKEN` **Github secrets** as well. [See "Required GitHub secrets"](./.github/workflows/README.md).

> If you don't provide all secrets, the app will not be deployable. The Now CLI will complain about missing secrets and abort the build.

If you don't want need to deploy your app for multiple clients, then you should delete the whole [.github](.github) folder, as you won't need it.
Zeit native Github integration will do just fine for that simpler use-case! :)

You can now commit/push any change, which will trigger a new build, **through the native Zeit <> Github integration.**

> Once you push, Zeit will automatically create a project using your repository's name. For instance, it created a "next-right-now" project for us.
> You can also deploy from your local computer (without using CI), see [Deploying on Zeit (manually)](#deploying-on-zeit-manually)

The project "next-right-now" is created by the native Zeit <> Github integration.
It's perfectly fine if you **don't need** to deploy multiple customers (multi-tenants).

### **Advanced** - When using multiple customers (B2B multi-tenants)

If you want to deploy multiple customers, then the default "next-right-now" project it won't help you at all.
In that case you should unlink the Zeit project from your Github repository and then delete the "next-right-now" project and leave Github Action handle that (it will create a "nrn-customer1" project when deploying that customer for the first time).

Once unlinked and deleted, Zeit will not automatically re-create the "next-right-now" project later on, and each customer will live on its own project ("nrn-customer1", "nrn-customer1", etc.).

You can now commit/push any change, which will trigger a new build, through **Github Actions.**

---

## Deploying on Zeit (manually)

For each customer instance, we create a different Zeit project.

A project is itself composed of multiple staging deployments (called "previews" on Zeit) and one production deployment.

_**N.B**: If you want to learn more about what happens (on the technical level) when pushing a commit to the repository, read the [CI/CD section](#continuous-integration--continuous-deployment-cicd)_

### Staging deployments

Using Zeit Now, **we have access to many staging "deployments"**.

By default, there is one custom domain per Git Branch, but also one per commit.
It is also possible to create a custom domain manually from the CLI, for any deployment.

- `yarn deploy` - Deploy the customer1 app (shortcut)
- `yarn deploy:customer1` - Deploy the customer1 app
- `yarn deploy:customer2` - Deploy the customer2 app
- `yarn deploy:all` - Deploy all apps

### Production deployment

While there can be multiple staging deployments, **there is only one production deployment (per project)**

- `yarn deploy:customer1:production` - Deploy the customer1 app to [https://zeit.co/unly/nrn-customer1](https://zeit.co/unly/nrn-customer1)
- `yarn deploy:customer2:production` - Deploy the customer2 app to [https://zeit.co/unly/nrn-customer2](https://zeit.co/unly/nrn-customer2)
- `yarn deploy:all:production` - Deploy all apps

> N.B: Those commands use the `now` command with the `--prod` argument behind the wheel.
> N.B: Those commands are used by our CI server.

---

## Creating Locize account

> Creating a Locize account is **necessary** to run the application, even when running it locally, because the app will throw an error if the `LOCIZE_PROJECT_ID` is not valid.
>
> **Tip**: You can skip this step if you use the default `LOCIZE_PROJECT_ID`, but note that new keys won't be created automatically because `LOCIZE_API_KEY` isn't valid

[Create a free (2w trial) account on Locize](https://www.locize.app/register?ref=unly-nrn)
- Make sure to keep `i18n format: i18next/locizify` (by default)
- Make sure to select `publish format: json nested`
- Add French and English languages (french is required for the demo to work properly)
- Add a `common` namespace (and removed the default `latest` namespace)
- (Optional) Update the [`referenceLng`](src/utils/i18nextLocize.ts) (set to `fr` for the demo), you can leave it to `fr` if you created a French version in Locize
- (Optional) Add a `production` version, you won't need it if you don't deploy to production
    - Set the `Cache-Control max-age` header value _(ex: `86400`)_ for the `production` version (performances + cost)
- Copy the `Project Id` and `API Key` from the Locize settings page to the [`.env.build`](.env.build) (`LOCIZE_PROJECT_ID` and `LOCIZE_API_KEY` respectively)
    - The `LOCIZE_PROJECT_ID` is required for the app to fetch the translations
    - The `LOCIZE_API_KEY` is required for the app to automatically create missing keys to Locize, when working locally ([See `saveMissing` option](src/utils/i18nextLocize.ts))
        **This key is sensitive and must not be shared publicly, as it would allow anyone to update your translations through the API.** (it's not injected in the DOM when not working locally, so you're safe for now)
- That's it! Your Locize project is setup and ready to use!

### Locize configuration video tutorial (12 minutes)
[![Locize configuration video tutorial](https://img.youtube.com/vi/p7NVIlIGD30/maxresdefault.jpg)](http://youtu.be/p7NVIlIGD30?hd=1)

> This video explains how to create a Locize account and configure versions, languages, namespaces, Caching and how to release new versions to production

---

## Creating GraphCMS account

## Discount

> **Tip**: Using the coupon code **`unly-nrn`** will grant you a 3-month 15% discount on the premium plans.
>
> **Tip**: Free support is available on their [Slack channel](https://graphcms.slack.com) _(and they're awesome)_

[Create a free account on GraphCMS](https://graphcms.com/?ref=unly-nrn)
- Make sure to select the right region, as it cannot be changed afterwards. The "right region" is the one that's closer to your customer
- Copy the `Master endpoint` and create a `Permanent Auth Token` (QUERY) from the GraphCMS settings page to the [`.env.build`](.env.build) (`GRAPHQL_API_ENDPOINT` and `GRAPHQL_API_KEY` respectively)

### GraphCMS configuration video tutorial (10 minutes)
[![GraphCMS configuration video tutorial](https://img.youtube.com/vi/ig5a7LXTiBM/maxresdefault.jpg)](http://youtu.be/ig5a7LXTiBM?hd=1)

> This video explains how to create a GraphCMS account and configure locales, versions, auth tokens and gives an overview of the settings

