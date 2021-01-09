---
layout: default
title: How to use Sentry
parent: Monitoring
grand_parent: Guides
nav_order: 20
---

# How to use Sentry
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Sentry usage.
</div>

{% include page-toc.md %}

---

## Using `ALERT_TYPES`

NRN comes with built-in `ALERT_TYPES` for existing alerts, defined in the `sentry.ts` file.

Feel free to add more alert types, they're mostly useful to help you increase the observability of your backend, by helping you to make sense of what's happening.

### Dependencies

- [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser): Package to use from the browser.
- [`@sentry/node`](https://www.npmjs.com/package/@sentry/node): Package to use from the server.

Sentry provides 2 different packages, with different abilities (but a very similar API) for browser and server usage.

#### A note about `@sentry/node` usage _(Webpack trick)_

In the source code, we always use `@sentry/node`, which is automatically converted at build step by Webpack. (see `next.config.js`)

This way, we always use the same import, which is linked to the right package based on the runtime engine target.

### What about `@sentry/react`?

[See #164](https://github.com/UnlyEd/next-right-now/issues/164)

### Resources

- [https://sentry.io/welcome/](https://sentry.io/welcome/)
- [https://docs.sentry.io/](https://docs.sentry.io/)
- [Official "Getting started" guide](https://docs.sentry.io/error-reporting/quickstart/?platform=javascript)
- [Capturing errors](https://docs.sentry.io/error-reporting/capturing/?platform=javascript)
- [Configuration](https://docs.sentry.io/error-reporting/configuration/?platform=javascript)
- [Using "context" for events](https://docs.sentry.io/enriching-error-data/context/?platform=javascript)
- [Using "breadcrumbs" for events](https://docs.sentry.io/enriching-error-data/breadcrumbs/?platform=javascript)
- [How to blacklist sensitive data tracking (GDPR, security)](https://docs.sentry.io/data-management/sensitive-data/)
