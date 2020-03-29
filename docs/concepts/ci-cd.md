---
layout: default
title: CI/CD
parent: Concepts
nav_order: 60
---

# Continuous Integration & Continuous Deployment (CI/CD)

<div class="code-example" markdown="1">
**Continuous Integration** is the practice of automating the integration of code changes from multiple contributors into a single software project. The CI process is comprised of automatic tools that assert the new code’s correctness before integration. A source code version control system is the crux of the CI process. The version control system is also supplemented with other checks like automated code quality tests, syntax style review tools, and more.

[Source](https://www.atlassian.com/continuous-delivery/continuous-integration)

**Continuous Deployment** is a software release process that uses automated testing to validate if changes to a codebase are correct and stable for immediate autonomous deployment to a production environment.

[Source](https://www.atlassian.com/continuous-delivery/continuous-deployment)

> Simply put, CI/CD is a way of automating integration and deployment of source code changes, run various checks, and eventually deploy a newer version of the software, without requiring human interaction.
</div>

---

## Triggers and Actions

Every time a commit is pushed to the repository, or a branch is merged, **automated actions are triggered**.

Those actions are managed through **Github Actions**.

## Workflow of our Zeit <> Github Actions integration

Here is how the multiple steps are ordered:

1. [Event] A commit is pushed, a branch is merged (or on any change made on the remote repository)
1. [Trigger] Our [Github Actions](./.github/workflows) are triggered
    - Either the staging scripts is executed, or the production script, depending on which branch is impacted (see [Github Actions <> Zeit integrations](../guides/ci-cd/setup-github-actions))
        - Basically, any change on the `master` branch creates a production deployment while any change on any other branch creates a preview deployment
    - No matter what script (production vs staging) gets executed, those actions are always triggered:
        1. A new Zeit deployment is triggered, which **runs our tests first** (`yarn test:once`)
            - **Tip**: Failing tests will stop the deployment altogether, and no change will be applied online, because the app isn't built at all
        1. Then, the deployment is deployed, and **automatically linked to a custom domain** which depends on the git **branch** name (xxx.now.sh)
        1. Then, our **2E2 tests** are triggered using **Cypress**
            - If they fail, artifacts (screenshots, videos) recorded by Cypress are uploaded to Github to help further debug (See [example](https://github.com/UnlyEd/next-right-now/runs/474607960))

Zeit uses the term "preview", which is exactly the same as what we call "staging".

> We decided to use Github Actions for our CI/CD operations and we believe we don't really need to justify this choice :wink:

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Monitoring](./monitoring){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Testing >](./testing){: .btn .btn-purple }
    </span>
</div>
