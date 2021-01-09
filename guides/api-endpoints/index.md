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

Next Right Now comes with a few built-in API endpoints.

## **GET** `/api/autoRedirectToLocalisedPage`

- `payload`: None

Meant to be used to redirect a non i18n-page towards its i18n page counterpart.

Used automatically by Next.js `rewrites` rules (`next.config.js`) that match the pattern.

> Ex: `GET /api/autoRedirectToLocalisedPage` for page `/terms` might redirect to `/en/terms`

## **GET** `/api/error`

- `payload`: None

Throws an error upon being called.

Mock API endpoint whose sole purpose is to throw an error, nothing else.
Meant to be used to check whether monitoring (Sentry) works as expected.

## **GET** `/api/preview`

- `payload`: `query`
    - `stop` (string): Whether to start/stop the Preview Mode.
    - `redirectTo` (string): Url to redirect to once the preview mode has been started/stopped.

Preview Mode API.

Enables and disables preview mode.

## **GET** `/api/startVercelDeployment`

- `payload`: `query`
    - `customerAuthToken` (string): Customer authentication token.
    - `platformReleaseRef` (string): Release reference of the platform. Basically, a Git commit hash, branch name, or tag.
        The ref used will be used to locate what version of the source code should be used for the deployment.
    - `redirectTo` (string): Url to redirect to, once the deployment has been triggered.
    - `forceNoRedirect` (string): Force option to avoid being redirected.
        Meant to be used when debugging, to avoid being redirected all the time, but stay on the page instead.

Starts a new Vercel deployment, for the current customer.

Meant to be used from an external web platform (e.g: CMS, Back Office, etc.) to trigger a new production deployment that will replace the currently deployed instance, once deployed.

Endpoint meant to be integrated into 3rd party tools, so it might be used by non-technical people.
(e.g: customer "editor" role, customer success, customer support, etc.)

## **GET** `/api/status`

- `payload`: None

Prints the "status" of the deployed instance.

Prints useful information regarding the deployment.
Meant to be used for debugging purposes.
Can also be used as "ping endpoint" to make sure the app is online.
