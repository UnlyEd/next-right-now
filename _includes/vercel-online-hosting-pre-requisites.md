You must **change the associated Vercel `scope`** (it uses NRN own scope by default, because it's required for our CI/CD Github Actions)
- Remove the whole line `"scope": "team_qnVfSEVc2WwmOE1OYhZr4VST",` in **all** `vercel.*.json` files (this `scope` is NRN own scope, and you don't have permissions to access it, so you must remove it manually. We keep it there to make our own CI/CD works)
    - **Tip**: Don't forget `vercel.json` is a **symlink** and **shouldn't** to be modified (run `ln vercel.staging.json vercel.json` if you messed it up :wink:)

You must **be authenticated to Vercel** from your local machine.
Typically, if it's the first time you use Vercel you'll need to do it.
- Run `npx vercel login`
- **Windows**: You'll need to run `npx vercel login email@domain` instead, because it doesn't support interactive prompt.

You must **configure all your Vercel secrets**.
The list of required secrets depends on your preset and are listed in the `vercel*.json` file you're trying to deploy.

To create a new secret, use `vercel secrets add nrn-secret secret-value`.
If you create a secret with a wrong value, you will have to delete it and create it again (there is no update feature). See `vercel secrets --help`
- **Tip**: If you ever need to store files as secrets (such as ssh keys), see [this solution](https://github.com/vercel/vercel/issues/749#issuecomment-533873759)

See each vendor documentation for additional information.
