---
layout: default
title: Dependencies
parent: Reference
nav_order: 60
---
Dependencies
===

> Documentation about the project's dependencies

<!-- toc -->

- [Dependencies](#dependencies)
  * [Amplitude](#amplitude)
    + [A note about Amplitude's pricing](#a-note-about-amplitudes-pricing)
  * [Emotion](#emotion)
    + [Note about `/** @jsx jsx */`](#note-about--jsx-jsx-)
  * [FortAwesome/FontAwesome](#fortawesomefontawesome)
    + [Note about FontAwesome usage](#note-about-fontawesome-usage)
  * [Sentry](#sentry)
    + [A note about Sentry usage](#a-note-about-sentry-usage)
  * [Unly packages](#unly-packages)
  * [Apollo with react](#apollo-with-react)
  * [Bootstrap](#bootstrap)
    + [Notes about Bootstrap/Reactstrap usage](#notes-about-bootstrapreactstrap-usage)
      - [Notes about Reactstrap Tooltips and Modal (SSR-not-friendly)](#notes-about-reactstrap-tooltips-and-modal-ssr-not-friendly)
  * [classnames](#classnames)
  * [Cookies](#cookies)
    + [Why not using `universal-cookie`?](#why-not-using-universal-cookie)
    + [Cookies management abstraction `UniversalCookiesManager`](#cookies-management-abstraction-universalcookiesmanager)
  * [css-to-react-native](#css-to-react-native)
  * [deepmerge](#deepmerge)
  * [GraphQL](#graphql)
  * [I18n, i18next and Locize](#i18n-i18next-and-locize)
    + [Language detection](#language-detection)
    + [Translation](#translation)
  * [isomorphic-unfetch](#isomorphic-unfetch)
  * [json-stringify-safe](#json-stringify-safe)
  * [Lodash](#lodash)
    + [Note about Lodash TS typings](#note-about-lodash-ts-typings)
  * [Next](#next)
  * [rc-tooltip](#rc-tooltip)
  * [React](#react)
  * [recompose](#recompose)
  * [webfontloader](#webfontloader)
  * [winston](#winston)
- [Dev dependencies](#dev-dependencies)
  * [@types](#types)
  * [Now & Zeit](#now--zeit)
  * [Debug WebStorm](#debug-webstorm)
  * [Eslint](#eslint)
  * [Tests](#tests)
    + [Jest](#jest)
    + [Cypress](#cypress)
  * [Documentation](#documentation)

<!-- tocstop -->

---

# Dependencies

> Overview of the project deps, why we use them, and (not always) quick explanations about them

All the packages listed here are under open source, non-restrictive license (MIT, ISC, etc.)

_The order follows the order in `package.json` (kinda alphabetical but not quite exactly `¯\_(ツ)_/¯`)_

## Amplitude

> A JavaScript SDK for tracking events and revenue to Amplitude.

When your want to perform Analytics in any app, people usually go for Google Analytics. We don't.
GA is too limited, and huge, with tons of useless stuff. We've used it, and we really don't recommend it for any SPA, especially when playing with universal app because it just sucks.

> It's very hard to configure GA with universal apps, you'll end up with wrong analytics insights due to event multi triggers (SSR + CSR). It was built for another world. Not for SPA!

Instead, we use (and recommend) Amplitude instead. The world of analytics is huge, and isn't cheap.

- [`amplitude-js`](https://www.npmjs.com/package/amplitude-js): Top-level amplitude official lib, used by react-amplitude.
- [`@amplitude/react-amplitude`](https://www.npmjs.com/package/react-amplitude): React-friendly amplitude lib, non-officially maintained. Really useful when working with react.

Amplitude allows to track events and users behaviour, who are two very different things, even if events are related to users.

### A note about Amplitude's pricing

Amplitude [offers a free plan](https://amplitude.com/pricing) that allows 10 million events per months (`$identity` events aren't counted towards `events`, they're free).

Then, the cheapest plan is `Growth`, that **starts around $48k/year** (yup, it's a **huge** gap)

If you want to benefit from the **Growth plan for free**, know that it's possible (but limited to 1 years), through their [startup Scholarship](https://amplitude.com/startups).
**They offer Scholarship for non-profit organisation too.**

> But, a word of caution here, even if you benefit from the scholarship, make sure your business doesn't rely on Growth features when your Scholarship ends.
>
> They told us then always find a way to provide Amplitude at an acceptable price for non-profit

Anyway, Amplitude is [one of the best out there for Analytics](https://stackshare.io/amplitude), if the free plan is enough for your needs, or if you can afford paid plans.
Also, their react integration is really good, even though it's not officially maintained and could use some love.

---

## Emotion

> Emotion is a library designed for writing css styles with JavaScript. [https://emotion.sh/docs/introduction](https://emotion.sh/docs/introduction)

Next.js provides CSS-in-js using [`styled-jsx`](https://github.com/zeit/styled-jsx), but we dislike it for several reasons.
It's not very intuitive to write styles that way and it needs extra dependencies/configuration to work with nested components and such.

Instead, we use [Emotion](https://emotion.sh/docs/introduction) in this project,
which allows to write components using either the `styled` notation, or the `css` notation.

- [`@emotion/core`](https://emotion.sh/docs/css-prop): Necessary to use emotion, with built-in `css` notation support.
- [`@emotion/styled`](https://emotion.sh/docs/styled): Necessary to used the `styled` notation.
- [`emotion-theming`](https://www.npmjs.com/package/emotion-theming): Theming library inspired by styled-components

It's strongly recommended to read the official documentation about how to use it.

### Note about `/** @jsx jsx */`

When using Emotion, the file must start with `/** @jsx jsx */` on top of it.
- [Explanation](https://stackoverflow.com/questions/53803466/what-does-the-comment-jsx-jsx-do-in-the-emotion-css-in-js-library)
- [Official doc](https://emotion.sh/docs/css-prop#jsx-pragma)

> **TL;DR** _It basically tells the babel compiler to do something different and won't work if not specified._

---

## FortAwesome/FontAwesome

[FontAwesome](https://github.com/FortAwesome/Font-Awesome) is an awesome icon toolkit.

We use the pro (paid) version, but a free version is also available.

- [`@fortawesome/fontawesome-svg-core`](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core): Necessary to use font-awesome with a node project. Contains libs to config the FA library. (see `src/pages/_app.tsx`)
- [`@fortawesome/pro-light-svg-icons`](https://www.npmjs.com/package/@fortawesome/pro-light-svg-icons): Contains the icons themselves, there is one package per free/pro and kind of icon (light, regular, solid), and specific packages per technology stack (vue, angular, react-native, etc.)
- [`@fortawesome/react-fontawesome`](https://www.npmjs.com/package/@fortawesome/react-fontawesome): Contains the icons themselves

### Note about FontAwesome usage

FontAwesome is a little trickier to use that we would like to.

For any icon you want to use, you must first load it through the [`src/pages/_app.tsx`](src/pages/_app.tsx) file and then load it in the FA library, as follow:

```typescript jsx
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub);
```

> This operation is required in order to make the FA icon load properly on the server side

Then, you can use those icons in any react component:

```typescript jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Inside a react component
<FontAwesomeIcon icon={['fab', 'github']} />
```

---

## Sentry

> Sentry provides open-source and hosted error monitoring that helps all software teams discover, triage, and prioritize errors in real-time.

We use Sentry to catch errors that happen within the application.
They are available at [https://sentry.io/](https://sentry.io/) for any developers in the team.

Those errors are also sent to our Slack channel `sentry-monitoring`.

- [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser): Package to use from the browser.
- [`@sentry/node`](https://www.npmjs.com/package/@sentry/node): Package to use from the server.

Sentry provides 2 different packages, with different abilities (but a very similar API) for browser and server usage.

### A note about Sentry usage

In the source code, we always use `@sentry/node`, which is automatically converted at build step by babel. (see [next.config.js](next.config.js))

This way, we always use the same import, which is linked to the right package based on the runtime engine target.

---

## Unly packages

We use some of our own packages. They are all hosted on ou [GitHub repository](https://github.com/UnlyEd), and all under MIT license.

- [`@unly/utils`](https://github.com/UnlyEd/utils): This is a utility library which contains various helpers. This repository was created because those helpers are used amongst several projects and were copy/pasted, which is a bad practice.
- [`@unly/utils-simple-logger`](https://github.com/UnlyEd/utils-simple-logger): Logger based on [Winston](https://github.com/winstonjs/winston) with sane default so that it only logs `error` in production and filter other logs, while keeping them all in non-production environments.
    Basically avoids to increase cost by logging useless logs in production.
- [`@unly/universal-language-detector`](https://github.com/UnlyEd/universal-language-detector): Language detector that works universally (browser + server) - Meant to be used with a universal framework, such as Next.js

---

## [Apollo with react](https://github.com/apollographql/react-apollo)

> React Apollo allows you to fetch data from your GraphQL server and use it in building complex and reactive UIs using the React framework. React Apollo may be used in any context that React may be used.

- [`apollo-boost`](https://www.npmjs.com/package/apollo-boost): Apollo Boost is a zero-config way to start using Apollo Client. It includes some sensible defaults, such as our recommended InMemoryCache and HttpLink, which come configured for you with our recommended settings.
    Even though it may seems unused, this package is required as peer-dependency.
- [`apollo-cache-inmemory`](https://www.npmjs.com/package/apollo-cache-inmemory): apollo-cache-inmemory is the recommended cache implementation for Apollo Client 2.0. InMemoryCache is a normalized data store that supports all of Apollo Client 1.0's features without the dependency on Redux.
- [`apollo-client`](https://www.npmjs.com/package/apollo-client): Apollo Client is a fully-featured caching GraphQL client with integrations for React, Angular, and more. It allows you to easily build UI components that fetch data via GraphQL.
- [`apollo-link-http`](https://www.npmjs.com/package/apollo-link-http): The http link is a terminating link that fetches GraphQL results from a GraphQL endpoint over an http connection.
- [`react-apollo`](https://www.npmjs.com/package/react-apollo): React Apollo allows you to fetch data from your GraphQL server and use it in building complex and reactive UIs using the React framework. React Apollo may be used in any context that React may be used. In the browser, in React Native, or in Node.js when you want to do server-side rendering.

Our implementation is based on [this example](https://github.com/tomanagle/GraphQL-Apollo-Next.js) and uses the [`react hooks`](https://reactjs.org/docs/hooks-intro.html) recent feature.

> It works fine with both SSR and client-side navigation.
>
> A universal [HOC](https://reactjs.org/docs/higher-order-components.html) is used to fetch data from our GraphQL endpoint: [withUniversalGraphQLDataLoader](src/hoc/withUniversalGraphQLDataLoader.ts). (both from browser and SSR)
>
> We don't use any authentication, as we connect to our GraphCMS Cache instance, which doesn't require any.
>
> We provide some headers on-the-fly (for I18n), that are added per-query basis.

---

## [Bootstrap](https://getbootstrap.com/) & [Reactstrap](https://reactstrap.github.io/)

> We use Reactstrap as a Components library, which is itself based on Bootstrap.

- [`bootstrap`](https://www.npmjs.com/package/bootstrap): Necessary to load bootstrap.css file, which provides the styles
- [`reactstrap`](https://www.npmjs.com/package/reactstrap):
- [`@zeit/next-css`](https://github.com/zeit/next-plugins/tree/master/packages/next-css): [Additional Next configuration](https://stackoverflow.com/a/50002905/2391795) necessary to gain the ability to `import` `.css` files.

### Notes about Bootstrap/Reactstrap usage

> We are not quite satisfied with Reactstrap, to be honest. But we haven't found a better alternative so far (mostly because we're used to bootstrap, and lack of time for R&D).
>
> It does the job, but we dislike it more and more.

Alternatives to Bootstrap/Reactstrap may be:
- [https://bulma.io/](https://bulma.io/) - 38k github stars
- [https://github.com/tailwindcss/tailwindcss](https://github.com/tailwindcss/tailwindcss) - 20k github stars

Both look like promising CSS frameworks, there is likely more of them out there, but that's our top 2 in early 2020.

#### Notes about Reactstrap Tooltips and Modal (SSR-not-friendly)

We strongly suggest using another lib for Tooltips such as `rc-tooltip`.

**Known issues**:
- [Using `Modal` or `Tooltip` with `isOpen={true}`](https://github.com/reactstrap/reactstrap/issues/1071) crashes the application completely, because SSR compilation fails due to missing `document`.

---

## classnames

> `classnames` is just the must-have tool to use to manipulate dynamic className property

- [`classnames`](https://www.npmjs.com/package/classnames): A simple JavaScript utility for conditionally joining classNames together.

---

## Cookies

> It's hard (or at least, non-trivial) to make cookies work universally with Next.js

- [`js-cookie`](https://github.com/js-cookie/js-cookie): Used to **WRITE** cookies from the **client** side. A simple, lightweight JavaScript API for handling browser cookies
- [`cookies`](https://www.npmjs.com/package/cookies): Used to **WRITE** cookies from the **server** side. Cookies is a node.js module for getting and setting HTTP(S) cookies. Cookies can be signed to prevent tampering, using Keygrip. It can be used with the built-in node.js HTTP library, or as Connect/Express middleware.
    I'm not sure if that lib is the best choice, but it did work back then. Other alternative may be https://github.com/maticzav/nookies
- [`next-cookies`](https://www.npmjs.com/package/next-cookies): Used to **READ** cookies universally (cannot write). Tiny little function for getting cookies on both client & server with next.js.
    This enables easy client-side and server-side rendering of pages that depend on cookies.

A `cookies` prop is available to all **Page** and **Layout** components (through the `_app.tsx:render()`).

### Why not using `universal-cookie`?

[`universal-cookie`](https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie) looks promising and if you know about it,
you may ask yourself why we don't use it instead of one package for the client side, and another one for the server side.

Well, the answer is straightforward: **It does not work**.
See [https://github.com/reactivestack/cookies/issues/256](https://github.com/reactivestack/cookies/issues/256)

### Cookies management abstraction `UniversalCookiesManager`

We've built our own `UniversalCookiesManager` utility class to deal with cookies in a universal way (same API on client/server sides).

It basically hides away the complexity, and allows for source code reusability.

---

## css-to-react-native

> Converts CSS text to a React Native stylesheet object.
>
> Converts all number-like values to numbers, and string-like to strings.
>
> Automatically converts indirect values to their React Native equivalents.

- [`css-to-react-native`](https://www.npmjs.com/package/css-to-react-native):

Used to dynamically convert CSS to React style object, for CSS rules coming from a data source (such as GraphCMS).

Currently used by [GraphCMSAsset.tsx](src/components/GraphCMSAsset.tsx)

---

## deepmerge

> Merges the enumerable properties of two or more objects deeply.

- [`deepmerge`](https://www.npmjs.com/package/deepmerge):

Used in many places to merge different objects together.
Handles deeply nested objects.

---

## GraphQL

- [`graphql`](https://www.npmjs.com/package/graphql): Client for connecting to a GraphQL endpoint.
- [`graphql-tag`](https://www.npmjs.com/package/graphql-tag): Helpful utilities for parsing GraphQL queries.
    Useful to write plain-text GraphQL query using the `gql` tag, that can be validated by other tools, such as **JS GraphQL IntelliJ Plugin**.
- [JS GraphQL IntelliJ Plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin): GraphQL language support for WebStorm, IntelliJ IDEA and other IDEs based on the IntelliJ Platform.
    The plugin is available using WebStorm directly. To install it, open your IDE "Settings", "Plugins", "Marketplace" and search for "GraphQL".
    But, it should be automatically made available by default. (through shared IDE config)

The usage of both `gql` and the IntelliJ GraphQL plugin is awesome, it allows to write GraphQL queries (see [gql folder](./src/gql)) and have auto-completion and validation from WebStorm itself.

To refresh the GraphQL spec, just run the `.graphqlconfig` file by opening it and run the stage you want to sync (usually staging).

---

## I18n, i18next and Locize

### Language detection
We rely on a few packages for I18n:
- [`accept-language-parser`](https://www.npmjs.com/package/accept-language-parser): Parses the accept-language header from an HTTP request and produces an array of language objects sorted by quality.

Together, those packages are used in [i18n.ts](src/utils/i18n.ts) and are used to resolve the languages/codes used/preferred by the end user.
We do it manually instead of relying on another lib that would detect the language for us, because we need to be consistent with the language displayed to the end user, and need to provide the exact same value to GraphCMS and Locize.

### Translation
We also rely on those packages to manage the translations:
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

> See [i18nextLocize.ts](./src/utils/i18nextLocize.ts) to see how it was all put together.
> Also, we were inspired by [this SO question](https://stackoverflow.com/questions/55994799/how-to-integrate-next-i18next-nextjs-locize/58782594).

---

## isomorphic-unfetch

> Can be used to either polyfill the whole app, or used as a `fetch` function. _(Stands for "isomorphic universal fetch")_

- [`isomorphic-unfetch`](https://www.npmjs.com/package/isomorphic-unfetch): Switches between unfetch & node-fetch for client & server.

There are several libs to allow fetching data from a react app, [here is a comparison](https://www.npmtrends.com/isomorphic-fetch-vs-isomorphic-unfetch-vs-universal-fetch).

The main reason for choosing this one is its very small bundle size, and it's universal.

---

## json-stringify-safe

> Used to safely stringify JSON objects. Works even when they have circular dependencies

- [`json-stringify-safe`](https://www.npmjs.com/package/json-stringify-safe): Like JSON.stringify, but doesn't throw on circular references.

Use at your convenience. We weren't sure whether to use `json-stringify-safe` or `safe-json-stringify` and we made a wild choice here.

---

## [Lodash](https://lodash.com/docs/4.17.15)

> A modern JavaScript utility library delivering modularity, performance & extras.

We made the choice to import lodash packages one-by-one instead of loading the whole `lodash` lib directly.
We're not sure if it's better/easier/wiser. We suppose it should decrease the bundle size, _but maybe it's natively handled by tree-shacking?_

- [`lodash.get`](https://www.npmjs.com/package/lodash.get): [https://lodash.com/docs/4.17.15#get](https://lodash.com/docs/4.17.15#get)
- [`lodash.isempty`](https://www.npmjs.com/package/lodash.isempty): [https://lodash.com/docs/4.17.15#isEmpty](https://lodash.com/docs/4.17.15#isEmpty)
- [`lodash.isplainobject`](https://www.npmjs.com/package/lodash.isplainobject): [https://lodash.com/docs/4.17.15#isPlainObject](https://lodash.com/docs/4.17.15#isPlainObject)
- [`lodash.map`](https://www.npmjs.com/package/lodash.map): [https://lodash.com/docs/4.17.15#map](https://lodash.com/docs/4.17.15#map)
... And tons of other

We use plenty of utilities from lodash. Make sure read their [documentation](https://lodash.com/docs/).

### Note about Lodash TS typings

We also load each TS types one-by-one. One advantage of that is that **we can decide not to load typings that do not work**.

> For instance, we tried using `@types/lodash.filter` but eventually removed it because it creates a mess that is hard to deal with.
> Typings may be wrong and breaks our tests, in such case it's nice to have the flexibility not to use them.



---

## Next

> Next.js framework package and plugins/utilities.

- [`next`](https://www.npmjs.com/package/next): Next.js framework package.
    See [tutorial](https://nextjs.org/learn/basics/getting-started).
- [`next-cookies`](https://www.npmjs.com/package/next-cookies): See [Cookies](#cookies)
- [`next-with-apollo`](https://www.npmjs.com/package/next-with-apollo): Apollo HOC for Next.js


---

## rc-tooltip

> React Tooltip component

- [`rc-tooltip`](https://www.npmjs.com/package/rc-tooltip): React tooltip

Marked as alpha-3 version but stable. **Much better than Reactstrap Tooltip component.**

---

## React

> React package and plugins/utilities.

- [`react`](https://www.npmjs.com/package/react): React is a JavaScript library for creating user interfaces.
- [`react-apollo`](https://www.npmjs.com/package/react-apollo): React Apollo allows you to fetch data from your GraphQL server and use it in building complex and reactive UIs using the React framework. React Apollo may be used in any context that React may be used. In the browser, in React Native, or in Node.js when you want to do server-side rendering.
- [`react-dom`](https://www.npmjs.com/package/react-dom): This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.
- [`react-style-proptype`](https://www.npmjs.com/package/react-style-proptype): Validates style objects by ensuring the keys are valid css property names (in camelcase form).
- [`prop-types`](https://www.npmjs.com/package/prop-types): Runtime type checking for React props and similar objects.

> **N.B**: `react` and `react-dom` must always use the same version.

---

## recompose

> Used to compose multiple HOC together

- [`recompose`](https://www.npmjs.com/package/recompose): Recompose is a React utility belt for function components and higher-order components.

---

## webfontloader

> Web Font Loader gives you added control when using linked fonts via @font-face.
>
> It provides a common interface to loading fonts regardless of the source, then adds a standard set of events you may use to control the loading experience.
>
> The Web Font Loader is able to load fonts from Google Fonts, Typekit, Fonts.com, and Fontdeck, as well as self-hosted web fonts.
> It is co-developed by Google and Typekit.

- [`webfontloader`](https://www.npmjs.com/package/webfontloader): A logger for just about everything.

---

## winston

> Peer-dependency of `@unly/utils-simple-logger`

- [`winston`](https://www.npmjs.com/package/winston): A logger for just about everything.


---

# Dev dependencies

## @types

> TypeScript requires Typings to resolve types.
>
> Those packages add additional types that allow TypeScript to resolve the related types, and allow for a better developer experience.
> Also, without some of those types, TS would fail to compile.
>
> Sometimes, TS types are included in the same package as the main package, sometimes in a different package, such as for those below.

- [`@types/jest`](https://www.npmjs.com/package/@types/jest): This package contains type terminology for Jest (https://jestjs.io/).
- [`@types/react`](https://www.npmjs.com/package/@types/react): This package contains type terminology for React (http://facebook.github.io/react/).
- [`@types/webpack-env`](https://www.npmjs.com/package/@types/webpack-env): Allow to use [`__non_webpack_require__` with TypeScript](https://hackernoon.com/building-isomorphic-javascript-packages-1ba1c7e558c5).
- [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): ESLint plugin for TypeScript support .It is important that you use the same version number for `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`.
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser): An ESLint custom parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code.
... lots more

---

> Those dependencies are used only during the development and aren't shipped to the end-user.
>
> They are meant to make the development process easier/faster.

## Now & Zeit

> Official packages from Zeit/Now, the company hosting our application

- [`@now/node`](https://zeit.co/docs/runtimes#official-runtimes/node-js): Used as a dev dependency, it's useful to provide [TypeScript support](https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js-typescript-support:).
    Such as for `import { NowRequest, NowResponse } from '@now/node'`.
- [`now`](https://www.npmjs.com/package/now): The Now CLI [https://github.com/zeit/now](https://github.com/zeit/now) [https://www.npmjs.com/package/now](https://www.npmjs.com/package/now)
- [`@zeit/next-css`](https://github.com/zeit/next-plugins/tree/master/packages/next-css): [Additional Next configuration](https://stackoverflow.com/a/50002905/2391795) necessary to gain the ability to `import` `.css` files.
    Used to import other libs such as `bootstrap.css`.
- [`@zeit/next-source-maps`](https://www.npmjs.com/package/@zeit/next-source-maps): Generate source maps during production build in your Next.js project

## Debug WebStorm

> Packages meant to help with the debug of the application

- [`concurrently`](https://www.npmjs.com/package/concurrently): Run multiple commands concurrently.
- [`cross-env`](https://www.npmjs.com/package/cross-env): Run scripts that set and use environment variables across platforms.

Together, those two packages are used by the WebStorm "Debug" configuration. (top right)

Running the Debug configuration in `debug` mode allows to pause execution and use breakpoints.

---

## Eslint

> Eslint helps us enforce code style and check for typos and errors during the development process

- [`eslint`](https://www.npmjs.com/package/eslint): ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react): React specific linting rules for ESLint
- [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks): This ESLint plugin enforces the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html). It is a part of the Hooks API for React.
- [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest): ESLint plugin for Jest
- [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y): Static AST checker for accessibility rules on JSX elements.

Eslint rules are automatically used by WebStorm.

> Eslint with TypeScript and JSX support was configured [following this tutorial](http://www.thedreaming.org/2019/03/27/eslint-with-typescript/).

Run `yarn lint` to run the linter.

---

## Tests

### [Jest](https://jestjs.io/)

> Jest is our test runner, it runs our tests to make sure we don't ship regressions to our end users

- [`jest`](https://www.npmjs.com/package/jest): Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [`jest-extended`](https://www.npmjs.com/package/jest-extended): Additional Jest matchers. Provides additional built-in tests for ease of testing.
- [`react-test-renderer`](https://www.npmjs.com/package/react-test-renderer): This package provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
    Essentially, this package makes it easy to grab a snapshot of the "DOM tree" rendered by a React DOM or React Native component without using a browser or jsdom.
- [`ts-jest`](https://www.npmjs.com/package/ts-jest): TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

**Known issues**:
- `jest-emotion`: [Breaks tests](https://github.com/emotion-js/emotion/issues/1440#issuecomment-551235747)

### Cypress

> Cypress is a tool that helps performing end-to-end (E2E) tests that aim at testing the UI and the user workflows.
>
> It is open source and free to use from the command line (doesn't count as Tests recording).
>
> It also comes with a paid plan that provides a [Dashboard](https://dashboard.cypress.io/#/projects/4dvdog/runs), we use it with the Free plan, but it only allows [500 tests recordings per month](https://dashboard.cypress.io/#/organizations/1e9a77da-8ecf-4a84-8ad9-99a01ac2b098/billing).

Several utility scripts have been configured to help with E2E testing, each script takes an optional `CYPRESS_STAGE` environment variable, which defines the [config file](./cypress/config-development.json) that will be used (`development` by default):
- `yarn e2e:open`: Runs the test suite **in a local browser** _(requires `yarn e2e:install`)_, targets **localhost development website**. (uses [cypress/config-development.json](./cypress/config-development.json))
- `yarn e2e:run`: Runs the test suite **in a local console**, targets **localhost development website**. (uses [cypress/config-development.json](./cypress/config-development.json))
- `CYPRESS_STAGE=customer1 yarn e2e:run` equivalent to `yarn e2e:customer1:production`: Runs the test suite in the console, targets **demo production website**. (uses [cypress/config-demo.json](cypress/config-customer2.json))

It is also possible to test all the apps at once:
- `yarn e2e:all:production`: This will run each production e2e test run (in series, parallel is not free)

We used the following [**Cypress <> Next.js** tutorial](https://buttercms.com/blog/how-to-test-nextjs-apps) to get started.
Note that our current installation doesn't provide test coverage.
It's a bit harder to setup, here is a [tutorial](https://www.cypress.io/blog/2019/09/05/cypress-code-coverage-for-create-react-app-v3/) if ever needed.

> **N.B**: [Here is the documentation about the options available in the config files](https://docs.cypress.io/guides/references/configuration.html).

---

## Documentation

- [`markdown-toc`](https://www.npmjs.com/package/markdown-toc): Generate a markdown TOC (table of contents).
    _Uses many dependencies, many of them outdated (handlebars) and containing security issues, but we don't care much about those as they aren't shipped in the build, but only present on the developer's local machine._
- [`version-bump-prompt`](https://www.npmjs.com/package/version-bump-prompt): Used to make it easier to bump versions.





