> {{- tenancy | upcase -}}

{%- if analytics == 'amplitude' -%}
&#32;Amplitude
{%- endif -%}

{%- if gql-api == 'gcms' -%}
&#32;GraphCMS
{%- elsif gql-api == 'airtable' -%}
&#32;Airtable
{%- endif -%}

{%- if i18n == 'locize' -%}
&#32;Locize
{%- endif -%}

{%- if monitoring == 'sentry' -%}
&#32;Sentry
{%- endif -%}
