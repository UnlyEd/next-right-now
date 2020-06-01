1. `git clone https://github.com/UnlyEd/next-right-now.git nrn-quick-start` - Clones the boilerplate
1. `cd nrn-quick-start && git checkout {{ include.preset }}` - Selects the preset
1. `yarn` - Installs all deps from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)

That's it! The project should work on your local computer!
The demo should run locally, and you can start playing around.

**If it doesn't**, read our tips below, or ask for help on [github issues](https://github.com/UnlyEd/next-right-now/issues).
{: .mb-6 }

### Tips

- If you use **NVM** (Node Version Manager) then running `nvm use` will select the right node.js version based on the `.nvmrc` file.
- If you get stuck then ask for help on [github issues](https://github.com/UnlyEd/next-right-now/issues).
{: .mb-6 }

### Deploying online

If you want to deploy on Vercel, you must:

- Remove the whole line `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` in all `now.*.json` files (this `scope` is NRN own scope, and you won't have permissions to access it, so you must remove it manually. We keep it there to make our own CI/CD works)
    - **Tip**: Don't forget `now.json` is a **symlink** and **musn't** to be modified (run `ln now.staging.json now.json` if you messed it up :wink:)
- If you get stuck, read our [full installation guide for Vercel](../guides/online-deployment/setup-vercel).
{: .mb-6 }

### Windows concerns

{% include windows-concerns.md %}
{: .mb-6 }
