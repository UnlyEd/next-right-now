This local installation guide is meant to guide you through the installation process on your own computer.
{: .mb-6 }

##### Pre-requisites

{% include vercel-online-hosting-pre-requisites.md %}
{: .mb-6 }

##### Install steps

1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
    - Alternatively, on Windows, you need to run `yarn start:windows`

Awesome, the demo should be working on your computer now!

Note that it's not yet linked onto your own vendor accounts, but it uses NRN defaults values instead.
Configuring each vendor is probably the most time-consuming, but you don't have to do it right away, it depends on whether you want to play around, or make a real project.
{: .mb-6 }

##### Vendors configuration

Create an account for all required 3rd party vendors below, and follow their installation guide

{% if hosting == 'vercel' -%}
1. [Learn how to setup Vercel](../guides/online-hosting/setup-vercel)
{%- endif %}

{% if gql-api == 'gcms' -%}
1. [Learn how to setup GraphCMS](../guides/graphql-api/setup-graphcms)
{%- elsif gql-api == 'airtable' %}
1. [Learn how to setup Airtable](../guides/airtable-api/setup-airtable)

1. [Learn how to setup Stacker](../guides/stacker-cms/setup-stacker)
{%- endif %}

{% if i18n == 'locize' -%}
1. [Learn how to setup Locize](../guides/i18n/setup-locize)
{%- endif %}

{% if monitoring == 'sentry' -%}
1. [Learn how to setup Sentry](../guides/monitoring/setup-sentry)
{%- endif %}

{% if monitoring == 'amplitude' -%}
1. [Learn how to setup Amplitude](../guides/analytics/setup-amplitude)
{%- endif %}

1. [Learn how to setup Cypress](../guides/testing/setup-cypress)

1. [Learn how to setup GitHub Actions](../guides/ci-cd)

##### Recommended

- [Learn about the built-in scripts and utilities](../guides/scripts-and-utilities)
- [Learn about the built-in API endpoints](../guides/api-endpoints)
- [Read the FAQ](../faq)
