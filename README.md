<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now/test_coverage)
[![Locize Latest version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27latest%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=latest:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)
[![Locize Production version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27production%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=production:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)

Next Right Now
===

# Introduction to NRN

<div class="code-example" markdown="1">
Next Right Now (NRN) is meant to be used as a **boilerplate** for quick getting started with a **production-grade** project featuring the **Next.js framework**, hosted on **Zeit** platform.

NRN is maintained with several purposes in mind:
- To be **flexible** and allow for huge **customisation**.
- To be used as a **boilerplate** to quickly deploy a **new** project.
    - It has been used to build production-grade websites within 2h time during a French COVID-19 hackathon (March 2020)
    - It has been used to build [NRN Admin](https://github.com/UnlyEd/next-right-now-admin)
- To be used as a **educational** resource, meant to be used as a **learning/teaching** resource.
- Provide various boilerplate [variants](https://unlyed.github.io/next-right-now/concepts/variants), to get started with the variant that matches the closest your needs _(opt-in utilities and 3rd parties)_.

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
Therefore, you probably want to get an overview of all the [available variants](https://unlyed.github.io/next-right-now/getting-started/available-variants) to decide which one best fit your needs.

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
- [Fully documented usage of all the project's nodejs dependencies](./reference/dependencies)

<div class="code-example" markdown="1">
- _<sup>1</sup>: Note that your own code should support **universal rendering**, to re-use code as much as possible between frontend and backend (beware libraries you rely on, as they may not be universal)_
- _<sup>2</sup>: I have reasonable doubts regarding how optimised the current implementation is (SEO, First Contentful Paint), and I'd love a community feedback on this!_
</div>

---

### Opt-in features (only some variants have those built-in):
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

<!-- toc -->

- [Overview of Next Right Now](#overview-of-next-right-now)
  * [Introduction videos](#introduction-videos)
    + [Part 1 - Overview of Next Right Now (15 minutes)](#part-1---overview-of-next-right-now-15-minutes)
    + [Part 2 - Developer Experience with Next Right Now (15 minutes)](#part-2---developer-experience-with-next-right-now-15-minutes)
    + [Guides](#guides)
  * [Showcases - Live demo](#showcases---live-demo)
- [Documentation](#documentation)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [Vulnerability disclosure](#vulnerability-disclosure)
- [Contributors and maintainers](#contributors-and-maintainers)
- [**[ABOUT UNLY]**](#about-unly-)

<!-- tocstop -->

---

# Overview of Next Right Now

> Below are explanations about how NRN works and why we did things the way we did
>
> **Tip**: If you're interested about how to use this project for your own need, see our ["How to use" Guide](./README_HOW_TO_USE.md) instead!

## Introduction videos

### Part 1 - Overview of Next Right Now (15 minutes)
[![Part 1 - Overview of Next Right Now](https://img.youtube.com/vi/kltkFwnFL-k/maxresdefault.jpg)](http://youtu.be/kltkFwnFL-k?hd=1)

> Let's talk about why we built RNR in the first place, how it's meant to be used, whom it is for.
>
> This video features Zeit deployments, i18n, GraphCMS, Locize in-context editor, Sentry monitoring, Amplitude analytics, CI/CD Github Actions

### Part 2 - Developer Experience with Next Right Now (15 minutes)
[![Part 2 - Developer Experience with Next Right Now](https://img.youtube.com/vi/fGlgIEeUqFg/maxresdefault.jpg)](http://youtu.be/fGlgIEeUqFg?hd=1)

> Let's talk about the developer experience (DX) provided by NRN and how it helps being more efficient.
>
> This video features GraphQL auto-completion and local schema update, deployment workflow, CI/CD Github Actions explanations, interactive E2E testing, GraphsCMS field creation

### Guides
- [How to run NRN in debug mode using WebStorm debug configuration](http://youtu.be/3vbkiRAT4e8?hd=1) (2 minutes)

---

## Showcases - Live demo

You can see 2 almost identical demo at:
- [https://nrn-customer1.now.sh](https://nrn-customer1.now.sh)
- [https://nrn-customer2.now.sh](https://nrn-customer2.now.sh)

**Both share the same source code and configuration**, but the database content is different (hosted on GraphCMS).

> **Tip**: You can get metadata at [/api/status](https://nrn-customer1.now.sh/api/status)
>
> **Tip**: All `/api/*` are serverless functions, running under AWS Lambda

---

# Documentation

> **Note**: Our docs are [being improved](https://github.com/UnlyEd/next-right-now/issues/20) and the dedicated github site isn't ready yet.
>
> Check the [doc-v0](https://github.com/UnlyEd/next-right-now/tree/doc-v0) for the time being, while the transition to github site is in progress (they're up-to-date!)

~~[Go to our Documentation](https://unlyed.github.io/next-right-now/).~~ (**WIP**)

---

# FAQ

> Q: I wanted to understand how the i18next integration works. How is the `i18nextInstance` passed to react? It seems to be passed to the `Layout` component, but the `Layout` component never uses it. So how does this work?

- The i18nextInstance isn't necessary to perform translations actually, it's forwarded as a utility.
- Manipulating the i18nextInstance is not often necessary, using import { Trans, useTranslation } from 'react-i18next'; is what you'll need most of the time when translating content.
- See [`Layout.tsx`](https://github.com/UnlyEd/next-right-now/blob/eb509517199e91a0b1cc646848654c257ca30666/src/components/Layout.tsx#L416), that's where the Layout component passes down to the react tree the `i18nextInstance` defined in [`_app.tsx`](https://github.com/UnlyEd/next-right-now/blob/8cdebadea0a03b6f60709bc1ad673f90bdd4becb/src/pages/_app.tsx#L172)
- The `i18next` library is actually initiated in [i18nextLocize.ts](https://github.com/UnlyEd/next-right-now/blob/3458fa30aecd0dc95ebd2abfeb20c2e45c76a09f/src/utils/i18nextLocize.ts)

---

# Contributing

[GO TO CONTRIBUTING](https://unlyed.github.io/next-right-now/CONTRIBUTING)

---

# License

[MIT](LICENSE)

---

# Vulnerability disclosure

[See our policy](https://github.com/UnlyEd/Unly).

---

# Contributors and maintainers

This project is being maintained by:
- [Unly] Ambroise Dhenain ([Vadorequest](https://github.com/vadorequest)) **(active)**

Special thanks to:
- [Contributor] Hugo Martin ([Demmonius](https://github.com/Demmonius)) - Github Actions CI/CD pipeline

---

# **[ABOUT UNLY]** <a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" height="40" align="right" alt="Unly logo" title="Unly logo" /></a>

> [Unly](https://unly.org) is a socially responsible company, fighting inequality and facilitating access to higher education.
> Unly is committed to making education more inclusive, through responsible funding for students.

We provide technological solutions to help students find the necessary funding for their studies.

We proudly participate in many TechForGood initiatives. To support and learn more about our actions to make education accessible, visit :
- https://twitter.com/UnlyEd
- https://www.facebook.com/UnlyEd/
- https://www.linkedin.com/company/unly
- [Interested to work with us?](https://jobs.zenploy.io/unly/about)

Tech tips and tricks from our CTO on our [Medium page](https://medium.com/unly-org/tech/home)!

#TECHFORGOOD #EDUCATIONFORALL
