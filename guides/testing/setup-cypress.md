---
layout: default
title: How to setup Cypress
parent: Testing
grand_parent: Guides
nav_order: 10
---

# Cypress configuration
{: .no_toc }

<div class="code-example" markdown="1">
Explanations about how Cypress is configured by Next Right Now, and how you can extend the default configuration.
</div>

{% include page-toc.md %}

---

## When using MST tenancy

When you're using a MST tenancy, you will have one Cypress config file per tenant, because each tenant has its own dedicated production app and domain.
There is also another config file for development usage (local).

Update `cypress/config-*.json` and update the `baseUrl` so that it matches with their respective production url.

## When not using MST tenancy

When you're **not using** a MST tenancy, you will only have one Cypress config file.
There is also another config file for development usage (local).

Update `cypress/config-production.json` and update the `baseUrl` so that it matches the project's production url.

# Cypress plans and pricing

Next Right Now doesn't use a paid version of Cypress (no Dashboard available).
We don't use their infrastructure to host our tests, since they're executed on GitHub Actions.

Therefore, you don't have to pay for Cypress.

But, if you wish to benefit from the [Cypress Dashboard](https://www.cypress.io/dashboard) and store your Cypress recordings then you might be interested in buying a [Cypress plan](https://www.cypress.io/pricing/).

> If you buy a plan, you should **set the `orgId`** in your `cypress/config-*.json` so that recordings will be stored on your Cypress account, and can then be accessed through the Dashboard.
