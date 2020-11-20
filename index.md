---
layout: default
title: Introduction
nav_order: 10
---

[![Maintainability](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now/test_coverage)

---

# Introduction to NRN

<div class="code-example" markdown="1">
Next Right Now (NRN) is meant to help you build **production-grade** projects using the **Next.js framework**.

NRN is maintained with several purposes in mind:
- To be used as a **boilerplate** to quickly deploy a **new** project.
    - It is used in production by ourselves, and thus covers enterprise-grade features and needs.
    - It has been used to build production-grade websites within 2h time during a French COVID-19 hackathon. (March 2020)
    - It has been used to build [NRN Admin](https://github.com/UnlyEd/next-right-now-admin)
- To be used as an **educational** resource, meant to be used as a **learning/teaching** resource, even if you don't use it as a boilerplate.
- To provide various boilerplate [presets](./concepts/presets), in order to get started with the preset that matches the closest your needs.
- To be **flexible** and allow for extensive **customisation**, based on your own needs and use-cases.

Don't hesitate to share your opinion about your ["getting started"](https://github.com/UnlyEd/next-right-now/issues/14) experience and your [feedback about opt-in 3rd parties](https://github.com/UnlyEd/next-right-now/issues/13)!
</div>

---

## Overview

This boilerplate is meant for developers with basic skills in React, who are looking for a way of building **production-grade web applications**.
We took very special care regarding the **Developer Experience**, because it's _very important to us, as developers,_ to help us build quality software.

Knowing Next.js, TypeScript and Vercel (formerly Zeit) vendor will be **a huge help**, because they are the pillars of this boilerplate.

> We carefully explain installation and proper setup, but **it's your responsibility to go deeper and actually learn how they work**.
>
> **Tip**: Bookmark this [React Cheat Sheet](https://devhints.io/react) if you're new to React
>
> **Tip**: Bookmark this [TypeScript Cheat Sheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) if you're new to TypeScript
>
> **Tip**: Bookmark this [Next.js Cheat Sheet](https://www.saltycrane.com/cheat-sheets/typescript/next.js/latest/) if you're new to Next

### Boilerplate presets, opt-in features and 3rd party vendors

This boilerplate provides multiple presets, which provide different features that rely on different vendors.
Don't hesitate to check out our ["What's a preset?"](./concepts/presets) section for more information.

Each preset provides different "built-in" features and utilities.
Therefore, you probably want to get an overview of all the [available presets](./available-presets) to decide which one best fit your needs.

> If you wish to learn more about this design, see our [RFC specifications](https://github.com/UnlyEd/next-right-now/issues/18).

---

## Benefits

As mentioned above, each preset has its own set of built-in features.
Even though, there is a **common base of features that are available on all presets**:

Here is an overview of all the features included in this boilerplate:

### Common features (available in all presets):

- **Stages** (development, staging, production) workflow
- **TypeScript** advanced support
- Various **rendering** capabilities, which allow for **hybrid** configuration
    - Next.js allow [per-page rendering configuration](https://nextjs.org/docs/basic-features/pages#pre-rendering), meaning you can build hybrid SSG/SSR apps
- React hooks over HOC (functional components over classes)
- **Testing** advanced support
  - TS-friendly (thanks to [ts-jest](https://github.com/kulshekhar/ts-jest))
  - End-to-end (E2E) automated tests (thanks to [Cypress](https://www.cypress.io/) and Github Actions)
  - Other tests, such as unit tests, etc. (thanks to [Jest](https://jestjs.io/), [Jest extended](https://github.com/jest-community/jest-extended))
- Powerful **CSS-in-JS** styles, SSR & CSR friendly, JSX-friendly, styled-component friendly (thanks to [Emotion](https://github.com/emotion-js/emotion))
- **Font** support (SSR/CSR friendly, no FOUT effect) (thanks to [WebFontLoader](https://github.com/typekit/webfontloader))
- **Integrated CI/CD pipeline**, automated deployments to preview domains and production domains (thanks to the [Vercel](https://vercel.com/), [GitHub Actions](https://github.com/features/actions))
  - Including a dedicated "per-deployment domain", for fast feedback loop and testing means, in an online environment (staging)
  - Including a dedicated "per-branch domain", for fast feedback loop and testing means, in an online environment with a url which is automatically updated as new pushed commits are being deployed (staging)
- Built-in **utilities**
  - Convert SVG to TSX components (thanks to [SVGR](https://github.com/gregberge/svgr))
  - Font Awesome icons as react components, with SSR support (thanks to [Font Awesome](https://github.com/FortAwesome/react-fontawesome))
  - Bootstrap support (thanks to [Reactstrap](https://reactstrap.github.io/))
  - Node debug mode for the server side
  - NPM security audit (script)
  - NPM developer-friendly outdated packages (script)
  - Proper handling of sensitive information _(e.g: token)_ using [Vercel secrets](https://vercel.com/docs/v2/serverless-functions/env-and-secrets)
- Documented usage of [NRN own dependencies](./reference/dependencies)
- Jekyll site for [online documentation using Github Pages](https://help.github.com/en/github/working-with-github-pages/about-github-pages-and-jekyll)
  - Check out [`jekyll-auth` plugin](https://github.com/benbalter/jekyll-auth) if you need to release a non-public version
  - We use [`just-the-docs` Jekyll theme](https://github.com/pmarsceill/just-the-docs)

---

### Per-preset features (only some presets have those built-in):

- **B2B Multi Single-Tenancy (MST)**
  - Supports configuration, deployment, testing, monitoring of multiple customers through the same project (identical code base, monorepo design)
  - Most projects do not need this capability, but it's useful for SaaS B2B businesses with large/key customer accounts who want to replicate the underlying infrastructure per-customer
- **GraphQL** support (thanks to [Apollo](https://github.com/apollographql/apollo-client))
  - **GraphCMS** advanced support, which is a three-in-one GraphQL API + database + CMS, fully hosted (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
  - **GraphQL schema** available in the developer environment (thanks to [GraphQL Config](https://github.com/kamilkisiela/graphql-config))
- **Internationalisation** (i18n) advanced support (SSR + CSR friendly) (thanks to [react-i18next](https://react.i18next.com/))
  - I18n of the database (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
      - [Automated fallback language, through HTTP headers](https://graphcms.com/features/content-localization/?ref=unly-nrn)
  - I18n of the project (thanks to [Locize<sup>3</sup>](https://locize.com/?lng=en))
      - [Automated fallback language](https://www.i18next.com/principles/fallback)
      - [In-context editor](https://docs.locize.com/more/incontext-editor)
      - Auto-add new i18n keys (to Locize) with default translation when working locally
- Strong **observability** of the system (monitoring) and push-notification on your own messaging channel (e.g: Slack) when things go wrong (thanks to [Sentry<sup>1</sup>](https://sentry.io/))
- Fine-grained frontend **analytics**, react-friendly, flexible, SPA-friendly (thanks to [Amplitude<sup>1</sup>**<sup>2</sup>**](https://amplitude.com/))

<div class="code-example" markdown="1">
- `advanced support`: This means we took very special care to support this, and that it's not as simple as one might think.
- <sup>1</sup>: Third parties that provide a free plan that is sufficient for a "simple" application, **but** make sure to check that their pricing fits you.
- **<sup>2</sup>**: Beware, there is a huge gap between free and paid plans cost.
- **<sup>3</sup>**: Does not provide a free plan, only a free trial.
</div>

<div class="fs-8" markdown="1" style="text-align: center">
[Get me started!](./getting-started){: .btn .btn-purple }
</div>

---

## Want more?

- Have questions? Check out the [FAQ](./faq)! Open a [github issue](https://github.com/UnlyEd/next-right-now/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) if you don't find your answer.
- Check out our [roadmap](./roadmap) to see what we plan to release next!
- Check out our [terminology](./reference/terminology) to make sure you correctly understand all the acronyms we used :wink:
