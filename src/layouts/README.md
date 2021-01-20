Page layouts
===

> Check out the [documentation about the folder structure](../README.md#folder-structure)

Summary:
- `core`: Share reusable components between layouts.
- `default`: Used by all non-demo pages. Customise it, or change the core, as you prefer.
- `demo`: Used by all demo pages. You'll eventually get rid of it, but until then it can be a good inspiration.
- You can add custom layouts and use them in your pages right away.
- Layouts are flexible, we used the `DemoLayout` in all pages under `pages/[locale]/demo` but **you don't have to**, it was a choice.
- Layouts are usually useful when you want to have a similar UI shared by several pages.
- Layouts are meant to avoid code duplication and increase code maintainability.
