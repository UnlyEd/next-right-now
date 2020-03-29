---
layout: default
title: CI/CD
parent: Concepts
nav_order: 60
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
            - If they fail, artifacts (screenshots, videos) recorded by Cypress are uploaded to Github to help further debug (See [example](https://github.com/UnlyEd/next-right-now/runs/474607960))

## In-depth project's dependencies

See [README_DEPENDENCIES](./README_DEPENDENCIES.md)

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Monitoring](./monitoring){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Testing >](./testing){: .btn .btn-purple }
    </span>
</div>
