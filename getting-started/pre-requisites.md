---
layout: default
title: Pre-requisites
parent: Getting started
nav_order: 15
---

# Pre-requisites

---

NRN expects the following to be already installed on your computer:

- [Git](https://git-scm.com/downloads) will be necessary to clone the repository on your computer.
- _(Optional)_ A proper Node Version Manager (NVM) to manage installed Nodejs versions (allows switching between versions)
    - It's not really a requirement, but a good practice for any developer working on multiple projects (which eventually leads to working on different nodejs versions).
        - [NVM for Unix](https://github.com/nvm-sh/nvm) (run the [install script](https://github.com/nvm-sh/nvm#install--update-script))
        - [NVM for Windows](https://github.com/coreybutler/nvm-windows) (download the [latest `nvm-setup.zip`](https://github.com/coreybutler/nvm-windows/releases))
    - **If you don't use NVM**, then please use node `v12` for the next steps. [Because that's what's used by Vercel hosting](../guides/online-deployment/use-vercel)
- Node.js should be installed (it's installed by NVM, so you're probably already covered)
- _(Optional)_ [Yarn](https://classic.yarnpkg.com/en/docs/install/) is preferred over NPM, for various reasons. All our example use Yarn, but you can theoretically use either.

As you can see, there is no particular dependency to use NRN, all those tools are probably already installed on your computer!

_Note that Cypress will require additional binaries, but it's not a requirement, and we'll cover that part later._

## Operating systems compatibility

### Unix (MacOS/Linux distributions)

NRN has only been extensively tested on **MacOS Catalina**, we expect **Unix-based OS** to behave properly.

### Windows

NRN v2 has been tested on Windows (on June 1st, 2020) and works correctly.

Tested on Windows 8 (using Babun and WebStorm) and Windows 10 (using VSCode).

[Read our FAQ](../faq#can-i-use-nrn-on-windows)

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Video tutorials](./video-tutorials){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Quick start >](./quick-start){: .btn .btn-purple }
    </span>
</div>
