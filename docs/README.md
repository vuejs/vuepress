# VuePress

> Minimalistic docs generator with Vue component based layout system

## Why

- Writing first: minimal setup, all you need is a markdown file.

- Vue-powered: the layout system is a Vue app. It's also pre-rendered into static HTML. And you can register and use Vue components inside markdown content.

- Flexible: develop with full power of webpack (hot-reload, pre-processors support), generate SEO-friendly static HTML, and works as an SPA after initial page load.

- Optimized for docs: many built-in markdown extensions and default theme features for writing great documentation.

- GitHub friendly: pages can link to each other using relative links that ends in `.md`, auto-generates GitHub link and page edit links if a repo is provided.

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
