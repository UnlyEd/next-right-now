---
layout: default
title: How to use Locize
parent: I18n
grand_parent: Guides
nav_order: 20
---

# How to use Locize
{: .no_toc }

<div class="code-example" markdown="1">
The content displayed on NRN is translated using different ways, depending on where the translations are stored:
- Dynamic content - GraphCMS (fetched from the DB, through GraphCMS API). This content can be updated through GraphCMS backoffice.
- Static content - Locize (fetched from Locize API). This content can be updated through Locize backoffice, or when using in-context editor.
</div>

{% include page-toc.md %}

---

## Overview

## How to use Locize in-context editor?

You can enable **Locize in-context editor mode**, by appending `?locize=true` to the url, see [https://nrn-default.now.sh/?locize=true](https://nrn-default.now.sh/?locize=true)

Note that it's only enabled in development and staging stages, not in production.

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

### Dependencies

We rely on those packages to manage the translations:
- [`i18next-locize-backend`](https://www.npmjs.com/package/i18next-locize-backend): This is an i18next backend to be used for locize service. It will load resources from locize server using xhr.
  It will allow you to save missing keys containing both default value and context information
  **This backend is used when using the browser.**
- [`i18next-node-locize-backend`](https://www.npmjs.com/package/i18next-node-locize-backend): This is a i18next backend to be used with node.js for the locize service. It's for the node.js server what the i18next-locize-backend is for the browser.
  **This backend is used when using node (server).**
- [`locize-editor`](https://www.npmjs.com/package/locize-editor): The locize-editor enables you to directly connect content from your website / application with your content on your localization project on locize.
  Enabling the editor by querystring ?locize=true you can click any text content on your website to open it on the right side editor window
  **This plugin is used when using the browser.**
- [`locize-node-lastused`](https://www.npmjs.com/package/locize-node-lastused): This is an i18next plugin or standalone scriot to be used for locize service. It will update last used timestamps on reference keys from your locize project using xhr. It sets the last used date on your reference language's namespaces.
  **This plugin is used when using node (server).**

It was quite complicated to configure Next with Locize, mostly because of the universal way Next works, while Locize has dedicated packages depending on the runtime engine.

> See `src/utils/i18nextLocize.ts` to see how it was all put together.

We were inspired by [this SO question](https://stackoverflow.com/questions/55994799/how-to-integrate-next-i18next-nextjs-locize/58782594).


https://locize.com/
https://docs.locize.com/
https://www.i18next.com/overview/for-enterprises#locize
