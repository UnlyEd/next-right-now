---
layout: default
title: Presets
parent: Concepts
nav_order: 1
---

# Presets
{: .no_toc }

<div class="code-example" markdown="1">
A preset is a predefined set of features that are built-in and thus "ready-to-use".
</div>

{% include page-toc.md %}

---

## What is a preset?

- A preset can be described as a "variation" of the boilerplate.
- Each preset provides different **built-in** features.
- Each preset lives in the same NRN Github repository, but in a distinct **branch**.
- Each preset has its own dedicated demo and "how to install" documentation.

> Presets are **opt-in**, meaning that you, as a developer, get to choose which one you use.
>
> This decision is **up to you** only, and you will likely choose the preset that matches the closest your business needs/requirements.

---

## Why presets?

The boilerplate was built with re-usability in mind, but also tries to solve non-trivial issues such as:
- [Analytics](./analytics)
- [Monitoring](./monitoring)
- [API manipulation](./analytics)
- [Dynamic i18n](../reference/terminology#nrn-terms) (content)
- [Static i18n](../reference/terminology#nrn-terms) (website)

Those are non-trivial features, and they can't always be build using open source software.

They are non-trivial to build from scratch, and the use of established standards and worldwide known vendors sometimes helps a lot.

Presets are meant to provide various possibilities of recommended "base code". For instance, you may want to use:
- SSG or SSR
- Multi-tenants or Multiple Single-Tenants or Single Tenant
- Static i18n using a vendor (e.g: Locize), or implemented using static files (no vendor), or maybe you don't need this feature at all
- Sentry to monitor your app (client + server sides), but maybe you already use another different vendor and would like to stick with it
- Analytics, but because you may use SSG only, and your needs are small then Google Analytics may be a better fit for you and avoid additional complexity
- Etc.

NRN currently covers quite a few features, and relies on 3rd party vendors for some of those features.
The more feature NRN covers and the stronger the need for "opt-in predefined set of features" feels like a necessity.

We don't intend of supporting all possible variations though, but we'll try to focus on the basic ones and most requested ones.

The more presets we will offer, and the easiest it will be for any newcomer to get started quickly with a preset that matches their needs as closely as possible.

> For instance, when creating [NRN Admin](https://github.com/UnlyEd/next-right-now-admin), we got started from the `v1-ssr-mst-aptd-gcms-lcz-sty` preset and **had to manually remove MST and i18n** because we didn't need those.
>
> **It's a waste of time if everybody has to do that on their own**, and it strongly limits the boilerplate **re-usability**.

Presets were discussed [in a RFC](https://github.com/UnlyEd/next-right-now/issues/18).

---

## Which presets **are** being considered?

Here is a short list of all presets that **we consider to support in the future**:
- ST (as an alternative to current MST)
- SSG (as an alternative to current SSR)
- Static i18n without Locize provider (as an alternative to current Locize provider, which isn't free)
- No static i18n and no dynamic i18n support
    (completely remove any i18n support as an alternative for those who don't need related i18n complexity and prefer to keep things simpler)

---

## Which presets **aren't** being considered?

We **do not plan** on providing presets for:
- Different monitoring tool than Sentry, as it is one of the best out there, provides a generous free plan, and does the job really well.
- Different analytics tool than Amplitude, as it is the most flexible analytics tool we've experienced.
    For instance, Google Analytics feels like some stuff invented during Stone age in comparison, and GA doesn't play well at all with CSR rendering.
- Different css-in-js tool than Emotion, as we've studied the market quite intensively before picking Emotion, and it's very flexible about usage and covers lots of needs.
    We haven't been limited by Emotion in any way, in 4 months.
- Different CI/CD tool than Github Actions, as it is becoming quite used worldwide and very powerful, for free. There is nothing that matches it, and we don't plan on using GitLab or BitBucket in a foreseen future.

> We will therefore not provide any preset for those tools, but the community is free to open a Github issue and discuss needs and eventually propose a contribution through PR.
>
> We are therefore open to add more/new tooling, but we must discuss it together first! :wink:

## How do I know which preset is best for me?

A preset is nothing more than a preset of features that are built-in within.

So, to decide which one you need, you must compare what features are available versus what features you actually need.
Also, some presets include non-free vendors, or vendors that only provide a limited plan. Depending on those things, you may chose one preset over another.

Here is a summary of all features that are provided through presets:
- **Manage multiple B2B single-tenants**: Do you need to deploy different sites (one per customer) through the same code base (monorepo design)? If so, we've got you covered.
- **I18n**: Do you need to display your app in multiple languages?
    If so, you should start with a preset that allows both ["dynamic i18n" and "static i18n"](../reference/terminology#nrn-terms).
    - Also, depending on your needs, you may want to rely on a professional vendor to store, provide and help with i18n.
        - For instance, our team love Locize for its [in-context editor](https://docs.locize.com/more/incontext-editor), because it really helps translators understand the context of a sentence, and our marketing/product team can make small changes without having to bother developers.
- **Connect with external APIs**: Do you need to use external APIs? It's very much likely for any app nowadays.
    If so, you should start with a preset that provides built-in support. Make sure to select one that fits your needs, we only provide built-in support for GraphQL at the moment.
- **Monitoring**: Do you need to monitor what happens on your server and be warned about bugs and crashes? We bet you do.
- **Analytics**: Do you need to track usage of your features and know how many users visited your site this month? We bet you do.

- **Tip**: Read our [**Vendors overview**](../reference/vendors)

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Concepts](./){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Find your preset](../available-presets){: .btn .btn-blue }
    </span>
    <span class="fs-4" markdown="1">
    [Environments and Stages >](./env-and-stages){: .btn .btn-purple }
    </span>
</div>
