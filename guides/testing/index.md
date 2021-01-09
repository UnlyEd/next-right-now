---
layout: default
title: Testing
parent: Guides
nav_order: 70
has_children: true
---

<div class="code-example" markdown="1">
<span markdown="1">
    Make sure you've checked our [Concept: Testing](../../concepts/testing) page.
</span>
</div>

---

# Jest

[Jest](https://jestjs.io/) is our test runner, it runs our tests to make sure we don't ship regressions to our end users.

> Jest is mostly aimed at unit testing, component testing and integration testing.

---

# Cypress

[Cypress]() is our end-to-end (E2E) test runner, it runs e2e tests to make sure our UI and user workflows work as expected.

> Cypress is only aimed at end-to-end testing. It is automatically executed through CI/CD by GitHub Actions, and runs E2E tests against the real application, hosted on Vercel.
