---
layout: default
title: How to setup WebStorm
parent: IDE
grand_parent: Guides
nav_order: 10
---

# How to setup WebStorm IDE
{: .no_toc }

<div class="code-example" markdown="1">
Guide about how to properly configure your WebStorm IDE.
</div>

{% include page-toc.md %}

---

## Exclude write-heavy directories to improve performances

Configure your IDE not to index `.next` and `.vercel` folders as they will eat a lot of your RAM because their files are changed very frequently!

On WebStorm, right click on the folders and select `Mark directory as > Excluded`.
