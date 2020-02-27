<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>

How to remove "X" library/utility
===

> Explanation about how to remove any lib/utility you don't need/like

<!-- toc -->

- [Amplitude](#amplitude)
- [Emotion](#emotion)
- [Sentry](#sentry)
- [Locize & i18n](#locize--i18n)

<!-- tocstop -->

---

## Amplitude

> You can use other alternative libraries for analytics.
>
> We've experimented with Google Analytics and were really disappointed by it.
> Amplitude is much better, both for configuring the events, documenting them and exploit them. But it's much more expensive.

1. Remove the following libraries:
    - [`amplitude-js`](https://www.npmjs.com/package/amplitude-js): Top-level amplitude official lib, used by react-amplitude.
    - [`@amplitude/react-amplitude`](https://www.npmjs.com/package/react-amplitude): React-friendly amplitude lib, non-officially maintained. Really useful when working with react.

1. Remove their components usage in the source code
1. Remove the `AMPLITUDE_API_KEY` env var

---

## Emotion

> We strongly recommend to keep Emotion. You can use both Styled Component approach and inline styles, it should feet all needs.

1. Remove the following libraries:
    - [`@emotion/core`](https://emotion.sh/docs/css-prop): Necessary to use emotion, with built-in `css` notation support.
    - [`@emotion/styled`](https://emotion.sh/docs/styled): Necessary to used the `styled` notation.
    - [`emotion-theming`](https://www.npmjs.com/package/emotion-theming): Theming library inspired by styled-components
1. Remove their components usage in the source code + `/** @jsx jsx */`

---

## Sentry

> You may replace Sentry by another monitoring tool of your choice. Make sure it is JS universal-friendly though.

1. Remove the following libraries:
    - [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser): Package to use from the browser.
    - [`@sentry/node`](https://www.npmjs.com/package/@sentry/node): Package to use from the server.
1. Remove their components usage in the source code
1. Remove the `SENTRY_DSN` env var
1. Remove alias in [next.config.js](next.config.js) `config.resolve.alias['@sentry/node'] = '@sentry/browser';`

---

## Locize & i18n

> You may replace Locize by another internationalisation too of your choice. Make sure it is JS universal-friendly though.
>
> You may also completely remove i18n from your app, if you don't need it. (`i18next` and `react-i18next` packages)

1. Remove the following libraries:
- [`i18next-locize-backend`](https://www.npmjs.com/package/i18next-locize-backend): This is an i18next backend to be used for locize service. It will load resources from locize server using xhr.
- [`i18next-node-locize-backend`](https://www.npmjs.com/package/i18next-node-locize-backend): This is a i18next backend to be used with node.js for the locize service. It's for the node.js server what the i18next-locize-backend is for the browser.
- [`locize-editor`](https://www.npmjs.com/package/locize-editor): The locize-editor enables you to directly connect content from your website / application with your content on your localization project on locize.
- [`locize-node-lastused`](https://www.npmjs.com/package/locize-node-lastused): This is an i18next plugin or standalone scriot to be used for locize service. It will update last used timestamps on reference keys from your locize project using xhr. It sets the last used date on your reference language's namespaces.
1. Remove their components usage in the source code
1. Remove the `LOCIZE_PROJECT_ID` and `LOCIZE_API_KEY` env var
