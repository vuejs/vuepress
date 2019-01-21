# Getting Started

::: warning COMPATIBILITY NOTE
VuePress requires Node.js >= 8.
:::

## Global Installation

If you just want to play around with VuePress, you can install it globally:

``` bash
# install globally
yarn global add vuepress # OR npm install -g vuepress

# create a new page
vuepress newpage --title "Hello VuePress" --path "README.md"

# start writing
vuepress dev

# build
vuepress build
```

## Inside an Existing Project

If you have an existing project and would like to keep documentation inside the project, you should install VuePress as a local dependency. This setup also allows you to use CI or services like Netlify for automatic deployment on push.

``` bash
# install as a local dependency
yarn add -D vuepress # OR npm install -D vuepress

# create default theme home page
vuepress newpage --path "docs/README.md" --frontmatter.home true
```

::: warning
It is currently recommended to use [Yarn](https://yarnpkg.com/en/) instead of npm when installing VuePress into an existing project that has webpack 3.x as a dependency. Npm fails to generate the correct dependency tree in this case.
:::

Then, add some scripts to `package.json`:

``` json
{
  "scripts": {
    "docs:newpage": "vuepress newpage docs",
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

You can now start creating pages with:

``` bash
yarn docs:newpage # OR npm run docs:newpage
```

You can now start writing with:

``` bash
yarn docs:dev # OR npm run docs:dev
```

To generate static assets, run:

``` bash
yarn docs:build # Or npm run docs:build
```

By default the built files will be in `.vuepress/dist`, which can be configured via the `dest` field in `.vuepress/config.js`. The built files can be deployed to any static file server. See [Deployment Guide](deploy.md) for guides on deploying to popular services.
