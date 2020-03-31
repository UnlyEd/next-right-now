---
layout: default
title: How to use Amplitude
parent: Analytics
grand_parent: Guides
nav_order: 20
---

# How to use Amplitude
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Amplitude usage.
</div>

{% include page-toc.md %}

---

## Overview

### A few words about Amplitude vs Google Analytics

When your want to perform Analytics in any app, people usually go for Google Analytics. **We don't.**

GA is too limited, and huge, with tons of useless stuff.
We've used it, and we really don't recommend it for any SPA, especially when playing with universal app because it just sucks.

> It's very hard to configure GA with universal apps, you'll end up with wrong analytics insights due to event multi triggers (SSR + CSR).
> It was designed and built for another world. **Not for SPA or CSR!**
>
> - _Our opinion_

Instead, we use (and recommend) Amplitude.
The world of analytics is huge, and isn't cheap.

Amplitude allows to track events and users behaviour, who are two very different things, even if events are related to users.

### A note about Amplitude's pricing

Amplitude [offers a free plan](https://amplitude.com/pricing) that allows 10 million events per months (`$identity` events aren't counted towards `events`, they're free).

Then, the cheapest plan is `Growth`, that **starts around $48k/year** (yup, it's a **huge** gap)

If you want to benefit from the **Growth plan for free**, know that it's possible (but limited to 1 years), through their [startup Scholarship](https://amplitude.com/startups).
**They offer Scholarship for non-profit organisation too.**

> But, a word of caution here, even if you benefit from the scholarship, make sure your business doesn't rely on Growth features when your Scholarship ends.
>
> They told us then always find a way to provide Amplitude at an acceptable price for non-profit, but we don't know that for sure yet.

Anyway, Amplitude is [one of the best out there for Analytics](https://stackshare.io/amplitude).

If the free plan is enough for your needs, or if you can afford paid plans then don't hesitate.
Also, their react integration is really good, even though it's not officially maintained and could use some love. (they told us they plan of maintaining it better)


### Known limitations

- Amplitude doesn't provide any backend-compatible API.
    It's not an issue for NRN, and avoids sending multiple events due to SSR/CSR, but it could be a limitation depending on your businness needs.
    See [https://github.com/amplitude/Amplitude-JavaScript/issues/164](https://github.com/amplitude/Amplitude-JavaScript/issues/164)

---

## Dependencies

> Amplitude is used to collect usage metrics (analytics) of the application.

Amplitude **is used only on the frontend part of the application**. It is composed of two parts:
- [`@amplitude/react-amplitude`](https://github.com/amplitude/react-amplitude): React components easy to use, see their [blog post](https://amplitude.engineering/introducing-react-amplitude-d7b5258bc708).
- [`amplitude-js`](https://github.com/amplitude/Amplitude-JavaScript): The JS SDK, only compatible from the browser. (They're working on making it [compatible with SSR](https://github.com/amplitude/Amplitude-JavaScript/issues/164))

See the [documentation example at react-amplitude](https://github.com/amplitude/react-amplitude#example-instrumenting-tic-tac-toe-from-facebooks-intro-to-react-tutorial) to understand how it's meant to be used.
We only use `react-amplitude` to manipulate events.

---

## Chrome developer debug tool

> The amplitude team has released a Chrome plugin to see the events from the browser.
>
> It is a **must-have** when working with Amplitude. It's very simple to use and quite helpful.

- [Tutorial](https://help.amplitude.com/hc/en-us/articles/360003032451-Instrumentation-Explorer-Debugger)
- [Chrome plugin](https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp)

---

## Resources

- [https://amplitude.com/](https://amplitude.com/)
- [https://developers.amplitude.com/](https://developers.amplitude.com/)
- [https://amplitude.com/blog/category/inside-amplitude](https://amplitude.com/blog/category/inside-amplitude)
- [https://help.amplitude.com/hc/en-us](https://help.amplitude.com/hc/en-us)
