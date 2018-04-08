---
navTitle: Getting Started
---

# VuePress

> Minimalistic docs generator with Vue component based layout system

## Why

- **Writing First**: minimal setup, all you need is a markdown file.

- **Vue-powered**: Use custom Vue components inside markdown, and develop custom themes using Vue single file components.

- **Great Dev Experience**: enjoy the same enjoyable development experience of a Vue app. Leverage the full power of webpack (hot-reload, pre-processors), generate SEO-friendly static HTML, and works as an SPA after initial page load.

- **Optimized for Docs**: many [built-in markdown extensions](./markdown.md) and default theme features for writing great documentation.

- **GitHub Friendly**: source markdown files can link to each other using relative links that ends in `.md` so they are also readable on GitHub, auto-generates page edit links if a repo is provided.

## Quickstart

``` bash
# install globally
npm install -g vuepress

# create a markdown file
echo "# Hello VuePress!" > index.md

# start writing
vuepress dev .

# build
vuepress build .
```

## Inside an Existing Project

``` bash
# install as a dependency
npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
echo "# Hello VuePress!" > docs/index.md

# start writing
npx vuepress dev docs
```

Or, add some scripts to `package.json`:

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

Then you can start writing with:

``` bash
npm run docs:dev
```

To generate static assets, run:

``` bash
npm run docs:build
```

By default the built files will be in `.vuepress/dist`. The files can be deployed to any static file server. See [Deployment Guide](./deploy.md) for guides on deploying to popular services.
