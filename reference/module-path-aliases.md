---
layout: default
title: Module path aliases
parent: Reference
nav_order: 25
---

# Module paths aliasing

<div class="code-example" markdown="1">
Understanding what is "module path aliases", why to use it and how to change it.
</div>

---

## What are "module path aliases"?

> We redacted [an article](https://dev.to/vadorequest/migrating-next-js-jest-storybook-cypress-to-use-module-path-aliases-instead-of-relative-paths-d9a) about "why" we decided to use module path aliases.

Module path aliases [are supported by Next.js since v9.4](https://nextjs.org/docs/advanced-features/module-path-aliases).

## Module path aliases in Next Right Now

Next Right Now has introduced module path aliases as part of the huge refactoring of the folder structure on January 20, 2021:
- [See "Use module path aliases" #265 PR](https://github.com/UnlyEd/next-right-now/pull/265)
- [See "(MAJOR) Massive folder structure refactoring (`v2-mst-aptd-at-lcz-sty`), using modular approach and module path aliases" PR](https://github.com/UnlyEd/next-right-now/pull/264)

### How/where are configured module path aliases?

The following path aliases have been configured thorough the whole app (at 7 different places). They're used in

- `tsconfig.json`
- `cypress/tsconfig.json`
- `.storybook/jsconfig.json`
- `cypress/jsconfig.json`
- `.storybook/main.js:webpackFinal`
- `jest.config.js:moduleNameMapper`

For instance, here's what contains `/tsconfig.json`:
```json
{
    "@/app/*": [
        "src/app/*"
    ],
    "@/common/*": [
        "src/common/*"
    ],
    "@/components/*": [
        "src/common/components/*"
    ],
    "@/utils/*": [
        "src/common/utils/*"
    ],
    "@/layouts/*": [
        "src/layouts/*"
    ],
    "@/modules/*": [
        "src/modules/*"
    ],
    "@/pages/*": [
        "src/pages/*"
    ]
}
```

### How to add more module path aliases?

You'll need to update all above-mentioned files to add or remove a module path alias.

Additionally, if you add more tools affected by the build, they might need their own webpack/typescript/custom configuration (such as what we did for Jest, Storybook and Cypress).
