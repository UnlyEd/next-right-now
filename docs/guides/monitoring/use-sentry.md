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

## Overview

Sentry provides open-source and hosted error monitoring that helps all software teams discover, triage, and prioritize errors in real-time.

We use Sentry to catch errors that happen within the application.
They are available at [https://sentry.io/](https://sentry.io/) for any developers in the team.

Those errors can be sent automatically to a Slack channel (config is very flexible since 2019).

### Dependencies

- [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser): Package to use from the browser.
- [`@sentry/node`](https://www.npmjs.com/package/@sentry/node): Package to use from the server.

Sentry provides 2 different packages, with different abilities (but a very similar API) for browser and server usage.

#### A note about Sentry usage

In the source code, we always use `@sentry/node`, which is automatically converted at build step by babel. (see `next.config.js`)

This way, we always use the same import, which is linked to the right package based on the runtime engine target.

---

## Resources

- [https://sentry.io/welcome/](https://sentry.io/welcome/)
- [https://docs.sentry.io/](https://docs.sentry.io/)
