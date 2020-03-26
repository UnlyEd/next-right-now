---
layout: default
title: Online demo
parent: Getting started
nav_order: 20
---

## Showcases - Live demo

You can see 2 almost identical demo at:
- [https://nrn-customer1.now.sh](https://nrn-customer1.now.sh)
- [https://nrn-customer2.now.sh](https://nrn-customer2.now.sh)

**Both share the same source code and configuration**, but the database content is different (hosted on GraphCMS).

> **Tip**: You can get metadata at [/api/status](https://nrn-customer1.now.sh/api/status)
>
> **Tip**: All `/api/*` are serverless functions, running under AWS Lambda

### Demo data structure

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
