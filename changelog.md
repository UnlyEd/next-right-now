---
layout: default
title: CHANGELOG
nav_order: 80
---

Changelog
===

> This changelog **doesn't follow Semantic Versioning**.

- We upgrade the **major** version when adding a new preset that changes how Next apps are meant to be used/built, resulting in a non-trivial **redesign of the NRN base code**.
  - Such as the big SSG change in v9.3, which uses a completely different paradigm

This changelog is mostly used as a preset release history, but it is not meant to warn about non-backward compatible changes within presets.

---

## Changes across presets

To see an exhaustive list of changes (added across presets), check out the [merged PR](https://github.com/UnlyEd/next-right-now/pulls?q=is%3Apr+sort%3Aupdated-desc+is%3Amerged).

All changes are merged through PRs, for easier reviews.

*I basically don't have the time to keep a documented version of what's included in each preset branch (too much work).*
*If you want to know what's included within each preset, the easiest way is to review which commits are included in those presets.*

**Long story short**:
`v2-mst-aptd-at-lcz-sty` and `v2-mst-aptd-gcms-lcz-sty` are both kept up-to-date. Changes that aren't specific to one preset are applied to both.

---

## Presets releases

- 2020-07-16 (v2)
    - Released [`v2-mst-aptd-at-lcz-sty`](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-at-lcz-sty) preset - [PR](https://github.com/UnlyEd/next-right-now/pull/131)
        - Very similar to [`v2-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-gcms-lcz-sty) preset
        - Brings a much better CMS vendor (Stacker) for manipulating database content
            - This replaces our [NRN-Admin OSS project](https://github.com/UnlyEd/next-right-now-admin) (based on React Admin) which hasn't yielded the expected result
        - Use GraphCMS vendor instead of Airtable vendor (database)
        - Features advanced use-cases with embedded previews from CMS to NRN app
            - Basically, allows to preview a record on Stacker CMS using iframes hosted on NRN app
        - Features advanced [Markdown to JSX runtime transform](https://github.com/UnlyEd/next-right-now/discussions/99) for storing React components within Airtable
    - Changed default preset from `v2-mst-aptd-gcms-lcz-sty` to `v2-mst-aptd-at-lcz-sty`
- 2020-02-30 (v2)
    - New major version v2 due to complete refactoring of the whole NRN app (due to Next 9.3/9.4 which completely changed the way to build apps and added the SSG rendering mode)
    - Released [`v2-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-gcms-lcz-sty) preset
        - Uses Next v9.4+
        - Supports hybrid SSG/SSR rendering modes
        - New NRN demo and showcase many more examples - See [#45](https://github.com/UnlyEd/next-right-now/issues/45)
    - Changed default preset from `v1-ssr-mst-aptd-gcms-lcz-sty` to `v2-mst-aptd-gcms-lcz-sty`
- 2020-02-28 (v1)
    - New major version v1
    - Released [`v1-ssr-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/tree/v1-ssr-mst-aptd-gcms-lcz-sty) preset
        - Uses Next v9.3.4
        - Doesn't support SSG, only supports SSR

---

<div class="pagination-section space-even">
    <span class="fs-4" markdown="1">
    [FAQ](./faq){: .btn .btn }
    </span>
    <span class="fs-4" markdown="1">
    [CONTRIBUTING](./contributing){: .btn .btn }
    </span>
</div>
