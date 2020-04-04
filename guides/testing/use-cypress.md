---
layout: default
title: How to use Cypress
parent: Testing
grand_parent: Guides
nav_order: 20
---

# How to use Cypress
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Cypress usage.
</div>

{% include page-toc.md %}

---

## Overview

Cypress is a tool that helps performing end-to-end (E2E) tests that aim at testing the UI and the user workflows.

It is open source and free to use from the command line (doesn't count as Tests recording).

Several utility scripts have been configured to help with E2E testing, each script takes an optional `CYPRESS_STAGE` environment variable, which defines the config file (in `cypress/`) that will be used (`development` by default):
- `yarn e2e:open`: Runs the test suite in a local **browser**
    - Requires Cypress to be installed first using `yarn e2e:install`
    - Targets **localhost development website**. (uses `cypress/config-development.json`)
- `yarn e2e:run`: Runs the test suite in a local **console**
    - Targets **localhost development website**. (uses `cypress/config-development.json`)

It is also possible to test all the apps at once:
- `yarn e2e:all:production`: This will run each production e2e test run (in series, parallel is not free)

We used the following [**Cypress <> Next.js** tutorial](https://buttercms.com/blog/how-to-test-nextjs-apps) to get started.

Note that our current installation doesn't provide test coverage.
It's a bit harder to setup, here is a [tutorial](https://www.cypress.io/blog/2019/09/05/cypress-code-coverage-for-create-react-app-v3/) if ever needed.

- **Tip**: [Here is the documentation about the options available in the config files](https://docs.cypress.io/guides/references/configuration.html).

## Resources

- [https://www.cypress.io/](https://www.cypress.io/)
- [https://docs.cypress.io/guides/overview/key-differences.html#Architecture](https://docs.cypress.io/guides/overview/key-differences.html#Architecture)
