- This assumes you've cloned the NRN repository locally (cloning it once is enough, no need to clone it multiple times, but it may be simpler to use one clone per variant if you're trying out multiple variants locally :wink:)
- This assumes you're already authenticated to Zeit (you should, if you've followed the [quick start](./quick-start), or if you're familiar with Zeit already)

1. `cp .env.build.example .env.build` - Duplicates the `.env.build.example` as `.env.build` _(`.env.build` is only used when working locally)_
1. Create an account for all required 3rd party vendors above, and fill-in missing environment variables in your `.env.build` file
1. `nvm use` - Selects the right node.js version based on the `.nvmrc` file
1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
1. That's it! The project now works on your local computer, and should be identical to the online demo

{% include installation-guide-tips.md %}
