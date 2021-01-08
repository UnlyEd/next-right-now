---
layout: default
title: CI/CD
parent: Guides
nav_order: 60
has_children: true
---

<div class="code-example" markdown="1">
<span markdown="1">
    Make sure you've checked our [Concept: CI/CD](../../concepts/ci-cd) page.
</span>
</div>

---

# GitHub Actions

> GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub.
> Make code reviews, branch management, and issue triaging work the way you want. - [GitHub Actions](https://github.com/features/actions)

## Pricing

GitHub Actions is completely **free for open source projects**.

It provides a free tier for private source projects. If you go above the limit of the free tiers, you'll have to pay.

## Marketplace

You might want to add extra capabilities to your CI/CD workflows, check out the [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) for existing actions!

While this might save you a lot of time, make sure to check the below "Security" section.

### Security

It is important to understand the role of the GitHub Marketplace is really different from what developers might expect.
Developers are familiar with NPM, which takes care of many things, like ensuring a version cannot be rewritten once it's been published.

There is no such thing with the GitHub Marketplace. The Marketplace is merely a way to find existing actions, it's an index. It's by no mean an "action manager".
It won't play a role similar as the one NPM plays with the JavaScript ecosystem.

For instance, while NPM ensures a published version cannot be unpublished, to avoid breaking existing projects, the GitHub Marketplace doesn't perform such thing.

Long story short, if you use someone else's action, there is no way to be a 100% it won't break in the future.
The owner might simply remove its GitHub repository, which would break all projects using that repository.

So, when using GitHub Actions written by other, you need to be aware of this, and avoid using something you cannot rely on in a production system.

> Also, using tags, or branches, are considered unsafe.

Anybody with write access to the repository might (mistakenly, or on purpose) change the SHA associated with a tag or branch.
For instance, using `some-repo/some-action@v1` or `some-repo/some-action@v1.1.1` or `some-repo/some-action@main` are all unsafe ways of using external actions.

It is **strongly recommended to use SHA instead**. Such as `some-repo/some-action@7e644daa2245238d9f11d05e63eb43116d31089a`.
That's the only way to know for certain that nobody can change the code your action will be using without your prior knowledge.
Auditing the source code you use is pointless if you don't use SHA, as that source code can be changed without you noticing nor validating anything.
Although, using SHA won't help if the whole repository is deleted.

Some people recommend using `some-repo/some-action@v1` to automatically benefit from non-breaking changes, bug fixes, and security patches.
While it can be useful, we don't necessarily recommend it.
It has happened by the past, and will happen in the future that such "automatic updates" will break stuff, often due to human error.

Eventually, you do what you want based on how risky things are for you and your business.
Those are merely advices we give you, as we believe they are very important to know, but the choice is yours.

> Those are all really serious concern, we hope the GitHub Actions ecosystem matures and provide a safe way to use the work of other people.
>
> We've expressed our concerns [in a discussion](https://github.com/UnlyEd/next-right-now/discussions/223), if you wish to join.

### Enforcing better security by design

Next Right Now hasn't yet decided what to do about the above-explained security issues.

We're considering a few action plans to limit risks associated with using external actions:
1. Forking all actions used by NRN to cover against catastrophic repository-deleted cases.
    - Very unlikely to happen, but very critical if it does, if no backup exist.
    - Might be complicated to keep the fork up-to-date automatically, and must not automatically change existing refs either (especially tags, which should be considered as "immutable")
        - Currently considering [https://github.com/tgymnich/fork-sync](https://github.com/tgymnich/fork-sync)
1. Using a tool that automatically runs upon committing changes and enforce only SHA are used
    - Currently considering [https://github.com/mheap/pin-github-action](https://github.com/mheap/pin-github-action)
1. Using a GitHub Action to break the workflow if a non-SHA action is found
    - Currently considering [https://github.com/marketplace/actions/ensure-sha-pinned-actions](https://github.com/marketplace/actions/ensure-sha-pinned-actions)

[See #224](https://github.com/UnlyEd/next-right-now/issues/224)
