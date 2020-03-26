# Introduction

> Below are explanations about how NRN works and why we did things the way we did
>
> **Tip**: If you're interested about how to use this project for your own need, see our ["How to use" Guide](./README_HOW_TO_USE.md) instead!

## Introduction videos

### Part 1 - Overview of Next Right Now (15 minutes)
[![Part 1 - Overview of Next Right Now](https://img.youtube.com/vi/kltkFwnFL-k/maxresdefault.jpg)](http://youtu.be/kltkFwnFL-k?hd=1)

> Let's talk about why we built RNR in the first place, how it's meant to be used, whom it is for.
>
> This video features Zeit deployments, i18n, GraphCMS, Locize in-context editor, Sentry monitoring, Amplitude analytics, CI/CD Github Actions

### Part 2 - Developer Experience with Next Right Now (15 minutes)
[![Part 2 - Developer Experience with Next Right Now](https://img.youtube.com/vi/fGlgIEeUqFg/maxresdefault.jpg)](http://youtu.be/fGlgIEeUqFg?hd=1)

> Let's talk about the developer experience (DX) provided by NRN and how it helps being more efficient.
>
> This video features GraphQL auto-completion and local schema update, deployment workflow, CI/CD Github Actions explanations, interactive E2E testing, GraphsCMS field creation

### Guides
- [How to run NRN in debug mode using WebStorm debug configuration](http://youtu.be/3vbkiRAT4e8?hd=1) (2 minutes)

---

## Showcases - Live demo

You can see 2 almost identical demo at:
- [https://nrn-customer1.now.sh](https://nrn-customer1.now.sh)
- [https://nrn-customer2.now.sh](https://nrn-customer2.now.sh)

**Both share the same source code and configuration**, but the database content is different (hosted on GraphCMS).

> **Tip**: You can get metadata at [/api/status](https://nrn-customer1.now.sh/api/status)
>
> **Tip**: All `/api/*` are serverless functions, running under AWS Lambda
