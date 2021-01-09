---
layout: default
title: How to use Jest
parent: Testing
grand_parent: Guides
nav_order: 40
---

# How to use Jest
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Jest usage.
</div>

{% include page-toc.md %}

---

## Local usage

Local usage is meant to be used through the built-in scripts, as described below.

## CI/CD usage (Vercel)

Tests are automatically executed by Vercel during the deployment, in the `build` script, from `package.json`.

```json
{
    "scripts": {
        "build": "yarn test:once:group:no-integration && next build"
    }
}
```

If the tests fail, the build is aborted and nothing will be deployed.

## Scripts

There are a few available scripts you can use right away, from `package.json`:
- `yarn test`: Runs all tests in watch mode, runs tests for changed files only by default.
- `yarn test:group:api`: Runs tests tagged with the "api" group.
- `yarn test:group:components`: Runs tests tagged with the "components" group.
- `yarn test:group:integration`: Runs tests tagged with the "integration" group. Usually, integration test are meant to test external APIs or perform network requests, which makes them slow.
- `yarn test:group:unit`: Runs tests tagged with the "unit" group.
- `yarn test:group:utils`: Runs tests tagged with the "utils" group.
- `yarn test:once`: Run all tests, once. (no watcher) Used in CI/CD.
- `yarn test:once:group:no-integration`: Run all tests, once, except those tagged with the "integration" group. Used in CI/CD.
- `yarn test:coverage`: Run all tests, with coverage.
- `yarn test:coverage:group:no-integration`: Run all tests, with coverage, except those tagged with the "integration" group.
- `yarn test:config`: Prints the Jest configuration, quite useful for debugging Jest misconfiguration.

> Feel free to add more groups to your liking, the above is simply a good place to start, but the only limit is your imagination!

## Write tests

> We won't cover this section in-depth, you should refer to the official [`jest`](https://jestjs.io/) documentation.

Also, we strongly recommend you to take a look at how Next Right Now tests are written.
Look for `*.test.ts` files

## Dependencies

- [`jest`](https://www.npmjs.com/package/jest): Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [`jest-extended`](https://www.npmjs.com/package/jest-extended): Additional Jest matchers. Provides additional built-in tests for ease of testing.
- [`react-test-renderer`](https://www.npmjs.com/package/react-test-renderer): This package provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
  Essentially, this package makes it easy to grab a snapshot of the "DOM tree" rendered by a React DOM or React Native component without using a browser or jsdom.
- [`ts-jest`](https://www.npmjs.com/package/ts-jest): TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.
- [`jest-to-match-shape-of`](https://www.npmjs.com/package/jest-to-match-shape-of): A Jest matcher to verify the structure of an object, particularly useful for api integration tests.
- [`jest-runner-groups`](https://github.com/eugene-manuilov/jest-runner-groups): A test runner that allows you to tag your tests and execute specific groups of tests with Jest.

**Known issues**:
- `jest-emotion`: [Breaks tests](https://github.com/emotion-js/emotion/issues/1440#issuecomment-551235747)
