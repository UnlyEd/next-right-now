{% if tenancy == 'mst' %}
##### Tenancy
This preset uses a MST design.

Therefore, there are 2 different demo available at:
1. [https://nrn-{{preset}}-**c1**.vercel.app/](https://nrn-{{preset}}-c1.vercel.app/), and its preview at [https://nrn-{{preset}}-**c1**-preview.vercel.app/](https://nrn-{{preset}}-c1-preview.vercel.app/)
1. [https://nrn-{{preset}}-**c2**.vercel.app/](https://nrn-{{preset}}-c2.vercel.app/), and its preview at [https://nrn-{{preset}}-**c2**-preview.vercel.app/](https://nrn-{{preset}}-c2-preview.vercel.app/)

Both demo have been generated using the same source code, the two demo live in a completely separated server and won't be affected by each other (MST design)

The same database is used by both tenants (MT design), but the displayed content is specific to each tenant (theme, logo, etc.) (ST design)

Overall, we use a hybrid tenancy design that we name MST, which is due to a compromise between complexity (only one DB/API (AKA MT)) and security/performances/risk (multiple servers to avoid massive downtime of all customers at once (AKA ST))
{% endif %}



{% if rendering == 'ssr' %}
##### Server side rendering
Requests are performed in real-time (SSR), each request send a GraphQL query (put aside client/server caching)

Of course, if the DB itself gets down, all tenants would be impacted at once, which is quite a critical issue (we may protect ourselves against such an outage using [a proxy server cache](https://github.com/UnlyEd/GraphCMS-cache-boilerplate))
{% endif %}



{% if rendering == 'hybrid' %}
##### Static pages
Most pages are built statically (SSG), there are some SSR pages to showcase hybrid usage (per-page rendering mode).

Due to SSG, the whole app is extremely fast, and very resilient. It basically cannot crash on SSG pages, even if our underlying providers are taken down.

Even if critical vendors are being used (e.g: Locize, GraphCMS, Airtable - because they hold our data), it doesn't matter if there is an outage on their side because we only depend on them during **build time**.

Also, the cost is reduced when using SSG, compared to using SSR because we avoid real-time requests to extra services (e.g: Locize, Vercel, GraphCMS).
{% endif %}
