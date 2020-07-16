{% if preset %}
The following vendors are **built-in** with the preset `{{preset}}`.
{% endif %}

| Vendor | Tag | Has free trial | Has free plan | Potential discounts | Install guide |
|:-------|:----|:---------------|:--------------|:--------------------|---------------|
{% if hosting == 'vercel' %}{% include vendors/vendor-row-vercel.md %}{% endif %}{% if analytics == 'amplitude' %}{% include vendors/vendor-row-amplitude.md %}{% endif %}{% if gql-api == 'gcms' %}{% include vendors/vendor-row-graphcms.md %}{% endif %}{% if gql-api == 'airtable' %}{% include vendors/vendor-row-airtable.md %}{% include vendors/vendor-row-stacker.md %}{% endif %}{% if i18n == 'locize' %}{% include vendors/vendor-row-locize.md %}{% endif %}{% if monitoring == 'sentry' %}{% include vendors/vendor-row-sentry.md %}{% endif %}
