1. `git clone https://github.com/UnlyEd/next-right-now.git nrn-quick-start` - Clones the boilerplate
1. `cd nrn-quick-start && git checkout {{ include.preset }}` - Selects the preset
1. `cp .env.build.example .env.build` - Duplicates the `.env.build.example` as `.env.build`
    - **Tip**: `.env.build` is only used when working locally
1. _(Optional)_ `nvm use` - Selects the right node.js version based on the `.nvmrc` file
    - **Tip**: Ignore this if you're not using [NVM](https://github.com/nvm-sh/nvm), but you should!
1. `yarn` - Installs all deps from `package.json`
1. _(Optional)_ `yarn add -D now@16.7.3` - Installs an older `now` CLI that doesn't require you to have a Vercel account when working locally
    - **Tip**: **You don't need to do that if you already have Vercel/Now configured on your computer** _(which may be the case if you're already familiar with Vercel)_
    - **Why?**: `now@17+` [requires to be authenticated to Vercel](https://github.com/vercel/vercel/issues/3767) in order to launch the project **locally**, so we recommend to use `now@16` instead in order to avoid additional setup
1. Remove the whole line `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` in all `now.*.json` files (this `scope` is NRN's scope, and you don't have permissions to access it, so you must remove it manually. We keep it there to make our own CI/CD works)
    - **Tip**: Don't forget `now.json` is a **symlink** and **musn't** to be modified (run `ln now.staging.json now.json` if you messed it up :wink:)
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

That's it! The project should work on your local computer!
The demo should run locally, and you can start playing around.

**If it doesn't**, read our tips below, or ask for help on [github issues](https://github.com/UnlyEd/next-right-now/issues).

**Tips & known issues:**
- On **Windows**
    - We have had no confirmation that NRN works on Windows. Apparently, it doesn't work at all (fails at `yarn start`), but we haven't got enough reports to be sure.
    - The symbolic link for `now.json` (which points to another `now.*.json` file, depending on the preset) will not work, and you'll have to create a `now.json` yourself (just copy the content of a staging `now.*.json` file)
- If you've never used `now` before, or if you aren't authenticated, you will need to create an account on Vercel and authenticate using `now login`
- If you get stuck, read our [full installation guide for Vercel](../guides/online-deployment/setup-vercel)
- "Vercel" is the new brand name of the former "Zeit" company. They've rebranded everything around April 2020.
    - The former [`now` CLI](https://www.npmjs.com/package/now) is now named [`vercel`](https://www.npmjs.com/package/vercel), but NRN still uses the `now` version.
