---
layout: default
title: Roadmap
nav_order: 60
---

# Roadmap and future improvements

This page is about what we intend to do in NRN in the future. It's meant to provide a little guideline about where the project is headed and what's prioritised.

> All "presets requests" are managed through [this GitHub project](https://github.com/UnlyEd/next-right-now/projects/1)

- We want to release more presets, [as mentioned here](https://unlyed.github.io/next-right-now/concepts/presets#which-presets-are-being-considered)
    - Although it's my personal goal, and those presets would definitely be useful, it'll make my life harder since it'll mean spend more time administrating all those presets and keeping them up-to-date.
    - It's the main reason why I haven't focused on that so far, I can't realistically maintain 5+ presets up-to-date all the time, I'm not sure how to go about that.
    - This has been confirmed when we released `v2-mst-aptd-at-lcz-sty` preset, with changes being done in either presets and needed to be cherry-picked in others, sometimes with small variations.
    - Until now, I've focused mostly on 1-2 presets and improved them as much as I can to reduce the amount of work needed when new presets will be added.
- Release [`HybridCache` current implementation](https://github.com/UnlyEd/next-right-now/pull/92) as its own NPM package (basically extract it from NRN for easier re-use in other projects)
    - No particular hurry, it doesn't feel like it's something requested by the community
- Unit tests for UI components and utilities, especially for the most important ones
    - Feel free to pick a UI component or utility and make a PR about it (one component/utility at a time, please) if you'd like to

Check out [this discussion](https://github.com/UnlyEd/next-right-now/discussions/137) if you want to contribute to the project! Our [contributing guide](https://unlyed.github.io/next-right-now/contributing.html) may be helpful as well.
