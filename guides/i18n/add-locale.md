---
layout: default
title: How to add a new locale
parent: I18n
grand_parent: Guides
nav_order: 40
---

<div class="code-example" markdown="1">
<span markdown="1">
    This guide explains how to add a new Locale to a project created using Next Right Now.
</span>
</div>

---

# How to add a new locale

> For instance, let's say we want to add a new `fr-CA` locale.

## Adding a new `supportedLocales`

In the `src/i18ncConfig.js`, add the `fr-CA` locale in the `supportedLocales` array, as follows:

```js
const supportedLocales = [
  { name: 'fr', lang: 'fr' },
  { name: 'fr-CA', lang: 'fr' }, // XXX New addition
  { name: 'en-US', lang: 'en' },
  { name: 'en', lang: 'en' },
];
```

This will immediately allow routes like `/fr-CA/` to be used within the app.

## Adapting your localization provider

You might also need to make some changes in your localization provider (e.g: Locize).

### Locize

If you use Locize, you'll need to create a new "Namespace" `fr-CA` in your project.

_There is an ongoing issue with the Locize implementation, see [#200](https://github.com/UnlyEd/next-right-now/issues/200)._
