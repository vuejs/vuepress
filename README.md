# VuePress

> Minimalistic docs generator with Vue component based layout system

## Goals

- Vue-powered: the layout system is a Vue app. It's also pre-rendered into static HTML. And you can register and use Vue components inside markdown content.

  - Deep markdown customization to make using Vue inside markdown a breeze.

- Docs first: most of your content will be in Markdown.

- Largely gitbook compatible: should be easy to migrate existing gitbook docs over, and maintain original URLs.

- GitHub friendly: pages should be able to link to each other using relative links that ends in `.md`. Also should be able to infer relative position if a GitHub repo name is provided.

- Minimal: most of the additional things are expected to be done in your layout using plain Vue/JavaScript.
