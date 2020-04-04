---
layout: default
title: How to use Jest
parent: Testing
grand_parent: Guides
nav_order: 30
---

# How to use Jest
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Jest usage.
</div>

{% include page-toc.md %}

---

## Overview

[Jest](https://jestjs.io/) is our test runner, it runs our tests to make sure we don't ship regressions to our end users

- [`jest`](https://www.npmjs.com/package/jest): Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [`jest-extended`](https://www.npmjs.com/package/jest-extended): Additional Jest matchers. Provides additional built-in tests for ease of testing.
- [`react-test-renderer`](https://www.npmjs.com/package/react-test-renderer): This package provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
  Essentially, this package makes it easy to grab a snapshot of the "DOM tree" rendered by a React DOM or React Native component without using a browser or jsdom.
- [`ts-jest`](https://www.npmjs.com/package/ts-jest): TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

**Known issues**:
- `jest-emotion`: [Breaks tests](https://github.com/emotion-js/emotion/issues/1440#issuecomment-551235747)

### jest-extended

We extended jest with various additional assertions.

See [https://github.com/jest-community/jest-extended](https://github.com/jest-community/jest-extended)

### How to automatically run a global config file?

You can configure any .js file to be executed from `package.json:jest:setupFilesAfterEnv`.

Example:
```json
{
  "jest": {
    "setupFilesAfterEnv": [
      "./jest.setup.js",
      "jest-extended"
    ]
  }
}
```

See [official documentation](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array)
