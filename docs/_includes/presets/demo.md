{% if include.tenancy == mst %}
This preset uses a MST design.

Therefore, there are 2 different demo available at:
- [https://nrn-{{preset}}-customer1.now.sh/](https://nrn-{{preset}}-customer1.now.sh/)
- [https://nrn-{{preset}}-customer2.now.sh/](https://nrn-{{preset}}-customer2.now.sh/)

Both demo have been generated using the same source code, the two demo live in a completely separated server and won't be affected by each other (MST design)

The same database is used by both tenants (MT design), but the displayed content is specific to each tenant (colors, etc.)

{% if include.rendering == ssr %}

Requests are performed in real-time (SSR), each request send a GraphQL query (put aside client/server caching)

Overall, we use a hybrid tenancy design that uses both MST and MT approaches, which is due to a compromise between complexity (only one DB/API) and security/performances/risk (multiple servers to avoid massive downtime of all customers at once)

Of course, if the DB itself gets down, all tenants would be impacted (browser cache may help in such scenario, but what we really rely on in order to protect ourselves against such massive outage is [a proxy server cache](https://github.com/UnlyEd/GraphCMS-cache-boilerplate))
{% endif %}

{% endif %}
