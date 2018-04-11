---
next: ./markdown
---

# Getting Started

## Global Installation

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
# install as a local dependency
npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
echo "# Hello VuePress!" > docs/README.md

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

By default the built files will be in `.vuepress/dist`, which can be configured via the `dest` field in `.vuepress/config.js`. The built files can be deployed to any static file server. See [Deployment Guide](./deploy.md) for guides on deploying to popular services.
