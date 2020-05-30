> Vercel doesn't provide the `orgId` from the Vercel platform itself, even if the project exists already. Running `yarn start` locally is the only way to know what is your `orgId`, AFAIK.
>
> If you create a secret with a wrong value, you will have to delete it and create it again (there is no update feature). See `now secrets --help`
>
> **Tip**: If you ever need to store files as secrets (such as ssh keys), see [this solution](https://github.com/vercel/vercel/issues/749#issuecomment-533873759)
