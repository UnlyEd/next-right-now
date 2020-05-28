# Next.js pages

[Official documentation](https://nextjs.org/docs/basic-features/pages)

## Native optimisations

Next.js automatically optimise the page client build based on whether they implement `getStaticProps` (SSG) or `getServerSideProps` (SSR).

For instance, all code within `getStaticProps` and `getServerSideProps` is automatically stripped from the browser bundle.
But, it's also the case for top-level `import` that are only used within those functions.

### Visualise bundle optimisation

[https://next-code-elimination.now.sh/](https://next-code-elimination.now.sh/) will help you visualise the difference between the code you write and what's actually bundled into the client.

Example with:
- [https://next-code-elimination.now.sh/s/hc9SWg_fj]([locale]/examples/pageTemplateSSG)
- [https://next-code-elimination.now.sh/s/M0oIDdQJ2]([locale]/examples/pageTemplateSSR)
- [https://next-code-elimination.now.sh/s/nejeyE9MH]([locale]/examples/native-features/example-with-ssg-and-fallback/[albumId])

> You'll notice for both those files that server-side module imports such as `ApolloQueryResult` are completely stripped from the client-side build.
>
> Also, for `[albumId]`, relative imports such as `songs` are also automatically stripped!
