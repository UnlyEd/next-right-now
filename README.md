<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now/test_coverage)
[![Locize Latest version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27latest%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=latest:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)
[![Locize Production version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27production%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=production:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)

Next Right Now
===

> Next Right Now (NRN) is meant to be used as a boilerplate for quick getting started with a production-grade project featuring the Next.js framework, hosted on Zeit platform.
>
> NRN is strongly opinionated, but also very flexible.
> It can also be used as a learning/teaching resource.
>
> A lot of built-in components and utilities are available out of the box. Keep those you like, throw what you dislike, rewrite what doesn't exactly fit your needs, and share what could be useful to others! ;)
>
> Don't hesitate to share your opinion and propose improvements

# Overview

This boilerplate is meant for developers with solid React background, who are looking for a way of building **production-grade web applications**.
We took a very special care about the **Developer Experience**, because it's very important to build quality software.

Knowing Next.js, Zeit and/or GraphQL will be **a huge help**.
We explain how to install them and properly setup them, but **it's your job to go deeper and actually learn how they work**.

This boilerplate includes must-have built-ins such as **i18n, GraphQL, Next.js, TypeScript, monitoring, CI/CD pipeline (dev > staging > production), unit tests, end-to-end tests, analytics and various utilities**.

There are a lot of things, and some of them rely on third-party providers.
There are so many tools out there and we've chosen them based on our personal opinion (and experience/experiments), while keeping in mind that **you may have a different opinion**, and may want to use something else.

Thus, **you can still use this boilerplate even if you don't like all our choices**, because you can simply [get rid of what you dislike](README_HOW_TO_REMOVE.md).

# Benefits

- **B2B multi-tenants** (AKA **"monorepo"**) first-class support (optional, **advanced use-case**)
  - Supports configuration, deployment, testing, monitoring of multiple customers through the same project (identical code base, monorepo design)
  - This is a very special consideration, and required quite a lot of efforts to make it works smoothly
    - With multi-tenants setup, we don't use the native **Zeit <> Github integration**, but our **custom Zeit <> Github Actions integration** instead ([.github](.github))
  - Most projects do not need such capability, but we build our own projects with such requirement in mind, and thus released NRN with such built-in capability
  - **It's very easy not to use it** if you don't need to, but it'll be a huge time saver for you if you need it!
- Built-in **stages** (development, staging, production) workflow
- **TypeScript** first-class support
- **GraphQL** support (thanks to [Apollo](https://github.com/apollographql/apollo-client), and others)
  - **GraphCMS** first-class support, which hosts our GraphQL API (server) and database, fully hosted (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
  - **GraphQL schema** available in the developer environment (thanks to [GraphQL Config](https://github.com/kamilkisiela/graphql-config))
- **SSR** and **CSR** capabilities (thanks to the [Next.js framework](https://nextjs.org/))
- React hooks over HOC (functional components over classes)
- **Internationalisation** (i18n) first-class support (SSR + CSR friendly) (thanks to [react-i18next](https://react.i18next.com/))
  - I18n of the database (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
      - [Automated fallback language, through HTTP headers](https://graphcms.com/features/content-localization/?ref=unly-nrn)
  - I18n of the project (thanks to [Locize<sup>1</sup>](https://locize.com/?lng=en))
      - [Automated fallback language](https://www.i18next.com/principles/fallback)
      - [In-context editor](https://docs.locize.com/more/incontext-editor)
      - Auto-add i18n keys with default translation when working locally
- **Testing** first-class support
  - TS-friendly (thanks to [ts-jest](https://github.com/kulshekhar/ts-jest))
  - End-to-end (E2E) tests (thanks to [Cypress](https://www.cypress.io/))
  - Other tests, such as unit tests, etc. (thanks to [Jest](https://jestjs.io/), [Jest extended](https://github.com/jest-community/jest-extended))
- Strong **observability** of the system (monitoring) and push-notification on your own messaging channel (i.e: Slack) when things go wrong (thanks to [Sentry<sup>1</sup>](https://sentry.io/))
- **Universal JS**, to re-use code as much as possible between frontend and backend (i.e: universal cookies API)
- Powerful **CSS-in-JS** styles, SSR & CSR friendly, JSX-friendly, styled-component friendly (thanks to [Emotion](https://github.com/emotion-js/emotion))
- **Font** first-class support (SSR/CSR friendly, no FOUT effect) (thanks to [WebFontLoader](https://github.com/typekit/webfontloader))
- Fine-grained frontend **analytics**, react-friendly, flexible, SPA-friendly (thanks to [Amplitude<sup>1</sup>**<sup>2</sup>**](https://amplitude.com/))
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
  - Display warning on outdated browsers, works even if bundle isn't ES5 compatible (IE11, etc.)
  - Use Zeit secrets for sensitive information
- [Fully documented usage of all our third party NPM libraries (AKA dependencies)](./README_DEPENDENCIES.md)
- [_WIP - Contributions welcomed!_] [**Next Right Now Admin**](https://github.com/UnlyEd/next-right-now-admin), **a backoffice/admin site to manage your GraphQL API content**, based on [react-admin](https://github.com/marmelab/react-admin), forked from NRN itself!
    _[V2](https://github.com/UnlyEd/next-right-now-admin/projects) aims at making it multi-tenants compliant_

**Legend:**
- `first-class support`: Means that we took a very special care to support this, and that it's not as simple as one may believe
- <sup>1</sup>: Third parties that provide a free plan that is enough for a "simple" application, but make sure to check that their pricing fits you.
- **<sup>2</sup>**: Beware huge gap between free and paid plans cost.

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

# License

MIT

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
