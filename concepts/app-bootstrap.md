---
layout: default
title: Application bootstrap
parent: Concepts
nav_order: 25
---

# Application bootstrap
{: .no_toc }

<div class="code-example" markdown="1">
Learn how the NRN application is "bootstrapped" (AKA "started, initialised"), what components are called, on what conditions, and in what order.
</div>

{% include page-toc.md %}

---

## Learn more about the "bootstrap" concept

One of the biggest challenges with Next.js is the difficulty (on a developer standpoint) to know where our code is running and how it affects the behaviour.

Depending on the execution context (server, browser, client side transition, server side transition) there are some APIs that are unavailable, or are working differently. (cookies, localstorage, etc.)

Part of it is documented in [`MultiversalAppBootstrap`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/components/appBootstrap/MultiversalAppBootstrap.tsx) directly:
```tsx
/*
 * We split the rendering between server and browser
 * There are actually 3 rendering modes, each of them has its own set of limitations
 *  1. Server while building SSR pages (doesn't have access to browser-related features (LocalStorage), but it does have access to request-related data (cookies, HTTP headers))
 *  2. Server while building SSG pages (doesn't have access to browser-related features (LocalStorage), nor to request-related data (cookies, localStorage, HTTP headers))
 *  3. Static rendering (doesn't have access to server-related features (HTTP headers), but does have access to request-related data (cookie) and browser-related features (LocalStorage)) _(e.g: page previously generated through SSG)_
 *
 * What we do here, is to avoid rendering browser-related stuff if we're not running in a browser, because it cannot work properly.
 * (e.g: Generating cookies will work, but they won't be stored on the end-user device, and it would create "Text content did not match" warnings, if generated from the server during SSG build)
 *
 * So, the BrowserPageBootstrap does browser-related stuff and then call the PageBootstrap which takes care of stuff that is universal (identical between browser and server).
 * While the ServerPageBootstrap does server-related stuff and then call the PageBootstral wich takes care of stuff that is universal (identical between browser and server).
 *
 * XXX If you're concerned regarding React rehydration, read our talk with Josh, author of https://joshwcomeau.com/react/the-perils-of-rehydration/
 *  https://twitter.com/Vadorequest/status/1257658553361408002
 *
 * XXX There may be more rendering modes - See https://github.com/vercel/next.js/discussions/12558#discussioncomment-12303
 */
```

## What is `Multiversal`?

The term `Multiversal` is meant for "code that runs on all situations", to make it obvious it's always executed, no matter what.

The idea behind that `Multiversal` term _(which we invented ourselves)_ is that while `Universal` is well-known by developers and stands for code that runs on both the client and the server (or, for apps/tools that are compatible with both, depending on who wrote the definition), `Multiversal` stands for "code running no matter what".

Because, you might not want to run some code, depending on the execution context ("browser" vs "server during ssg build" vs "server during SSR").

For instance:
- The `Amplitude` module is instantiated only on the browser.
- The Cookie consent popup is instantiated only on the browser.
- The userSessionContext is populated on both browser/server, but it's not done the same way, because on the browser we can read the cookie anytime, but on the server they're passed down to the react tree instead, and they're not available during the SSG build step.

Those are small, but important differences that affect the application and how code should be written and reasoned about.

> The purpose of the `Multiversal` keyword is to make it obvious what's happening, from a developer standpoint. (Multiverse > Universe) :wink:

## What's the NRN page lifecycle?

1. All request always starts from [`src/pages/_app.tsx`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/pages/_app.tsx), that's just [how Next.js works internally](https://nextjs.org/docs/advanced-features/custom-app).
1. [From there](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/pages/_app.tsx#L98), the [`MultiversalAppBootstrap`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/components/appBootstrap/MultiversalAppBootstrap.tsx) NRN component is rendered
1. This `MultiversalAppBootstrap` component is used as a router to decide which component should be rendered next, depending on whether the page is rendered from the browser, or the server.
    - If the page is served by the server (either SSR, or SSG during build, or client-side transition that is calling an SSR page, etc.) then [`ServerPageBootstrap`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/components/appBootstrap/ServerPageBootstrap.tsx) is rendered.
    - If the page is served by the browser (as a static page, either through a full page reload or a client-side navigation) then [`BrowserPageBootstrap`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/components/appBootstrap/BrowserPageBootstrap.tsx) is rendered.
    - In either cases, that's where our React Providers are initialised, alongside all the stuff that is app-wide.
1. Eventually, the Next.js page itself is rendered (stored in `props.Component`)
1. When the page itself renders, the first thing it renders is the Layout used by this page, which is the [`DefaultLayout`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/components/pageLayouts/DefaultLayout.tsx) by default.
    - Lots of components are rendered by the layout. (nav menu, footer, sidebar, error handling, etc.)
    - Each page can use a different layout.
1. Then, the page content itself is rendered, inside the layout.

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Tenancy](./tenancy){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Guides: Tenancy](../guides/tenancy){: .btn .btn-blue }
    </span>
    <span class="fs-4" markdown="1">
    [GraphQL >](./graphql){: .btn .btn-purple }
    </span>
</div>
