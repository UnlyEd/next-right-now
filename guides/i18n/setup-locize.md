---
layout: default
title: How to setup Locize
parent: I18n
grand_parent: Guides
nav_order: 10
---

# How to setup Locize
{: .no_toc }

<div class="code-example" markdown="1">
Guide about how to properly configure Locize.
</div>

{% include page-toc.md %}

---

## Creating Locize account

The app will throw an error if the `NEXT_PUBLIC_LOCIZE_PROJECT_ID` is not valid.

- **Tip**: You can skip creating your own Locize account if you use the default `NEXT_PUBLIC_LOCIZE_PROJECT_ID` in `.env`,
but note that **new keys won't be created automatically** because `LOCIZE_API_KEY` in `.env` doesn't hold a valid value and should be defined in `.env.local` with a proper value, instead.

- [Create a free (2w trial) account on Locize](https://www.locize.app/register?ref=unly-nrn)
- Make sure to keep `i18n format: i18next/locizify` (by default)
- Make sure to select `publish format: json nested`
- Add French and English languages (french is required for the demo to work properly)
- Add a `common` namespace (and remove the default `latest` namespace)
- (Optional) Update the `src/utils/i18nextLocize.ts:referenceLng` (set to `fr` for the demo), you can leave it to `fr` if you created a French version in Locize
- (Optional) Add a `production` version, you won't need it if you don't deploy to production
    - Set the `Cache-Control max-age` header value _(ex: `86400`)_ for the `production` version (performances + cost optimizations)
- Copy the `Project Id` and `API Key` from the Locize settings page to the `.env` and `.env.local` (`NEXT_PUBLIC_LOCIZE_PROJECT_ID` and `LOCIZE_API_KEY`, respectively)
    - The `NEXT_PUBLIC_LOCIZE_PROJECT_ID` is required for the app to fetch the translations
    - The `LOCIZE_API_KEY` is required for the app to automatically create missing keys to Locize, when working locally (See `src/utils/i18nextLocize.ts:saveMissing` option)
        **This key is sensitive and must not be shared publicly, as it would allow anyone to update your translations through the API.** (it's not injected in the DOM when not working locally, so you're safe for now)
        It is strongly recommended storing it into `.env.local` instead of `.env`, to avoid tracking it by Git.
- If you have already configured Vercel, and if you want to deploy your app online, you must also configure Vercel secrets
    - `vercel secrets add nrn-locize-project-id YOUR_PROJECT_ID`
    - `vercel secrets add nrn-locize-api-key YOUR_API_KEY`

That's it! Your Locize project is setup and ready to use!

### Locize configuration video tutorial (12 minutes)

[![Locize configuration video tutorial](https://img.youtube.com/vi/p7NVIlIGD30/maxresdefault.jpg)](http://youtu.be/p7NVIlIGD30?hd=1)

> This video explains how to create a Locize account and configure versions, languages, namespaces, Caching and how to release new versions to production

### Additional i18n/Locize documentation

- `react-i18next`:
    - [Official react-i18next documentation](https://react.i18next.com/)
    - [Github react-i18next](https://github.com/i18next/react-i18next)
    - [`useTranslation` hook official guide](https://react.i18next.com/latest/usetranslation-hook)
    - [`Trans` component official guide](https://react.i18next.com/latest/trans-component)
- [Official i18next documentation](https://www.i18next.com/)
