Page layouts
===

> Check out the [documentation about the folder structure](../README.md#folder-structure)

Summary:

- `core`: Share reusable components between layouts.
- `demo`: Used by all demo pages. You'll eventually get rid of it, but until then it can be a good inspiration.
- `public`: Only used by a single page (at "/public"), meant to be the layout for public pages.
- `quickPreview`: Used by some demo pages. Keep it if you need it!
- You can add custom layouts and use them in your pages right away.
- Layouts are flexible, we used the `DemoLayout` in all pages under `pages/[locale]/demo` but **you don't have to**, it was a choice.
- Layouts are usually useful when you want to have a similar UI shared by several pages.
- Layouts are meant to avoid code duplication between pages sharing the same layout and increase code maintainability.
