---
layout: default
title: How to setup Github Actions
parent: CI/CD
grand_parent: Guides
nav_order: 10
---

# Github Actions <> Zeit integrations

> Automated actions configured through GitHub Actions
>
> This documentation explains how our GitHub actions integrate themselves with the Zeit platform

---

## Getting started

### Requirements

> List of necessary requirements for the `Github Actions <> Zeit` to work properly.

#### Required GitHub secrets:

> Those secrets must be added on Github settings page, such as https://github.com/UnlyEd/next-right-now/settings/secrets

- `GITHUB_CI_PR_COMMENT`: Allows to post comments on GitHub Pull Request - See [https://github.com/settings/tokens](https://github.com/settings/tokens)
  GitHub **["personal access token"](https://github.com/settings/tokens)** from your personal account with the following permission scopes:
  - `repo` (all)
  - `user`
    - `read:user`
    - `user:email`
  - `workflow`

- `ZEIT_TOKEN`: Allows to trigger deployments - See [https://zeit.co/account/tokens](https://zeit.co/account/tokens)
  Zeit personal token

---

## Overview
### Stages

> We use two different stages. Each stage is meant to use a different configuration.

_**staging**_ (see [`deploy-zeit-staging`](./deploy-zeit-staging.yml)):
Every pushed commit, (except those made on `master`) automatically starts a new Zeit deployment, using the related staging configuration file.
You can choose which client you deploy by changing the symbolic link `now.json` file.
Changing the symlink allows to change which "CUSTOMER_REF" gets automatically deployed.

_**production**_ (see [`deploy-zeit-production`](./deploy-zeit-production.yml)):
Commits pushed to the `master` branch will automatically deploy the "CUSTOMER_REF" specified in `now.json` to Zeit, but will use it's production configuration.

> N.B: Those events are triggered by pushed commit, but also merged branches.

### GitHub Actions Jobs workflow

> The same workflow is used for both stages. The main difference is the trigger.
>
> A `production` deployment is **triggered by any change** in the `master` branch,
> while a `staging` deployment is **triggered by any change that is not on** the `master` branch.

**Jobs workflow:**
* Installing Node.js and npm dependencies, by specifying Node version
* Deploy code:
    * We checkout to the last branch commit, documentation [here](https://github.com/cypress-io/github-action)
    * We parse current `now.json` config file to get `CUSTOMER_REF`, which corresponding to customer project to deploy, and then we run `yarn deploy:CUSTOMER_REF` or in production `yarn deploy:CUSTOMER_REF:production`
* Run 2e2 tests:
    * We need to checkout again (because the code is not persistent)
    * We ask to Zeit api for the last deployment data, retrieve the url and then set it as environment variable as `ZEIT_DEPLOYMENT_URL` (to be able to use it afterwards)
    * We use default action provided by cypress (documentation [here](https://github.com/cypress-io/github-action)):
        * _**wait-on**_: Allows us to wait before starting tests. It ping the endpoint until it's up, with a timeout of 60 seconds per default.
        * _**config-file**_: We need to specify a config file because cypress is looking for cypress.json in the main folder.
            The config file itself doesn't matter because we will override most settings anyway. We just need `projectId` to run the tests.
        * _**config**_: Overrides some default config, like the `baseUrl` in particular (we use the `ZEIT_DEPLOYMENT_URL` instead)
    * We upload artifacts on tests failure, more documentation [here](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/persisting-workflow-data-using-artifacts)
