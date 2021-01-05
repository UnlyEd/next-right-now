---
layout: default
title: Demo DB structure
parent: Reference
nav_order: 30
---

# Demo database structure
{: .no_toc }

{% include page-toc.md %}

---

## Airtable vendor

> Data structure of the Airtable database used as example.
>
> This is useful if you wish to understand the relationships and data structure of the demo.
>
> You can "Copy base" (top right) if you wish to quickly duplicate the base to make it your own.
> It can be a good starting point if you're using Next Right Now as a boilerplate for your own project!

[See Base configuration](https://airtable.com/shrnxN46JDBkQV9u1)

## GraphCMS vendor

> Data structure of the GraphCMS database used as example.
>
> This is useful if you wish to understand the relationships and data structure of the demo.
>
> It's useful if try to rebuild the demo on your own GraphCMS endpoint (after cloning, for example).

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
