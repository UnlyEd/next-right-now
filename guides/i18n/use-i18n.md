---
layout: default
title: How to use i18n
parent: I18n
grand_parent: Guides
nav_order: 1
---

# How to use i18n
{: .no_toc }

<div class="code-example" markdown="1">
Advices and "must-know" things regarding i18n usage.
</div>

{% include page-toc.md %}

---

## Overview

### Dependencies

- [`@unly/universal-language-detector`](https://github.com/UnlyEd/universal-language-detector): Language detector that works universally (browser + server) - Meant to be used with a universal framework, such as Next.js

We only rely on this library, which hides away the complexity of universal language detection.
