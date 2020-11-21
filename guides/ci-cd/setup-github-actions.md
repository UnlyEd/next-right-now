---
layout: default
title: How to setup Github Actions
parent: CI/CD
grand_parent: Guides
nav_order: 10
---

# Github Actions <> Vercel integrations
{: .no_toc }

<div class="code-example" markdown="1">
Automated actions configured through GitHub Actions

This documentation explains how our GitHub actions integrate themselves with the Vercel platform
</div>

{% include page-toc.md %}

---

## Getting started

### Requirements

> List of necessary requirements for the `Github Actions <> Vercel` to work properly.

#### Required GitHub secrets:

> Those secrets must be added on Github settings "secrets" page (e.g: [https://github.com/UnlyEd/next-right-now/settings/secrets](https://github.com/UnlyEd/next-right-now/settings/secrets) for NRN)

- `VERCEL_TOKEN`: Used to trigger Vercel deployments from Github actions
    1. Create the Vercel secret at [https://vercel.com/account/tokens](https://vercel.com/account/tokens) (e.g: "GitHub Actions - NRN app")
    1. Create the `VERCEL_TOKEN` as [Github secret](https://github.com/UnlyEd/next-right-now/settings/secrets) for your app

---

## Overview
### Stages

> We use two different stages. Each stage is meant to use a different configuration.

_**staging**_ (see [`deploy-vercel-staging`](./deploy-vercel-staging.yml)):
When a commit is pushed (except those made on `master`), it automatically starts a new Vercel deployment, using the related staging configuration file.
You can choose which customer you deploy by changing the symbolic link `vercel.json` file.
Changing the symlink changes which "CUSTOMER_REF" gets automatically deployed.

**N.B**: This is our default behaviour, but you may change it to match your desired workflow instead.

_**production**_ (see [`deploy-vercel-production`](./deploy-vercel-production.yml)):
Commits pushed to the `master` branch will automatically deploy the "CUSTOMER_REF" specified in `vercel.json` to Vercel, but it will use its production configuration.

> Tip: Those events are triggered by any pushed commit, but also merged pull-requests.

### GitHub Actions Jobs workflow

> The workflows are different depending on the stage (staging vs production).
> In staging, there are a lot more things happening, like creating a custom domain alias using the git branch name, LightHouse reports, etc.
>
> A `production` deployment is **triggered by any change** on the `master` branch.
> A `staging` deployment is **triggered by any change not on** the `master` branch.

**Jobs workflow:** _(This workflow is slightly different depending on the stage, this is an overview. See each file for an in-depth workflow)_
* Installing Node.js and npm dependencies, by specifying Node version
* Deploy code:
    * We checkout to the last branch commit, documentation [here](https://github.com/cypress-io/github-action)
    * We parse current `vercel.json` config file to get `CUSTOMER_REF`, which corresponding to customer project to deploy, and then we run `yarn deploy:CUSTOMER_REF` or in production `yarn deploy:CUSTOMER_REF:production`
* Run 2e2 tests:
    * We need to checkout again (because the code is not persistent)
    * We request Vercel api for the last deployment data, retrieve the url and then set it as environment variable as `VERCEL_DEPLOYMENT_URL` (to be able to use it afterwards)
    * We use default action provided by Cypress (documentation [here](https://github.com/cypress-io/github-action)):
        * _**wait-on**_: Allows us to wait before starting tests. It pings the endpoint until it's up, with a timeout of 60 seconds per default.
        * _**config-file**_: We need to specify a config file because cypress is looking for the `cypress.json` in the main folder.
            The config file itself doesn't matter because we will override most settings anyway. We just need `orgId` to run the tests.
        * _**config**_: Overrides some default config, like the `baseUrl` in particular (we use the `VERCEL_DEPLOYMENT_URL` instead)
    * We upload artifacts on tests failure, more documentation [here](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/persisting-workflow-data-using-artifacts)
