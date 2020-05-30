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

Note that your code will be deployed on Vercel servers, which are running **AWS Lambda** on the background.

- By default, Vercel will deploy using Node.js `v12.x` runtime, the `x` means it will automatically use the latest version.
    - This means that you should update your `.nvmrc` to match the version that's actually being used by Vercel, from time to time. It's not really a big deal as long as there is a minor version difference, but make sure to use the same major version to avoid "surprises".
- See [official Vercel Node.js supported versions](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version)
- See [available AWS Lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html), it may be interesting for reference, and it's important to understand what really runs your source code. Vercel is just a proxy that simplifies things.
- We provide a built-in utility you can use on any online demo at `/api/status`, for instance at [https://nrn-default.now.sh/api/status](https://nrn-default.now.sh/api/status).
    - You can also use this endpoint locally, or on your own deployments.
    - **Tip**: As a security measure, you may want to either disable or protect that endpoint, using Basic-Auth for instance.


## Resources

- [https://vercel.com/docs](https://vercel.com/docs)
- [https://vercel.com/blog](https://vercel.com/blog)

## Personal notes

We love Vercel, and it's really a great help to build web apps.

But, we are a bit wary about recent changes and decisions made by the Vercel team, in particular regarding their [2020 April Pricing changes](https://github.com/vercel/vercel/discussions/4029), and we led a discussion about it.

Currently, the most controversial decision they've made is about the [12-24 max serverless functions](https://github.com/vercel/vercel/discussions/4029#discussioncomment-8449).
We suggest you learn heavily about that if you're considering Vercel.

> Have no fear if you [think you need more than 12-24 serverless functions](https://github.com/vercel/vercel/discussions/4029#discussioncomment-12534), contact the support if you think Vercel isn't for you.
