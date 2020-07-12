Cypress End-to-end tests suite (E2E)
===

This `cypress` folder is used for E2E testing.

Read more about [the folder structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Folder-Structure)

- `_examples`: Tests created by Cypress during initial install (initially located in `integration/examples`), they've been moved to this folder so that they don't run but can still be used as learning resource
- `integration`: The folder where tests must be written
- `screenshot`/`videos`: Will contain assets when tests fail, useful during development. When tests are executed by Github Actions, you'll find those assets under the "Artifacts" section. (e.g: https://github.com/UnlyEd/next-right-now/runs/862302266)
- `fixtures`: Fixtures are used as external pieces of static data that can be used by your tests. (We've kept the fixtures installed during the Cypress initial install)

## Tests ordering

[Sanity Checks](./integration/app/_sanity/README.md) are executed first. Then, tests are executed by their folder/file alphabetical order by default.
