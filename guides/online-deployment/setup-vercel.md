---
layout: default
title: How to setup Vercel
parent: Online deployment
grand_parent: Guides
nav_order: 10
---

# How to setup Vercel
{: .no_toc }

<div class="code-example" markdown="1">
Step by step guide about how to create and properly configure your Vercel account.
</div>

{% include page-toc.md %}

---

## Create your Vercel account

> Creating a Vercel account is **necessary** to deploy the application online (staging/production stages)

- [Create a free account on Vercel](https://vercel.com/signup?ref=unly-nrn)

---

## Deploying on Vercel

### Pre-requisites

{% include vercel-online-deployment-pre-requisites.md %}
{: .mb-6 }

### Deploying on Vercel (manually)

1. `yarn deploy` - Will deploy the project online, and automatically create the Vercel project first, if it doesn't exist already.
    This command will fail if any secret is missing.
1. Add a `scope` line in all `now.*.json` files using the `orgId` in `.now/project.json` (this folder is created when running `npx now`, which was called when you run the above `yarn start`)
    - **Tip**: Don't forget `now.json` is a **symlink** and **shouldn't** to be modified (run `ln now.staging.json now.json` if you messed it up :wink:)
1. `yarn deploy` - Will deploy the project online, and automatically create the Vercel project first, if it doesn't exist already
1. Go to [Vercel](https://vercel.com/) to see the project being deployed, go through logs, etc.

- **Tip**: Vercel doesn't provide the `orgId` from the Vercel platform itself, even if the project exists already. Running `yarn start` locally is the only way to know what is your `orgId`, AFAIK.

---

### Deploying specific stages and tenants

For each customer instance, we create a different Vercel project.

A project is itself composed of multiple staging deployments (called "previews" on Vercel) and one production deployment.

_**Tip**: If you want to learn more about what happens (on the technical level) when pushing a commit to the repository, read the [CI/CD section](../ci-cd/use-github-actions)_.

{: .mt-6 }
##### Staging deployments

Using Vercel Now, **we have access to many staging "deployments"**.

By default, there is one custom domain per Git Branch, but also one per commit.
It is also possible to create a custom domain manually from the CLI, for any deployment.

###### When not using a `MST` preset

- `yarn deploy` - Deploy the app in staging

###### When using a `MST` preset

- `yarn deploy` - Deploy the customer1 app in staging (shortcut)
- `yarn deploy:customer1` - Deploy the customer1 app in staging (identical to previous, shortcut)
- `yarn deploy:customer2` - Deploy the customer2 app in staging
- `yarn deploy:all` - Deploy all apps in staging

{: .mt-6 }
##### Production deployment

While there can be multiple staging deployments, **there is only one production deployment (per project)**

###### When not using a `MST` preset

- `yarn deploy:production` - Deploy the app in production

###### When using a `MST` preset

- `yarn deploy:customer1:production` - Deploy the customer1 app in production
- `yarn deploy:customer2:production` - Deploy the customer2 app in production
- `yarn deploy:all:production` - Deploy all apps in production

- **Tip**: Those commands use the `now` command with the `--prod` argument behind the wheel.
- **Tip**: Those commands are used by our CI/CD Github Actions.

---

### Configuring custom Vercel <> Github Actions integration

Our simple but useful automated CI/CD process basically deploys all branches as Vercel preview deployments, except for master which is automatically deployed in production.

{: .mt-6 }
##### Video Tutorial - How to configure Github Actions integration (7 minutes)

[![Tutorial - How to configure Github Actions integration](https://img.youtube.com/vi/hPQu6jgOyC0/maxresdefault.jpg)](http://youtu.be/hPQu6jgOyC0?hd=1)

> In this tutorial, we will see how to configure our custom Vercel <> Github Actions integration (CI/CD)

### Configuring Vercel secrets (manually)

This documentation is in-case-of you'd need to configure secrets through the CLI

- Each secret must be added manually, one by one
- A secret starts with `@`
- Secrets are global to the whole team, that's why they're all prefixed by `nrn-`, so that they don't conflict with other projects _(Vercel is working on this, to avoid leaking secrets from one project to another, but hasn't released anything yet)_
- Take a look at `.env.build.example` for secrets to use by default (you can use them for testing purpose, it's fine, they're not sensitive)
- Example: `now secrets add nrn-locize-project-id 658fc999-dfa8-4307-b9d7-b4870ad5b968`

- **Tip**: If you don't provide all secrets, the app will fail to deploy. The Now CLI will complain about missing secrets and abort the build.

### Configuring Vercel deployment regions

You may want to deploy Vercel to multiple regions in the world, depending on your use case

By default (if not specified), it will only deploy to the closest region, which is probably **not** what you want to do!

Please see the [official documentation](https://vercel.com/docs/v2/network/regions-and-providers#routing).

- **Tip**: Note that this is an advanced feature which requires a paying account, it's not available for free
