---
layout: default
title: Pre-requisites
parent: Getting started
nav_order: 15
---

# Pre-requisites

---

NRN expects the following to be already installed on your computer:

- (optional) [NVM](https://github.com/nvm-sh/nvm) to manage installed Nodejs versions (allows switching between versions)
    - It's not really a requirement, but a good practice for any developer working on multiple projects (which eventually leads to working on different nodejs versions).
    - **If you don't use NVM**, then please use node `v12` for the next steps. [Because that's what's used by Vercel hosting](../guides/online-deployment/use-zeit)
- Node.js should be installed (it's installed by NVM, so you're probably already covered)
- [Git](https://git-scm.com/downloads) will be necessary to clone the repository on your computer.

As you can see, there is no particular dependency to use NRN, all those tools are probably already installed on your computer!

_Note that Cypress will require additional binaries, but it's not a requirement, and we'll cover that part later._

## Operating systems compatibility

NRN has only been extensively tested on **MacOS Catalina**, we expect **Unix-based OS** to behave properly.

**Windows** users have reported several issues, which aren't always related with NRN itself, we don't use Windows ourselves, so it's hard to cover it.

Feel free to improve the experience for other Windows developers through PR and issues.


---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
    [< Video tutorials](./video-tutorials){: .btn }
    </span>
    <span class="fs-4" markdown="1">
    [Quick start >](./quick-start){: .btn .btn-purple }
    </span>
</div>
