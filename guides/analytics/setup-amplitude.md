---
layout: default
title: How to setup Amplitude
parent: Analytics
grand_parent: Guides
nav_order: 10
---

# How to setup Amplitude
{: .no_toc }

<div class="code-example" markdown="1">
Guide about how to properly configure Amplitude.
</div>

{% include page-toc.md %}

---

## Create an Amplitude account

1. Go to [https://amplitude.com/](https://amplitude.com/?ref=unly-nrn) and check their online demo to familiarise you a bit with the features and UI.
1. [Create an account](https://amplitude.com/signup?ref=unly-nrn)
1. Create a "[NRN] Staging" project. We recommend to use a different project per stage.
    - We usually have one "Production" and one "Stating" versions, the staging version stores both development and staging events in order to keep the production database clean
1. Create a "[NRN] Production" project
1. Once your projects are created, go to "Manage data" (bottom left)
1. Select your project
1. Go to "Project settings"
1. Copy the "API Key" value (not the secret!) and apply it to `NEXT_PUBLIC_AMPLITUDE_API_KEY` in `.env`
1. If you have already configured Vercel, and if you want to deploy your app online, you must also configure Vercel secrets
    - `vercel secrets add nrn-amplitude-api-key-staging YOUR_AMPLITUDE_STAGING_API_KEY`
    - (Optional) Get your "[NRN] Production" "API key" too, and run `vercel secrets add nrn-amplitude-api-key-production YOUR_AMPLITUDE_PRODUCTION_API_KEY`
        - This is only useful if you attempt to deploy to production

That's it! Your Amplitude account is ready to use!
