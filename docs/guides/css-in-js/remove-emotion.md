---
layout: default
title: How to remove Emotion
parent: CSS-in-JS
grand_parent: Guides
nav_order: 20
---

## How to remove Emotion

> We strongly recommend to keep Emotion. You can use both Styled Component approach and inline styles, it should feet all needs.

1. Remove the following libraries:
    - [`@emotion/core`](https://emotion.sh/docs/css-prop): Necessary to use emotion, with built-in `css` notation support.
    - [`@emotion/styled`](https://emotion.sh/docs/styled): Necessary to used the `styled` notation.
    - [`emotion-theming`](https://www.npmjs.com/package/emotion-theming): Theming library inspired by styled-components
1. Remove their components usage in the source code + `/** @jsx jsx */`
