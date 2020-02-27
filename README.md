<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now/test_coverage)
[![Locize Latest version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27latest%27%5D.translatedPercentage&url=https://api.locize.io/badgedata/7867a172-62dc-4f47-b33c-1785c4701b12?t=1573424617493&suffix=%+translated&link=https://www.locize.com&prefix=latest:+)](https://www.locize.io/p/w7jrmdie/statistics/badges)
[![Locize Production version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27production%27%5D.translatedPercentage&url=https://api.locize.io/badgedata/7867a172-62dc-4f47-b33c-1785c4701b12?t=1573424617493&suffix=%+translated&link=https://www.locize.com&prefix=production:+)](https://www.locize.io/p/w7jrmdie/statistics/badges)

Next Right Now
===

> # Status
> **DRAFT - Currently being heavily worked on, subject to massive changes at any time**

> Next Right Now (NRN) is meant to be used as a boilerplate for quick getting started with a production-grade project featuring the Next.js framework, hosted on Zeit platform.
>
> NRN is strongly opinionated, but also very flexible.
> It can also be used as a learning/teaching resource.
>
> A lot of built-in components and utilities are available out of the box. Keep those you like, throw what you dislike, rewrite what doesn't exactly fit your needs, and share what could be useful to others! ;)
>
> Don't hesitate to share your opinion and propose improvements

Our goal, by releasing NRN, is to allow any developer to quickly getting started with a fully working setup that includes many of the "must-have" features any real project needs as of 2020, such as:
- **B2B multi-tenants** first-class support (optional, advanced use-case)
  - Supports configuration, deployment, testing, monitoring of multiple customers through the same project (identical code base, multi-tenants design)
  - This is a very special consideration, and required quite a lot of efforts to make it works smoothly
  - Most projects do not need such capability, but we build our own projects with such requirement in mind, and thus released NRN with such built-in capability
  - It's very easy not to use it if you don't need to, but if you do then it'll be a huge time saver for you!
- Built-in **stages** (development, staging, production) workflow
- **TypeScript** first-class support
- **GraphQL** support (thanks to [Apollo](https://github.com/apollographql/apollo-client), and others)
  - **GraphCMS** first-class support, which hosts our GraphQL API (server) and database, fully hosted (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
  - **GraphQL schema** available in the developer environment (thanks to [GraphQL Config](https://github.com/kamilkisiela/graphql-config))
- **SSR** and **CSR** capabilities (thanks to the [Next.js framework](https://nextjs.org/))
- React hooks HOC
- **Internationalisation** (i18n) first-class support (SSR + CSR friendly) (thanks to [react-i18next](https://react.i18next.com/))
  - I18n of the database (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
      - [Automated fallback language, through HTTP headers](https://graphcms.com/features/content-localization/?ref=unly-nrn)
  - I18n of the project (thanks to [Locize<sup>1</sup>](https://locize.com/?lng=en))
      - [Automated fallback language](https://www.i18next.com/principles/fallback)
      - [In-context editor](https://docs.locize.com/more/incontext-editor)
      - Auto-add i18n keys with default translation when working locally
- **Testing** first-class support
  - TS-friendly (thanks to [ts-jest](https://github.com/kulshekhar/ts-jest))
  - End-to-end (E2E) tests (thanks to [Cypress](https://www.cypress.io/))
  - Other tests, such as unit tests, etc. (thanks to [Jest](https://jestjs.io/), [Jest extended](https://github.com/jest-community/jest-extended))
- Strong **observability** of the system (monitoring) and push-notification on your own messaging channel (i.e: Slack) when things go wrong (thanks to [Sentry<sup>1</sup>](https://sentry.io/))
- **Universal JS**, to re-use code as much as possible between frontend and backend (i.e: universal cookies API)
- Powerful **CSS-in-JS** styles, SSR & CSR friendly, JSX-friendly, styled-component friendly (thanks to [Emotion](https://github.com/emotion-js/emotion))
- **Font** first-class support (SSR/CSR friendly, no FOUT effect) (thanks to [WebFontLoader](https://github.com/typekit/webfontloader))
- Fine-grained frontend **analytics**, react-friendly, flexible, SPA-friendly (thanks to [Amplitude<sup>1</sup>**<sup>2</sup>**](https://amplitude.com/))
- **Integrated CI/CD pipeline**, automated deployments to preview domains and production domains (thanks to the [Zeit](https://zeit.co/), [GitHub Actions](https://github.com/features/actions))
  - Including a dedicated "per-deployment domain", for fast feedback loop and testing means, in an online environment (staging)
- Built-in **utilities**
  - Convert SVG to TSX components (thanks to [SVGR](https://github.com/gregberge/svgr))
  - Font Awesome icons as react components, with SSR support (thanks to [Font Awesome](https://github.com/FortAwesome/react-fontawesome))
  - Bootstrap support (thanks to [Reactstrap](https://reactstrap.github.io/))
  - Node debug mode for the server side (only built-in on WebStorm)
  - NPM security audit (script)
  - NPM developer-friendly outdated packages (script)
  - Display warning on outdated browsers, works even if bundle isn't ES5 compatible (IE11, etc.)
- [Fully documented usage of all our third party NPM libraries (AKA dependencies)](./README_DEPENDENCIES.md)

**Legend:**
- `first-class support`: Means that we took a very special care to support this, and that it's not as simple as one may believe
- <sup>1</sup>: Third parties that provide a free plan that is enough for a "simple" application, but make sure to check that their pricing fits you.
- **<sup>2</sup>**: Beware huge gap between free and paid plans cost.

---

<!-- toc -->

- [Getting started](#getting-started)
  * [Showcases - Live demo](#showcases---live-demo)
  * [Local installation](#local-installation)
  * [Configuring Zeit staging/production stages](#configuring-zeit-stagingproduction-stages)
    + [Configuring your own Zeit account](#configuring-your-own-zeit-account)
    + [Configuring secrets](#configuring-secrets)
    + [**Advanced** - When using multiple customers (B2B multi-tenants)](#advanced---when-using-multiple-customers-b2b-multi-tenants)
- [Understanding `Environments` and `Stages`](#understanding-environments-and-stages)
  * [What is an `environment`?](#what-is-an-environment)
  * [What is a `stage`?](#what-is-a-stage)
- [Deploying on Zeit (manually)](#deploying-on-zeit-manually)
  * [Staging deployments](#staging-deployments)
  * [Production deployment](#production-deployment)
- [Testing](#testing)
  * [CI tests Workflow](#ci-tests-workflow)
  * [Running tests manually (locally)](#running-tests-manually-locally)
  * [Running E2E tests manually (locally)](#running-e2e-tests-manually-locally)
- [I18n (Internationalization)](#i18n-internationalization)
  * [Fetching translations through GraphCMS](#fetching-translations-through-graphcms)
  * [Fetching translations through Locize provider](#fetching-translations-through-locize-provider)
    + [Locize translation workflow in-depth](#locize-translation-workflow-in-depth)
      - [Locize additional services](#locize-additional-services)
      - [Other additional services](#other-additional-services)
- [GraphCMS](#graphcms)
  * [Discount](#discount)
  * [Fetching data from GraphCMS](#fetching-data-from-graphcms)
- [Amplitude](#amplitude)
  * [Chrome developer debug tool](#chrome-developer-debug-tool)
- [Continuous Integration & Continuous Deployment (CI/CD)](#continuous-integration--continuous-deployment-cicd)
  * [Overview](#overview)
  * [Workflow of our Zeit <> Github Actions integration](#workflow-of-our-zeit--github-actions-integration)
  * [In-depth project's dependencies](#in-depth-projects-dependencies)
  * [License](#license)
- [Vulnerability disclosure](#vulnerability-disclosure)
- [Contributors and maintainers](#contributors-and-maintainers)
- [**[ABOUT UNLY]**](#about-unly-)

<!-- tocstop -->

---

# Getting started

## Showcases - Live demo

You can see 2 almost identical demo at:
- [https://nrn-customer1.now.sh](https://nrn-customer1.now.sh)
- [https://nrn-customer2.now.sh](https://nrn-customer2.now.sh)

Both share the same source code and configuration, but the database content is different (hosted on GraphCMS).

> **Tip**: You can get metadata at [/api/status](https://nrn-customer1.now.sh/api/status)
>
> **Tip**: You can go to preview deployments (staging stage) by looking at [this PR comments](https://github.com/UnlyEd/next-right-now/pull/1)

## Local installation

> This assumes you've cloned the project on your own computer.

- `nvm use` - Selects the right node.js version based on our [`.nvmrc`](./.nvmrc) file
- `yarn` - Installs all deps from [`package.json`](./package.json)
- Duplicate the [`.env.build.example`](./.env.build.example) and rename it `.env.build` _(this file is only used on your local computer)_
    1. Create a free account on [Locize](https://www.locize.app/register?ref=unly-nrn), it's required for the project to work properly when running locally
        - Make sure to keep `i18n format: i18next/locizify` (by default)
        - Make sure to select `publish format: json nested`
    1. Copy the `Project Id` and `API Key` from the settings page to the `.env.build` `LOCIZE_PROJECT_ID` and `LOCIZE_API_KEY` respectively
- `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
- That's it!

> **Tip**: You can enable in-context editor mode in order to localise your static content, by appending `?locize=true` to the url, see [https://nrn-customer1.now.sh/?locize=true](https://nrn-customer1.now.sh/?locize=true) _(this is only enabled in development and staging stages, not in production)_
>
> **Tip**: You can start the project in debug mode (built-in for WebStorm only) by running the WebStorm "Debug" configuration in debug mode TODO video

## Configuring Zeit staging/production stages

> Your setup works locally, but now you want to deploy it online. We will do so by hosting it on the Zeit platform.

### Configuring your own Zeit account

1. Go to [https://zeit.co/signup](https://zeit.co/signup?ref=unly-nrn) and create your account, a free account will do just fine for now
1. _(Optional)_ Run `npx now login` and follow the login steps (this will allow you to use the Now CLI locally and deploy to your Zeit account).


### Configuring secrets

1. Configuring [Now Secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets?query=secre#adding-secrets), open [`now.customer1.staging.json`](./now.customer1.staging.json)
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

# Understanding `Environments` and `Stages`

> The application relies on environment variables to function correctly.
> Those variables are provided differently depending on the environment.

When working on the `development` environment (localhost), the variables from [`.env.build`](.env.build) are used by [the webpack configuration](./next.config.js),
also, the [`now.json`](./now.json) configuration file is used _(it's a symlink to [`now.customer1.staging.json`](now.customer1.staging.json))_, but the variable defined in `.env.build` take precedence.

When deploying an instance to the Zeit's platform, the variables used are the one that belong to that instance, such as:
- `yarn deploy:customer1`: This script will deploy an instance using the [`now.customer1.production.json`](now.customer1.staging.json) file.
- `yarn deploy:customer1:production`: This script will deploy an instance using the [`now.customer1.production.json`](now.customer1.production.json) file.

> In those files, it's the `build.env` part that is used at build time (build is done on Zeit), which basically replaces all references of every environment variable by the actual value (string replace).

## What is an `environment`?

> An environment is "where" the application is running.
> It can be either "development" (localhost) or "production" (on Zeit's servers).
>
> **The `environment` is defined by the `NODE_ENV` environment variable.**
>
> **N.B**: It is not possible to any other value, [as enforced by Next](https://github.com/zeit/next.js/blob/master/errors/env-key-not-allowed.md)

When working on your local computer, you automatically use `NODE_ENV=developement`.

The environment affects how the application **is bundled**, it is used at **build time**. (webpack, hot-reloading, etc.)

> i.e: In `development` environment, you have access to PropTypes warnings, but you won't in `production`.

## What is a `stage`?

> A stage is "how" the application is running.
> It can be either "development" (localhost), "staging" or "production" (on Zeit's servers) - _You can add more if you need_
>
> **The `stage` is defined by the `APP_STAGE` environment variable.**
>
> **N.B**: You can use any stage name you like, there is no restriction.

- When working on your local computer, you automatically use `APP_STAGE=developement`.
- When creating a Zeit preview deployment (i.e: when pushing a commit/branch (CD), when using `yarn deploy`, etc.), you automatically use `APP_STAGE=staging`.
- When creating a Zeit production deployment (i.e: when using `yarn deploy:customer1:production`, when merging a PR to `master`, etc.), you automatically use `APP_STAGE=production`.

The stage changes the behaviour of the application, because we sometimes need the application to behave differently depending on the stage.

> i.e: In `production` stage, the Locize configuration uses the `production` version.
> When using another stage, it uses the `latest` version.

> i.e: We don't want to enable the same level of debugging in production environment.
> For instance, Locize is configured to be in `debug` mode only in non-production stages.

---

# Deploying on Zeit (manually)

For each customer instance, we create a different Zeit project.

A project is itself composed of multiple staging deployments (called "previews" on Zeit) and one production deployment.

_**N.B**: If you want to learn more about what happens (on the technical level) when pushing a commit to the repository, read the [CI/CD section](#continuous-integration--continuous-deployment-cicd)_

## Staging deployments

Using Zeit Now, **we have access to many staging "deployments"**.

By default, there is one custom domain per Git Branch, but also one per commit.
It is also possible to create a custom domain manually from the CLI, for any deployment.

- `yarn deploy` - Deploy the customer1 app (shortcut)
- `yarn deploy:customer1` - Deploy the customer1 app
- `yarn deploy:customer2` - Deploy the customer2 app
- `yarn deploy:all` - Deploy all apps

## Production deployment

While there can be multiple staging deployments, **there is only one production deployment (per project)**

- `yarn deploy:customer1:production` - Deploy the customer1 app to [https://zeit.co/unly/nrn-customer1](https://zeit.co/unly/nrn-customer1)
- `yarn deploy:customer2:production` - Deploy the customer2 app to [https://zeit.co/unly/nrn-customer2](https://zeit.co/unly/nrn-customer2)
- `yarn deploy:all:production` - Deploy all apps

> N.B: Those commands use the `now` command with the `--prod` argument behind the wheel.
> N.B: Those commands are used by our CI server.

---

# Testing

## CI tests Workflow

Zeit will automatically run the tests before deploying, as configured in the `yarn build` command.

> If any test fail, the deployment will be aborted. This ensures that any code that doesn't pass the tests never get deployed online.

Once a deployment has been deployed on Zeit, **Github Actions** will run our **E2E tests**, to make sure that the app behaves as expected.
This can also be considered as an integration tests suite.

## Running tests manually (locally)
You can run interactive tests using Jest with `yarn test` script.

## Running E2E tests manually (locally)
You can run interactive E2E tests using Cypress with `yarn e2e:open` script.

You can also run them non-interactively using `yarn e2e:run` script.

> You may need to run `yarn e2e:install` script first

---

# I18n (Internationalization)

The content displayed on NRN is translated using different ways, depending on where the translations are stored:
- GraphCMS - Dynamic content (fetched from the DB, through GraphCMS API). This content can be updated through GraphCMS backoffice.
- Locize - Static content (fetched from Locize API). This content can be updated through Locize backoffice, or when using in-context editor.

## Fetching translations through GraphCMS

> When the content is fetched through GraphCMS, the content is automatically internationalized using the `gcms-locale` **HTTP header** provided in the HTTP request.
>
> This means that a given user will not fetch the same content (even though the GraphQL query is identical) based on the `gcms-locale` value.

The `gcms-locale` value is a string of the form `'FR, EN'`. _([case matters!](https://graphcms.com/docs/api/content-api/?ref=unly-nrn#passing-a-header-flag))_
There is two locales defined in this example _(there can be more, but we only handle 2 locales at this time in this app)_.
- `FR` is the first and main locale. Content in French will therefore be loaded first.
- `EN` is the second and is a fallback locale. If the content is not found in the main locale, then fallback locales are used.

See the [official documentation](https://graphcms.com/docs/api/content-api/?ref=unly-nrn#passing-a-header-flag) to learn more.

> **N.B:** Even though it is possible to also specify the language `per field`, our **default approach** is to translate all content at once based on the header,
> because it's so much simpler, and handles automated fallback, which is very useful if the content is not defined in the primary requested language.

## Fetching translations through Locize provider

> When the content we want to display doesn't come from GraphCMS API, then it's considered as a "static" content.
>
> This means that the content is managed by [Locize](https://www.locize.io/p/w7jrmdie/v/latest) and must be updated manually there.

Check [this video](https://www.youtube.com/watch?v=9NOzJhgmyQE) to see Locize in action with react-i18next.

### Locize translation workflow in-depth

The Locize project contains two different **versions**:

- `latest`: This **Locize version** is used in **any non-production application stage** (development, staging). That's where translations get added/updated by translators.
- `production`: This **Locize version** is only used in the production application stages (`APP_STAGE=production`) _(all customers share the same `production` version in the current setup, for the sake of simplicity)_

> This separation between the two versions is important and very useful to avoid deploying unapproved changes to the production stage.

In order to update the `production` version, all changes must go through the `latest` version.
They can therefore be tested during the development phase, then during the staging phase.
Once you're ready to ship the content to production, the `production` version can be updated from the `latest` version, which will automatically update all customer production stages.

> **Tip**: New i18n keys are added automatically in the `development` stage, as they are being added to the source code, thanks to the `saveMissing` [option](src/utils/i18nextLocize.ts). _This can also be a bit boring with HMR, because useless keys may be created while programming._

#### Locize additional services

Locize provides a few [additional services](https://www.locize.io/p/w7jrmdie/services). Some are free, some are paid.

#### Other additional services

- One interesting thing is the ability to share part of the project to be translated by a third party using [`Crowdbased`](https://www.locize.io/p/w7jrmdie/services), without sharing the whole project.
- There are also several paid [Translation services](https://www.locize.io/p/w7jrmdie/services), where you can pay people to translate your content.
- It is also possible to enable [Audit](https://www.locize.io/p/w7jrmdie/services), which allows to audit every change to our translations, and keep changes up to 10 years. (_expensive_)

---

# [GraphCMS](https://graphcms.com/?ref=unly-nrn)

## Discount

> Using the coupon code **`unly-nrn`** will grant you a 3-month 15% discount on the premium plans.

## Fetching data from GraphCMS

> We use multiple libraries to fetch data from GraphCMS. GraphCMS provides a GraphQL endpoint, so we use generic libraries to the GraphQL specification like `react-apollo`.
>
> [See full list of dependencies related to GraphCMS](README_DEPENDENCIES.md)

There are several ways of fetching data from a GraphQL API:
- [`react-hoc`](https://www.apollographql.com/docs/react/api/react-hoc/): HOC (High Order Components) can be used with an components (classes, functional), the GraphQL query is described in the function's wrapper, outside of its body.
    **Former way, tend to be deprecated in favor of `react-hooks` nowadays.**
    [List of known issues](https://reactjs.org/docs/higher-order-components.html#caveats).
- [`Render Props`](https://reactjs.org/docs/render-props.html): Never used it, fixes some issues one can encounter with HOC, but hooks are still better.
- [**`react-hooks`**](https://www.apollographql.com/docs/react/api/react-hooks): Hooks can only be used with Functional components (not classes), the GraphQL query is described in the function's body.

We used the hooks approach because it's just cleaner and simpler to understand.

---

# [Amplitude](https://amplitude.com/) (Analytics)

> Amplitude is used to collect usage metrics (analytics) of the application.

Amplitude **is used only on the frontend part of the application**. It is composed of two parts:
- [`@amplitude/react-amplitude`](https://github.com/amplitude/react-amplitude): React components easy to use, see their [blog post](https://amplitude.engineering/introducing-react-amplitude-d7b5258bc708).
- [`amplitude-js`](https://github.com/amplitude/Amplitude-JavaScript): The JS SDK, only compatible from the browser. (They're working on making it [compatible with SSR](https://github.com/amplitude/Amplitude-JavaScript/issues/164))

See the [documentation example at react-amplitude](https://github.com/amplitude/react-amplitude#example-instrumenting-tic-tac-toe-from-facebooks-intro-to-react-tutorial) to understand how it's meant to be used.
We only use react-amplitude to manipulate events.

> **Known limitation**: Amplitude doesn't provide any backend-compatible API. See https://github.com/amplitude/Amplitude-JavaScript/issues/164

## Chrome developer debug tool

> The amplitude team has released a Chrome plugin to see the events from the browser.
>
> It is a **must-have** when working with Amplitude. It's very simple to use and quite helpful.

- [Tutorial](https://help.amplitude.com/hc/en-us/articles/360003032451-Instrumentation-Explorer-Debugger)
- [Chrome plugin](https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp)


---

# Continuous Integration & Continuous Deployment (CI/CD)

## Overview

> Every time a commit is pushed to the repository, or a branch is merged, automated actions are triggered.
>
> Those actions are managed through Github Actions

## Workflow of our Zeit <> Github Actions integration

Here is how the multiple steps are ordered:

1. [Event] A commit is pushed, a branch is merged (or on any change made on the remote repository)
1. [Trigger] Our [Github Actions](./.github/workflows) are triggered
    - Either the staging scripts is executed, or the production script, depending on which branch is impacted (see [Github Actions <> Zeit integrations](./.github/workflows/README.md))
    - No matter what script (production vs staging) gets executed, those actions are always triggered:
        1. A new Zeit deployment is triggered, which runs our tests first (`yarn test:once`) (Failing tests will stop the deployment)
        1. Then, the deployment is deployed, and automatically linked to a custom domain which depends on the git branch name (xxx.now.sh)
        1. Then, our 2E2 tests are triggered using Cypress
            - If they fail, artifacts (screenshots, videos) recorded by Cypress are uploaded to Github to help further debug

## In-depth project's dependencies

See [README_DEPENDENCIES](./README_DEPENDENCIES.md)


---

## License

MIT

---

# Vulnerability disclosure

[See our policy](https://github.com/UnlyEd/Unly).

---

# Contributors and maintainers

This project is being maintained by:
- [Unly] Ambroise Dhenain ([Vadorequest](https://github.com/vadorequest)) **(active)**

Special thanks to:
- [Contributor] Hugo Martin ([Demmonius](https://github.com/Demmonius)) - Github Actions CI/CD pipeline

---

# **[ABOUT UNLY]** <a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" height="40" align="right" alt="Unly logo" title="Unly logo" /></a>

> [Unly](https://unly.org) is a socially responsible company, fighting inequality and facilitating access to higher education.
> Unly is committed to making education more inclusive, through responsible funding for students.

We provide technological solutions to help students find the necessary funding for their studies.

We proudly participate in many TechForGood initiatives. To support and learn more about our actions to make education accessible, visit :
- https://twitter.com/UnlyEd
- https://www.facebook.com/UnlyEd/
- https://www.linkedin.com/company/unly
- [Interested to work with us?](https://jobs.zenploy.io/unly/about)

Tech tips and tricks from our CTO on our [Medium page](https://medium.com/unly-org/tech/home)!

#TECHFORGOOD #EDUCATIONFORALL
