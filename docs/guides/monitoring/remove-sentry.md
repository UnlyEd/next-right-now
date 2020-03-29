---
layout: default
title: How to remove Sentry
parent: Monitoring
grand_parent: Guides
nav_order: 30
---

## How to remove Sentry

> You may replace Sentry by another monitoring tool of your choice. Make sure it is JS universal-friendly though.

1. Remove the following libraries:
    - [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser): Package to use from the browser.
    - [`@sentry/node`](https://www.npmjs.com/package/@sentry/node): Package to use from the server.
1. Remove their components usage in the source code
1. Remove the `SENTRY_DSN` env var
1. Remove alias in [next.config.js](next.config.js) `config.resolve.alias['@sentry/node'] = '@sentry/browser';`
