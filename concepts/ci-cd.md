---
layout: default
title: CI/CD
parent: Concepts
nav_order: 60
---

# Continuous Integration & Continuous Deployment (CI/CD)
{: .no_toc }

<div class="code-example" markdown="1">
**Continuous Integration** is the practice of automating the integration of code changes from multiple contributors into a single software project. The CI process is comprised of automatic tools that assert the new code’s correctness before integration. A source code version control system is the crux of the CI process. The version control system is also supplemented with other checks like automated code quality tests, syntax style review tools, and more.

[Source](https://www.atlassian.com/continuous-delivery/continuous-integration)

**Continuous Deployment** is a software release process that uses automated testing to validate if changes to a codebase are correct and stable for immediate autonomous deployment to a production environment.

[Source](https://www.atlassian.com/continuous-delivery/continuous-deployment)

> Simply put, CI/CD is a way of automating integration and deployment of source code changes, run various checks, and eventually deploy a newer version of the software, without requiring human interaction.
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
