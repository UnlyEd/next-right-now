---
layout: default
title: API endpoints
parent: Guides
nav_order: 130
has_children: false
---

<div class="code-example" markdown="1">
<span markdown="1">
    Built-in API endpoints
</span>
</div>

---

# API endpoints
{: .no_toc }

Next Right Now comes with a few built-in API endpoints described below.

{% include page-toc.md %}

---

## **GET** `/api/autoRedirectToLocalisedPage`

- `payload`: None

Meant to be used to redirect a non i18n-page towards its i18n page counterpart.

Used automatically by Next.js `rewrites` rules (`next.config.js`) that match the pattern.

> Ex: `GET /api/autoRedirectToLocalisedPage` for page `/terms` might redirect to `/en/terms`

---

## **GET** `/api/error`

- `payload`: None

Throws an error upon being called.

Mock API endpoint whose sole purpose is to throw an error, nothing else.
Meant to be used to check whether monitoring (Sentry) works as expected.

---

## **GET** `/api/preview`

- `payload`: `query`
    - `stop`: Whether to start/stop the Preview Mode.
    - `redirectTo`: Url to redirect to once the preview mode has been started/stopped.

Preview Mode API.

Enables and disables preview mode.

---

## **GET** `/api/startVercelDeployment`

- `payload`: `query`
    - `customerAuthToken`: Customer authentication token.
    - `platformReleaseRef`: Release reference of the platform. Basically, a Git commit hash, branch name, or tag.
        The ref used will be used to locate what version of the source code should be used for the deployment.
    - `redirectTo`: Url to redirect to, once the deployment has been triggered.
    - `forceNoRedirect`: Force option to avoid being redirected.
        Meant to be used when debugging, to avoid being redirected all the time, but stay on the page instead.

Starts a new Vercel deployment, for the current customer.

Meant to be used from an external web platform (e.g: CMS, Back Office, etc.) to trigger a new production deployment that will replace the currently deployed instance, once deployed.

Endpoint meant to be integrated into 3rd party tools, so it might be used by non-technical people.
(e.g: customer "editor" role, customer success, customer support, etc.)

### Related environment variables

- `GITHUB_DISPATCH_TOKEN`: Github "personal access token".
    - Can be generated at "Settings > Developer settings > Personal access tokens" at [https://github.com/settings/tokens](https://github.com/settings/tokens).
    - Required if the repository is private.
    - Unnecessary if the repository is public.
    - Needs the following scopes:
        - Repo (FULL)
        - Workflow

> If `GITHUB_DISPATCH_TOKEN` is not set, the app will work anyway, it just won't be able to deploy new instances through the "startVercelDeployment" API.

---

## **GET** `/api/status`

- `payload`: None

Prints the "status" of the deployed instance.

Prints useful information regarding the deployment.
Meant to be used for debugging purposes.
Can also be used as "ping endpoint" to make sure the app is online.

----

## **POST** `/api/webhooks/deploymentCompleted`

- `payload`: `query`
    - `MANUAL_TRIGGER_CUSTOMER`: Value that was typed in the GHA web page, as "Customer to deploy".
    - `CUSTOMER_REF`: Ref of the customer that was actually deployed.
    - `STAGE`: Stage (production/staging) used for the deployment.
    - `GIT_COMMIT_SHA`: SHA of the git commit used as deployment ref.
    - `GIT_COMMIT_REF`: Ref (branch/tag) that was used as deployment ref.
    - `GIT_COMMIT_TAGS`: All tags associated with the git commit.

Webhook callback url, called automatically when a Vercel deployment has reached "READY" state.

The call is performed by the GitHub Action "send-webhook-callback-once-deployment-ready" job.

> This is a mock endpoint that doesn't do anything yet. It is invoked when a Vercel deployment is completed.

### Related environment variables

- `VERCEL_DEPLOYMENT_COMPLETED_WEBHOOK`: Defines the url of the API endpoint to call when a Vercel deployment completes.

> If `VERCEL_DEPLOYMENT_COMPLETED_WEBHOOK` is not set, the app will work anyway.
