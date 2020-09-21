# How to deploy a customer by using an HTTP call to Github Actions (`workflow_dispatch` event)

## Summary
 1. How to configure the workflow to allow it to be triggered through external HTTP calls?
 2. How to access the inputs from the workflow?
 3. How to trigger the workflow using an external HTTP request?

---

## 1. How to configure the workflow to allow it to be triggered through external HTTP calls?

```yaml
on:
  workflow_dispatch:
    inputs:
      customer:
        description: 'Customer to deploy'
        required: true
```

The `workflow_dispatch` event allows us to trigger this workflow through a button on GitHub website, or through an HTTP call.

Both are quite handy, but we'll focus mostly on the HTTP call below, because the GitHub button is quite simple to configure/use.

##  2. How to access the inputs from the workflow?

```yaml
jobs:
  say_hello:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Say hello customer
      run: |
        MANUAL_TRIGGER_CUSTOMER="${{ github.event.inputs.customer}}"
        echo "Hello $MANUAL_TRIGGER_CUSTOMER"
```

All inputs are available within `${{github}}` variable. Because this input has been explicitly required using `required: true`, the `${{ github.event.inputs.customer}}` value cannot be empty.

In order to use a **fallback** value (useful when the input isn't required, e.g: `required: false`), we can use this bash trick:

```bash
CUSTOMER_TO_DEPLOY="${MANUAL_TRIGGER_CUSTOMER:-$(cat now.json | jq -r '.build.env.NEXT_PUBLIC_CUSTOMER_REF')}"
```

If `MANUAL_TRIGGER_CUSTOMER` is empty, then we'll resolve its fallback value from the `now.json` file and extract the `build.env.NEXT_PUBLIC_CUSTOMER_REF` value.

## 3. How to trigger the workflow using an external HTTP request?

### Authentication

Authentication is required for every request, you'll need to provide your credentials through an HTTP header:

```json
{
    "Accept": "application/vnd.github.v3+json",
    "Authorization": "token <TOKEN>"
}
```

**N.B**: This [`personal access token`](https://github.com/settings/tokens) needs the **full repo** permissions to be granted access.

### Get your workflow id

#### Why do we need it?

Each GitHub workflow has an id, and this id changes for every repository.

**You'll need this workflow id to be able to trigger the workflow from an external HTTP request.**

#### How can we get it?

```
GET https://api.github.com/repos/{owner}/{repo}/actions/workflows
```

 - **`owner`**: The github nickname/organization
 - **`repository-name`**: The repository name where to trigger the action

This call will return all your workflow, so make sure you use the right one.

##### Find our Next-Right-Now workflow id

- [Open https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows](https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows)
- `643638` here it is! (for `Deploy to Zeit (staging)` workflow)

### Example

This `curl` command can find the ID for you automatically.
Make sure to adapt the **owner**, and the **repository name** to reflect yours.

```bash
curl -s \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows | jq '.workflows[] | select(.path==".github/workflows/deploy-zeit-staging.yml") | .id'
```

**N.B**: You'll need to provide an `Authorization` header for private repositories. e.g: `-H "Authorization: token <YOUR_GITHUB_TOKEN>" \`

### Structure

#### Endpoint

The endpoint: `POST https://api.github.com/repos/{owner}/{repository-name}/actions/workflows/{workflow-id}/dispatches`

 - **`owner`**: the github nickname/organization
 - **`repository-name`**: the repository name to trigger the action
 - **`workflow-id`**: the workflow id (check the previous section to learn how to get it)

#### Body

You have to provide a body with these inputs:

```json
{
    "ref": "master",
    "inputs": {
        "customer": "customer2"
    }
}
```

 - **ref**: a git **reference**, it can be a tag, a branch or a SHA commit. Can be really useful to deploy a customer using a particular version instead of the master branch.
 - **inputs**: an object containing inputs setup previously.

If it returns a `204` status code, it worked.

#### Example

```bash
curl -s \
  -X POST \
  -d '{ "ref": "master", "inputs": { "customer": "customer2" }}' \
  -H "Authorization: token <YOUR_GITHUB_TOKEN>" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows/643638/dispatches
```
