---
layout: default
title: Scripts and utilities
parent: Guides
nav_order: 120
has_children: false
---

<div class="code-example" markdown="1">
<span markdown="1">
    Built-in scripts
</span>
</div>

---

# Scripts

Here is a documented version of the Next Right Now built-in scripts:

<div class="code-example" markdown="1">

```json5
{
    // Starts the local development server
    "start": ". ./scripts/populate-git-env.sh && next dev --port 8888",

    // Start a HTTP/HTTPS tunnel using ngrok, allowing to give access to the development server through an url to other people (useful for sharing your work, collaborating, debugging, etc.)
    "start:tunnel": "ngrok http 8888",

    // Build script, called by Vercel upon project build. Runs tests before doing build, but don't run integration tests (too slow)
    "build": "yarn test:once:group:no-integration && next build",

    // Creates an optimized production build in profiling mode, allowing you to use the profiler on generated the production build - See https://nextjs.org/docs/api-reference/cli#build
    "build:profiler": ". ./scripts/populate-git-env.sh && next build --profile --debug",

    // Analyze the production JS bundle, useful to understand what are the libraries that take most space - See https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
    // Only the production bundle matters, the development bundle never reaches the real clients
    "analyse:bundle": "yarn analyse:bundle:production",
    "analyse:bundle:development": "ANALYZE_BUNDLE=true yarn start",
    "analyse:bundle:production": "ANALYZE_BUNDLE=true next build",

    // Uses next-unused to find unused files in the Next.js project - See https://www.npmjs.com/package/next-unused
    // Beware, as it finds a lot of false-positive results, though
    "analyse:unused": "next-unused",

    // Convert all .svg files in src/svg folder into .tsx files within the same folder - See https://www.npmjs.com/package/svgr
    // You must then copy all the generated .tsx files into src/components/svg
    // This manual step is on purpose, to avoid overwriting existing SVG-as-React-components mistakenly
    // From experience, we often customise those generated .tsx components by hand, and those changes would likely be overwritten if we were to replace the src/components/svg directly
    "svg": "npx svgr -d src/svg src/svg --ext tsx --template src/utils/svg/svgTemplate.ts",

    // Deploy scripts to deploy different customers (Multi Single Tenancy)
    // The ":simple" version don't run E2E tests and are therefore much faster to run
    "deploy": "yarn deploy:customer1",
    "deploy:all": "yarn deploy:customer1 && yarn deploy:customer2",
    "deploy:all:production": "yarn deploy:customer1:production && yarn deploy:customer2:production",
    "deploy:all:production:simple": "yarn deploy:customer1:production:simple && yarn deploy:customer2:production:simple",
    "deploy:all:all": "yarn deploy:all && yarn deploy:all:production",

    // Deploy script executed by GitHub Action (GHA)
    "deploy:ci:gha": "yarn vercel:cleanup && yarn vercel:deploy --local-config=vercel.${CUSTOMER_REF}.staging.json",

    // Deploy scripts you can execute locally to deploy customers online, they're also executed by GitHub Actions
    "deploy:customer:production:simple": "yarn vercel:cleanup && yarn vercel:deploy --local-config=vercel.${CUSTOMER_REF}.production.json --prod",
    "deploy:customer1:all": "yarn deploy:customer1 && yarn deploy:customer1:production",
    "deploy:customer1": "yarn vercel:cleanup && yarn vercel:deploy --local-config=vercel.customer1.staging.json",
    "deploy:customer1:production": "yarn deploy:customer1:production:simple && yarn e2e:customer1:production",
    "deploy:customer1:production:simple": "yarn vercel:cleanup && yarn vercel:deploy --local-config=vercel.customer1.production.json --prod",
    "deploy:customer2:all": "yarn deploy:customer2 && yarn deploy:customer2:production",
    "deploy:customer2": "yarn vercel:cleanup && yarn vercel:deploy --local-config=vercel.customer2.staging.json",
    "deploy:customer2:production": "yarn deploy:customer2:production:simple && yarn e2e:customer2:production",
    "deploy:customer2:production:simple": "yarn vercel:cleanup && yarn vercel:deploy --local-config=vercel.customer2.production.json --prod",

    // Creates an empty commit that contains no code. Useful to force a CI trigger by pushing no code.
    // Vercel will re-trigger a new deployment because we use the "--force" option in our CI, otherwise Vercel wouldn't trigger a real deployment as no code change would be detected
    "deploy:fake": "git commit --allow-empty -m \"Fake empty commit (force CI trigger)\"",

    // Removes all tmp files related to vercel, necessary when deploying locally to avoid the Vercel CLI to use the cached files in the .vercel folder for subsequent deployments,
    // as it wouldn't work if we tried to deploy different customers because it's use the cache version instead of the "name" specified in the "*.vercel" file being deployed
    "vercel:cleanup": "npx del-cli .vercel/",

    // Populates Git-related environment variables then triggers a Vercel deployment, and provide those variables as "build env" variables (which will be available in "next.config.js" upon initial build)
    // Since Vercel doesn't allow us to run the "git" binary, we run the git binary before, and then forward the variables of interest
    // This step is critical for the versioning of the deployment
    "vercel:deploy": ". ./scripts/populate-git-env.sh && vercel --build-env GIT_COMMIT_TAGS=$GIT_COMMIT_TAGS --build-env GIT_COMMIT_REF=$GIT_COMMIT_REF --build-env GIT_COMMIT_SHA=$GIT_COMMIT_SHA --confirm --debug --force",

    // Prints variables resolved by the populate-git-env.sh script, for debugging
    "script:populate-git-env:print": ". ./scripts/populate-git-env.sh && echo 'SHA: '${GIT_COMMIT_SHA} && echo 'REF (current branch/tag): '${GIT_COMMIT_REF} && echo 'TAGS: '${GIT_COMMIT_TAGS}",

    // Git commands, used by populate-git-env.sh
    "git:getReleasesAndTags": "git tag --points-at HEAD | tr '\\r\\n' ' '",
    "git:getCommitSHA": "git rev-parse HEAD",
    "git:getCommitSHA:short": "git rev-parse --short HEAD",
    "git:getCommitRef": "git symbolic-ref HEAD",

    // End-to-end commands (Cypress) to run E2E tests
    // By default, runs E2E against a running local server (you need to run "yarn start" in another shell for this to work)
    "e2e": "yarn e2e:run",

    // Run E2E tests against the production url of the different customers
    // The production url is specified in cypress/config-*.json file, as "baseUrl"
    // The ":open" version will open an interactive UI which makes interactive debugging easier
    "e2e:all:production": "yarn e2e:customer1:production && yarn e2e:customer2:production",
    "e2e:customer1:production": "CYPRESS_STAGE=customer1 yarn e2e:run",
    "e2e:customer1:production:open": "CYPRESS_STAGE=customer1 yarn e2e:open",
    "e2e:customer2:production": "CYPRESS_STAGE=customer2 yarn e2e:run",
    "e2e:customer2:production:open": "CYPRESS_STAGE=customer2 yarn e2e:open",

    // Installs the Cypress version specified as a devDependency below
    "e2e:install": "cypress install",

    // Run E2E tests against a local development server
    // The ":open" version will open an interactive UI which makes interactive debugging easier
    "e2e:open": "CYPRESS_STAGE=${CYPRESS_STAGE:-development}; cypress open --config-file cypress/config-$CYPRESS_STAGE.json",
    "e2e:run": "CYPRESS_STAGE=${CYPRESS_STAGE:-development}; cypress run --config-file cypress/config-$CYPRESS_STAGE.json",

    // Example script on how you can configure Cypress to only run some of the spec files, meant to serve as an example to add your own scripts
    "e2e:run:spec:common": "CYPRESS_STAGE=${CYPRESS_STAGE:-development}; cypress run --config-file cypress/config-$CYPRESS_STAGE.json --spec 'cypress/integration/app/common/*.js'",

    // E2E command executed through GitHub Actions CI/CD, which will install Cypress and then run it, and then send the recordings to the Cypress Dashboard
    // No recording will be send if you haven't specified an "orgId" in your cypress/config-customer-ci-cd.json
    "e2e:ci": "yarn e2e:install && cypress run --record",

    // Starts the local server for the documentation, using Jekyll and Ruby (run doc:gem:install, first)
    // The :fast version is faster (3sec instead of 12sec), but won't compile new files. It's great when modifying existing files, though.
    "doc:start": "cd docs/ && bundle exec jekyll serve --config _config-development.yml",
    "doc:start:fast": "cd docs/ && bundle exec jekyll serve --config _config-development.yml --incremental",

    // Install the pre-requisites binaries to run the documentation server (e.g: yarn doc:start)
    // You'll need Ruby and Jekyll installed, see https://jekyllrb.com/docs/
    "doc:gem:install": "cd docs/ && bundle install",

    // Open the online documentation running "yarn doc" (cross-platform)
    "doc": "yarn doc:online",
    "doc:online": "open-cli https://unlyed.github.io/next-right-now/",
    "doc:online:scripts": "open-cli https://unlyed.github.io/next-right-now/guides/scripts-and-utilities",

    // Creates an empty commit with a special tag (MAJOR/MINOR), which will be used to resolve the project version based on the Git history
    // See https://github.com/PaulHatch/semantic-version#usage
    "bump:major": "git commit --allow-empty -m \"(MAJOR) Empty commit, bumps MAJOR version\"",
    "bump:minor": "git commit --allow-empty -m \"(MINOR) Empty commit, bumps MINOR version\"",

    // Linter in watch mode (eslint)
    "lint": "esw src/ -w --ext .ts --ext .tsx",

    // Linter without watch mode (for CI)
    "lint:once": "eslint src/ --ext .ts --ext .tsx",

    // Automatically applies the linter fixes
    // It's strongly recommended to commit your changes before, and to run a :preview too!
    "lint:fix": "eslint src/ --ext .ts --ext .tsx --fix",

    // Preview the linter fixes without changing anything to the source code
    "lint:fix:preview": "eslint src/ --ext .ts --ext .tsx --fix-dry-run",

    // Run Jest in watch mode
    // You can also run/ignore specific group(s) of tests - See https://github.com/eugene-manuilov/jest-runner-groups
    "test": "NODE_ENV=test jest --watch",
    "test:group:api": "NODE_ENV=test jest --group=api --watchAll",
    "test:group:components": "NODE_ENV=test jest --group=components --watchAll",
    "test:group:integration": "NODE_ENV=test jest --group=integration --watchAll",
    "test:group:unit": "NODE_ENV=test jest --group=unit --watchAll",
    "test:group:utils": "NODE_ENV=test jest --group=utils --watchAll",

    // Run Jest once (for CI)
    "test:once": "NODE_ENV=test jest --runInBand --detectOpenHandles",
    "test:once:group:no-integration": "NODE_ENV=test jest --group=-integration",
    "test:coverage": "NODE_ENV=test jest --coverage",
    "test:coverage:group:no-integration": "NODE_ENV=test jest --group=-integration --coverage",

    // Prints the Jest configuration, great for debugging the configuration and understanding how options are actually applied
    "test:config": "NODE_ENV=test jest --showConfig",

    // Official react codemods meant to help you migrate legacy React code to more recent version automatically - See https://github.com/reactjs/react-codemod
    "codemod:update-react-imports": "npx react-codemod update-react-imports src/",
    "codemod:name-default-component": "npx @next/codemod name-default-component src/",
    "codemod:withamp-to-config": "npx @next/codemod withamp-to-config src/",

    // Runs a Yarn security audit, will print all (nested) packages with vulnerabilities and links to each vulnerability
    // Will print a summary, i.e: "2924 vulnerabilities found - Packages audited: 2634 - Severity: 2914 Low | 10 High"
    "security:audit": "yarn audit",

    // Runs Yarn in interactive mode for package upgrades
    // Displays a list of all outdated packages and you can select which ones you want to upgrade by pressing the space bar
    // Displays major versions in red
    // We recommend updating only packages that are related to each other, reading changelogs to detect breaking changes prior to upgrading
    // We strongly recommend to systematically push after each group of packages have been upgraded,
    // coupled with automated deployment and tests, it's the most effective way to detect regression caused by packages upgrades and locate issues much faster
    "packages:upgrade": "yarn upgrade-interactive --latest"
  }
```

