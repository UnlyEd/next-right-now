| Feature | Availability | Notes about features |
|:--------|:-------------|:------|
{% if rendering == 'ssr' -%}
    {%- include features/feature-row-rendering-mode-ssr.md -%}
{%- endif -%}

{%- if tenancy == 'mst' -%}
    {% include features/feature-row-mst.md -%}
{%- endif -%}

{%- if analytics == 'amplitude' -%}
    {%- include features/feature-row-amplitude.md -%}
{%- endif -%}

{%- if gql-api == 'gcms' -%}
    {%- include features/feature-row-gcms.md -%}
{%- elsif gql-api == 'airtable' -%}
    {%- include features/feature-row-airtable.md -%}
{%- endif -%}

{%- if i18n == 'locize' -%}
    {%- include features/feature-row-locize.md -%}
{%- endif -%}

{%- if monitoring == 'sentry' -%}
    {%- include features/feature-row-sentry.md -%}
{%- endif -%}
