---
layout: default
title: How to setup Sentry
parent: Monitoring
grand_parent: Guides
nav_order: 10
---

# How to setup Sentry
{: .no_toc }

<div class="code-example" markdown="1">
Guide about how to properly configure Sentry.
</div>

{% include page-toc.md %}

---

## Creating Sentry account

- **Tip**: If you don't want to create an account, you can use `https://14fa1cae05079675b18cd05403ae5c48@sentry.io/1234567` as `SENTRY_DSN`

- [Create a free account on Sentry](https://sentry.io/signup/?ref=unly-nrn)
- Create a new project
    - Select "React" as project type
    - **Tip**: You **should** create only one project, even if you use a multi-tenants setup, because all customers will be using the same error monitoring project
- You can find your Sentry DSN at [https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/](https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/)
- If you have already configured Zeit, and if you want to deploy your app online, you must also configure Zeit secrets
    - `now secrets add nrn-sentry-dsn YOUR_SENTRY_DSN`

That's it! Your Sentry account is ready to use!

### Additional Sentry documentation

- [Official "Getting started" guide](https://docs.sentry.io/error-reporting/quickstart/?platform=javascript)
- [Capturing errors](https://docs.sentry.io/error-reporting/capturing/?platform=javascript)
- [Configuration](https://docs.sentry.io/error-reporting/configuration/?platform=javascript)
- [Using "context" for events](https://docs.sentry.io/enriching-error-data/context/?platform=javascript)
- [Using "breadcrumbs" for events](https://docs.sentry.io/enriching-error-data/breadcrumbs/?platform=javascript)
- [How to blacklist sensitive data tracking (GDPR, security)](https://docs.sentry.io/data-management/sensitive-data/)

---
