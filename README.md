<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f3f2c0a4106abcb9a1d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now/test_coverage)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://nrn-v2-mst-aptd-at-lcz-sty-storybook.vercel.app)

Next Right Now
===

Next Right Now (NRN) is meant to help you build **production-grade** projects using the **Next.js framework**.

NRN is maintained with several purposes in mind:
- To be used as a **boilerplate** to quickly deploy a **new** project.
    - It is used in production by [Unly](http://unly.org/), and thus covers enterprise-grade features and needs.
    - It has been used to build production-grade websites within 2h time during a French COVID-19 hackathon. (March 2020)
    - It has been used to build [Unly Solidarity](https://solidarity.unly.org/en), a fully static website meant to help French students find various solutions regarding the COVID-19 pandemic.
    - It has been used to build [NRN Admin](https://github.com/UnlyEd/next-right-now-admin) _(Now unmaintained/discontinued)_
- To be used as an **educational** resource, meant to be used as a **learning/teaching** resource, even if you don't use it as a boilerplate.
- Provide various [presets](./concepts/presets), to help you getting started with the preset that matches the closest your needs.
- To be **flexible** and allow for extensive **customisation**, based on your own needs and use-cases.

Don't hesitate to share your opinion about your ["getting started"](https://github.com/UnlyEd/next-right-now/issues/14) experience!

:point_right: [**Documentation: Overview & benefits (getting started)**](https://unlyed.github.io/next-right-now/). :point_left:

---

# Documentation

There are several sources of documentation:
- [**General documentation**](https://unlyed.github.io/next-right-now/) contains general documentation about the NRN project.
    - Great to learn about our concepts and get an overview of all features NRN has to offer
- **Demo documentation**, which is different for each preset and showcases built-in features within that preset.
    - Great to see code usage examples

Both documentations are related and there are many links from the demos toward the general doc.

---

# Overview of available presets

> Make sure to check the **Doc** link of each preset below, to better understand what are the built-in features within each preset.

| Preset | Links | Demo | Features | Notes |
|:-------|:------|:-----|:---------|:------|
| `v2-mst-aptd-at-lcz-sty` <br /><br /> July&nbsp;2020 | -&nbsp;[Doc](https://unlyed.github.io/next-right-now/available-presets/v2-mst-aptd-at-lcz-sty) <br /> -&nbsp;[Branch](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-at-lcz-sty) <br /> -&nbsp;[PR](https://github.com/UnlyEd/next-right-now/pull/86) <br /><br /> [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://nrn-v2-mst-aptd-at-lcz-sty-storybook.vercel.app) | -&nbsp;[Customer&nbsp;1&nbsp;(prod)](https://nrn-v2-mst-aptd-at-lcz-sty-c1.vercel.app/) -&nbsp;[Customer&nbsp;1&nbsp;(preview)](https://nrn-v2-mst-aptd-at-lcz-sty-c1-preview.vercel.app/) <br /> -&nbsp;[Customer&nbsp;2&nbsp;(prod)](https://nrn-v2-mst-aptd-at-lcz-sty-c2.vercel.app/) <br /> -&nbsp;[Customer&nbsp;2&nbsp;(preview)](https://nrn-v2-mst-aptd-at-lcz-sty-c2-preview.vercel.app/) <br /> -&nbsp;[Customer&nbsp;1&nbsp;CMS](https://nrn.my.stacker.app/login?api_token=be1050d1-de5e-4ae0-97c8-030a132f254b&ref=unly-nrn) <br /> -&nbsp;[Customer&nbsp;2&nbsp;CMS](https://nrn.my.stacker.app/login?api_token=c3a703bc-c4cc-42ee-aeac-03643636dbb0&ref=unly-nrn) | -&nbsp;Analytics (Amplitude)<br />-&nbsp;Airtable (DB)<br />-&nbsp;Stacker CMS<br />-&nbsp;I18n (Airtable + Locize)<br />-&nbsp;Monitoring (Sentry) | -&nbsp;Features a very rich (and complex) application with lots of tooling. Similar to `v2-mst-aptd-gcms-lcz-sty` but provides a much better build-in CMS and more advanced features like Quick preview <br />-&nbsp;Beware Locize [static i18n](https://unlyed.github.io/next-right-now/concepts/i18n#a-few-words-on-static-i18n) support doesn't come for free, nor does Stacker once you've deployed your app into production. |
| `v2-mst-aptd-gcms-lcz-sty` <br /><br /> Mai&nbsp;2020 | -&nbsp;[Doc](https://unlyed.github.io/next-right-now/available-presets/v2-mst-aptd-gcms-lcz-sty) <br /> -&nbsp;[Branch](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-gcms-lcz-sty) <br /> -&nbsp;[PR](https://github.com/UnlyEd/next-right-now/pull/68) <br /><br /> [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://nrn-v2-mst-aptd-gcms-lcz-sty-storybook.vercel.app) | -&nbsp;[Customer&nbsp;1&nbsp;(prod)](https://nrn-v2-mst-aptd-gcms-lcz-sty-c1.vercel.app/) <br /> -&nbsp;[Customer&nbsp;1&nbsp;(preview)](https://nrn-v2-mst-aptd-gcms-lcz-sty-c1-preview.vercel.app/) <br /> -&nbsp;[Customer&nbsp;2&nbsp;(prod)](https://nrn-v2-mst-aptd-gcms-lcz-sty-c2.vercel.app/) <br /> -&nbsp;[Customer&nbsp;2&nbsp;(preview)](https://nrn-v2-mst-aptd-gcms-lcz-sty-c2-preview.vercel.app/) <br /> -&nbsp;[GraphCMS](https://app.graphcms.com/b767f8ab435746e2909249461e2f1eb7/master) _(credentials in demo)_ | -&nbsp;Analytics (Amplitude)<br />-&nbsp;GraphQL (GraphCMS API **v2**)<br />-GraphCMS CMS<br />-&nbsp;I18n (GraphCMS + Locize)<br />-&nbsp;Monitoring (Sentry) | -&nbsp;Features a very rich (and complex) application with lots of tooling. <br />-&nbsp;Beware Locize [static i18n](https://unlyed.github.io/next-right-now/concepts/i18n#a-few-words-on-static-i18n) support doesn't come for free. |
| ~~`v1-ssr-mst-aptd-gcms-lcz-sty`~~ (**deprecated**) <br /><br /> 2019 | -&nbsp;[Doc](https://unlyed.github.io/next-right-now/available-presets/v1-ssr-mst-aptd-gcms-lcz-sty) <br /> -&nbsp;[Branch](https://github.com/UnlyEd/next-right-now/tree/v1-ssr-mst-aptd-gcms-lcz-sty) | _Online demos have been removed due to deprecation_ | -&nbsp;Analytics (Amplitude)<br />-&nbsp;GraphQL (GraphCMS)<br />-&nbsp;I18n (GraphCMS + Locize)<br />-&nbsp;Monitoring (Sentry) | -&nbsp;Features a very rich (and complex) application with lots of tooling. <br />-&nbsp;Beware Locize [static i18n](https://unlyed.github.io/next-right-now/concepts/i18n#a-few-words-on-static-i18n) support doesn't come for free. |

---

# Quick start

[Go to our "Quick start" section](https://unlyed.github.io/next-right-now/getting-started/quick-start).

---

# Testimonials

> "We initially built our app with Create React App and as our product evolves we needed to have a solid SEO.
> We planned to migrate to NextJS, but it looked very time-consuming to set up everything again.
> Here's come Next Right Now providing a complete boilerplate with great tools already integrated like Sentry or Locize.
> TypeScript, with good typings, is the icing on the cake.
> It helps us a lot to move quickly on NextJS." - [ApplyFuture](https://www.applyfuture.com/), _2020-10_

---

# FAQ

[Go to our community FAQ](https://unlyed.github.io/next-right-now/faq).

---

# CHANGELOG

[Go to our changelog](https://unlyed.github.io/next-right-now/changelog).

---

# Contributing

[Go to our contributing guide](https://unlyed.github.io/next-right-now/contributing).

---

# Roadmap

[Go to our roadmap](https://unlyed.github.io/next-right-now/roadmap).

---

# License

[MIT](LICENSE)

---

# Vulnerability disclosure

[See our policy](https://github.com/UnlyEd/Unly).

---

# Contributors and maintainers

This project is being authored by:
- [Unly] Ambroise Dhenain ([Vadorequest](https://github.com/vadorequest)) **(active)**

**Special thanks to our contributors**:
- Hugo Martin ([Demmonius](https://github.com/Demmonius)) - [Github Actions CI/CD pipeline](https://github.com/UnlyEd/next-right-now/pulls?q=is%3Apr+author%3ADemmonius+sort%3Aupdated-desc+)
- Sovattha SOK ([sovattha](https://github.com/sovattha)) - [GraphQL Authorization](https://github.com/UnlyEd/next-right-now/pulls?q=is%3Apr+author%3Asovattha+sort%3Aupdated-desc)
- Samuel Castro ([samuelcastro](https://github.com/samuelcastro)) - [Various stuff](https://github.com/UnlyEd/next-right-now/pulls?q=is%3Apr+author%3Asamuelcastro+sort%3Aupdated-desc)
- Joshua Andrew Jourdain ([jajourda](https://github.com/jajourda)) - [Documentation](https://github.com/UnlyEd/next-right-now/pulls?q=is%3Apr+author%3Ajajourda+sort%3Aupdated-desc)

---

# **[ABOUT UNLY]** <a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" height="40" align="right" alt="Unly logo" title="Unly logo" /></a>

> [Unly](https://unly.org) is a socially responsible company, fighting inequality and facilitating access to higher education.
> Unly is committed to making education more inclusive, through responsible funding for students.

We provide technological solutions to help students find the necessary funding for their studies.

We proudly participate in many TechForGood initiatives. To support and learn more about our actions to make education accessible, visit :
- https://twitter.com/UnlyEd
- https://www.facebook.com/UnlyEd/
- https://www.linkedin.com/company/unly
- [Interested to work with us?](https://jobs.zenploy.io/unly/about)

Tech tips and tricks from our CTO on our [Medium page](https://medium.com/unly-org/tech/home)!

#TECHFORGOOD #EDUCATIONFORALL
