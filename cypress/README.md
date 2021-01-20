Cypress End-to-end tests suite (E2E)
===

This `cypress` folder is used for E2E testing.

Read more about [the folder structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Folder-Structure)

- `_examples`: Tests created by Cypress during initial install (initially located in `integration/examples`), they've been moved to this folder so that they don't run but can still be used as learning resource
- `integration`: The folder where tests must be written
- `screenshot`/`videos`: Will contain assets when tests fail, useful during development. When tests are executed by Github Actions, you'll find those assets under the "Artifacts" section. (e.g: https://github.com/UnlyEd/next-right-now/runs/862302266)
- `fixtures`: Fixtures are used as external pieces of static data that can be used by your tests. (We've kept the fixtures installed during the Cypress initial install)

## Cypress config files

The files `cypress/config-*` are used for different purposes.

- `config-customer-ci-cd.json`: This file is a mock config file used by CI/CD GitHub Actions by the workflows `deploy-vercel-production.yml` and `deploy-vercel-staging.yml`.
    The `baseUrl` is a fake value (required by Cypress, but not used) which is replaced at runtime by the real `baseUrl` which is a dynamic Vercel deployment url.
- `config-development.json`: This file is only used when running `yarn e2e:run` and `yarn e2e:open` locally.
  It uses `baseUrl=http://localhost:8888` which is where our local server is running. It's only meant for local testing
- `config-$CUSTOMER_REF.json`: This file is only used when running `yarn deploy:$CUSTOMER_REF` locally. _It is not used by CI/CD workflows._

## Tests ordering

[Sanity Checks](./integration/app/_sanity/README.md) are executed first. Then, tests are executed by their folder/file alphabetical order by default.

## Resources about how to write tests better

- [[MUST WATCH!] Best Practices by the Author (2018) - 27mn](https://docs.cypress.io/examples/examples/tutorials.html#Best-Practices)
- [Organize tests by type of devices (mobile/desktop)](https://docs.cypress.io/api/commands/viewport.html#Width-Height)
- [Run tests on multiple subdomains](https://docs.cypress.io/faq/questions/using-cypress-faq.html#Can-I-run-the-same-tests-on-multiple-subdomains)
- [Detect if Cypress is running](https://docs.cypress.io/faq/questions/using-cypress-faq.html#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress)
- [Can my tests interact with Redux / Vuex data store? (AKA "Dynamic testing")](https://docs.cypress.io/faq/questions/using-cypress-faq.html#Can-my-tests-interact-with-Redux-Vuex-data-store)
- [Check a custom property from the `window` object](https://docs.cypress.io/api/commands/window.html#Check-a-custom-property)
- [Dynamic tests](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__dynamic-tests)
- [Filters and data-driven tests](https://docs.cypress.io/examples/examples/tutorials.html#7-Filters-and-data-driven-tests)
- [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/tests/ui/transaction-feeds.spec.ts)

## Officiel Cypress recommandations

> We see organizations starting with Cypress by placing end-to-end tests in a separate repo.
> This is a great practice that allows someone on the team to prototype a few tests and evaluate Cypress within minutes.
> As the time passes and the number of tests grows, we strongly suggest moving end-to-end tests to live right alongside your front end code.
>
> This brings many benefits:
>  - engages developers in writing end-to-end tests sooner
>  - keeps tests and the features they test in sync
>  - tests can be run every time the code changes
>  - allows code sharing between the application code and the tests (like selectors)

_[Source](https://docs.cypress.io/faq/questions/using-cypress-faq.html#What-are-your-best-practices-for-organizing-tests)_

[Cypress releases "Real World App" (RWA) - Blog post](https://www.cypress.io/blog/2020/06/11/introducing-the-cypress-real-world-app/)

## Module path alias mapping

We use module alias path mappings, to avoid using relative paths (e.g: `../../src/common`) but absolute paths (AKA "module paths") instead (e.g: `@/common`).

Although it's simpler to use, it's harder to configure because it affects several configuration files:
- The paths mapping in `tsconfig.json:compilerOptions.paths` must match those in `../tsconfig.json:compilerOptions.paths`
- They must also match those in `jsconfig.json` file, which is necessary for WebStorm to understand them for .js files.

If the module path mappings aren't properly set everywhere, it won't work.

> You can still use relative paths.

Reference:
- See [Next.js "Module path aliases" documentation](https://nextjs.org/docs/advanced-features/module-path-aliases)
- See [WebStorm issue](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360003361399/comments/360002636080)
