---
layout: default
title: How to remove Locize
parent: I18n
grand_parent: Guides
nav_order: 30
---

## How to remove Locize & i18n

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
