---
layout: default
title: How to setup Jest
parent: Testing
grand_parent: Guides
nav_order: 30
---

# Jest configuration
{: .no_toc }

<div class="code-example" markdown="1">
Explanations about how Jest is configured by Next Right Now, and how you can extend the default configuration.
</div>

{% include page-toc.md %}

---

## jest-extended

We extended jest with various additional assertions.

See [https://github.com/jest-community/jest-extended](https://github.com/jest-community/jest-extended)

## jest-expect-message

We extended jest to add custom messages to Jest `expects`.

See [https://www.npmjs.com/package/jest-expect-message](https://www.npmjs.com/package/jest-expect-message)

## How is Jest configured?

The `jest.config.js` contains all the Jest configuration, including:

- TypeScript's configuration (so that Jest can run `.ts` files)
    - A dedicated `tsconfig.jest.json` is used when running TS files (which inherits from the `jest.config.json` configuration)
- Built-in extra configuration, using `setupFilesAfterEnv`:
    - `jest-extended` (see above)
    - `jest-expect-message` (see above)
    - `jest.setup.js`, which configure Jest globally, such as:
        - Imports `.env.local` and `.env` files (`.env.local` takes precedence when env variable clash)
        - Imports Next.js polyfills (such as `fetch`)
        - Provides utilities such as `muteConsole`, `muteConsoleButLog` and `unmuteConsole` for logging
    - `jest.extends.js`, which extends Jest `expect` function globally, with:
        - `toContainObject`
        - `toMatchOneOf` from [jest-to-match-shape-of](https://www.npmjs.com/package/jest-to-match-shape-of)
        - `toMatchShapeOf` from [jest-to-match-shape-of](https://www.npmjs.com/package/jest-to-match-shape-of)
- Built-in extra configuration, using a custom `runner` with [`jest-runner-groups`](https://github.com/eugene-manuilov/jest-runner-groups):
    - It allows you to run a bunch of test together (AKA a "group").
    - This is very useful to run, or exclude a group of files from a test run.
    - A few groups already exists, such as `api`, `components`, `integration`, `unit`, `utils` and have a dedicated NPM script (e.g: `yarn test:group:unit`)
    - For instance, the tests executed by Vercel when deploying a new domain do not run the `integration` tests, as they take a long time to run, and too often fail due to network, or I/O-related false-positive issues.

## How to extend Jest?

- If you wish to change the Jest configuration globally, you should do so in `jest.setup.js`.
- If you wish to extend the Jest configuration to enhance the `expect` function, you can either:
    - Do so in `jest.config.json` at `setupFilesAfterEnv`, if the library is meant to be configured in such a way (such as `jest-extended`).
    - Alternatively, do so in `jest.extends.js`.

