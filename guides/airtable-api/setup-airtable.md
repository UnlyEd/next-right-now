---
layout: default
title: How to setup Airtable
parent: Airtable API
grand_parent: Guides
nav_order: 10
---

# How to setup Airtable
{: .no_toc }

<div class="code-example" markdown="1">
Step by step guide about how to create and properly configure your Airtable account.
</div>

{% include page-toc.md %}

---

## Create Airtable account

- [Create a free account on Airtable](https://airtable.com/signup/?ref=unly-nrn)
- [Create a new base based on the base we used](https://airtable.com/shrnxN46JDBkQV9u1)
    - You'll need to replicate the base manually, ask on GitHub if you run into issues

---

## Learn how to configure your Airtable base

#### API token

Be extra careful about the Airtable API token, it's the same token shared for all your bases within your Airtable account.
If it gets leaked, it may cause the leak of all your bases.

> When I created this NRN demo with Airtable, I created a whole different account so that it wouldn't affect my company business in any way.

You can find your API token by going on any Base > Help > API documentation > Check "Show API key" and scroll to the "Authentication" section.


---

## Configure Airtable credentials

You need to set `AIRTABLE_BASE_ID` and `AIRTABLE_API_KEY` in your `.env.local` file to work locally.

You'll also need to add those values as Vercel secrets.

Example: `now secrets add nrn-airtable-api-key your-key`

---

<div class="pagination-section space-even">
    <span class="fs-4" markdown="1">
    [How to use GraphCMS >](./use-graphcms){: .btn .btn-purple }
    </span>
</div>
