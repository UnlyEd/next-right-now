---
layout: default
title: Dependencies
parent: Reference
nav_order: 60
---

# Dependencies
{: .no_toc }

<div class="code-example" markdown="1">
Overview of the project dependencies, **why** we use them, and **quick explanations** about them

All the packages listed here are under **open source**, **non-restrictive license** (MIT, ISC, etc.)

_The order follows the order in `package.json` (kinda alphabetical but not quite exactly `¯\_(ツ)_/¯`)_
</div>

Only the common dependencies are listed here, not vendor-related dependencies.

Vendor-related dependencies are listed per-vendor, in their respective ["How to use" guide](../guides).

{% include page-toc.md %}

---

## Dependencies

Dependencies that are bundled to the end-user app.

---

### FortAwesome/FontAwesome

[FontAwesome](https://github.com/FortAwesome/Font-Awesome) is an awesome icon toolkit.

NRN uses the free version, but we managed to use the paid version on some other app (cloned from NRN), it's not an issue, just harder to configure.

- [`@fortawesome/fontawesome-svg-core`](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core): Necessary to use font-awesome with a node project. Contains libs to config the FA library. (see `src/pages/_app.tsx`)
- [`@fortawesome/fontawesome-free`](https://www.npmjs.com/package/@fortawesome/fontawesome-free): Contains the free icons
- [`@fortawesome/free-brands-svg-icons`](https://www.npmjs.com/package/@fortawesome/free-brands-svg-icons): Contains the free brand icons
- [`@fortawesome/react-fontawesome`](https://www.npmjs.com/package/@fortawesome/react-fontawesome): Contains the icons for React-friendly usage

[Installation tutorial](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers)

#### Note about FontAwesome usage

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

### Our `@unly` packages

We use some of our own packages made [`@unly`](https://www.npmjs.com/search?q=%40unly).

They are all hosted on ou [GitHub repository](https://github.com/UnlyEd), and all under open source license.

- [`@unly/utils`](https://github.com/UnlyEd/utils): This is a utility library which contains various helpers. This repository was created because those helpers are used amongst several projects and were copy/pasted, which is a bad practice.
- [`@unly/utils-simple-logger`](https://github.com/UnlyEd/utils-simple-logger): Logger based on [Winston](https://github.com/winstonjs/winston) with sane default so that it only logs `error` in production and filter other logs, while keeping them all in non-production environments.
  Basically avoids to increase cost by logging useless logs in production.
- [`@unly/universal-language-detector`](https://github.com/UnlyEd/universal-language-detector): Language detector that works universally (browser + server) - Meant to be used with a universal framework, such as Next.js

Feel free not to use them.

`@unly/universal-language-detector` is necessary for SSR language detection, you won't need it if not using SSR.

---

### [Bootstrap](https://getbootstrap.com/) & [Reactstrap](https://reactstrap.github.io/)

> We use Reactstrap as a Components library, which is itself based on Bootstrap.

- [`bootstrap`](https://www.npmjs.com/package/bootstrap): Necessary to load bootstrap.css file, which provides the styles
- [`reactstrap`](https://www.npmjs.com/package/reactstrap):
- [`@zeit/next-css`](https://github.com/zeit/next-plugins/tree/master/packages/next-css): [Additional Next configuration](https://stackoverflow.com/a/50002905/2391795) necessary to gain the ability to `import` `.css` files.

#### Notes about Bootstrap/Reactstrap usage

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

### classnames

> `classnames` is just the must-have tool to use to manipulate dynamic className property

- [`classnames`](https://www.npmjs.com/package/classnames): A simple JavaScript utility for conditionally joining classNames together.

---

### Cookies

> It's hard (or at least, non-trivial) to make cookies work universally with Next.js

- [`js-cookie`](https://github.com/js-cookie/js-cookie): Used to **WRITE** cookies from the **client** side. A simple, lightweight JavaScript API for handling browser cookies
- [`cookies`](https://www.npmjs.com/package/cookies): Used to **WRITE** cookies from the **server** side. Cookies is a node.js module for getting and setting HTTP(S) cookies. Cookies can be signed to prevent tampering, using Keygrip. It can be used with the built-in node.js HTTP library, or as Connect/Express middleware.
  I'm not sure if that lib is the best choice, but it did work back then. Other alternative may be https://github.com/maticzav/nookies
- [`next-cookies`](https://www.npmjs.com/package/next-cookies): Used to **READ** cookies universally (cannot write). Tiny little function for getting cookies on both client & server with next.js.
  This enables easy client-side and server-side rendering of pages that depend on cookies.

A `cookies` prop is available to all **Page** and **Layout** components (through the `_app.tsx:render()`).

#### Why not using `universal-cookie`?

[`universal-cookie`](https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie) looks promising and if you know about it,
you may ask yourself why we don't use it instead of one package for the client side, and another one for the server side.

Well, the answer is straightforward: **It does not work**.
See [https://github.com/reactivestack/cookies/issues/256](https://github.com/reactivestack/cookies/issues/256)

#### Cookies management abstraction `UniversalCookiesManager`

We've built our own `UniversalCookiesManager` utility class to deal with cookies in a universal way (same API on client/server sides).

It basically hides away the complexity, and allows for source code reusability.

---

### css-to-react-native

> Converts CSS text to a React Native stylesheet object.
>
> Converts all number-like values to numbers, and string-like to strings.
>
> Automatically converts indirect values to their React Native equivalents.

- [`css-to-react-native`](https://www.npmjs.com/package/css-to-react-native):

Used to dynamically convert CSS to React style object, for CSS rules coming from a data source (such as GraphCMS).

Currently used by [GraphCMSAsset.tsx](src/components/GraphCMSAsset.tsx)

---

### deepmerge

> Merges the enumerable properties of two or more objects deeply.

- [`deepmerge`](https://www.npmjs.com/package/deepmerge):

Used in many places to merge different objects together.
Handles deeply nested objects.

---

### isomorphic-unfetch

> Can be used to either polyfill the whole app, or used as a `fetch` function. _(Stands for "isomorphic universal fetch")_

- [`isomorphic-unfetch`](https://www.npmjs.com/package/isomorphic-unfetch): Switches between unfetch & node-fetch for client & server.

There are several libs to allow fetching data from a react app, [here is a comparison](https://www.npmtrends.com/isomorphic-fetch-vs-isomorphic-unfetch-vs-universal-fetch).

The main reason for choosing this one is its very small bundle size, and it's universal.

---

### json-stringify-safe

> Used to safely stringify JSON objects. Works even when they have circular dependencies

- [`json-stringify-safe`](https://www.npmjs.com/package/json-stringify-safe): Like JSON.stringify, but doesn't throw on circular references.

Use at your convenience. We weren't sure whether to use `json-stringify-safe` or `safe-json-stringify` and we made a wild choice here.

---

### [Lodash](https://lodash.com/docs/4.17.15)

> A modern JavaScript utility library delivering modularity, performance & extras.

We made the choice to import lodash packages one-by-one instead of loading the whole `lodash` lib directly.
We're not sure if it's better/easier/wiser. We suppose it should decrease the bundle size, _but maybe it's natively handled by tree-shacking?_

- [`lodash.get`](https://www.npmjs.com/package/lodash.get): [https://lodash.com/docs/4.17.15#get](https://lodash.com/docs/4.17.15#get)
- [`lodash.isempty`](https://www.npmjs.com/package/lodash.isempty): [https://lodash.com/docs/4.17.15#isEmpty](https://lodash.com/docs/4.17.15#isEmpty)
- [`lodash.isplainobject`](https://www.npmjs.com/package/lodash.isplainobject): [https://lodash.com/docs/4.17.15#isPlainObject](https://lodash.com/docs/4.17.15#isPlainObject)
- [`lodash.map`](https://www.npmjs.com/package/lodash.map): [https://lodash.com/docs/4.17.15#map](https://lodash.com/docs/4.17.15#map)
... And tons of other

We use plenty of utilities from lodash. Make sure read their [documentation](https://lodash.com/docs/).

#### Note about Lodash TS typings

We also load each TS types one-by-one. One advantage of that is that **we can decide not to load typings that do not work**.

> For instance, we tried using `@types/lodash.filter` but eventually removed it because it creates a mess that is hard to deal with.
> Typings may be wrong and breaks our tests, in such case it's nice to have the flexibility not to use them.

---

### Next

> Next.js framework package and plugins/utilities.

- [`next`](https://www.npmjs.com/package/next): Next.js framework package.
  See [tutorial](https://nextjs.org/learn/basics/getting-started).
- [`next-cookies`](https://www.npmjs.com/package/next-cookies): See [Cookies](#cookies)
- [`next-with-apollo`](https://www.npmjs.com/package/next-with-apollo): Apollo HOC for Next.js

---

### rc-tooltip

> React Tooltip component

- [`rc-tooltip`](https://www.npmjs.com/package/rc-tooltip): React tooltip

Marked as alpha-3 version but stable. **Much better than Reactstrap Tooltip component.**

---

### React

> React package and plugins/utilities.

- [`react`](https://www.npmjs.com/package/react): React is a JavaScript library for creating user interfaces.
- [`react-apollo`](https://www.npmjs.com/package/react-apollo): React Apollo allows you to fetch data from your GraphQL server and use it in building complex and reactive UIs using the React framework. React Apollo may be used in any context that React may be used. In the browser, in React Native, or in Node.js when you want to do server-side rendering.
- [`react-dom`](https://www.npmjs.com/package/react-dom): This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.
- [`react-style-proptype`](https://www.npmjs.com/package/react-style-proptype): Validates style objects by ensuring the keys are valid css property names (in camelcase form).
- [`prop-types`](https://www.npmjs.com/package/prop-types): Runtime type checking for React props and similar objects.

> **N.B**: `react` and `react-dom` must always use the same version.

---

### recompose

> Used to compose multiple HOC together

- [`recompose`](https://www.npmjs.com/package/recompose): Recompose is a React utility belt for function components and higher-order components.

---

### webfontloader

> Web Font Loader gives you added control when using linked fonts via @font-face.
>
> It provides a common interface to loading fonts regardless of the source, then adds a standard set of events you may use to control the loading experience.
>
> The Web Font Loader is able to load fonts from Google Fonts, Typekit, Fonts.com, and Fontdeck, as well as self-hosted web fonts.
> It is co-developed by Google and Typekit.

- [`webfontloader`](https://www.npmjs.com/package/webfontloader): A logger for just about everything.

---

### winston

> Peer-dependency of `@unly/utils-simple-logger`

- [`winston`](https://www.npmjs.com/package/winston): A logger for just about everything.


---

# Dev dependencies

Development dependencies that are required to run the program locally (the bundle won't contains these dependencies).

### @types

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

### Now & Vercel

> Official packages from Vercel/Now, the company hosting our application

- [`@now/node`](https://zeit.co/docs/runtimes#official-runtimes/node-js): Used as a dev dependency, it's useful to provide [TypeScript support](https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js-typescript-support:).
  Such as for `import { NowRequest, NowResponse } from '@now/node'`.
- [`now`](https://www.npmjs.com/package/now): The Now CLI [https://github.com/zeit/now](https://github.com/zeit/now) [https://www.npmjs.com/package/now](https://www.npmjs.com/package/now)
- [`@zeit/next-css`](https://github.com/zeit/next-plugins/tree/master/packages/next-css): [Additional Next configuration](https://stackoverflow.com/a/50002905/2391795) necessary to gain the ability to `import` `.css` files.
  Used to import other libs such as `bootstrap.css`.
- [`@zeit/next-source-maps`](https://www.npmjs.com/package/@zeit/next-source-maps): Generate source maps during production build in your Next.js project

### Debug WebStorm

> Packages meant to help with the debug of the application

- [`concurrently`](https://www.npmjs.com/package/concurrently): Run multiple commands concurrently.
- [`cross-env`](https://www.npmjs.com/package/cross-env): Run scripts that set and use environment variables across platforms.

Together, those two packages are used by the WebStorm "Debug" configuration. (top right)

Running the Debug configuration in `debug` mode allows to pause execution and use breakpoints.

---

### Eslint

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

### Documentation

- [`markdown-toc`](https://www.npmjs.com/package/markdown-toc): Generate a markdown TOC (table of contents).
  _Uses many dependencies, many of them outdated (handlebars) and containing security issues, but we don't care much about those as they aren't shipped in the build, but only present on the developer's local machine._
- [`version-bump-prompt`](https://www.npmjs.com/package/version-bump-prompt): Used to make it easier to bump versions.
