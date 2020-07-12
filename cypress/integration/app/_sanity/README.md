Sanity checks
===

The purpose of this folder is to contain sanity tests that should be executed before the others.
We use it to make sure we're on the right domain before running our tests, because it can happen E2E test start before Vercel if fully configured, and thus the tests would run on the wrong page.
To avoid this to happen, we first wait up to 5mn before timing out when checking the domain name. This ensures other tests don't run on an unexpected domain and fail, which would be misleading.

This way, the first tests ensure we're running in the expected environment and will fail if we don't, which helps understand the actual issue.

Read more [Ability to run spec files in a specific order](https://github.com/cypress-io/cypress/issues/390)

Work around to order your tests: [Cypress - How can I run test files in order](https://stackoverflow.com/questions/58936891/cypress-how-can-i-run-test-files-in-order/59690611#59690611)
