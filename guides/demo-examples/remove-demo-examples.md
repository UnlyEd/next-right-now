---
layout: default
title: How to setup Stacker
parent: Demo examples
grand_parent: Guides
nav_order: 10
---

# How to remove the built-in demo examples
{: .no_toc }

<div class="code-example" markdown="1">
Guide about how to remove the default demo examples so you can build your own app instead.

The demo is great at showcasing features and explaining concepts, but you'll most likely want to tear it down, eventually.
</div>

---

## Example - Guide on how to remove the demo examples from the preset [v2-mst-aptd-at-lcz-sty](../../available-presets/v2-mst-aptd-at-lcz-sty)


It's very easy to do, and **can be done in a single step**. We'll take the example of the `v2-mst-aptd-at-lcz-sty` preset, that lives in [this github repo branch](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-at-lcz-sty).

1. Go to the entrypoint for the whole app (AKA "homepage"), located under [`src/pages/[locale]/index.tsx`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/pages/%5Blocale%5D/index.tsx)
1. As you can notice, that's where we import the demo examples using `import DocsHomePage, { getStaticPaths as getStaticPathsHomePage, getStaticProps as getStaticPropsHomePage } from './examples/';`
1. You can either delete this file entirely and copy the `pageTemplateSSG` or `pageTemplateSSR` file (and rename it `index.tsx` so that it acts as the new homepage), or just replace the existing file content with your own app

By doing this, you'll basically bypass the whole `/examples` files, which are still accessible at [http://localhost:8888/examples](http://localhost:8888/examples) if you wish to use them as local reference.
Feel free to delete the whole `/examples` folder when you don't need it anymore. (we advise to keep it around until you're familiar with the preset, as it's a great source of inspiration)

Note that the following could also be removed, as they're only useful for the demo examples:
- `src/components/doc/`

> It's really up to you to decide what you do with the built-in demo. It can be used as reference for other teammates or for yourself later.
> You could, for instance, keep it around under the same /examples/ path, and disallow that route on production.
