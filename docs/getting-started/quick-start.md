---
layout: default
title: Quick start
parent: Getting started
nav_order: 20
---

# Quick start

This short tutorial will explain how to perform a super quick local installation (for local-only testing purpose, without deploying anything online)

This tutorial uses the [**`v1-ssr`**](../getting-started/pick-variant) variant, which is the ~~simplest~~ _only one_ available at this time.

> It doesn't really matter if the selected variant fits your needs, the goal here is to give your a tour of what NRN can do for you, as quick as possible.

## Step by step installation

> **Tip**: Using now@17+ is required for CI to work properly when deploying to Zeit, but we don't care about that as we just want to get started quickly.

{% include installation-guide-simple.md variant=v1-ssr %}

{% include installation-guide-tips.md %}

## Deploying on Zeit

1. If you have a Zeit account, you can deploy to Zeit but you need to change the associated Zeit `scope` first (it currently uses ours, because it's required for our CI/CD Github Actions)
  - Remove the whole line `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` in all `now.*.json` files
  - `yarn add -D now@17.0.4` to install an up-to-date `now` CLI
  - (Optional) Run `now login` if you aren't authenticated to Zeit from your local machine. Typically, if it's the first time you use Zeit you'll need to do it.
  - `yarn start` - Will create a `.now` folder containing project metadata.
  - Add a `scope` line in all `now.*.json` files using the `projectId` in `.now/project.json`
  - `yarn deploy` - Will deploy the project online, and automatically create the Zeit project first, if it doesn't exist already
  - Go to [Zeit](https://zeit.co/) to see the project being deployed, go through logs, etc.

> Zeit doesn't provide the `projectId` from the Zeit platform itself, even if the project exists already. Running `yarn start` locally is the only way to know what is your `projectId`, AFAIK.

---

<div markdown="1" style="text-align: center">
**Recommended**:

Go through the Concepts section
</div>

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Video tutorials](./video-tutorials){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Concept: Variants >](../concepts/variants){: .btn .btn-purple }
    </span>
</div>

---

<div markdown="1" style="text-align: center">
**For experienced developers**:

Pick the Variant that best fit your needs and get started ASAP
</div>

<div class="pagination-section" style="justify-content: center">
    <span class="fs-4" markdown="1">
    [Pick your variant >](./pick-variant){: .btn .btn-blue }
    </span>
</div>

