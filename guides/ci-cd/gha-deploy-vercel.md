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

## Understanding the action

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

---

## Triggering the action remotely (using `workflow_dispatch`)

### Motivations

What's the point of triggering a GitHub Action remotely through an HTTP call, or through the GUI?

> At Unly, we use the `workflow_dispatch` feature to trigger a Vercel deployment through our Customer Success UI,
> so that they may deploy the platform of our customers without technical assistance.
>
> Use cases are numerous, you could also want to chain call your workflows.
> For instance, one workflow might call another. (see [Invoking the workflow through a GitHub Action](#invoking-the-workflow-through-a-github-action) section)

The possibilities are limitless, you don't have to use `workflow_dispatch`, but it might very well be quite a nice feature for your business!

### Introduction

It is possible to trigger a GitHub Action through an HTTP event.
This is called a [`workflow dispatch`](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions#manually-running-a-workflow) event.

Example:
```yml
on:
  # There are several ways to trigger Github actions - See https://help.github.com/en/actions/reference/events-that-trigger-workflows#example-using-a-single-event for a comprehensive list:
  # - "push": Triggers each time a commit is pushed
  # - "pull_request": Triggers each time a commit is pushed within a pull request, it makes it much easier to write comments within the PR, but it suffers some strong limitations:
  #   - There is no way to trigger when a PR is merged into another - See https://github.community/t/pull-request-action-does-not-run-on-merge/16092?u=vadorequest
  #   - It won't trigger when the PR is conflicting with its base branch - See https://github.community/t/run-actions-on-pull-requests-with-merge-conflicts/17104/2?u=vadorequest
  push: # Triggers on each pushed commit
    branches-ignore:
      - 'master'

  # Allow manual trigger via a button in github or a HTTP call - See https://docs.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow#manually-running-a-workflow
  # XXX Read more about how to use it with NRN in .github/WORKFLOW_DISPATCH.md
  workflow_dispatch:
    inputs:
      customer:
        description: 'Customer to deploy (airtable "ref")'
        required: true
```

When you configure the option `workflow_dispatch` as trigger for a GitHub Action, a few things happen:
- It can be triggered through the [GitHub Actions UI](https://github.com/UnlyEd/next-right-now/actions?query=workflow%3A%22Deploy+to+Vercel+%28staging%29%22), when the workflow is selected, and the user has at least `write` access to the repository
- It can be triggered through an HTTP event.
- It can take inputs, which can be provided on both the UI and the HTTP request payload.
    - On the above example, `customer` is a **required input** that is expected for the action to run.

### Accessing the inputs in our GitHub Action

All inputs are available within `${{github}}` variable.
Because this input has been explicitly required using `required: true`, the `${{ github.event.inputs.customer}}` value cannot be empty.

In order to use a **fallback** value (useful when the input isn't required, e.g: `required: false`), we can use this bash trick:

```bash
CUSTOMER_REF_TO_DEPLOY="${MANUAL_TRIGGER_CUSTOMER:-$(cat vercel.json | jq --raw-output '.build.env.NEXT_PUBLIC_CUSTOMER_REF')}"
```

If `MANUAL_TRIGGER_CUSTOMER` is empty, then we'll resolve its fallback value from the `vercel.json` file and extract the `build.env.NEXT_PUBLIC_CUSTOMER_REF` value.

#### Full example

```yaml
jobs:
  say_hello:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Say hello customer
      run: |
          # Resolving customer to deploy based on the github event input, when using manual deployment triggerer through "workflow_dispatch" event
          # Falls back to the customer specified in the vercel.json file, which is most useful when deployment is triggered through "push" event
          MANUAL_TRIGGER_CUSTOMER="${{ github.event.inputs.customer}}"
          echo "MANUAL_TRIGGER_CUSTOMER: " $MANUAL_TRIGGER_CUSTOMER
          echo "MANUAL_TRIGGER_CUSTOMER=$MANUAL_TRIGGER_CUSTOMER" >> $GITHUB_ENV

          CUSTOMER_REF_TO_DEPLOY="${MANUAL_TRIGGER_CUSTOMER:-$(cat vercel.json | jq --raw-output '.build.env.NEXT_PUBLIC_CUSTOMER_REF')}"
          echo "Customer to deploy: " $CUSTOMER_REF_TO_DEPLOY
          echo "CUSTOMER_REF_TO_DEPLOY=$CUSTOMER_REF_TO_DEPLOY" >> $GITHUB_ENV
```

In the above example, we try to resolve `MANUAL_TRIGGER_CUSTOMER` from the github `customer` input.
If it's not set, we fall back to reading the `build.env.NEXT_PUBLIC_CUSTOMER_REF` value of the `vercel.json` file.

This is very handy to allow a user to use the GitHub UI to specify a customer to deploy, while using a proper fallback value resolved from the default customer to deploy (`vercel.json`).

### How to trigger the workflow using an external HTTP request?

#### Authentication

Authentication is always required when fetching data for a private repository. _(see below example)_
Also, you might want to be authenticated to avoid hitting rate limits.

#### Resolving the `workflow id` of the workflow you want to trigger

Each GitHub workflow has an id, and this id changes for every repository _(forked repository will have different workflow ids as the source repository)_.

**You'll need this workflow id to be able to trigger the workflow from an external HTTP request.**

> Beware, your workflow id will change if you rename the workflow file.

```
GET https://api.github.com/repos/{owner}/{repo}/actions/workflows
```

##### Simple example

[https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows](https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows)

##### Bash example

Without authentication:

```bash
curl -s \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows | jq '.workflows[] | select(.path==".github/workflows/deploy-vercel-staging.yml") | .id'
```

With authentication:

```bash
curl -s \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token <YOUR_GITHUB_TOKEN>" \
  https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows | jq '.workflows[] | select(.path==".github/workflows/deploy-vercel-staging.yml") | .id'
```

> Because Next Right Now is a public repository, you will not need to provide a token when accessing this read-only endpoint.

#### Invoking the workflow trough an HTTP call

##### Authentication

You'll need to provide your credentials through the `Authorization` HTTP header:

```json
{
    "Accept": "application/vnd.github.v3+json",
    "Authorization": "token <TOKEN>"
}
```

> This [`personal access token`](https://github.com/settings/tokens) needs the `repo (FULL)` and `workflow` permissions to be granted access.

##### Request body

You have to provide a request body, such as:

```json
{
    "ref": "master",
    "inputs": {
        "customer": "customer2"
    }
}
```

- **ref**: A git **reference**, it can be a tag, a branch or a SHA commit.
- **inputs**: An object containing previously configured inputs.

##### Bash example

```bash
curl -s \
  -X POST \
  -d '{ "ref": "master", "inputs": { "customer": "customer2" }}' \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token <YOUR_GITHUB_TOKEN>" \
  https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows/3754866/dispatches
```

If it returns a `204` status code, it worked.

#### Invoking the workflow through a GitHub Action

There are several existing [GitHub Actions available on the Marketplace](https://github.com/marketplace/actions/repository-dispatch).
