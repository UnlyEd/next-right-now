- This assumes you've cloned the NRN repository locally (cloning it once is enough, no need to clone it multiple times, but it may be simpler to use one clone per preset if you're trying out multiple presets locally :wink:)
- This assumes you're already authenticated to Vercel (you should, if you've followed the [quick start](./quick-start), or if you're familiar with Vercel already)

1. `cp .env.build.example .env.build` - Duplicates the `.env.build.example` as `.env.build`
    - **Tip**: `.env.build` is only used when working locally
1. Create an account for all required 3rd party vendors below
{% if include.hosting == vecerl %}
    - [Learn how to setup Vercel](../guides/online-deployment/setup-vercel)
{% endif %}
{% if include.gql-api == gcms %}
    - [Learn how to setup GraphCMS](../guides/graphql-api/setup-graphcms)
{% endif %}
{% if include.i18n == locize %}
    - [Learn how to setup Locize](../guides/i18n/setup-locize)
{% endif %}
{% if include.monitoring == sentry %}
    - [Learn how to setup Sentry](../guides/monitoring/setup-sentry)
{% endif %}
{% if include.monitoring == amplitude %}
    - [Learn how to setup Amplitude](../guides/analytics/setup-amplitude)
{% endif %}
    - [Learn how to setup Cypress](../guides/testing/setup-cypress)
1. _(Optional)_ `nvm use` - Selects the right node.js version based on the `.nvmrc` file
    - **Tip**: Ignore this if you're not using [NVM](https://github.com/nvm-sh/nvm), but you should!
1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

That's it! The project now works on your local computer!