</div>

---

# Utilities

Next Right Now comes built-in with a few utilities that could come in handy:

## Font Awesome

Font Awesome icons are available as React component.

### Usage

```js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<FontAwesomeIcon icon="exclamation-triangle" size={'4x'}/>
```

[See documentation](https://fontawesome.com/how-to-use/on-the-web/using-with/react#get-started)

### Configuration

Unfortunately, it's not automated, and you need to manually specify each Font-Awesome icon you wish to use as a component, in [`font-awesome.ts`](https://github.com/UnlyEd/next-right-now/blob/5a04c14f84756646568f7f4fec98b73964cc4c5c/src/utils/icons/font-awesome.ts#L51).

```js
import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

// Import @fortawesome/free-solid-svg-icons
library.add(
    faExclamationTriangle,
);
```

Once a FA icon has been configured (imported) it can be used anywhere in the Next.js app.

## Reactstrap (Bootstrap)

You can use any [Reactstrap component](https://reactstrap.github.io/components/alerts/) right away.

> We're thinking about introducing [ChakraUI](https://chakra-ui.com/docs/principles) instead of Reactstrap, we might do so in the future, in a new preset.
>
> If so, we'd probably create a "UI library" guide to explain a bit more our motivations.

## Interactive Debug mode

[Learn more](../ide/use-webstorm#interactive-debug-mode)

## Proper handling or sensitive information, using Vercel secrets

[Learn more](../../concepts/env-and-stages)

## Cookie consent popup

A cookie consent popup is automatically instantiated on all "legal" pages of the site.
It relies on Osano open source `cookieconsent` library (v3).

[See documentation](https://github.com/osano/cookieconsent)

You can customise the behavior of the popup and change on which page it'll display, [see example](https://github.com/UnlyEd/next-right-now/blob/128ec019aa8718fe4647f57f3639b1af9ffcb190/src/components/appBootstrap/BrowserPageBootstrap.tsx#L103-L115).

You can also customise the configuration of the `cookieconsent` library itself, [see default configuration](https://github.com/UnlyEd/next-right-now/blob/30d83e961b6267ee7704d21b70004ee167f95ff5/src/utils/cookies/cookieConsent.ts#L112-L245).

[Open demo](https://nrn-default.now.sh/en/terms)

The default configuration of the `cookieconsent` library is meant to cover a basic use-case and will most likely not be what you need exactly.

Our goal isn't to cover all use-cases, but simply to provide a good-enough base, which can be tailored to your needs as you see fit.

## "Why did you render? (WDYR)" (React)

Next Right Now includes the [`why-did-you-render`](https://github.com/welldone-software/why-did-you-render) utility.

> why-did-you-render monkey patches React to notify you about avoidable re-renders.

It's a very useful tool to optimize your components and understand what re-renders and why.

Refer to their documentation to understand how it works.

Please note it won't print logs when renders are expected, **only when they aren't necessary**.

## Next.js page optimizations for client-side bundling

If you ever wondered what kind of optimization does the Next.js framework perform behind the curtains **when it builds a page**, check out [this interactive demo](https://next-code-elimination.now.sh/).

Please note the demo was created around Next.js 9.3 release (SSG support), but still quite useful to understand what code is and isn't used by the browser
