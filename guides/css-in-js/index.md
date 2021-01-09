---
layout: default
title: CSS-in-JS
parent: Guides
nav_order: 80
has_children: true
---

<div class="code-example" markdown="1">
<span markdown="1">
    CSS-in-JS is a styling technique where JavaScript is used to style components. Next Right Now uses Emotion as its CSS-in-JS library.
</span>
</div>

---

# About Emotion

> Emotion is a library designed for writing css styles with JavaScript. [https://emotion.sh/docs/introduction](https://emotion.sh/docs/introduction)

Next.js provides CSS-in-js using [`styled-jsx`](https://github.com/vercel/styled-jsx), but we dislike it for several reasons. It's not very intuitive to write
styles that way, and it needs extra dependencies/configuration to work with nested components and such.

Instead, we use [Emotion](https://emotion.sh/docs/introduction) in this project, which allows writing components using either the `styled` notation, or
the `css` notation.

It's strongly recommended reading the [official documentation](https://emotion.sh/docs/introduction) about how to use it.
