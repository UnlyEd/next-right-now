---
layout: default
title: How to use Locize
parent: I18n
grand_parent: Guides
nav_order: 20
---

# How to use Locize

<div class="code-example" markdown="1">
The content displayed on NRN is translated using different ways, depending on where the translations are stored:
- GraphCMS - Dynamic content (fetched from the DB, through GraphCMS API). This content can be updated through GraphCMS backoffice.
- Locize - Static content (fetched from Locize API). This content can be updated through Locize backoffice, or when using in-context editor.
</div>

## Fetching translations through Locize provider

> When the content we want to display doesn't come from GraphCMS API, then it's considered as a "static" content.
>
> This means that the content is managed by [Locize](https://locize.com?ref=unly-nrn) and must be updated manually there.

Check [this video](https://www.youtube.com/watch?v=9NOzJhgmyQE) to see Locize in action with react-i18next.

### Locize translation workflow in-depth

The Locize project contains two different **versions**:

- `latest`: This **Locize version** is used in **any non-production application stage** (development, staging). That's where translations get added/updated by translators.
- `production`: This **Locize version** is only used in the production application stages (`APP_STAGE=production`) _(all customers share the same `production` version in the current setup, for the sake of simplicity)_

> This separation between the two versions is important and very useful to avoid deploying unapproved changes to the production stage.

In order to update the `production` version, all changes must go through the `latest` version.
They can therefore be tested during the development phase, then during the staging phase.
Once you're ready to ship the content to production, the `production` version can be updated from the `latest` version, which will automatically update all customer production stages.

> **Tip**: New i18n keys are added automatically in the `development` stage, as they are being added to the source code, thanks to the `saveMissing` [option](src/utils/i18nextLocize.ts). _This can also be a bit boring with HMR, because useless keys may be created while programming._

#### Locize additional services

Locize provides a few [additional services](https://locize.com/services.html?ref=unly-nrn). Some are free, some are paid.

#### Other additional services

- One interesting thing is the ability to share part of the project to be translated by a third party using [`Crowdbased`](https://locize.com/services.html?ref=unly-nrn), without sharing the whole project.
- There are also several paid [Translation services](https://locize.com/services.html?ref=unly-nrn), where you can pay people to translate your content.
- It is also possible to enable [Audit](https://locize.com/services.html?ref=unly-nrn), which allows to audit every change to our translations, and keep changes up to 10 years. (_expensive_)


https://locize.com/
https://docs.locize.com/
https://www.i18next.com/overview/for-enterprises#locize
