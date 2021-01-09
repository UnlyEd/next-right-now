---
layout: default
title: How to use Vercel
parent: Online deployment
grand_parent: Guides
nav_order: 20
---

# How to use Vercel
{: .no_toc }

{% include page-toc.md %}

---

## Node.js runtime version

Note that your code will be deployed on Vercel servers, which are running under **AWS Lambda** on the background.

- By default, Vercel will deploy using Node.js `v12.x` runtime, the `x` means it will automatically use the latest version. _(This is still true as of January, 2021)_
    - This means that you should update your `.nvmrc` to match the version that's actually being used by Vercel, from time to time. It's not really a big deal as long as there is a minor version difference, but make sure to use the same major version to avoid "surprises".
- See [official Vercel Node.js supported versions](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version)
- See [available AWS Lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html), it may be interesting for reference, and it's important to understand what really runs your source code. Vercel is just a proxy that simplifies things.
- We provide a built-in utility you can use on any online demo at `/api/status`, for instance at [https://nrn-default.now.sh/api/status](https://nrn-default.now.sh/api/status).
    - You can also use this endpoint locally, or on your own deployments.
    - **Tip**: As a security measure, you may want to either disable or protect that endpoint, using Basic-Auth for instance.

> Node.js v12 will reach EOL as of April 2022. [Source](https://nodejs.org/en/about/releases/)
>
> By experience, we expect AWS to upgrade the Node.js runtime to allow the use of Node.js v14 around Q2 2021. Vercel will most likely quickly follow.
>
> AWS Lambda usually allows the next Node.js LTS version every year around April, and deprecates the latest EOL version around the same time.
>
> You should consider this, as it might affect you when picking libraries, as they will need to be compatible (or maintained) with the upcoming Node.js version.
> It is usually not an issue, but we personally ran into troubles with unmaintained binaries (like Dialogflow) in 2018, when we were using AWS Lambda directly (without Vercel).
>
> Using Vercel, we didn't run into any Node.js upgrade issue since 2019. All went smoothly, we expect the upgrade to Node.js 14 to be smooth as well.

## Resources

- [https://vercel.com/docs](https://vercel.com/docs)
- [https://vercel.com/blog](https://vercel.com/blog)
- [Join Next.js Discord server](https://discord.gg/w8p9Psrk2M)
