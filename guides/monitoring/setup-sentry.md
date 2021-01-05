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

- **Tip**: If you don't want to create an account, you can use `https://14fa1cae05079675b18cd05403ae5c48@sentry.io/1234567` as `SENTRY_DSN` in `.env.local`, it will not catch any error, but it will allow for online deployment (it's a dummy value)

- [Create a free account on Sentry](https://sentry.io/signup/?ref=unly-nrn)
- Create a new project
    - Select "React" as project type
    - **Tip**: You **should** create only one project, even if you use a multi-tenants setup, because all customers will be using the same error monitoring project
- You can find your Sentry DSN at [https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/](https://sentry.io/settings/TEAM_NAME/projects/PROJECT_NAME/keys/)
- If you have already configured Vercel, and if you want to deploy your app online, you must also configure Vercel secrets
    - `vercel secrets add nrn-sentry-dsn YOUR_SENTRY_DSN`

That's it! Your Sentry account is ready to use!

## Configuring Sentry alerts

At Unly, we use Sentry to forward issues to our Slack channel automatically.

While this is completely optional, and merely a recommandation/guide from us, we advise you to do something similar so you get notified when things go wrong.

### Slack configuration and notifications

We use 3 different Slack channels:
- Production
- Staging
- Development

Each channel is configured by our Slack members differently. Our Customer Success team has access to the Production channel only, to avoid disturbing them needlessly.
Developers have access to all channels, but the Development channel is muted for everyone. It's still useful to manually check if something happens there, when debugging something locally.

### Sentry alerts configuration

We split our alerts in two parts:
- The unknown events and issues
- The known events (those with an `alertType` tag set)

This helps to configure the Slack behavior slightly differently. Also, we route some specific alerts to specific Slack channels based on their `alertType` value, for specific teams and purposes.

The below configuration is how we recommend configuring your Sentry alerts.
The 2 first alerts are the most important, others are merely examples of what you could do.
They make most sense if you need to deal with different alerting behavior based on the `alertType` value.

#### Alert - Production all events

- Environment: `production`
- Name: Production all events
- When "additional triggers": `any`
    - A new issue is created
    - The event occurs
- If: None
- Then: Send a Slack notification to `#oss-nrn-monitoring-production`
    Tags: `appName, appVersion, institution, host, url, environment, release, runtimeEngine, lang, level, nodejs, memory, buildTime, iframe, fileLabel`
- Action interval: 5mn

#### Alert - Staging all events

- Environment: `staging`
- Name: Staging all events
- When "additional triggers": `any`
    - A new issue is created
    - The event occurs
- If: None
- Then: Send a Slack notification to `#oss-nrn-monitoring-staging`
    Tags: `appName, appVersion, institution, host, url, environment, release, runtimeEngine, lang, level, nodejs, memory, buildTime, iframe, fileLabel`
- Action interval: 5mn

#### Alert - Development all events

- Environment: `development`
- Name: Development all events
- When "additional triggers": `any`
    - A new issue is created
    - The event occurs
- If: None
- Then: Send a Slack notification to `#oss-nrn-monitoring-development`
    Tags: `appName, appVersion, institution, host, url, environment, release, runtimeEngine, lang, level, nodejs, memory, buildTime, iframe, fileLabel`
- Action interval: 5mn

#### Alert - [Prod] All events with "alertType" set

- Environment: `production`
- Name: [Prod] All events with "alertType" set
- When "additional triggers": None
- If: The event's tags match alertType is set
- Then: Send a Slack notification to `#oss-nrn-monitoring-production`
    Tags: `alertType, appName, appVersion, institution, host, url, environment, release, runtimeEngine, lang, level, nodejs, memory, buildTime, iframe, fileLabel`
- Action interval: 5mn

#### Alert - [!Prod] All events with "alertType" set

- Environment: `All environments`
- Name: [!Prod] All events with "alertType" set
- When "additional triggers": None
- If: The event's tags match alertType is set
  The event's environment value doesn't contain production
- Then: Send a Slack notification to `#oss-nrn-monitoring-staging`
    Tags: `alertType, appName, appVersion, institution, host, url, environment, release, runtimeEngine, lang, level, nodejs, memory, buildTime, iframe, fileLabel`
- Action interval: 5mn


