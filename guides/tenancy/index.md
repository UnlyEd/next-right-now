---
layout: default
title: Tenancy
parent: Guides
nav_order: 110
has_children: true
---

<div class="code-example" markdown="1">
<span markdown="1">
    Make sure you've checked our [Concept: Tenancy](../../concepts/tenancy) page.
</span>
</div>

---

## Overview

> This is an explanation guide about how the NRN tenancy system works.

The tenancy system affects a very small part of the whole source code, but it's critical to get it right nonetheless because that's one of the main thing on what everything else relies on.

### Parts of the NRN app strongly affected by the MST tenancy design

The MST design is the most complex of all tenancy designs that is currently available on NRN.
It's very useful for managing a fleet of customers, but it comes at the price of increased complexity.

- `MST` makes the CI/CD much more complicated, because it needs to handle the deployment of different "customers".
- The Vercel configuration is more difficult too, because:
    - Each tenant (customer) has its own set of Vercel configuration (`vercel.customer1.*.json`, etc.).
    - Each tenant might have its own `secrets` and ENV variables.
    - Each tenant is managed through a distinct Vercel project on [https://vercel.com/](https://vercel.com/).
    - Each tenant is completely separated from the others, and this can complicate your app even more, depending on what other tools you rely on (DB, etc.).
- The Cypress configuration is more difficult too, because:
    - Artifacts (videos, screenshots) must be separated between customers, otherwise it might confuse the developers during debug.
    - Cypress must run on the right deployment , not on the deployment of another customer.

For instance, when we deploy a customer, we automatically run tests for this customer only. Other customers aren't affected.
