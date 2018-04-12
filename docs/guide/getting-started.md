---
next: ./markdown
---

# Getting Started

## Global Installation

If you just want to play around with VuePress, you can install it globally:

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

If you have an existing project and would like to keep documentation inside the project, you should install VuePress as a local dependency. This setup also allows you to use CI or services like Netlify for automatic deployment on push.

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

## Basic Configurations

Right now our page is pretty minimal, and the user has no way to navigate around the site. To customize your site, let's first create a `.vuepress` directory inside your docs directory. This is where all VuePress-specific files will be placed in.

The essential file for configuring a VuePress site is `.vuepress/config.js`, which simply exports a JavaScript object:

``` js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```

### Navbar Links

### Sidebar
