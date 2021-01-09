---
layout: default
title: GitHub Action - Deploy to Vercel
parent: CI/CD
grand_parent: Guides
nav_order: 10
---

# GitHub Action - Deploy to Vercel
{: .no_toc }

<div class="code-example" markdown="1">
This GitHub action automatically triggers a Vercel deployment when commits are pushed on the remote repository.
</div>

{% include page-toc.md %}

---

## Workflow file(s)

There are 2 (slightly) different workflows files, one for staging and one for production:

- `.github/workflows/deploy-vercel-production.yml`
- `.github/workflows/deploy-vercel-staging.yml`

---

## Configuring the action

### Required GitHub secrets

> List of necessary requirements for NRN `Deploy to Vercel` automations to work properly.

- `VERCEL_TOKEN`: Used to trigger Vercel deployments from GitHub actions.
    1. Create the Vercel secret at [https://vercel.com/account/tokens](https://vercel.com/account/tokens) and name it (e.g: "GitHub Actions - NRN app").
    1. Create the `VERCEL_TOKEN` as [Github secret](https://github.com/UnlyEd/next-right-now/settings/secrets) for your app.

---

## Using the action

### Stages

> We use two different stages. Each stage is meant to use a different configuration.

#### `staging`:
When a commit is pushed on a branch (except those pushed on `master` or `main`), it automatically starts a new Vercel deployment, using the related staging configuration file.
You can choose which customer you deploy by changing the symbolic link `vercel.json` file.
Changing the symlink changes which "CUSTOMER_REF" gets automatically deployed.

> This is the default behaviour, but you may change it to match your desired workflow instead.

#### `production`:
Commits pushed to the `master` (or `main`) branch will automatically deploy the "CUSTOMER_REF" specified in `vercel.json` to Vercel, but it will use the production configuration file.

> Those events are triggered by any pushed commit, but also merged pull-requests.

### GitHub Actions Jobs workflow

> The workflows are different depending on the stage (staging vs production).
> In staging, there are a lot more things happening, like creating a custom domain alias using the git branch name, LightHouse reports, etc.

#### Workflow details:

> This workflow is slightly different depending on the stage, this is an overview.
> See each file for an in-depth workflow.

- `setup-environment`: Configures the deployment environment, install dependencies (like node, npm, etc.) that are requirements for the upcoming jobs
- `start-*-deployment`: (either staging or production)
    - Resolve customer to deploy from github event input (falls back to resolving it from vercel.json file)
    - Resolve $VERCEL_DEPLOYMENT_URL
    - Get stdout from deploy command (stderr prints build steps and stdout prints deployment url, which is what we are really looking for)
    - Set the deployment url that will be included in the eventual PR comment
    - Create a deployment alias based on the branch name, and link it to the deployment (so that each branch has its own domain automatically aliased to the latest commit)
- `await-for-vercel-deployment`: Waits for the Vercel deployment to reach "READY" state, so that other actions will be applied on a domain that is really online
    - Once finished, runs several jobs in parallel:
        - `send-webhook-callback-once-deployment-ready`: Send a HTTP call to the webhook url that's provided in the customer configuration file (vercel.*.json)
        - `run-2e2-tests`: Runs E2E tests against the Vercel deployment
        - `run-lighthouse-tests`: Runs LightHouse reports in parallel of E2E tests
