---
layout: default
title: Introduction
nav_order: 10
---

[![Maintainability](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now/test_coverage)
[![Locize Latest version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27latest%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=latest:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)
[![Locize Production version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27production%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=production:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)

---

# Introduction to NRN

<div class="code-example" markdown="1">
Next Right Now (NRN) is meant to be used as a **boilerplate** for quick getting started with a **production-grade** project featuring the **Next.js framework**, hosted on **Zeit** platform.

NRN is maintained with several purposes in mind:
- To be **flexible** and allow for extensive **customisation**.
- To be used as a **boilerplate** to quickly deploy a **new** project.
    - It has been used to build production-grade websites within 2h time during a French COVID-19 hackathon (March 2020)
    - It has been used to build [NRN Admin](https://github.com/UnlyEd/next-right-now-admin)
- To be used as an **educational** resource, meant to be used as a **learning/teaching** resource.
- Provide various boilerplate [variants](https://unlyed.github.io/next-right-now/concepts/variants), to get started with the variant that matches the closest your needs.

Don't hesitate to share your opinion about your ["getting started"](https://github.com/UnlyEd/next-right-now/issues/14) experience and your [feedback about opt-in 3rd parties](https://github.com/UnlyEd/next-right-now/issues/13)!
</div>

---

## Overview

This boilerplate is meant for developers with basic React background, who are looking for a way of building **production-grade web applications**.
We took a very special care about the **Developer Experience**, because it's very important to build quality software.

Knowing Next.js and Zeit will be **a huge help**, because they are the pillars of this boilerplate and **can't be opt-out**<sup>1</sup>.

> We explain how to install them and properly setup them, but **it's your responsibility to go deeper and actually learn how they work**.

### This boilerplate includes:
- **Built-in** features and 3rd parties vendors: Online hosting (Zeit vendor), React framework with SSR/SSG support (Next.js 9), TypeScript<sup>2</sup>, CI/CD pipeline (Github Actions), unit testing (Jest), end-to-end testing (Cypress), css-in-js (Emotion), css components (Reactstrap/Bootstrap).
- **Opt-in** features and 3rd parties vendors: I18n (Locize vendor), GraphQL (GraphCMS vendor), monitoring (Sentry vendor), analytics (Amplitude vendor) and various utilities (cookies, ...) through **variants**.

> Some of those vendors provide large free plans, other only provide short free trials.
> No worries though, as Zeit is the only **non-free** vendor, and it provides a [large free plan](https://zeit.co/pricing), also, they're very comprehensive regarding [non-commercial usage](https://spectrum.chat/zeit/general/deploying-on-ziet-now~700e3286-551f-42d1-a289-df4cb52e23ea?m=MTU4MzgzMjg1MzAyOA==).
>
> See our [vendor pricing overview](./getting-started/vendors) to learn more.

<div class="code-example" markdown="1">
- _<sup>1</sup>: You may be able to use a different host than Zeit, but it would be a non-trivial change._
- _<sup>2</sup>: It's possible **not to use** TypeScript. TS support is provided by the [Next.js framework](https://nextjs.org/learn/excel/typescript) and is actually opt-in, but we consider it a better practice than plain JS and it's used extensively in this boilerplate._
</div>

### Boilerplate variants and opt-in features and 3rd party vendors

This boilerplate provides multiple variants, which provide different features and rely on different vendors.

> If you wish to learn more about this design, see the [RFC specifications](https://github.com/UnlyEd/next-right-now/issues/18).

Simply put, each variant provides a different "built-in" features and tools.
Therefore, you probably want to get an overview of all the [available variants](https://unlyed.github.io/next-right-now/getting-started/pick-variant) to decide which one best fit your needs.
Make sure to understand [what's a variant](./concepts/variants) first! :wink:
---

## Benefits

Here is an overview of all the features covered by this boilerplate:

### Built-in features (available in all variants):
- **Stages** (development, staging, production) workflow
- **TypeScript** advanced support
- Various **rendering**<sup>1</sup> capabilities, which allow for **hybrid** configuration (you can use SSR + SSG, it's a **per-page configuration**)
    - **SSR**, **CSR**, **SPA** rendering ([See RFC](https://github.com/zeit/next.js/issues/7355))
    - **SSG** rendering with **preview mode** support ([See RFC](https://github.com/zeit/next.js/issues/9524) - [See blog post](https://nextjs.org/blog/next-9-3))
- React hooks over HOC (functional components over classes)
- **Testing** advanced support
  - TS-friendly (thanks to [ts-jest](https://github.com/kulshekhar/ts-jest))
  - End-to-end (E2E) automated tests (thanks to [Cypress](https://www.cypress.io/) and Github Actions)
  - Other tests, such as unit tests, etc. (thanks to [Jest](https://jestjs.io/), [Jest extended](https://github.com/jest-community/jest-extended))
- Powerful **CSS-in-JS** styles, SSR & CSR friendly, JSX-friendly, styled-component friendly (thanks to [Emotion](https://github.com/emotion-js/emotion))
- **Font** support<sup>2</sup> (SSR/CSR friendly, no FOUT effect) (thanks to [WebFontLoader](https://github.com/typekit/webfontloader))
- **Integrated CI/CD pipeline**, automated deployments to preview domains and production domains (thanks to the [Zeit](https://zeit.co/), [GitHub Actions](https://github.com/features/actions))
  - Including a dedicated "per-deployment domain", for fast feedback loop and testing means, in an online environment (staging)
  - Including a dedicated "per-branch domain", for fast feedback loop and testing means, in an online environment with a url which is automatically updated as new pushed commits are being deployed (staging)
- Built-in **utilities**
  - Convert SVG to TSX components (thanks to [SVGR](https://github.com/gregberge/svgr))
  - Font Awesome icons as react components, with SSR support (thanks to [Font Awesome](https://github.com/FortAwesome/react-fontawesome))
  - Bootstrap support (thanks to [Reactstrap](https://reactstrap.github.io/))
  - Node debug mode for the server side (only built-in on WebStorm)
  - NPM security audit (script)
  - NPM developer-friendly outdated packages (script)
  - Display warning on outdated browsers<sup>2</sup>, works even if bundle isn't ES5 compatible (IE11, etc.)
  - Proper handling of sensitive information _(i.e: token)_ using non-tracked `.env.build` file locally and [Zeit secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets) online
- Fully documented usage of all the [project's dependencies](./reference/dependencies)
- Jekyll site for [online documentation using Github Pages](https://help.github.com/en/github/working-with-github-pages/about-github-pages-and-jekyll)
  - Check out [`jekyll-auth` plugin](https://github.com/benbalter/jekyll-auth) if you need to release a non-public version
  - We use [`just-the-docs` Jekyll theme](https://github.com/pmarsceill/just-the-docs)

<div class="code-example" markdown="1">
- _<sup>1</sup>: Note that your own code should support **universal rendering**, to re-use code as much as possible between frontend and backend (beware libraries you rely on, as they may not be universal)_
- _<sup>2</sup>: I have reasonable doubts regarding how optimised the current implementation is (SEO, First Contentful Paint), and I'd love a community feedback on this!_
</div>

---

### Opt-in features (only some variants have those built-in):

> Note that the default variant ([`master`](https://github.com/UnlyEd/next-right-now) branch) have all those features built-in.

- **B2B multiple single-tenants (MST)**
  - Supports configuration, deployment, testing, monitoring of multiple customers through the same project (identical code base, monorepo design)
  - Most projects do not need such capability, it's useful for B2B businesses with large/key customer accounts who want to replicate the underlying infrastructure per-customer
    - To keep things simple, our built-in configuration is a MT/MST hybrid, with only one database for all tenants, but one server per tenant _(it's fairly easy to make it full MST though, as it's just a matter to which API endpoint you'd use)_
- **GraphQL** support (thanks to [Apollo](https://github.com/apollographql/apollo-client))
  - **GraphCMS** advanced support, which hosts our GraphQL API (server) and database, fully hosted (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
  - **GraphQL schema** available in the developer environment (thanks to [GraphQL Config](https://github.com/kamilkisiela/graphql-config))
- **Internationalisation** (i18n) advanced support (SSR + CSR friendly) (thanks to [react-i18next](https://react.i18next.com/))
  - I18n of the database (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
      - [Automated fallback language, through HTTP headers](https://graphcms.com/features/content-localization/?ref=unly-nrn)
  - I18n of the project (thanks to [Locize<sup>3</sup>](https://locize.com/?lng=en))
      - [Automated fallback language](https://www.i18next.com/principles/fallback)
      - [In-context editor](https://docs.locize.com/more/incontext-editor)
      - Auto-add i18n keys with default translation when working locally
- Strong **observability** of the system (monitoring) and push-notification on your own messaging channel (i.e: Slack) when things go wrong (thanks to [Sentry<sup>1</sup>](https://sentry.io/))
- Fine-grained frontend **analytics**, react-friendly, flexible, SPA-friendly (thanks to [Amplitude<sup>1</sup>**<sup>2</sup>**](https://amplitude.com/))
- [_WIP - Contributions welcomed!_] [**Next Right Now Admin**](https://github.com/UnlyEd/next-right-now-admin), **a backoffice/admin site to manage your GraphQL API content**, based on [react-admin](https://github.com/marmelab/react-admin), forked from NRN itself!
    _[V2](https://github.com/UnlyEd/next-right-now-admin/projects) aims at making it multi-tenants compliant_

<div class="code-example" markdown="1">
- `advanced support`: Means that we took a very special care to support this, and that it's not as simple as one may believe
- <sup>1</sup>: Third parties that provide a free plan that is enough for a "simple" application, but make sure to check that their pricing fits you.
- **<sup>2</sup>**: Beware huge gap between free and paid plans cost.
- **<sup>3</sup>**: Does not provide a free plan, but only a free trial.
</div>

<div class="fs-8" markdown="1" style="text-align: center">
[Get me started!](./getting-started){: .btn .btn-purple }
</div>

---

## Want more?

- Having questions? Check out the [FAQ](./faq)! Open a github issue if you don't find your answer.
- Check out our [roadmap](./roadmap) to see what we plan to release next!
- Check out our [terminology](./reference/terminology) to make sure you understand correctly all acronyms used :wink:
