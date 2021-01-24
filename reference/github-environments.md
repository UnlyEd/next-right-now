---
layout: default
title: GitHub environments and deployments
parent: Reference
nav_order: 80
---

# GitHub environments and deployments
{: .no_toc }

<div class="code-example" markdown="1">
GitHub deployments help display a history of your deployments. They don't perform the actual deployments (Vercel does), but simply keep a trace of it.
</div>

---

## Introduction to GitHub deployments

[Official documentation](https://docs.github.com/en/rest/reference/repos#deployments)

## GitHub Deployment with Next Right Now

Next Right Now integrates GitHub Deployments since [v5.0.7 (January 2021)](https://github.com/UnlyEd/next-right-now/issues/280) to help keep track of what deployments are sent to Vercel.

They are not meant to replace the Vercel dashboard, but to complementary.

> At Unly, they're useful to our Customer Success and Support teams, so they can keep track of a customer's deployment history without developers' assistance.

> For Next Right Now, they're useful to visitor looking for the deployment history of a demo customer, because they don't have access to the Vercel deployment history.
