<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Locize Latest version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27latest%27%5D.translatedPercentage&url=https://api.locize.io/badgedata/7867a172-62dc-4f47-b33c-1785c4701b12?t=1573424617493&suffix=%+translated&link=https://www.locize.com&prefix=latest:+)](https://www.locize.io/p/w7jrmdie/statistics/badges)
[![Locize Production version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27production%27%5D.translatedPercentage&url=https://api.locize.io/badgedata/7867a172-62dc-4f47-b33c-1785c4701b12?t=1573424617493&suffix=%+translated&link=https://www.locize.com&prefix=production:+)](https://www.locize.io/p/w7jrmdie/statistics/badges)

Next Right Now
===

> # Status
> **DRAFT - Currently being heavily worked on, subject to massive changes at any time**

> Next Right Now (NRN) is meant to be used as a boilerplate for quick getting started with a production-ready project featuring the Next.js framework, hosted on Zeit platform.
>
> NRN is strongly opinionated, but also very flexible. It can also be used as a learning/teaching resource.
> Our goal, by releasing NRN, is to allow any developer to quickly getting started with a fully working setup that includes many of the "must-have" features any real project needs as of 2020, such as:
> - **B2B multi-tenants** first-class support (optional, advanced use-case)
>   - Supports configuration, deployment, testing, monitoring of multiple customers through the same project (identical code base)
>   - This is a very special consideration, and required quite a lot of efforts to make it works smoothly
>   - Most projects do not need such capability, but we build our own projects with such requirement in mind, and thus released NRN with such capability
>   - It's very easy not to use it if you don't need to, but if you do then it'll be a huge time saver for you!
> - Built-in **stages** (development, staging, production) workflow
> - **TypeScript** first-class support
> - **GraphQL** support (thanks to [Apollo](https://github.com/apollographql/apollo-client), and others)
>   - **GraphCMS** first-class support, which hosts our GraphQL API (server) and database, fully hosted (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=ambroise))
>   - **GraphQL schema** available in the developer environment (thanks to [GraphQL Config](https://github.com/kamilkisiela/graphql-config))
> - **SSR** and **CSR** capabilities (thanks to the [Next.js framework](https://nextjs.org/))
> - **Internationalisation** (i18n) first-class support (SSR + CSR friendly) (thanks to [react-i18next](https://react.i18next.com/))
>   - I18n of the database (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=ambroise))
>       - [Automated fallback language, through HTTP headers](https://graphcms.com/features/content-localization/)
>   - I18n of the project (thanks to [Locize<sup>1</sup>](https://locize.com/?lng=en))
>       - [Automated fallback language](https://www.i18next.com/principles/fallback)
>       - [In-context editor](https://docs.locize.com/more/incontext-editor)
>       - Auto-add i18n keys with default translation when working locally
> - **Testing** first-class support
>   - TS-friendly (thanks to [ts-jest](https://github.com/kulshekhar/ts-jest))
>   - End-to-end (E2E) tests (thanks to [Cypress](https://www.cypress.io/))
>   - Other tests, such as unit tests, etc. (thanks to [Jest](https://jestjs.io/), [Jest extended](https://github.com/jest-community/jest-extended))
> - Strong **observability** of the system (monitoring) and push-notification on your own messaging channel (i.e: Slack) when things go wrong (thanks to [Sentry<sup>1</sup>](https://sentry.io/))
> - **Universal JS**, to re-use code as much as possible between frontend and backend (i.e: universal cookies API)
> - Powerful **CSS-in-JS** styles, SSR & CSR friendly, JSX-friendly, styled-component friendly (thanks to [Emotion](https://github.com/emotion-js/emotion))
> - **Font** first-class support (SSR/CSR friendly, no FOUT effect) (thanks to [WebFontLoader](https://github.com/typekit/webfontloader))
> - Fine-grained frontend **analytics**, react-friendly, flexible, SPA-friendly (thanks to [Amplitude<sup>1</sup>**<sup>2</sup>**](https://amplitude.com/))
> - **Integrated CI/CD pipeline**, automated deployments to preview domains and production domains (thanks to the [Zeit](https://zeit.co/), [GitHub Actions](https://github.com/features/actions))
>   - Including a dedicated "per-deployment domain", for fast feedback loop and testing means, in an online environment (staging)
> - Built-in **utilities**
>   - Convert SVG to TSX components (thanks to [SVGR](https://github.com/gregberge/svgr))
>   - Font Awesome icons as react components, with SSR support (thanks to [Font Awesome](https://github.com/FortAwesome/react-fontawesome))
>   - Bootstrap support (thanks to [Reactstrap](https://reactstrap.github.io/))
>   - Node debug mode for the server side (only built-in on WebStorm)
>   - NPM security audit (script)
>   - NPM developer-friendly outdated packages (script)
>   - Display warning on outdated browsers, works even if bundle isn't ES5 compatible (IE11, etc.)
> - [Fully documented usage of all our third party NPM libraries (AKA dependencies)](./README_DEPENDENCIES.md)

**Legend:**
- `first-class support`: Means that we took a very special care to support this, and that it's not as simple as one may believe
- <sup>1</sup>: Third parties that provide a free plan that is enough for a "simple" application, but make sure to check that their pricing fits you.
- **<sup>2</sup>**: Beware huge gap between free and paid plans cost.

---

<!-- toc -->

- [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Local installation](#local-installation)
- [Understanding `Environments` and `Stages`](#understanding-environments-and-stages)
  * [What is an `environment`?](#what-is-an-environment)
  * [What is a `stage`?](#what-is-a-stage)
- [Deploying on Zeit](#deploying-on-zeit)
  * [Staging deployments](#staging-deployments)
  * [Production deployment](#production-deployment)
- [Customer instances powered by the Zeit platform](#customer-instances-powered-by-the-zeit-platform)
- [Testing](#testing)
- [I18n (Internationalization)](#i18n-internationalization)
  * [Fetching translations through GraphCMS (automated)](#fetching-translations-through-graphcms-automated)
  * [Fetching translations through [Locize](https://www.locize.io/p/w7jrmdie/v/latest) provider](#fetching-translations-through-locizehttpswwwlocizeiopw7jrmdievlatest-provider)
    + [Locize translation workflow in-depth](#locize-translation-workflow-in-depth)
      - [Locize additional services](#locize-additional-services)
      - [Other additional services](#other-additional-services)
- [GraphCMS](#graphcms)
  * [Fetching data from GraphCMS](#fetching-data-from-graphcms)
- [(Amplitude)[https://analytics.amplitude.com/unly/] (Analytics)](#amplitudehttpsanalyticsamplitudecomunly-analytics)
  * [Chrome developer debug tool](#chrome-developer-debug-tool)
- [Continuous Integration & Continuous Deployment (CI/CD)](#continuous-integration--continuous-deployment-cicd)
  * [Overview](#overview)
  * [Workflow](#workflow)
  * [Configuration overview](#configuration-overview)
  * [Configuration in-depth](#configuration-in-depth)
  * [In-depth project's dependencies](#in-depth-projects-dependencies)

<!-- tocstop -->

---

# Getting started

## Showcases - Live demo

You can see 2 almost identical demo at:
- [https://nrn-customer1.now.sh](https://nrn-customer1.now.sh)
- [https://nrn-customer2.now.sh](https://nrn-customer2.now.sh)

Both share the same source code and configuration, but the database content is different (hosted on GraphCMS).

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

## Configuring Zeit staging/production stages

> Your setup works locally, now you want to deploy it online. We will host it on the Zeit platform.

1. Configuring [Now Secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets?query=secre#adding-secrets), open [`now.customer1.staging.json`](./now.customer1.staging.json)
    - Each secret must be added manually, one by one
    - A secret starts with `@`
    - Secrets are global to the whole team, that's why they're all prefixed by `nrn-`, so that they don't conflict with other projects
    - Take a look at [.env.build.example](.env.build.example) for secrets to use by default
    - Example: `now secrets add nrn-locize-project-id my-secret-value`

> If you don't provide all secrets, the app will not be deployable. The Now CLI will complain about missing secrets and abort the build.

Once you've defined all secrets, you can commit/push any change, which will trigger a new build, through Github Actions.

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
- `yarn deploy:customer2` - Deploy the GEM app
- `yarn deploy:all` - Deploy all apps

## Production deployment

While there can be multiple staging deployments, **there is only one production deployment (per project)**

- `yarn deploy:customer1:production` - Deploy the customer1 app to [https://zeit.co/unly/NRN-customer1](https://zeit.co/unly/NRN-customer1)
- `yarn deploy:customer2:production` - Deploy the customer2 app to [https://zeit.co/unly/NRN-customer2](https://zeit.co/unly/NRN-customer2)
- `yarn deploy:all:production` - Deploy all apps

> N.B: Those commands use the `now` command with the `--prod` argument behind the wheel.
> N.B: Those commands are used by our CI server.

---

# Testing

You can run interactive tests using Jest with `yarn test` script.

Zeit will automatically run the tests before deploying, as configured in the `yarn build` command.
If tests fail, the deployment will be aborted. This ensures that any code that doesn't pass the tests never get deployed online.

Once a deployment has been deployed on Zeit, Github Actions will run our E2E tests, to make sure that the app behaves as expected.
This can also be considered as an integration tests suite.

---

# I18n (Internationalization)

The content displayed on NRN is translated using different ways, depending on where the translations are stored:
- [GraphCMS](https://app.graphcms.com/91c560c2bcdb4e13861131241360105e/staging)
- [Locize](https://www.locize.io/p/w7jrmdie/v/latest)

## Fetching translations through GraphCMS (automated)

> When the content is fetched through GraphCMS, the content is automatically internationalized using the `gcms-locale` provided during the request **as request header**.
>
> This means that a given user will not fetch the same content (even though the GraphQL query is identical) based on the `gcms-locale` value.

The `gcms-locale` value is a string of the form `'fr, en'`. There is two locales defined in this example _(there can be more, but we only handle 2 locales at this time in this app)_.
- `fr` is the first and main locale. Content in French will therefore be loaded first.
- `en` is the second and is a fallback locale. If the content is not found in the main locale, then fallback locales are used.

See the [official documentation](https://graphcms.com/docs/api/content-api/#passing-a-header-flag) to learn more.

> **N.B:** Even though it is possible to also specify the language `per field`, our **default approach** is to translate all content at once based on the header,
> because it's so much simpler, and handles automated fallback, which is very useful if the content is not defined in the primary requested language.

## Fetching translations through [Locize](https://www.locize.io/p/w7jrmdie/v/latest) provider

> When the content we want to display doesn't come from GraphCMS API, then it's from the application itself. (in such case, it's because it usually doesn't make sense to host it on GraphCMS)
>
> This means that the content is managed by [Locize](https://www.locize.io/p/w7jrmdie/v/latest) and must be updated manually there.

Check [this video](https://www.youtube.com/watch?v=9NOzJhgmyQE) to see Locize in action with react-i18next.

### Locize translation workflow in-depth

The Locize project contains two different **versions**:

- `latest`: This **Locize version** is used in **any non-production application stage** (development, staging). That's where translations get added/updated by translators.
- `production`: This **Locize version** is only used in the production application stages (`APP_STAGE=production`) _(one production stage per instance, all instances share the same `production` version)_

> This separation between the two versions is important and very useful to avoid deploying unapproved changes to the production stage.

In order to update the `production` version, all changes must go through the `latest` version.
They can therefore be tested during the development phase, then during the staging phase.
Once the content seems good-enough to be shipped to production, the `production` version can be updated from the `latest` version, and all changes will be applied to the `production` stages.

> **N.B:** This workflow hasn't been used yet and is theoretical at this time.

#### Locize additional services

Locize provides a few [additional services](https://www.locize.io/p/w7jrmdie/services). Some are free, some are paid.

We use some of the free ones, like:
- **[Tags](https://www.locize.io/p/w7jrmdie/services)**: Allow to tag translations. Tag are not automatically shared across different segments (a segment is a translation in one language), each segment has its own tags.
- **[TM](https://www.locize.io/p/w7jrmdie/services)** (Translation Memory): Enables you to use the translation memory created by your projects inside the editor. The service does come with no additional costs.
    Basically helps translating content faster by providing similar translation based on existing project's content.

#### Other additional services

- One interesting thing is the ability to share part of the project to be translated by a third party using [`Crowdbased`](https://www.locize.io/p/w7jrmdie/services), without sharing the whole project.
    May come in handy for making our customers translate content for us, or to customise their own version.

- There are also several paid [Translation services](https://www.locize.io/p/w7jrmdie/services), where we'd pay people to translate our content.
- It is also possible to enable [Audit](https://www.locize.io/p/w7jrmdie/services), which allows to audit every change to our translations, and keep changes up to 10 years. (_expensive_)

---

# [GraphCMS]()

TODO

## Fetching data from GraphCMS

> We use multiple libraries to fetch data from GraphCMS. GraphCMS provides a GraphQL endpoint, so we use libs generic to the GraphQL specification like `react-apollo`.
>
> [See full list of dependencies related to GraphCMS]([#apollo-with-react)

There a re two ways of fetching data from GraphCMS:
- [`react-hoc`](https://www.apollographql.com/docs/react/api/react-hoc/): HOC (High Order Components) can be used with an components (classes, functional), the GraphQL query is described in the function's wrapper, outside of its body.
    **Former way, tend to be deprecated in favor of `react-hooks` nowadays.**
    [List of known issues](https://reactjs.org/docs/higher-order-components.html#caveats).
- [`Render Props`](https://reactjs.org/docs/render-props.html): Never used it, fixes some issues you can encounter with HOC, but hooks are still better.
- [`react-hooks`](https://www.apollographql.com/docs/react/api/react-hooks): Hooks can only be used with Functional components (not classes), the GraphQL query is described in the function's body.

The difference between both is not so important, the code is written differently but produces the same output, it's more a matter of personal taste.
To better understand the different possible approaches here, [**read this**](https://pawelgrzybek.com/cross-cutting-functionality-in-react-using-higher-order-components-render-props-and-hooks#pros-of-using-hoc).

A few articles to better understand the differences:
- [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
- [react-hooks-in-apollo-client-for-graphql-queries-and-mutations](https://graphqlmastery.com/blog/react-hooks-in-apollo-client-for-graphql-queries-and-mutations)
- [90% Cleaner React With Hooks - Ryan Florence - React Conf 2018](https://www.youtube.com/watch?v=wXLf18DsV-I&feature=youtu.be)
- [React Today and Tomorrow - Sophie Alpert and Dan Abramov - React Conf 2018](https://www.youtube.com/watch?v=V-QO-KO90iQ&feature=youtu.be)

---

# (Amplitude)[https://analytics.amplitude.com/unly/] (Analytics)

> [Amplitude](https://analytics.amplitude.com/unly/space/jtqpsnq) is used to collect usage metrics (analytics) of the application.

Amplitude is used only on the frontend part of the application. It is composed of two parts:
- [`@amplitude/react-amplitude`](https://github.com/amplitude/react-amplitude): React components easy to use, see their [blog post](https://amplitude.engineering/introducing-react-amplitude-d7b5258bc708).
- [`amplitude-js`](https://github.com/amplitude/Amplitude-JavaScript): The JS SDK, only compatible from the browser. (They're working on making it [compatible with SSR](https://github.com/amplitude/Amplitude-JavaScript/issues/164))

See the [documentation example at react-amplitude](https://github.com/amplitude/react-amplitude#example-instrumenting-tic-tac-toe-from-facebooks-intro-to-react-tutorial) to understand how it's meant to be used.
We only use react-amplitude to manipulate events.

## Chrome developer debug tool

> The amplitude team has released a Chrome plugin to see the events from the browser.
>
> It is a **must-have** when working with analytics.

- [Tutorial](https://help.amplitude.com/hc/en-us/articles/360003032451-Instrumentation-Explorer-Debugger)
- [Chrome plugin](https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp)


---

# Continuous Integration & Continuous Deployment (CI/CD)

## Overview

> Every time a commit is pushed to the repository, or a branch is merged, automated actions are triggered.
>
> Those actions are managed through Github Actions

## Workflow

Here is how the multiple steps are ordered:

1. [Event] A commit is pushed, a branch is merged (or on any change made on the remote repository)
1. [Trigger] Our [Github Actions](./.github/workflows) are triggered
    - Either the staging scripts is executed, or the production script, depending on which branch is impacted (see [Github Actions <> Zeit integrations](./.github/workflows/README.md))
    - No matter what script (production vs staging) gets executed, those actions are always triggered:
        1. A new Zeit deployment is triggered, which runs our tests first (`yarn test:once`) (Failing tests will stop the deployment)
        1. Then, the deployment is deployed, and automatically linked to a custom domain (xxx.now.sh)
            - The script [`config_github_ssh_for_CDE_on_deployment`](./scripts/config_github_ssh_for_CDE_on_deployment.sh) is executed before yarn installs the dependencies (`preinstall`)
                - This scripts resolves the environment it's running on (Zeit or Github Actions)
                - It creates the `.ssh/id_rsa` file and writes the value of `GITHUB_SSH_KEY_CDE` defined in the `now.*.json` file that is being deployed, value that comes from a Zeit secret that contains the [deploy key defined in the CDE repo](https://github.com/UnlyEd/chatbot-dialog-engine/settings/keys) (private SSH key)
                    This operation allows the deployment server to later fetch our private CDE repository when performing `yarn install`
        1. Then, our 2E2 tests are triggered using Cypress
            - If they fail, artifacts (screenshots, videos) recorded by Cypress are uploaded to Github to help further debug
1. [Trigger] In parallel, AWS CodeBuild is triggered as well
    1. It will run our tests in coverage mode, and will update [CodeClimate](https://codeclimate.com/repos/5dc495236986e601a2001499) with the coverage results

## Configuration overview

In summary, you need to:

1. Generate a RSA pair
1. Store its **public key** as [Github Deploy Key on the CDE repository](https://github.com/UnlyEd/chatbot-dialog-engine/settings/keys)
1. Store its **private key** as a Zeit secret

## Configuration in-depth

1. [Create a SSH key](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)
1. Store its PUBLIC key (`id_rsa.pub`) as a [deploy key](https://github.com/UnlyEd/chatbot-dialog-engine/settings/keys) (named the deploy key as `CI - Zeit (read private repo)`)
1. Create a Zeit secret using its PRIVATE key (See [https://gist.github.com/Vadorequest/28657f8f513650eff4e40d37e23a1ee1](https://gist.github.com/Vadorequest/28657f8f513650eff4e40d37e23a1ee1))
1. From our [script](./scripts/config_github_ssh_for_CDE_on_deployment.sh), create a file `~/.ssh/id_rsa` based on the content of `@github-ssh-key-cde`

[See the discussion](https://spectrum.chat/zeit/now/deploy-with-private-github-dependency~67f5de5b-ad7f-4ff0-afbe-c1b717cca4db?m=MTU3NjE0NzQ2OTIxMQ==).

## In-depth project's dependencies

See [README_DEPENDENCIES](./README_DEPENDENCIES.md)
