---
layout: default
title: How to use Github Actions
parent: CI/CD
grand_parent: Guides
nav_order: 20
---

# How to use Github Actions
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Github Actions usage.
</div>

{% include page-toc.md %}

---

## Overview

[Official documentation](https://help.github.com/en/actions/automating-your-workflow-with-github-actions)

Most useful documentation links:
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#about-yaml-syntax-for-workflows](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#about-yaml-syntax-for-workflows)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idneeds](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idneeds)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

## Triggers and Actions

Every time a commit is pushed to the repository, or a branch is merged, **automated actions are triggered**.

Those actions are managed through **Github Actions**.

## Workflow of our Vercel <> Github Actions integration

Here is how the multiple steps are ordered:

1. [Event] A commit is pushed, a branch is merged (or on any change made on the remote repository)
1. [Trigger] Our [Github Actions](./.github/workflows) are triggered
    - Either the staging scripts is executed, or the production script, depending on which branch is impacted (see [Github Actions <> Vercel integrations](../guides/ci-cd/setup-github-actions))
        - Basically, any change on the `master` branch creates a production deployment while any change on any other branch creates a preview deployment
    - No matter what script (production vs staging) gets executed, those actions are always triggered:
        1. A new Vercel deployment is triggered, which **runs our tests first** (`yarn test:once`)
            - **Tip**: Failing tests will stop the deployment altogether, and no change will be applied online, because the app isn't built at all
        1. Then, the deployment is deployed, and **automatically linked to a custom domain** which depends on the git **branch** name (xxx.now.sh)
        1. Then, our **2E2 tests** are triggered using **Cypress**
            - If they fail, artifacts (screenshots, videos) recorded by Cypress are uploaded to Github to help further debug (See [example](https://github.com/UnlyEd/next-right-now/runs/474607960))

Vercel uses the term "preview", which is exactly the same as what we call "staging".

> We decided to use Github Actions for our CI/CD operations, and we believe we don't really need to justify this choice :wink:

---

## Dependencies

### Actions
* _**[actions/setup-node@v1](https://github.com/actions/setup-node)**_:
    Setup node.js and install dependencies
* _**[actions/checkout@v1](https://github.com/cypress-io/github-action)**_:
    Checkout to last commit to retrieve code
* _**[cypress-io/github-action@v1](https://github.com/cypress-io/github-action)**_:
    Run Cypress tests
* _**[actions/upload-artifact@v1](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/persisting-workflow-data-using-artifacts)**_:
    Upload artifacts to Github

---

## Complex commands
* _**[jq](https://cameronnokes.com/blog/working-with-json-in-bash-using-jq/)**_:
    JSON parser for bash
* _**[tr](http://linuxcommand.org/lc3_man_pages/tr1.html)**_:
    Bash editor, used to remove characters
* _**[echo "::set-env name=key::value"](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/development-tools-for-github-actions)**_:
    Set env variable for all others jobs
