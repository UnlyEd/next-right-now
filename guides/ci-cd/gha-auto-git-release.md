---
layout: default
title: GitHub Action - Auto release
parent: CI/CD
grand_parent: Guides
nav_order: 10
---

# GitHub Action - Auto release
{: .no_toc }

<div class="code-example" markdown="1">
Automatically tag and release when changes land on any branch.

Tag and release changes on the master branch, as releases. (one release per commit)
Tag and pre-release changes on the other branches, as pre-releases with a "x" as "patch" indicator.
(one release per branch, the release is updated at every push)
</div>

{% include page-toc.md %}

---

## Workflow file(s)

This action is related to the workflow file:
- `.github/workflows/auto-git-release.yml`

This action doesn't require any particular configuration.
