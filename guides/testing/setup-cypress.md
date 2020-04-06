---
layout: default
title: How to setup Cypress
parent: Testing
grand_parent: Guides
nav_order: 10
---

# How to setup Cypress
{: .no_toc }

<div class="code-example" markdown="1">
Step by step guide about how to create and properly configure Cypress.
</div>

{% include page-toc.md %}

---

## Configure Cypress

### Create a Cypress account

Please create your own account, you can use their [free plan](https://www.cypress.io/pricing/).

Once created, **please change the `projectId`** in your `cypress/config-*.json` to use your own account, **otherwise you'll eat our free recordings** :sweat_smile:

### When using MST tenancy

When you're using a MST tenancy, you will have one Cypress config file per tenant, because each tenant has its own dedicated production app and domain.
There is also another config file for development usage (local).

Update `cypress/config-*.json` and update the `baseUrl` so that it matches with their respective production url.

### When not using MST tenancy

When you're **not using** a MST tenancy, you will only have one Cypress config file.
There is also another config file for development usage (local).

Update `cypress/config-production.json` and update the `baseUrl` so that it matches the project's production url.
