1. `git clone https://github.com/UnlyEd/next-right-now.git nrn-quick-start` - Clones the boilerplate
1. `cd nrn-quick-start && git checkout v1-ssr` - Selects the variant
1. `cp .env.build.example .env.build` - Duplicates the `.env.build.example` as `.env.build` _(`.env.build` is only used when working locally)_
1. `nvm use` - Selects the right node.js version based on the `.nvmrc` file
1. `yarn add -D now@16.7.3`, now@17+ requires to be authenticated to Zeit in order to launch the project **locally**, so you must use now@16 instead, to avoid additional setup
1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
1. That's it! The project now works on your local computer, and should be identical to the online demo
