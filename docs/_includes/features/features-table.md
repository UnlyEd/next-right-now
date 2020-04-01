| Feature | Availability | Notes |
|:--------|:-------------|:------|
{% if include.rendering == ssr %}{% include features/feature-row-ssr.md %}{% endif %}{% if include.tenancy == mst %}{% include features/feature-row-mst.md %}{% endif %}{% if include.analytics == amplitude %}{% include features/feature-row-amplitude.md %}{% endif %}{% if include.gql-api == gcms %}{% include features/feature-row-gcms.md %}{% endif %}{% if include.i18n == locize %}{% include features/feature-row-locize.md %}{% endif %}{% if include.monitoring == sentry %}{% include features/feature-row-sentry.md %}{% endif %}
