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
- We upgrade the **minor** version when **adding a new preset**.

This changelog is mostly used as a preset release history, but it is not meant to warn about non-backward compatible changes within presets.

---

- v1.1.0 - 2020-02-28
    - Added [`v2-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-gcms-lcz-sty) preset
        - Uses Next v9.4+
        - Supports hybrid SSG/SSR rendering modes
        - New NRN demo and showcase many more examples - See [#45](https://github.com/UnlyEd/next-right-now/issues/45)
    - Changed default preset from `v1-ssr-mst-aptd-gcms-lcz-sty` to `v2-mst-aptd-gcms-lcz-sty`
- v1.0.0 - 2020-02-28
    - Added [`v1-ssr-mst-aptd-gcms-lcz-sty`](https://github.com/UnlyEd/next-right-now/tree/v1-ssr-mst-aptd-gcms-lcz-sty) preset
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
