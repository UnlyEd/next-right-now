---
layout: default
title: Quick start
parent: Getting started
nav_order: 20
---

# Quick start

This short tutorial will explain how to perform a super quick local installation (for local-only testing purpose, without deploying anything online)

This tutorial uses the [**`v1-ssr`**](./available-variants) variant, which is the ~~simplest~~ _only one_ available at this time.

> It doesn't really matter if the selected variant fits your needs, the goal here is to give your a tour of what NRN can do for you, as quick as possible.

## Step by step installation

> **Tip**: Using now@17+ is required for CI to work properly when deploying to Zeit, but we don't care about that as we just want to get started quickly.

1. `git clone git@github.com:UnlyEd/next-right-now.git` - Clones the boilerplate
1. `git checkout v1-ssr` - Select the variant
1. Duplicate the `.env.build.example` and rename it `.env.build` _(this file is only used on your local computer)_
1. `nvm use` - Selects the right node.js version based on the `.nvmrc` file
1. `yarn add -D now@16.7.3`, now@17+ requires to be authenticated to Zeit in order to launch the project **locally**, so you must use now@16 instead, to avoid additional setup
1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
1. That's it! The project now works on your local computer, and should be identical to the online demo

> **Tip**: You can start the project in **debug mode** (built-in for WebStorm only) [by running the WebStorm "Debug" configuration in debug mode](https://youtu.be/3vbkiRAT4e8)
>
> **Tip**: Configure your IDE not to index `.next` and `.now` folders as they will eat a lot of your memory because they're changed very frequently
> On WebStorm, right click on the folders and select `Mark directory as > Excluded`.

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

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Video tutorials](./video-tutorials){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Available variants >](./available-variants){: .btn .btn-purple }
    </span>
</div>
