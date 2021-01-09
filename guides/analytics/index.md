---
layout: default
title: Analytics
parent: Guides
nav_order: 40
has_children: true
---

# Amplitude provider

We decided from the beginning to use Amplitude instead of the traditional Google Analytics.

This choice was motivated by our experience with Google Analytics, which is not a good tool when building dynamic apps.
As GA was created in 2005, when the web was all about full page reload, it was not designed to handle apps with dynamic parts.

While it works really great with simple page transitions (full page reload), it provides a very bad experience for developers.
Also, their "real-time" feature and overall developer experience is really poor.

On the other hand, Amplitude provides great features and makes it very easy to integrate to Next.js using a community-powered React library.
