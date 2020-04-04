---
layout: default
title: Folder structure
parent: Reference
nav_order: 20
---

# Project folders structure

<div class="code-example" markdown="1">
Overview of the project folder and files structure
</div>

---

- `cypress`: Folder used by Cypress (E2E), see ["Getting started"](https://docs.cypress.io/guides/getting-started/installing-cypress.html#npm-install)
- `public`: Static files, see ["Static file serving](https://nextjs.org/docs/basic-features/static-file-serving)
- `src`: Source code of the app
    - `Components`: React components
        - `__snapshots__`: Folder used by Jest when using [Snapshot testing](https://jestjs.io/docs/en/snapshot-testing)
        - `svg`: SVG components, imported from `src/svg`
    - `gql`: GraphQL queries, partials, etc.
    - `hoc`: React High Order Components
    - `pages`: Next.js pages, see ["Pages"](https://nextjs.org/docs/basic-features/pages)
    - `propTypes`: Shared propTypes (for re-usability)
    - `svg`: Contains both `.svg` files and their react `.tsx` version. When a SVG is converted to a TSX component, it should then be copied to `src/components/svg` to be used within the app.
    - `types`: Shared types (for re-usability)
        - `data`: Types that are data-related, basically those that are related to a database record
    - `utils`: Various utilities
