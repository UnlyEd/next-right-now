This local installation guide is meant to guide you through the installation process on your own computer.
{: .mb-6 }

##### Pre-requisites:
- This assumes you've cloned the NRN repository locally
- This assumes you're already authenticated to Vercel (you should, if you've followed the [quick start](./quick-start), or if you're familiar with Vercel already)
{: .mb-6 }

##### Install steps:

1. `cp .env.build.example .env.build` - Duplicates the `.env.build.example` as `.env.build`
    - **Tip**: `.env.build` is only used when working locally
1. _(Optional)_ `nvm use` - Selects the right node.js version based on the `.nvmrc` file
    - **Tip**: Ignore this if you're not using [NVM](https://github.com/nvm-sh/nvm), but you should!
1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

Awesome, the demo should be working on your computer now!

Note that it's not yet linked onto your own vendor accounts, but it uses NRN defaults values instead.
Configuring each vendor is probably the most time-consuming, but you don't have to do it right away, it depends on whether you want to play around, or make a real project.
{: .mb-6 }

##### Vendors configuration:

Create an account for all required 3rd party vendors below, and follow their installation guide

{% if hosting == 'vercel' -%}
1. [Learn how to setup Vercel](../guides/online-deployment/setup-vercel)
{%- endif %}

{% if gql-api == 'gcms' -%}
1. [Learn how to setup GraphCMS](../guides/graphql-api/setup-graphcms)
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

