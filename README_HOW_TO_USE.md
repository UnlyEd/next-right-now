<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>

How to use
===

> A step by step guide explaining how to use this project yourself, from installing requirements to deploying to production.

---

<!-- toc -->

- [Getting started](#getting-started)
  * [Super quick local installation (for local-only testing purpose, without Zeit account)](#super-quick-local-installation-for-local-only-testing-purpose-without-zeit-account)
  * [Online installation (on Zeit)](#online-installation-on-zeit)
    + [Prerequisites third parties](#prerequisites-third-parties)
    + [Creating Zeit account](#creating-zeit-account)
      - [Video Tutorial - How to import and configure Zeit project (6 minutes)](#video-tutorial---how-to-import-and-configure-zeit-project-6-minutes)
    + [Configuring project on Zeit platform](#configuring-project-on-zeit-platform)
  * [Creating Locize account](#creating-locize-account)
    + [Locize configuration video tutorial (12 minutes)](#locize-configuration-video-tutorial-12-minutes)
    + [Additional i18n/Locize documentation](#additional-i18nlocize-documentation)
  * [Creating GraphCMS account](#creating-graphcms-account)
    + [Discount](#discount)
    + [GraphCMS configuration video tutorial (10 minutes)](#graphcms-configuration-video-tutorial-10-minutes)
    + [Additional GraphCMS documentation](#additional-graphcms-documentation)
  * [Creating Sentry account](#creating-sentry-account)
    + [Additional Sentry documentation](#additional-sentry-documentation)
  * [Linking a Zeit project to a local source code](#linking-a-zeit-project-to-a-local-source-code)
      - [Video Tutorial - How to link a Zeit project to a local source code (12 minutes)](#video-tutorial---how-to-link-a-zeit-project-to-a-local-source-code-12-minutes)
  * [Advanced Zeit usage](#advanced-zeit-usage)
    + [Deploying on Zeit (manually)](#deploying-on-zeit-manually)
      - [Staging deployments](#staging-deployments)
      - [Production deployment](#production-deployment)
    + [Configuring custom Zeit <> Github Actions integration](#configuring-custom-zeit--github-actions-integration)
      - [Video Tutorial - How to link a Zeit project to a local source code (12 minutes)](#video-tutorial---how-to-link-a-zeit-project-to-a-local-source-code-12-minutes-1)
    + [Configuring Zeit secrets (manually)](#configuring-zeit-secrets-manually)
    + [Configuring Zeit deployment regions](#configuring-zeit-deployment-regions)
  * [Advanced GraphCMS usage](#advanced-graphcms-usage)
    + [Demo data structure](#demo-data-structure)

<!-- tocstop -->

---

# Getting started

## Super quick local installation (for local-only testing purpose, without Zeit account)

> This assumes you've **cloned** the project on your own computer.
>
> Follow this guide **if you just want to try it out** on your local machine
>
> **Tip**: Using now@17+ is required for CI to work properly, but you don't care about that if you just want to get started quickly.

- Duplicate the [`.env.build.example`](./.env.build.example) and rename it `.env.build` _(this file is only used on your local computer)_
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
>
> **Tip**: If there are tools that you don't need/like, read our [guide about how to remove them](README_HOW_TO_REMOVE.md).

---

## Online installation (on Zeit)

> Follow this guide **if you want to deep-dive into the demo**, deploy it to staging/production, **make this project your own**, etc.
>
> **Tip**: You may want to fork the project first, **most especially if you don't want to use a multi-tenants setup**, in order to benefit from Zeit <> Github native integration and CI/CD
>
> **Tip**: **You don't have to clone** the project locally at this time, the first steps are to link a github repository to a Zeit project.
>   But you can definitely clone it if you want to test it locally first, make sure env vars works alright, etc.

### Prerequisites third parties

**It is recommended to first create your own accounts** on the following third parties. _If you do not wish to create your own accounts then ou can use some of the values in `.env.build.example`._
- **Tip**: You _could_ use any value for `LOCIZE_API_KEY`, `AMPLITUDE_API_KEY` because the app would still work even if those values are wrong. But associated features won't work correctly.

- [Create a Locize account](#creating-locize-account)
- [Create a GraphCMS account](#creating-graphcms-account)
- [Create a Sentry account](#creating-sentry-account)

### Creating Zeit account

> Creating a Zeit account is **necessary** to deploy the application online (staging/production stages)

- [Create a free account on Zeit](https://zeit.co/signup?ref=unly-nrn)

#### Video Tutorial - How to import and configure Zeit project (6 minutes)

[![Tutorial NRN - How to import and configure Zeit project](https://img.youtube.com/vi/UWBHkDRXLcM/maxresdefault.jpg)](http://youtu.be/UWBHkDRXLcM?hd=1)

> In this tutorial, we will see how to import and configure our Zeit project (environment variables, project config, etc.) and deploy it to production

### Configuring project on Zeit platform

Once your Zeit account is created, you'll need to create a new Zeit project that is linked to a Github repository.

- Go to [https://zeit.co/import/git](https://zeit.co/import/git) and import the project
    - Use the GitHub integration, if you've forked the project into your own GitHub account
    - Or use `Import a third-party project`, if you haven't forked the project, with value `https://github.com/UnlyEd/next-right-now`
- Select the Zeit team you want to use (it will pick your user's team by default)
    - You may want to [create a team first](https://zeit.co/teams/create), it really depends on what you want to do here.
    - **Tip**: Teams are better if you mean to collaborate on this project with other people.
    - **Tip**: The deployed project will "be linked" to "customer1" configuration, so you could use something like `"nrn-customer1"`, if you plan to use a multi-tenants setup.
        If you don't plan to use a multi-tenants setup, then you can name it anything you like.
- Fill-in the environment variables and continue
    - **Tip**: If you're faking some env vars, don't use ` ` (whitespace) as it won't allow you to continue
- Leave default options
    - You can optionally link your own github account if you want to use the Zeit <> Github integration (pointless if you plan to use a multi-tenants project, as you will be using our custom Zeit <> Github Actions integration in such case)
- Create the project
    - Once created, the project gets automatically deployed by Zeit.
    - Deployment may fail if environment variables are wrong, make sure to check the deployment logs if it fails!

> Your project is now deployed on Zeit and can be accessed online! Fantastic!

The next step is to [link this Zeit project to your computer source code](#linking-a-zeit-project-to-a-local-source-code), so that you can change the source code and deploy the project yourself, or automatically through CI/CD.

---

## Creating Locize account

> Creating a Locize account is **necessary** to run the application, even when running it locally, because the app will throw an error if the `LOCIZE_PROJECT_ID` is not valid.
>
> **Tip**: You can skip this step if you use the default `LOCIZE_PROJECT_ID`, but note that new keys won't be created automatically because `LOCIZE_API_KEY` isn't valid

- [Create a free (2w trial) account on Locize](https://www.locize.app/register?ref=unly-nrn)
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

### Additional i18n/Locize documentation

- react-i18next
    - [Official react-i18next documentation](https://react.i18next.com/)
    - [Github react-i18next](https://github.com/i18next/react-i18next)
    - [`useTranslation` hook official guide](https://react.i18next.com/latest/usetranslation-hook)
    - [`Trans` component official guide](https://react.i18next.com/latest/trans-component)
- [Official i18next documentation](https://www.i18next.com/)

---

## Creating GraphCMS account

### Discount

> **Tip**: Using the coupon code **`unly-nrn`** will grant you a 3-month 15% discount on the premium plans.
>
> **Tip**: Free support is available on their [Slack channel](https://graphcms.slack.com) _(and they're awesome)_

- [Create a free account on GraphCMS](https://graphcms.com/?ref=unly-nrn)
- Create a new project
    - **Tip**: You only need to create one project, even if you use a multi-tenants setup, because all customers will be using the same API/Database
    - **Tip**: You could use one project per customer (if you use a multi-tenants setup), but beware the implications regarding migrating all your schemas one by one in the future. We recommend using one project for all customers when getting started.
- Make sure to select the right region, as it cannot be changed afterwards. The "right region" is the one that's closer to your customer
- Copy the `Master endpoint` and create a `Permanent Auth Token` (QUERY) from the GraphCMS **settings page** to the [`.env.build`](.env.build) (`GRAPHQL_API_ENDPOINT` and `GRAPHQL_API_KEY` respectively)

### GraphCMS configuration video tutorial (10 minutes)
[![GraphCMS configuration video tutorial](https://img.youtube.com/vi/ig5a7LXTiBM/maxresdefault.jpg)](http://youtu.be/ig5a7LXTiBM?hd=1)

> This video explains how to create a GraphCMS account and configure locales, versions, auth tokens and gives an overview of the settings

### Additional GraphCMS documentation

If you decide to keep GraphCMS, you'll need to read the official documentation if you're not already familiar with it.
GraphCMS is very powerful, and quite helpful. It handles your database, your CMS and your GraphQL API. It's a fully managed service.
It also provides a built-in assets management system, with on-the-fly image transformations.

It can be replaced by any other GraphQL endpoint though, if you prefer to manage those things yourself.

- See [Advanced GraphCMS usage](#advanced-graphcms-usage) for further explanation
- [Official "Getting started" guide](https://graphcms.com/docs/getting-started?ref=unly-nrn)
- I18n
    - [Official "I18n" guide](https://graphcms.com/docs/guides/i18n/)
    - [Querying localized content](https://graphcms.com/docs/api/content-api/#querying-localized-content)
- Assets
    - [Official "Assets" guide](https://graphcms.com/docs/assets/general)
    - [Dynamic asset transformations](https://graphcms.com/docs/assets/transformations)

---

## Creating Sentry account

> **Tip**: If you don't want to create an account, you can use `https://14fa1cae05079675b18cd05403ae5c48@sentry.io/1234567` as `SENTRY_DSN`

- [Create a free account on Sentry](https://sentry.io/signup/?ref=unly-nrn)
- Create a new project
    - Select "React" as project type
    - **Tip**: You **must** create only one project, even if you use a multi-tenants setup, because all customers will be using the same error monitoring project
- You can find your Sentry DSN at [https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/](https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/)

### Additional Sentry documentation

- [Official "Getting started" guide](https://docs.sentry.io/error-reporting/quickstart/?platform=javascript)
- [Capturing errors](https://docs.sentry.io/error-reporting/capturing/?platform=javascript)
- [Configuration](https://docs.sentry.io/error-reporting/configuration/?platform=javascript)
- [Using "context" for events](https://docs.sentry.io/enriching-error-data/context/?platform=javascript)
- [Using "breadcrumbs" for events](https://docs.sentry.io/enriching-error-data/breadcrumbs/?platform=javascript)
- [How to blacklist sensitive data tracking (GDPR, security)](https://docs.sentry.io/data-management/sensitive-data/)

---

## Linking a Zeit project to a local source code

> You need to have [a working Zeit project](#online-installation-on-zeit) in order to link it to a local source code
>
> You also need to have a local clone of the project (i.e: `git clone https://github.com/UnlyEd/next-right-now.git nrn-demo`)

- Duplicate the [`.env.build.example`](./.env.build.example) and rename it `.env.build` _(this file is only used on your local computer)_
    - Define all missing environment variables
- `nvm use` - Selects the right node.js version based on our [`.nvmrc`](./.nvmrc) file
- `yarn` - Installs all deps from [`package.json`](./package.json)
- Remove `"scope": "team_DAU7RcjwnftBzWFDi4ZuypN5",` from all now JSON config file
    - **Tip**: Don't forget `now.json` is a symlink to `now.customer1.staging.json` and doesn't need to be modified
- `now` - Authenticates to Zeit and link local project to Zeit project (creates `/.now` folder)
- `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

#### Video Tutorial - How to link a Zeit project to a local source code (12 minutes)

[![Tutorial NRN - How to import and configure Zeit project](https://img.youtube.com/vi/Sjz3hxcg0t0/maxresdefault.jpg)](http://youtu.be/Sjz3hxcg0t0?hd=1)

> In this tutorial, we will see how to link an existing Zeit project to a local source code (cloned repository) and how to manually deploy new customers from our local computer (without CI/CD)

---

## Advanced Zeit usage

### Deploying on Zeit (manually)

For each customer instance, we create a different Zeit project.

A project is itself composed of multiple staging deployments (called "previews" on Zeit) and one production deployment.

_**N.B**: If you want to learn more about what happens (on the technical level) when pushing a commit to the repository, read the [CI/CD section](#continuous-integration--continuous-deployment-cicd)_

#### Staging deployments

Using Zeit Now, **we have access to many staging "deployments"**.

By default, there is one custom domain per Git Branch, but also one per commit.
It is also possible to create a custom domain manually from the CLI, for any deployment.

- `yarn deploy` - Deploy the customer1 app (shortcut)
- `yarn deploy:customer1` - Deploy the customer1 app
- `yarn deploy:customer2` - Deploy the customer2 app
- `yarn deploy:all` - Deploy all apps

#### Production deployment

While there can be multiple staging deployments, **there is only one production deployment (per project)**

- `yarn deploy:customer1:production` - Deploy the customer1 app to [https://zeit.co/unly/nrn-customer1](https://zeit.co/unly/nrn-customer1)
- `yarn deploy:customer2:production` - Deploy the customer2 app to [https://zeit.co/unly/nrn-customer2](https://zeit.co/unly/nrn-customer2)
- `yarn deploy:all:production` - Deploy all apps

> N.B: Those commands use the `now` command with the `--prod` argument behind the wheel.
> N.B: Those commands are used by our CI server.

### Configuring custom Zeit <> Github Actions integration

> If you want to **deploy multiple customers** (multi-tenants setup), you will need to add `GITHUB_CI_PR_COMMENT` and `ZEIT_TOKEN` **Github secrets** on your Github repository.
> [See "Required GitHub secrets"](./.github/workflows/README.md)
>
> **Tip**: Make sure your now JSON files contain a `scope`. You can find your project scope under [.now/project.json:projectId](.now/project.json)

If you don't want/need to deploy your app for multiple clients, then you should delete the whole [.github](.github) folder, as you won't need it.
Zeit native Github integration will do just fine for that simpler use-case! :)

#### Video Tutorial - How to link a Zeit project to a local source code (12 minutes)

[![Tutorial NRN - How to link a Zeit project to a local source code](https://img.youtube.com/vi/hPQu6jgOyC0/maxresdefault.jpg)](http://youtu.be/hPQu6jgOyC0?hd=1)

> In this tutorial, we will see how to configure our custom Zeit <> Github Actions integration (CI/CD)

### Configuring Zeit secrets (manually)

> If you've followed the [Online installation (on Zeit)](#online-installation-on-zeit) chapter, you already have configured your Zeit secrets through the GUI, when creating the project
>
> This documentation is in-case-of you'd need to configure it through the CLI

1. Configuring [Zeit Secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets?query=secre#adding-secrets), open [`now.customer1.staging.json`](./now.customer1.staging.json)
    - Each secret must be added manually, one by one
    - A secret starts with `@`
    - Secrets are global to the whole team, that's why they're all prefixed by `nrn-`, so that they don't conflict with other projects _(Zeit is working on this, to avoid leaking secrets from one project to another, but hasn't released anything yet)_
    - Take a look at [.env.build.example](.env.build.example) for secrets to use by default (you can use them for testing purpose, it's fine, they're not sensitive)
    - Example: `now secrets add nrn-locize-project-id 658fc999-dfa8-4307-b9d7-b4870ad5b968`

> If you don't provide all secrets, the app will not be deployable. The Now CLI will complain about missing secrets and abort the build.

### Configuring Zeit deployment regions

> You may want to deploy Zeit to multiple regions in the world, depending on your use case
>
> By default (if not specified), it will only deploy to the closest region, which is probably **not** what you want to do!

Please see the [official documentation](https://zeit.co/docs/v2/network/regions-and-providers#routing).

---

## Advanced GraphCMS usage

### Demo data structure

> Data structure of the GraphCMS database used as example.
>
> This is only useful if you wish to understand the relationships and data structure of the demo, you don't really need it.
> But if you fork and try to rebuild the demo on your own GraphCMS endpoint, it'll come in handy.

- customer
    - ref - Single line text, required, unique
    - label - Single line text, localized
    - theme - Theme
    - products - Product[]
    - terms - RichText Editor, localized
- product
    - title - Single line text, required, unique
    - images - Asset[]
    - description - Markdown, localized
    - customer - Customer
    - price - float
- theme
    - primaryColor - Single line text, required
    - logo - Asset, required
    - customer - Customer
