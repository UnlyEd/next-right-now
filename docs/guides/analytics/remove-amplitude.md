---
layout: default
title: How to remove Amplitude
parent: Analytics
grand_parent: Guides
nav_order: 30
---

## How to remove Amplitude

> You can use other alternative libraries for analytics.
>
> We've experimented with Google Analytics and were really disappointed by it.
> Amplitude is much better, both for configuring the events, documenting them and exploit them. But it's much more expensive.

1. Remove the following libraries:
    - [`amplitude-js`](https://www.npmjs.com/package/amplitude-js): Top-level amplitude official lib, used by react-amplitude.
    - [`@amplitude/react-amplitude`](https://www.npmjs.com/package/react-amplitude): React-friendly amplitude lib, non-officially maintained. Really useful when working with react.

1. Remove their components usage in the source code
1. Remove the `AMPLITUDE_API_KEY` env var
