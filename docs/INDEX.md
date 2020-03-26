<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now/test_coverage)
[![Locize Latest version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27latest%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=latest:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)
[![Locize Production version](https://img.shields.io/badge/dynamic/json.svg?style=plastic&color=2096F3&label=locize&query=%24.versions%5B%27production%27%5D.translatedPercentage&url=https://api.locize.app/badgedata/658fc999-dfa8-4307-b9d7-b4870ad5b968&suffix=%+translated&link=https://www.locize.com&prefix=production:+)](https://www.locize.app/p/w7jrmdie/statistics/badges)

> Documentation in progress - See [on-progress issue](https://github.com/UnlyEd/next-right-now/issues/20)
> Don't hesitate to contribute! :)
>
> Go to the [`doc-v0` documentation branch](https://github.com/UnlyEd/next-right-now/tree/doc-v0) to see the old (but up-to-date) documentation


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



