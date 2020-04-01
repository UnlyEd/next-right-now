---
layout: default
title: How to use Zeit
parent: Online deployment
grand_parent: Guides
nav_order: 20
---

# How to use Zeit
{: .no_toc }

{% include page-toc.md %}

---

## Node.js runtime version

Note that your code will be deployed on Zeit servers, which are running **AWS Lambda** on the background.

- By default, Zeit will deploy using Node.js `v12.x` runtime, the `x` means it will automatically use the latest version.
    - This means that you should update your `.nvmrc` to match the version that's actually being used by Zeit, from time to time. It's not really a big deal as long as there is a minor version difference, but make sure to use the same major version to avoid "surprises".
- See [official Zeit Node.js supported versions](https://zeit.co/docs/runtimes#official-runtimes/node-js/node-js-version)
- See [available AWS Lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html), it may be interesting for reference, and it's important to understand what really runs your source code. Zeit is just a proxy that simplifies things.
- We provide a built-in utility you can use on any online demo at `/api/status`, for instance at [https://nrn-default.now.sh/api/status](https://nrn-default.now.sh/api/status).
    - You can also use this endpoint locally, or on your own deployments.
    - **Tip**: As a security measure, you may want to either disable or protect that endpoint, using Basic-Auth for instance.


## Resources

- https://zeit.co/docs
- https://zeit.co/blog
