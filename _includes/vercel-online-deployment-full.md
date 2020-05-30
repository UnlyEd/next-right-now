1. (Optional) Run `now login` if you aren't authenticated to Vercel from your local machine. Typically, if it's the first time you use Vercel you'll need to do it.
1. You need to change the associated Vercel `scope` (it currently uses the boilerplate's, because it's required for our CI/CD Github Actions)
    - Remove the whole line `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` in all `now.*.json` files
    - `yarn start` - Will create a `.now` folder containing project metadata.
    - Add a `scope` line in all `now.*.json` files using the `orgId` in `.now/project.json`
1. Create all [Vercel secrets](https://vercel.com/docs/cli?query=secrets#commands/secrets/basic-usage) by running `now secrets add $secretName $secretValue`, for instance `now secrets add nrn-sentry-dsn https://14fa1cae05079675b18cd05403ae5c48@sentry.io/1234567`.
    The full list of expected Vercel secrets to define is in any `now.*.json` file.
1. `yarn deploy` - Will deploy the project online, and automatically create the Vercel project first, if it doesn't exist already.
    This command will fail if any secret is missing.
1. Go to [Vercel](https://vercel.com/) to see the project being deployed, go through logs, etc.

At this point, manual deploy through command line should work.
But CI/CD requires [additional configuration](../guides/ci-cd/setup-github-actions) to automatically deploy when a change is applied on the remote repository.

{% include vercel-online-deployment-tips.md  %}
