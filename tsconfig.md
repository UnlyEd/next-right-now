Documentation of `tsconfig.json`
===

# Introduction

TypeScript's configuration is complicated because it needs to be compatible with all 3rd parties that rely on it.

Some of those 3rd parties are:
- [Emotion](https://emotion.sh/docs/typescript)
- [Jest (`ts-jest`)](https://kulshekhar.github.io/ts-jest/)
- [Next.js](https://nextjs.org/docs/basic-features/typescript)
- [Cypress](https://docs.cypress.io/guides/tooling/typescript-support.html#Install-TypeScript)

# Compiler options

> Being honest, I don't remember why the TS configuration became the way it is.
>
> Basically, it's the product of lots of work and tweaks found on the web.
> Initially, it was simply what Next.js recommended.
> But, it has grown every time yet another 3rd party support was added.
>
> Also, the lack of comment support in .json file didn't help to track changes.
>
> From now on, I'll try describing why each option is configured the way it is.

```json5
{
  "compilerOptions": {
    "allowJs": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "preserve",

    // Added by Emotion 11, necessary to use the "css" props using the "Babel preset", without using JSX pragma.
    // Using the Babel preset is better (DX), because we don't have to use "/** @jsx jsx */" in every file, as Babel does it for us.
    // See https://emotion.sh/docs/typescript#css-prop TS configuration to support the "css" prop
    // See https://emotion.sh/docs/emotion-11#typescript Migration guide about Emotion 11 for TS
    // See https://emotion.sh/docs/css-prop#babel-preset Babel preset vs JSX pragma configuration
    // See https://github.com/emotion-js/emotion/issues/1606#issuecomment-757930872 Issue explanation when migrating from Emotion 10 to 11
    // See https://github.com/UnlyEd/next-right-now/pull/247 Emotion v10 > v11 migration pull request
    "jsxImportSource": "@emotion/react",

    "lib": [
      "dom",
      "dom.iterable",
      "es2017"
    ],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveConstEnums": true,
    "removeComments": false,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": false,
    "target": "ES2019"
  },

  // Exclude all folders and files that shouldn't be interpreted as TS files.
  // Makes TS compilation faster when non-TS folders are being ignored.
  // Takes precedence over "include" rule.
  "exclude": [
    ".github",
    ".next",
    "_site",
    "coverage",
    "cypress",
    "node_modules",
    "public"
  ],

  // Only the files matching those patterns will be included.
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ]
}

```

# Cypress `tsconfig`

Beware the `cypress/tsconfig.json` extends the `tsconfig.json` for convenience, as it helps avoid rules duplication.

Therefore, changes made to the `tsconfig.json` might affect the `cypress/tsconfig.json`.

For instance, the `exclude` rule had to be overridden in `cypress/tsconfig.json`, otherwise it'd exclude the whole `cypress` folder.
