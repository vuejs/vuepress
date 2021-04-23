# Architecture

## Overview

![vuepress-architecture-overview](/images/guide/vuepress-architecture-overview.png)

The above figure shows a brief overview of the VuePress architecture:

- Node App will generate temp files, including the layouts, pages, routes, etc.
- Bundler will handle Client App together with the temp files, just like a common Vue SPA.

As a developer, you must be aware of that VuePress has two main parts: **Node App** and **Client App**, which is important when developing plugins and themes:

- The entry file of a plugin or a theme will be loaded in Node App. So you need to use CommonJS format for them.
- Client files will be loaded in Client App, which will be handled by bundler. For example, layouts, components, app setup files, app enhance files, etc. You'd better use ESM format for them.

## Core Process and Hooks

![vuepress-core-process](/images/guide/vuepress-core-process.png)

The above figure shows the core process of VuePress Node App and the hooks of [Plugin API](../reference/plugin-api.md):

- In the **init** stage:
  - Theme and plugins will be loaded. That means all the plugins should be used before initialization.
  - As we are using markdown-it to parse the markdown file, the [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) hook will be processed before loading page files.
  - Page files will be loaded, and [extendsPageOptions](../reference/plugin-api.md#extendspageoptions) hook will be processed to create pages.
- In the **prepare** stage:
  - Temp files will be generated, so all hooks related to client files will be processed here.
- In the **dev / build** stage:
  - Bundler will be resolved. The [alias](../reference/plugin-api.md#alias) and [define](../reference/plugin-api.md#define) hooks depend on bundler configuration, so they will be processed here.