---
layout: default
title: How to remove the built-in demo examples
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

It's very easy to do, and **can be done in a few seconds**.
We'll take the example of the `v2-mst-aptd-at-lcz-sty` preset, that lives in [this github repo branch](https://github.com/UnlyEd/next-right-now/tree/v2-mst-aptd-at-lcz-sty).

> It's really up to you to decide what you do with the built-in demo. It can be used as reference for other teammates or for yourself later.
> You could, for instance, keep it around under the same /examples/ path, and disallow that route on production.

### Change the Homepage entry point to load a different file

1. Go to the entrypoint for the whole app (AKA "homepage"), located under [`src/pages/[locale]/index.tsx`](https://github.com/UnlyEd/next-right-now/blob/v2-mst-aptd-at-lcz-sty/src/pages/%5Blocale%5D/index.tsx)
1. As you can notice, that's where we import the demo examples using `import DocsHomePage, { getStaticPaths as getStaticPathsHomePage, getStaticProps as getStaticPropsHomePage } from './examples/';`
1. You can either delete this file entirely and copy the `pageTemplateSSG` or `pageTemplateSSR` file (and rename it `index.tsx` so that it acts as the new homepage), or just replace the existing file content with your own app

By doing this, you'll basically bypass the whole `/examples` files, which are still accessible at [http://localhost:8888/examples](http://localhost:8888/examples) if you wish to use them as local reference.
Feel free to delete the whole `/examples` folder when you don't need it anymore. (we advise to keep it around until you're familiar with the preset, as it's a great source of inspiration)

### Deleting all demo and example files

If you want to get rid of all the demo files, you can remove the following:
- `src/components/doc`
- `src/pages/[locale]/examples`

Also, note the files `SSG.ts` and `SSR.ts` define the `getExamplesCommonStaticPaths` and `getExamplesCommonStaticProps` used by all the examples.

You should keep those around if you want to keep the demo around.
Alternatively, you can move the `getExamplesCommonStaticPaths` and `getExamplesCommonStaticProps` implementations to  `getCommonStaticPaths` and `getCommonStaticProps`.

> As long as you don't change the implementation of `getExamplesCommonStaticPaths` or `getExamplesCommonStaticProps`, you don't need to change anything there.
>
> You'll probably need to change the implementation of `getCommonStaticPaths` and `getCommonStaticProps` if you implement your own business logic.
> When you do so, you can either duplicate the existing code about the examples, if you want to keep those around, or simply remove both `getExamplesCommonStaticPaths` and `getExamplesCommonStaticProps`.

