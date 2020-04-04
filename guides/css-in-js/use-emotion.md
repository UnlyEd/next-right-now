---
layout: default
title: How to use Emotion
parent: CSS-in-JS
grand_parent: Guides
nav_order: 10
---

# How to use Emotion
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Emotion usage.
</div>

{% include page-toc.md %}

---

## Overview

> Emotion is a library designed for writing css styles with JavaScript. [https://emotion.sh/docs/introduction](https://emotion.sh/docs/introduction)

Next.js provides CSS-in-js using [`styled-jsx`](https://github.com/zeit/styled-jsx), but we dislike it for several reasons.
It's not very intuitive to write styles that way and it needs extra dependencies/configuration to work with nested components and such.

Instead, we use [Emotion](https://emotion.sh/docs/introduction) in this project,
which allows to write components using either the `styled` notation, or the `css` notation.

It's strongly recommended to read the [official documentation](https://emotion.sh/docs/introduction) about how to use it.

### Note about `/** @jsx jsx */`

When using Emotion, the file must start with `/** @jsx jsx */` on top of it.
- [Explanation](https://stackoverflow.com/questions/53803466/what-does-the-comment-jsx-jsx-do-in-the-emotion-css-in-js-library)
- [Official doc](https://emotion.sh/docs/css-prop#jsx-pragma)

> **TL;DR** _It basically tells the babel compiler to do something different and won't work if not specified._

## Dependencies

- [`@emotion/core`](https://emotion.sh/docs/css-prop): Necessary to use emotion, with built-in `css` notation support.
- [`@emotion/styled`](https://emotion.sh/docs/styled): Necessary to used the `styled` notation.
- [`emotion-theming`](https://www.npmjs.com/package/emotion-theming): Theming library inspired by styled-components
