---
layout: default
title: How to use Amplitude
parent: Analytics
grand_parent: Guides
nav_order: 20
---

# How to use Amplitude
{: .no_toc }

Advices and "must-know" things regarding Amplitude usage.

---

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

## Packages

> Amplitude is used to collect usage metrics (analytics) of the application.

Amplitude **is used only on the frontend part of the application**. It is composed of two parts:
- [`@amplitude/react-amplitude`](https://github.com/amplitude/react-amplitude): React components easy to use, see their [blog post](https://amplitude.engineering/introducing-react-amplitude-d7b5258bc708).
- [`amplitude-js`](https://github.com/amplitude/Amplitude-JavaScript): The JS SDK, only compatible from the browser. (They're working on making it [compatible with SSR](https://github.com/amplitude/Amplitude-JavaScript/issues/164))

See the [documentation example at react-amplitude](https://github.com/amplitude/react-amplitude#example-instrumenting-tic-tac-toe-from-facebooks-intro-to-react-tutorial) to understand how it's meant to be used.
We only use react-amplitude to manipulate events.

> **Known limitation**: Amplitude doesn't provide any backend-compatible API. See https://github.com/amplitude/Amplitude-JavaScript/issues/164


## Chrome developer debug tool

> The amplitude team has released a Chrome plugin to see the events from the browser.
>
> It is a **must-have** when working with Amplitude. It's very simple to use and quite helpful.

- [Tutorial](https://help.amplitude.com/hc/en-us/articles/360003032451-Instrumentation-Explorer-Debugger)
- [Chrome plugin](https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp)

## Resources

- https://amplitude.com/
- https://developers.amplitude.com/
- https://amplitude.com/blog/category/inside-amplitude
- https://help.amplitude.com/hc/en-us
