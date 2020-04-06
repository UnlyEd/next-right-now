1. `git clone https://github.com/UnlyEd/next-right-now.git nrn-quick-start` - Clones the boilerplate
1. `cd nrn-quick-start && git checkout v1-ssr-mst-aptd-gcms-lcz-sty` - Selects the preset
1. `cp .env.build.example .env.build` - Duplicates the `.env.build.example` as `.env.build`
    - **Tip**: `.env.build` is only used when working locally
1. _(Optional)_ `nvm use` - Selects the right node.js version based on the `.nvmrc` file
    - **Tip**: Ignore this if you're not using [NVM](https://github.com/nvm-sh/nvm), but you should!
1. `yarn` - Installs all deps from `package.json`
1. _(Optional)_ `yarn add -D now@16.7.3` - Installs an older `now` CLI that doesn't require you to have a Zeit account when working locally
    - **Tip**: **You don't need to do that if you already have Zeit/Now configured on your computer** _(which may be the case if you're already familiar with Zeit)_
    - **Tip**: `now@17+` requires to be authenticated to Zeit in order to launch the project **locally**, so we recommend to use `now@16` instead in order to avoid unnecessary setup
1. _(Optional)_ If **you didn't do the previous step**, then you'll need to remove the  the whole line `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` in all `now.*.json` files
    - **Tip**: Don't forget `now.json` is a **symlink** and **musn't** to be modified (run `ln now.staging.json now.json` if you messed it up :wink:)
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

That's it! The project should work on your local computer!
If it doesn't, read our tips below or ask for help on [github issues](https://github.com/UnlyEd/next-right-now/issues).

**Tips & known issues:**
- On windows, the symbolic link for `now.json` (which points to another `now.*.json` file, depending on the preset) will not work, and you'll have to create a `now.json` yourself (just copy the content of a staging `now.*.json` file)
- If you've never used `now` before, or if you aren't authenticated, you will need to create an account on Zeit and authenticate using `now login`
- If you get stuck, read our [full installation guide for Zeit](../guides/online-deployment/setup-zeit)
