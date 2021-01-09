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

## Usage

We won't cover usage of Emotion in this documentation, please refer to the [official documentation](https://emotion.sh/docs/introduction) about how to
use it.

Next Right Now supports the following ways of using Emotion:
- [Using `css` prop](https://emotion.sh/docs/css-prop)
- [Using `styled component`](https://emotion.sh/docs/styled)

It's up to you to decide how you prefer to use Emotion. Next Right Now doesn't advise or enforce any strong opinion on this matter, it's a personal choice.

> At Unly, we usually use the `css` prop. In some rare cases, we find the `styled component` approach makes more sense. We eventually use both, but have a preference for the `css` way.

### SSR

SSR is already configured and compatible with Next.js, since Emotion v10. [Source](https://emotion.sh/docs/ssr#nextjs)
You don't have anything to do.

## Dependencies

- [`@emotion/core`](https://emotion.sh/docs/css-prop): Necessary to use emotion, with built-in `css` notation support.
- [`@emotion/styled`](https://emotion.sh/docs/styled): Necessary to use the `styled` notation.
- [`emotion-theming`](https://www.npmjs.com/package/emotion-theming): Theming library inspired by styled-components

## Resource

- [Introduction to Emotion](https://emotion.sh/docs/introduction)
