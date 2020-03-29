{% if variant %}
The following vendors are **built-in** with the variant `{{variant}}`.
{% endif %}

| Vendor | Has free trial | Has free plan | Potential discounts | Install guide |
|:-------|:--------------|:---------------|:--------------------|---------------|
{% if include.zeit == true%}{% include vendors/vendor-row-zeit.md %}{% endif %}{% if include.graphcms == true%}{% include vendors/vendor-row-graphcms.md %}{% endif %}{% if include.locize == true%}{% include vendors/vendor-row-locize.md %}{% endif %}{% if include.amplitude == true%}{% include vendors/vendor-row-amplitude.md %}{% endif %}{% if include.sentry == true%}{% include vendors/vendor-row-sentry.md %}{% endif %}
