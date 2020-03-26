## Super quick local installation (for local-only testing purpose, without Zeit account)

> This assumes you've **cloned** the project on your own computer.
>
> Follow this guide **if you just want to try it out** on your local machine
>
> **Tip**: Using now@17+ is required for CI to work properly, but you don't care about that if you just want to get started quickly.

- Duplicate the [`.env.build.example`](./.env.build.example) and rename it `.env.build` _(this file is only used on your local computer)_
- `nvm use` - Selects the right node.js version based on our [`.nvmrc`](./.nvmrc) file
- `yarn add -D now@16.7.3`, now@17+ requires to be authenticated to Zeit in order to launch the project, even if only working locally, so you must use now@16 instead
- `yarn` - Installs all deps from [`package.json`](./package.json)
- `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
- That's it! The project now works on your local computer, and should be identical to the online demo
    Note that it's still using the demo GraphCMS/GraphQL endpoint,

> **Tip**: You can enable **Locize in-context editor mode** in order to localise your static content, by appending `?locize=true` to the url, see [https://nrn-customer1.now.sh/?locize=true](https://nrn-customer1.now.sh/?locize=true) _(this is only enabled in development and staging stages, not in production)_
>
> **Tip**: You can start the project in **debug mode** (built-in for WebStorm only) [by running the WebStorm "Debug" configuration in debug mode](https://youtu.be/3vbkiRAT4e8)
>
> **Tip**: You can change **which customer is started by default** by changing the [`./now.json`](./now.json) symlink (ie: `ln -s ./now.customer2.staging.json ./now.json`)
>
> **Tip**: If there are tools that you don't need/like, read our [guide about how to remove them](README_HOW_TO_REMOVE.md).
