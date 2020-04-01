{% if include.preset %}
The following vendors are **built-in** with the preset `{{preset}}`.
{% endif %}

| Vendor | Has free trial | Has free plan | Potential discounts | Install guide |
|:-------|:--------------|:---------------|:--------------------|---------------|
{% if include.hosting == zeit%}{% include vendors/vendor-row-zeit.md %}{% endif %}{% if include.gql-api == gcms%}{% include vendors/vendor-row-graphcms.md %}{% endif %}{% if include.i18n == locize%}{% include vendors/vendor-row-locize.md %}{% endif %}{% if include.monitoring == sentry%}{% include vendors/vendor-row-sentry.md %}{% endif %}{% if include.analytics == amplitude%}{% include vendors/vendor-row-amplitude.md %}{% endif %}
