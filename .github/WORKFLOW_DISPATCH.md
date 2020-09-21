# How to deploy a customer by using a HTTP call to Github Actions
## Summary
 - Enable the feature into the workflow
 - Get it in the workflow
 - Trigger the workflow using HTTP request
---
## Enable the feature into the workflow
```yaml
on:
  workflow_dispatch:
    inputs:
      client:
        description: 'Client to deploy'
        required: false
```
`workflow_dispatch` allows us to trigger this workflow by a button on github or a HTTP call (our case).

##  Get it in the workflow
```yaml
jobs:
  say_hello:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Say hello customer
      run: |
        MANUAL_TRIGGER_CLIENT="${{ github.event.inputs.client}}"
        echo "Hello $CLIENT_TO_DEPLOY"
```

Just get it by by using `${{github}}` variable. Because this field is not required all the time, the variable may be empty.

In order to use a **fallback** value, we can use this bash syntax:
```bash
CLIENT_TO_DEPLOY="${MANUAL_TRIGGER_CLIENT:-$(cat now.json | jq -r '.build.env.NEXT_PUBLIC_CUSTOMER_REF')}"
```
If `MANUAL_TRIGGER_CLIENT` is empty, we are looking for the value in `now.json`.

## Trigger the workflow using HTTP request
### Authentification
For each request, you'll need to provide a header with:
```json
{
    "Accept": "application/vnd.github.v3+json",
    "Authorization": "token <TOKEN>"
}
```
This token needs the **full repo** rights to access.

### Get your workflow id
#### Why do we need it?
Each workflow has an id and it changes for every repository. So **this is really important to get your ID for this workflow**.
#### How can we get it?
```
GET https://api.github.com/repos/{owner}/{repo}/actions/workflows
```
 - **owner**: the github nickname/organization
 - **reppository-name**: the repository name to trigger the action

This call will return all your workflow, so just get the right one.

### Example
This `curl` command will sort you the ID, if you have not change the *name/path*. Please change the **owner** and the **repository name**.
```bash
curl -s \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token <YOUR_GITHUB_TOKEN>" \
  https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows | jq '.workflows[] | select(.path==".github/workflows/deploy-zeit-staging.yml") | .id'
```

### Structure
#### Endpoint
The endpoint: `POST https://api.github.com/repos/{owner}/{repository-name}/actions/workflows/{workflow-id}/dispatches`

 - **owner**: the github nickname/organization
 - **reppository-name**: the repository name to trigger the action
 - **workflow-id**: please check the previous section

#### Body
You have to provide a body with theses variables:
```json
{
    "ref": "master",
    "inputs": {
        "client": "customer2"
    }
}
```

 - **ref**: a git reference, so it can be a tag, a branch or a SHA commit. Can be really useful to trigger a client built on a stable version.
 - **inputs**: an object containing inputs setup previously.

If it returns a 204 status, it works.

#### Example
```bash
curl -s \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: <YOUR_GITHUB_TOKEN>" \
  https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows/2249094/dispatches

```
