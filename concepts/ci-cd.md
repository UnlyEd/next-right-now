---
layout: default
title: CI/CD
parent: Concepts
nav_order: 60
---

# Continuous Integration & Continuous Deployment (CI/CD)

{: .no_toc }

<div class="code-example" markdown="1">
Continuous integration and continuous delivery are best practices for software development. Continuous integration is the software development practice of
merging code changes into the project early and often. Instead of building out features in isolation and then integrating them at the end of a development
cycle, code integrates with the shared repository multiple times throughout the day.

**Continuous Integration** grew out of a need to have developers working on features in parallel and on separate branches without fear of conflict. CI pipelines
include automatic tools and processes (i.e. unit tests, linting tools) that automatically verify the code changes before merging it into the repository.
Developers are less likely to be blocked by another developer’s work. CI results in changes that are easier to test and to revert. New work is introduced
quickly in smaller bites. This also creates easier to review pull requests. These practices lead to a reduction in the time it takes to review PRs, find bugs
and QA changes, while also maintaining the integrity and stability of the project.

[Source](https://www.atlassian.com/continuous-delivery/continuous-integration)

**Continuous Deployment** is a software release process that uses automated testing to validate if changes to a codebase are correct and stable for immediate
autonomous deployment to a production environment. It ensures code changes are tested and ready for production deployment as soon as they are merged into the
project. While the code does not have to be deployed to production, it should have been tested on a staging or a production environment. Our CI pipeline also
includes automatic tools and processes (i.e. integration tests, end-to-end tests) that automatically test that the code is production-ready before releasing it
to the repository.

[Source](https://www.atlassian.com/continuous-delivery/continuous-deployment)

Simply put, CI/CD is a way of automating integration and deployment of source code changes, run various checks, and eventually deploy a newer version of the software, without requiring human interaction.
</div>

{% include page-toc.md %}

---

We use GitHub Actions as our CI/CD tools, and all our deployments are automated.

Read more about [NRN CI/CD workflow](../guides/ci-cd#workflow-of-our-vercel--github-actions-integration)

---

<div class="pagination-section">
    <span class="fs-4" markdown="1">
        [< Monitoring](./monitoring){: .btn }
    </span>
    <span class="fs-4" markdown="1">
        [Guides: CI/CD](../guides/ci-cd){: .btn .btn-blue }
    </span>
    <span class="fs-4" markdown="1">
        [Testing >](./testing){: .btn .btn-purple }
    </span>
</div>
