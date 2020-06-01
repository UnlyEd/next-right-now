---
layout: default
title: FAQ
nav_order: 70
---

# FAQ
{: .no_toc }

{% include page-toc.md %}

---

## Can I use NRN on Windows?

{% include windows-concerns.md %}

[See original question](https://github.com/UnlyEd/next-right-now/issues/55)

## I try to deploy locally, but I get "The specified scope does not exist"

```
$ npx now
Now CLI 17.1.1
Error! The specified scope does not exist
> More details: https://err.sh/now/scope-not-existent
```

**This is because you're using NRN own `scope` in your `now.*.json` files.**

1. Remove the whole line `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` in all `now.*.json` files.
    - **Tip**: Don't forget `now.json` is a **symlink** and **shouldn't** to be modified (run `ln now.staging.json now.json` if you messed it up :wink:)

## How is the `i18nextInstance` passed to react?

<div class="code-example" markdown="1">
  **Question**: _I wanted to understand how the i18next integration works. How is the `i18nextInstance` passed to react? It seems to be passed to the `Layout` component, but the `Layout` component never uses it. So how does this work?_
</div>

- The `i18nextInstance` isn't necessary to perform translations actually, it's forwarded as a utility.
- Manipulating the `i18nextInstance` is not necessary, using `import { Trans, useTranslation } from 'react-i18next';` is what you'll need most of the time when translating content.
- The `i18next` library is actually initiated in `i18nextLocize.ts`

[See original question](https://github.com/UnlyEd/next-right-now/issues/14#issuecomment-601557549)

---

<div class="pagination-section space-even">
    <span class="fs-4" markdown="1">
    [CHANGELOG](./changelog){: .btn .btn }
    </span>
    <span class="fs-4" markdown="1">
    [CONTRIBUTING](./contributing){: .btn .btn }
    </span>
</div>
