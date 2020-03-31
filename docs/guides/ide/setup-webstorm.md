---
layout: default
title: How to setup WebStorm
parent: IDE
grand_parent: Guides
nav_order: 10
---

# How to setup WebStorm IDE
{: .no_toc }

Guide about how to properly configure your WebStorm IDE.

{% include page-toc.md %}

---

## Exclude write-heavy directories to improve performances

Configure your IDE not to index `.next` and `.now` folders as they will eat a lot of your RAM because their files are changed very frequently!

On WebStorm, right click on the folders and select `Mark directory as > Excluded`.

## Configure interactive step-by-step debug mode

You can start the project in **debug mode** (built-in for WebStorm only) [by running the WebStorm "Debug" configuration in debug mode](https://youtu.be/3vbkiRAT4e8)

The configuration file is built-in and should be available as soon as you open the project using WebStorm.

## Configure in-editor GraphQL support

Install [JS GraphQL IntelliJ Plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin): GraphQL language support for WebStorm, IntelliJ IDEA and other IDEs based on the IntelliJ Platform.

The plugin is available using WebStorm directly. To install it, open your IDE "Settings", "Plugins", "Marketplace" and search for "GraphQL".

The plugin is built-in and should be available as soon as you open the project using WebStorm.

The usage of both `gql` and the IntelliJ GraphQL plugin is awesome, it allows to write GraphQL queries (see `src/gql`) and have auto-completion and validation from WebStorm itself.

To refresh the GraphQL spec, just run the `.graphqlconfig` file by opening it and run the stage you want to sync (usually staging).
