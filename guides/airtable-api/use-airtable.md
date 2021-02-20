---
layout: default
title: How to use Airtable
parent: Airtable API
grand_parent: Guides
nav_order: 20
---

# How to use Airtable
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding Airtable usage.
</div>

{% include page-toc.md %}

---

## Overview

[Getting started](https://support.airtable.com/hc/en-us/sections/360003922433)

Airtable is very similar to Excel and Google Sheets. It's more user-friendly than both, but not as powerful sometimes.

We love it for many reasons, even though their API is not great and feels like it's been designed by a bunch of junior developers.
But maybe that explains why their API is still in `v0` even though it was founded in 2012?

## Assets (AKA "Attachments")

Airtable attachments access cannot be secured as they cannot be password-protected.
This is a must-know if you're thinking about storing some assets (images, documents) in Airtable.

If you're thinking about storing sensitive documents, then we strongly suggest you use another provider to store those assets, even though you might store their URL in Airtable itself, with confidence.

Also, attachments don't expire. Once an asset has been uploaded in Airtable, there is no way for you to remove it for real. While you can remove it from your base itself, the asset will still live online "forever".
You might get the Airtable support to remove such asset for you, on a case-by-case basis. We've never tried though.

## Custom "Apps" (previously "Blocks")

Airtable allows you to create your own Apps. We recently created a custom app [`airtable-print-base-schema`](https://github.com/UnlyEd/airtable-print-base-schema).
We're in the process of releasing it as an official app, but it's slow as it goes through a manual process. (been more than 2 months, and still not done due to multiple feedback and change requests from the Airtable team)

Apps are a great way to build your own mini-apps within Airtable, and can be powerful tools for your team.

Your app doesn't need to be officially allowed for you to use it your own Base, but it definitely makes it easier for other people to install it.

## Known limitations

One of the most frustrating things with Airtable is their API. It suffers from so many limitations, it makes it hardly reliable for many use-cases.

- **API rate limit**: There are some rates limit to the API.
    Officially, it's 5 requests/second. Unofficially, they increased it to around 20-30 requests/second due to customer complaints.
    You can't really know when you'll reach the limit, there is no header or such that might help you foreseen reaching the limit. It'll simply respond with some 429 error code when reached.
    This design is bad for us, in particular because we send many requests when building our SSG pages.
    And, because their API is REST-ish, it only supports fetching one "table" at once, meaning you must send 1 request for each table.
- **No webhook**: There is no native/simple way to be notified about a change in the data, there is no WebHook support.
    This limitation might be overcome using a custom App that acts as a listener and call your own server upon detecting changes.
- **No way to retrieve table/fields metadata**: The API only allows to interact with resources, not with the database schema.
- **Backups can be complicated**: Due to the lack of support for reading the database schema, it's very hard to efficiently save the whole database.
    [I've written extensively about that after studying about 10 different backups and restoration strategies](https://community.airtable.com/t/state-of-airtable-backup-restoration-2020-summary-of-existing-tools/36124).
