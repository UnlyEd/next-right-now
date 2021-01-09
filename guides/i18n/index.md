---
layout: default
title: I18n
parent: Guides
nav_order: 30
has_children: true
---

<div class="code-example" markdown="1">
<span markdown="1">
    Make sure you've checked our [Concept: I18n](../../concepts/i18n) page.
</span>
</div>

---

# About I18n

Internationalization is split in several parts:
- Routing: How to resolve the proper page.
- Content translation: How to programmatically translate a translation key into its translated value.
- Content management: How to allow human to configure and translate content.

The Next.js framework only offers a solution for the "Routing" part, and does so since the `v10` release.

Next Right Now offers a solution for the "Routing", "Content Translation" and "Content management" parts, as described below.

# Official I18n routing implementation

**NRN uses its own i18n routing implementation instead of the official implementation.**

This is because the Next.js framework released an i18n routing implementation [since `v10`](https://nextjs.org/docs/advanced-features/i18n-routing) in the summer of 2020, while NRN released its own implementation in early 2020.

Even though the official implementation and NRN implementation **are compatible and look much alike**, NRN hasn't updated its own implementation because the official implementation doesn't generate a prefix url for the default locale, and **this is a breaking change**.

[This issue is being tracked in #194](https://github.com/UnlyEd/next-right-now/issues/194).

---

# Next Right Now I18n routing implementation

## Localized pages

All localized pages must be located in the `src/pages/[locale]` folder.

The `[locale]` directory is a native Next.js [Dynamic Route](https://nextjs.org/docs/routing/dynamic-routes).

## Automatically detect the user locale

The i18n routing implementation relies on the native Next.js [`rewrites` rules](https://nextjs.org/docs/api-reference/next.config.js/rewrites) which automatically forwards all requests who don't have a `locale` parameter to a special API endpoint.

[Take a look at the implementation](https://github.com/UnlyEd/next-right-now/blob/f24da10646f1a8225fed537337193fd0707f7ac1/next.config.js#L140-L163).

All requests that don't contain a `locale` in the url are automatically forwarded (through `rewrites`) to a dedicated API endpoint `/api/autoRedirectToLocalisedPage`.

There, the API resolves the user languages based on request `accept-language` HTTP header. The `accept-language` is filtered to ignore locales that aren't allowed by the application (see `supportedLocales` in `src/i18nCOnfig.js`).

Then, it redirects to the initially targeted page, by injecting the resolved locale in the url.

> When a request already contains the `locale` in the url, the API endpoint `/api/autoRedirectToLocalisedPage` doesn't intercept the request (the `rewrites` rules aren't applied).
>
> In such cases, the requested page is accessed directly, using the traditional Next.js routing.

## Costs and limits associated to dynamic routing when hosting on Vercel

Because we use an API endpoint to resolve the request locale to use when the locale isn't specified in the url, it might incur costs or count toward Vercel limits, due to calling an API endpoint, depending on your plan.

> As of 2021, most plans are billed per-user and not billed per-usage. **Therefore, most plans shouldn't be affected by how many Serverless Function invocations are made.**
>
> Nevertheless, it's good to keep in mind calls to `/` which are automatically forwarded to the `/api/autoRedirectToLocalisedPage` API endpoint count toward **Serverless Function invocation**,
> and to learn about how the [Vercel limits](https://vercel.com/docs/platform/limits#general-limits) might affect you.

## Disabling automatic locale detection

You might want to use a different implementation and automatically redirect to the `en` version of a page when the locale isn't specified in the url.

For instance, this might be useful if you don't want to use an API to resolve the user locale.
Also, it would be necessary if you want to export your Next.js app, as it can't have API endpoints then (static build).

In such cases, the proper way to go would be to change the `rewrites` implementation, so that paths without a `locale` are redirected to the `en` version of the page directly.

---

# Next Right Now "Content localization", using open-source libraries

The Next.js framework doesn't yet provide any way to translate the content, although it is mentioned in the [official RFC](https://github.com/vercel/next.js/discussions/17078) as an upcoming feature.

Next Right Now provides a built-in way of translating content, by using the [`i18next`](https://www.i18next.com/) and [`react-i18next`](https://react.i18next.com/) open-source libraries.

Please refer to their respective documentation to learn more about how they should be used.
You can also find various usage example in our [demos](https://nrn-default.now.sh/en/examples/built-in-features/static-i18n).

---

# Next Right Now "Content management", using a professional "Localization as a service" (Locize)

[Locize](https://locize.com/?ref=unly-nrn) is a SaaS platform meant to help you manage translations.

**It's been built by the authors of i18next and react-i18next as a way for them to monetize their open-source contributions.**

If you use i18next and react-i18next, then using Locize is the logical next move for any non-trivial app.

> A Unly, we use [Locize](https://locize.com/?ref=unly-nrn) since 2019, and are very much happy with it.

Locize has been kind enough to provide a free project for hosting the Next Right Now demos translations.
