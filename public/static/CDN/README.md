# CDN

> This folder is a copy of our CDN and is meant to be used as reference.
>
> **It is not directly used by the project itself.**

---

## `detect-outdated-browser`

> Based on https://github.com/mikemaccana/outdated-browser-rework

Copy of https://github.com/mikemaccana/outdated-browser-rework/blob/5cc5dd986d17bc168ba9699a8f4d54b42401155d/dist/outdated-browser-rework.min.js, based on commit https://github.com/mikemaccana/outdated-browser-rework/commit/5cc5dd986d17bc168ba9699a8f4d54b42401155d

**Changes**:
- The copy has been customised to auto run the script once loaded, using the default settings
- Also, links pointing to `http://outdatedbrowser.com/` have been replaced by `https://browser-update.org/update-browser.html` because of https://github.com/mikemaccana/outdated-browser-rework/issues/72

> See [CDN folder](https://console.cloud.google.com/storage/browser/the-funding-place/assets/libs/outdated-browser-rework?organizationId=581986496946&project=loan-advisor-194400)

### Note about Next.js
There are no way of performing outdated browser support other than using external JS/CSS files, because everything in `src/components/Head.tsx` is bundled by Next.js
and ends up bundled together, which completely fails to be loaded by outdated browsers such as IE11 which may not be able to parse the source code

Because of this, we load an external JS file and CSS file (async if possible for perfs) from a CDN so that it doesn't get bundled with the rest of the source code, but is executed on its own instead.
