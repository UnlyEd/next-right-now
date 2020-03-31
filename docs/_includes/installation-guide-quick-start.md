1. `git clone https://github.com/UnlyEd/next-right-now.git nrn-quick-start` - Clones the boilerplate
1. `cd nrn-quick-start && git checkout v1-ssr` - Selects the variant
1. `cp .env.build.example .env.build` - Duplicates the `.env.build.example` as `.env.build`
    - **Tip**: `.env.build` is only used when working locally
1. _(Optional)_ `nvm use` - Selects the right node.js version based on the `.nvmrc` file
    - **Tip**: Ignore this if you're not using [NVM](https://github.com/nvm-sh/nvm), but you should!
1. `yarn` - Installs all deps from `package.json`
1. _(Optional)_ `yarn add -D now@16.7.3` - Installs an older `now` CLI that doesn't require you to have a Zeit account when working locally
    - **Tip**: **You don't need to do that if you already have Zeit/Now configured on your computer** _(which may be the case if you're already familiar with Zeit)_
    - **Tip**: `now@17+` requires to be authenticated to Zeit in order to launch the project **locally**, so we recommend to use `now@16` instead in order to avoid unnecessary setup
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

That's it! The project now works on your local computer!
