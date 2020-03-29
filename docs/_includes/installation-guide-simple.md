1. `git clone git@github.com:UnlyEd/next-right-now.git` - Clones the boilerplate
1. `git checkout v1-ssr` - Select the variant
1. Duplicate the `.env.build.example` and rename it `.env.build` _(this file is only used on your local computer)_
1. `nvm use` - Selects the right node.js version based on the `.nvmrc` file
1. `yarn add -D now@16.7.3`, now@17+ requires to be authenticated to Zeit in order to launch the project **locally**, so you must use now@16 instead, to avoid additional setup
1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
1. That's it! The project now works on your local computer, and should be identical to the online demo
