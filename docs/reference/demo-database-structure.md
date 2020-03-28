---
layout: default
title: Demo DB structure
parent: Reference
nav_order: 30
---

### Demo database structure

> Data structure of the GraphCMS database used as example.
>
> This is only useful if you wish to understand the relationships and data structure of the demo, you don't really need it.
> But if you fork and try to rebuild the demo on your own GraphCMS endpoint, it'll come in handy.

- customer
    - ref - Single line text, required, unique
    - label - Single line text, localized
    - theme - Theme
    - products - Product[]
    - terms - RichText Editor, localized
- product
    - title - Single line text, required, localised
    - images - Asset[]
    - description - Markdown, localized
    - customer - Customer
    - price - float
- theme
    - primaryColor - Single line text, required
    - logo - Asset, required
    - customer - Customer
