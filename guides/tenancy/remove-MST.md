---
layout: default
title: Remove MST
parent: Tenancy
grand_parent: Guides
nav_order: 10
---

# How to remove MST tenancy design
{: .no_toc }

<div class="code-example" markdown="1">
Guide about how to remove the Multi Single Tenancy feature, to use only one tenant instead.
</div>

---

## About the Multi Single Tenancy (MST)

Right now, NRN only provides a MST design because [that's just easier to maintain than several tenancy models](https://github.com/UnlyEd/next-right-now/issues/151#issuecomment-683463185).

Long story short, if you find yourself using a preset with MST design built-in, but don't have any use for it, you can:
- Keep it and only use one tenant. The impact would be very small, it will definitely work properly, even though you only use one tenant.
- Remove the MST feature manually.
    - _I don't advise anybody not familiar with the NRN source code doing that, it's not super-complicated, but you need to understand what happens on Vercel and Github Actions quite well._

Also, if you think you might use it someday, then better to keep it for now then, because it's much harder to configure it properly than to remove it.

## Step-by-step guide

Removing MST is fairly simple, when you know what you're looking for :wink:.

- Only keep one deployment file per environment (e.g: `vercel.staging.json` instead of `vercel.customer1.staging.json`).
- Remove all unnecessary scripts related to "customer2".
- Do a full search of the project looking for `customer2`, that will tell you where to look for stuff related to MST.
- Do a full search of the project looking for `NEXT_PUBLIC_CUSTOMER_REF`, that will tell you where to look for stuff related to MST, you can remove that ENV variable.
- Cypress (E2E)
    - Rename `cypress/videos/customer1` by `cypress/videos/production` and update `e2e` scripts to use `CYPRESS_STAGE=production` instead.
        - You basically need to have a `videos/production` folder to store videos artifacts when E2E tests are executed manually through CLI.
    - Same applies to the `cypress/screenshots` folder.
    - Similarly, the `cypress/config*.json` files should be updated.
- Update the Github Actions scripts in `.github/workflows` to make sure the E2E tests use the proper JSON file (`run-2e2-tests` action)
- You'll need to update the GHA deployment scripts to run the proper deployment command (ignoring stuff related to the customer)
    - Basically, stuff like this
        - `yarn deploy:$(cat vercel.json | jq -r '.build.env.NEXT_PUBLIC_CUSTOMER_REF'):production:simple --token $VERCEL_TOKEN`
        - should become
        - `yarn deploy:production:simple --token $VERCEL_TOKEN`

That should be all, make sure to do things step by step (GHA, then E2E, etc.) and things in between because it's likely to break things if you're not careful.
