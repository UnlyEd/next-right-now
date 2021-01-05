---
layout: default
title: I18n
parent: Guides
nav_order: 30
has_children: true
---

# I18n routing

NRN uses its own i18n routing implementation instead of the official implementation.
This is because the Next.js framework released an i18n routing implementation [since `v10`](https://nextjs.org/docs/advanced-features/i18n-routing) in the summer of 2020, while NRN released its own implementation in early 2020.

Even though the official implementation and NRN implementation are compatible and look much alike, NRN hasn't updated its own implementation because the official implementation doesn't generate a prefix url for the default locale, and **this is a breaking change**.

[This issue is being tracked in #194](https://github.com/UnlyEd/next-right-now/issues/194).
