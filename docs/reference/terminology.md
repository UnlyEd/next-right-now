---
layout: default
title: Terminology
parent: Reference
nav_order: 10
---

# Terminology
{: .no_toc }

<div class="code-example" markdown="1">
Definition of terms used in NRN documentation and source code.
</div>

{% include page-toc.md %}

---

## Common terms

##### SSR
[Server Side Rendering](https://nextjs.org/features/server-side-rendering#benefits)

##### SSG
[Static Site Generation](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support)

##### Tenancy
[Definition](https://legal-dictionary.thefreedictionary.com/tenancy): A tenancy is the occupancy or possession of land or premises by lease.

:thinking: **What does that mean?** :point_right: [Read more](../concepts/tenancy)

##### ST
[Single-Tenancy](https://www.liquidweb.com/kb/what-is-single-tenant-vs-multi-tenant-software/) - **Single-tenancy** (ST) is an architecture in which a **single instance** of a software application and supporting infrastructure **serves one customer** (i.e: tenant).

##### MT
[Multi-Tenancy](https://www.liquidweb.com/kb/what-is-single-tenant-vs-multi-tenant-software/) - **Multi-tenancy** (MT) is an architecture in which a **single instance** of a software application **serves multiple customers** (i.e: tenants).

##### HT
[Hybrid-tenancy](https://www.pega.com/insights/articles/cloud-hybrid-tenancy-replacing-single-and-multi-tenancy) - **Hybrid-tenancy** (HT) is an architecture which leverages (micro)services that are **both single and multi-tenants** to **optimize** the balance of performance, scale, and security.

##### TTM
[Time to market](https://en.wikipedia.org/wiki/Time_to_market)

---

## NRN terms

Those terms are specific to NRN and you're not likely to find a definition elsewhere.

##### MST
**Multiple single-tenancy** (MST) is an architecture in which a **single base code** of a software application allows to **deploy multiple tenants**, each with **their own infrastructure**.
The infrastructure itself **may** be **completely isolated** from other tenants (ST), or **partially shared** (HT, e.g: different servers, but same DB).

> _This terminology has been defined by us, we couldn't find much resources supporting this definition._

##### [Preset](../concepts/presets)
Similar to a preset of features that are built-in within. Helps to quickly get started a new project.

##### Dynamic i18n
Content-related (e.g: Post title in FR + EN).

##### Static i18n
Everything that isn't related to dynamic content (e.g: Site links, any content that is static and not related to dynamic data).

