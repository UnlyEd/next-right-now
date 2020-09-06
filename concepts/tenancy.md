---
layout: default
title: Tenancy
parent: Concepts
nav_order: 20
---

# Tenancy (ST, MT, HT and MST)
{: .no_toc }

<div class="code-example" markdown="1">
**Single-tenancy** (ST) is an architecture in which a **single instance** of a software application and supporting infrastructure **serves one customer** (i.e: tenant).

**Multi-tenancy** (MT) is an architecture in which a **single instance** of a software application **serves multiple customers** (i.e: tenants).

**Hybrid-tenancy** (HT) is an architecture which leverages (micro)services that are **both single and multi-tenants** to **optimize** the balance of performance, scale, and security.

**Multiple single-tenancy** (MST) is an architecture in which a **single base code** of a software application allows to **deploy multiple tenants**, each with **their own infrastructure**.
The infrastructure itself **may** be **completely isolated** from other tenants (ST), or **partially shared** (HT, e.g: different servers, but same DB).
</div>

{% include page-toc.md %}

---

## Learn more about the "tenancy" concept and its various use cases

In the context of a SaaS web application, a tenant is often a customer. **In NRN, a tenant always refer to a customer.**

**Most SaaS application are multi-tenants**, meaning that they put all their tenants into the same database, and they all have access to their own account through the same server.
Thus, the technical infrastructure is not designed per-tenant but is meant to be shared across all tenants.
It's typically the case for Facebook, Twitter and AirBnb. You're just another customer using the same infrastructure as many other users.

Of course, it doesn't necessarily mean that you used exactly the same server, or that you're stored in the same database as another user,
especially if you're living far away (e.g another continent), but that is still multi-tenancy, it's just that it's designed to be scalable.

**Some SaaS application are single-tenants**, meaning that they replicate their infrastructure resources per tenant.
That's the case of SalesForce<sup>1</sup>, which dynamically creates a database just for you, and then automatically manipulates database fields just for you when you manipulate your own models.
That DB is dedicated to you, and you only. No other customer shares it. That's one of the biggest strengths of SalesForce, because this way it can adapt to your data model.
It's also the case of most HeadlessCMS you can see out there, such as GraphCMS, Directus, etc. They basically dynamically spawn a whole infrastructure just for you!

This design is very powerful, but also much more complicated to build and maintain, it is also (much) more expensive, and often requires a strong tech team.

- <sup>1</sup>: I haven't checked, but I believe that's the case. Correct me if I'm wrong! :wink:

---

## What kind of tenancy do I need?

### Multi-tenancy

This is typically for **SaaS B2C businesses**. Of for SaaS B2B businesses that target **small** businesses.

All your users will **use the same app**, fetch the **same API** and your infrastructure will be **shared for all of them**.
Maybe you'll have some duplicated servers and databases and such to handle a bigger load, but that's a scalability concern, which isn't related to tenancy itself.

This is the simplest tenancy, the less expensive and the fastest to build (ROI).

---

### Single tenancy

This is typically for **SaaS B2B businesses** who target **big** businesses.

For instance, it's our case because we target higher education institutions.

Our customers can't have their platform taken down because **another** customer has a sudden high traffic load.

Also, each customer may not use the same set of features, and because **sales are very much complex** with such customers, you may not have all your customers using the same version.
This means you may need to allow a customer to stay on v1, another on v2, another on v3, etc.
And thus you need to have each of them **isolated**, use **different servers**, and probably **different databases** between major versions. (depends on how you deal with versioning)

Also, you really **can't afford to take down multiple customers** by mistake.
Imagine you're running some migration and all customer platforms are down at once, _that'd be a hell of a day for your whole team_.

---

### Hybrid tenancy

So, you definitely need to have **some isolation**.
Sometimes it's preferred to **completely isolate each tenant by replicating the whole infrastructure**.
Sometimes, you just need to **replicate the most critical components**.

For instance, our Hybrid Tenancy replicates **only the server** on which the customer app runs, but it uses **the same database** for all customers.

> To mitigate potential network issues, we've put a [GraphQL proxy cache](https://github.com/UnlyEd/GraphCMS-cache-boilerplate) in between our app and our API, so that even if the DB/API fails, the app won't crash (cache will take over).

That's what's called Hybrid tenancy. You take the best of both worlds (ST/MT), and build something that fits your business needs (HT).

---

### Multiple Single-Tenancy

_This, we invented._ It's a concept where you **deploy all your tenants through the same source code**.
They all share the same source code (within reason, e.g: not major versions), and can all be deployed from the same repository, **similar to what monorepos** can do.

So, it's not really a new way of designing a tenancy system, but rather an **architecture designed to deploy multiple tenants easily**, through CI/CD actions.

Using NRN, this design allows you to quickly deploy a new tenant by writing a few scripts:
- Create `deploy:customerX`: Deploy the new customer to staging
- Create `deploy:customerX:production`: Deploy the new customer to production
- Create `now.customerX.staging.json`: Vercel config for staging environment
- Create `now.customerX.production.json`: Vercel config for production environment

Those scripts and config files would automatically generate a whole new Vercel project the first time you'd run the deploy scripts.
This new project would run on its own server and own domain name.

It would be completely **isolated** from other tenants, only the database would be **shared**.
But you could even use a **different database** if you wished to do so! (through `now.customerX.*.json`)

This is what we call "Multiple Single-Tenancy" for now, there is probably a better terminology out there, but the concept isn't widely known/used and we didn't find any.

---

### Summary

Now that you better understand all those concepts, it should be easier to choose what you need.

Honestly, most businesses don't even know what tenancy is, or just need a simple multi-tenants design.
If you need to handle multiple tenants with a shared codebase, using a preset that uses MST design should help a ton.

At least, we hope it does! :wink:

- **Tip**: All presets that support `mst` design use the `mst` tag in their name.

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Environments and Stages](./env-and-stages){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Guides: Tenancy](../guides/tenancy){: .btn .btn-blue }
    </span>
    <span class="fs-4" markdown="1">
    [GraphQL >](./graphql){: .btn .btn-purple }
    </span>
</div>
