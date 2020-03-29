---
layout: default
title: How to setup Zeit
parent: Online deployment
grand_parent: Guides
nav_order: 10
---

## Online installation (on Zeit)

> Follow this guide **if you want to deep-dive into the demo**, deploy it to staging/production, **make this project your own**, etc.
>
> **Tip**: You may want to fork the project first, **most especially if you don't want to use a multi-tenants setup**, in order to benefit from Zeit <> Github native integration and CI/CD
>
> **Tip**: **You don't have to clone** the project locally at this time, the first steps are to link a github repository to a Zeit project.
>   But you can definitely clone it if you want to test it locally first, make sure env vars works alright, etc.

### Prerequisites third parties

> **It is recommended to first create your own accounts** on the following third parties. _If you do not wish to create your own accounts then you can use some of the values in `.env.build.example`._
>
> **Tip**: You _could_ use any value for `LOCIZE_API_KEY`, `AMPLITUDE_API_KEY` because the app would still work even if those values are wrong. But associated features won't work correctly.

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

## Advanced Zeit usage

## Linking a Zeit project to a local source code

> You need to have [a working Zeit project](#online-installation-on-zeit) in order to link it to a local source code
>
> You also need to have a local clone of the project (i.e: `git clone https://github.com/UnlyEd/next-right-now.git nrn-demo`)

- Duplicate the [`.env.build.example`](./.env.build.example) and rename it `.env.build` _(this file is only used on your local computer)_
    - Define all missing environment variables
- `nvm use` - Selects the right node.js version based on our [`.nvmrc`](./.nvmrc) file
- `yarn` - Installs all deps from [`package.json`](./package.json)
- Remove `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` from all now JSON config file
    - **Tip**: Don't forget `now.json` is a symlink to `now.customer1.staging.json` and doesn't need to be modified
- `now` - Authenticates to Zeit and link local project to Zeit project (creates `/.now` folder)
- `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

#### Video Tutorial - How to link a Zeit project to a local source code (12 minutes)

[![Tutorial NRN - How to import and configure Zeit project](https://img.youtube.com/vi/Sjz3hxcg0t0/maxresdefault.jpg)](http://youtu.be/Sjz3hxcg0t0?hd=1)

> In this tutorial, we will see how to link an existing Zeit project to a local source code (cloned repository) and how to manually deploy new customers from our local computer (without CI/CD)


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
