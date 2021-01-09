---
layout: default
title: GitHub Action - Update Code Climate test coverage
parent: CI/CD
grand_parent: Guides
nav_order: 10
---

# GitHub Action - Update Code Climate test coverage
{: .no_toc }

<div class="code-example" markdown="1">
Runs unit and coverage tests, then uploads the coverage results to the Code Climate dashboard.
</div>

{% include page-toc.md %}

---

## Workflow file(s)

This action is related to the workflow file:

- `.github/workflows/auto-git-release.yml`

---

## Configuring the action

### Required GitHub secrets

> List of necessary requirements for NRN `Update Code Climate test coverage` automation to work properly.

- `CC_TEST_REPORTER_ID`: Used to associate the Code Climate coverage report to the proper Code Climate project.
    1. Get it from Code Climate in ["Repo settings > Test coverage"](https://codeclimate.com/repos/5e574bdbe2471e01770170f7/settings/test_reporter).
    1. Create the `CC_TEST_REPORTER_ID` as [Github secret](https://github.com/UnlyEd/next-right-now/settings/secrets) for your app.
