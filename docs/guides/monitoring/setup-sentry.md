---
layout: default
title: How to setup Sentry
parent: Monitoring
grand_parent: Guides
nav_order: 10
---

## Creating Sentry account

> **Tip**: If you don't want to create an account, you can use `https://14fa1cae05079675b18cd05403ae5c48@sentry.io/1234567` as `SENTRY_DSN`

- [Create a free account on Sentry](https://sentry.io/signup/?ref=unly-nrn)
- Create a new project
    - Select "React" as project type
    - **Tip**: You **must** create only one project, even if you use a multi-tenants setup, because all customers will be using the same error monitoring project
- You can find your Sentry DSN at [https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/](https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/)

### Additional Sentry documentation

- [Official "Getting started" guide](https://docs.sentry.io/error-reporting/quickstart/?platform=javascript)
- [Capturing errors](https://docs.sentry.io/error-reporting/capturing/?platform=javascript)
- [Configuration](https://docs.sentry.io/error-reporting/configuration/?platform=javascript)
- [Using "context" for events](https://docs.sentry.io/enriching-error-data/context/?platform=javascript)
- [Using "breadcrumbs" for events](https://docs.sentry.io/enriching-error-data/breadcrumbs/?platform=javascript)
- [How to blacklist sensitive data tracking (GDPR, security)](https://docs.sentry.io/data-management/sensitive-data/)

---
