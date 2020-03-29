---
layout: default
title: Variants
parent: Concepts
nav_order: 1
---

# Variants
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

## What is a variant?

A variant is a variation of the boilerplate. Each variant provides different **built-in** features.

- Each variant lives in the same NRN Github repository, but in a distinct **branch**.
- Each variant has its own dedicated demo and "how to install" documentation.

> Variants are **opt-in**, meaning that you, as a developer, get to choose which one you use.
>
> This decision is **up to you** only, and you will likely choose the variant that matches the closest your business needs/requirements.

---

## Why variants?

The boilerplate was built with re-usability in mind, but also tries to solve non-trivial issues such as:
- Analytics
- Monitoring
- API usage (consumption)
- Content i18n
- Platform i18n

>Those are non-trivial features, and they can't always be build using open source software.
>
>They would be very complex to build from scratch, and the use of established standards and worldwide known vendors seemed as a necessity to answer our needs.

Variants are meant to cover as much possibilities as possible. For instance, you may want to use:
- SSG or SSR
- Multi-tenants or Multiple Single-Tenants or Single Tenant
- Platform i18n with Locize vendor, or implemented using static files (no vendor), or maybe you don't need this feature at all
- Sentry to monitor your app (client + server sides), but maybe you already use another different vendor and would like to stick with it
- Analytics, but because you may use SSG only, and your needs are small then Google Analytics may be a better fit for you and avoid additional complexity
- Etc.

Also, the more features NRN covers, and the more possible variations there will be.
We don't intend of supporting all possible variations, but we'll try to focus on the basic ones and most requested ones.

The more variants we will offer, and the easiest it will be for any newcomer to get started quickly with a variant that really fits their needs.

For instance, when creating [NRN Admin](https://github.com/UnlyEd/next-right-now-admin), we got started from the `v1-ssr` variant and had to manually remove MST and i18n because we didn't need those.

It's a waste of time if everybody has to do that on their own, and it strongly limits the boilerplate re-usability.

---

## Which variants **are** being considered?

Here is a short list of all variants that we consider to support in the future:
- ST (as an alternative to current MST)
- SSG (as an alternative to current SSR)
- Platform i18n without Locize provider (as an alternative to current Locize provider, which isn't free)
- No platform i18n and no content i18n support either
    (completely remove platform/content i18n support as an alternative for those who don't need related i18n complexity and prefer to keep things simpler)

---

## Which variants **aren't** being considered?

We do not plan on providing variants for:
- Different monitoring tool than Sentry, as it is one of the best out there, provides a generous free plan, and does the job really well.
- Different analytics tool than Amplitude, as it is the most flexible analytics tool we've experienced.
    For instance, Google Analytics feels like some stuff invented during Stone age in comparison, and GA doesn't play well at all with CSR rendering.
- Different css-in-js tool than Emotion, as we've studied the market quite intensively before picking Emotion, and it's very flexible about usage and covers lots of needs.
    We haven't been limited by Emotion in any way, in 4 months.
- Different CI/CD tool than Github Actions, as it is becoming quite used worldwide and very powerful, for free. There is nothing that matches it, and we don't plan on using GitLab or BitBucket in a foreseen future.

> We will therefore not provide any variant for those tools, but the community is free to open a Github issue and discuss needs and eventually propose a contribution through PR.
>
> We are therefore open to add more/new tooling, but we must discuss it together first! :wink:

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Concepts](./){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Available variants](../getting-started/pick-variant){: .btn-blue }
    </span>
    <span class="fs-4" markdown="1">
    [Environments and Stages >](./env-and-stages){: .btn .btn-purple }
    </span>
</div>
