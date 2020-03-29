---
layout: default
title: FAQ
nav_order: 70
---

# FAQ
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

<div class="code-example" markdown="1">
  **Question**: _I wanted to understand how the i18next integration works. How is the `i18nextInstance` passed to react? It seems to be passed to the `Layout` component, but the `Layout` component never uses it. So how does this work?_
</div>

- The i18nextInstance isn't necessary to perform translations actually, it's forwarded as a utility.
- Manipulating the i18nextInstance is not often necessary, using import { Trans, useTranslation } from 'react-i18next'; is what you'll need most of the time when translating content.
- See [`Layout.tsx`](https://github.com/UnlyEd/next-right-now/blob/eb509517199e91a0b1cc646848654c257ca30666/src/components/Layout.tsx#L416), that's where the Layout component passes down to the react tree the `i18nextInstance` defined in [`_app.tsx`](https://github.com/UnlyEd/next-right-now/blob/8cdebadea0a03b6f60709bc1ad673f90bdd4becb/src/pages/_app.tsx#L172)
- The `i18next` library is actually initiated in [i18nextLocize.ts](https://github.com/UnlyEd/next-right-now/blob/3458fa30aecd0dc95ebd2abfeb20c2e45c76a09f/src/utils/i18nextLocize.ts)

[Source](https://github.com/UnlyEd/next-right-now/issues/14#issuecomment-601621163)

---

<div class="pagination-section space-even">
    <span class="fs-4" markdown="1">
    [CHANGELOG](./changelog){: .btn .btn }
    </span>
    <span class="fs-4" markdown="1">
    [CONTRIBUTING](./contributing){: .btn .btn }
    </span>
</div>
