# Getting Started

::: warning COMPATIBILITY NOTE
VuePress requires Node.js >= 8.
:::

## Global Installation

If you only want to play around with VuePress, you can install it globally:

``` bash
# install globally
yarn global add vuepress # OR npm install -g vuepress

# create the project folder
mkdir vuepress-starter && cd vuepress-starter

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
vuepress dev

# build
vuepress build
```

## Inside an Existing Project

If you have an existing project and would like to keep documentation inside the project, you should install VuePress as a local dependency. This setup also allows you to use CI or services like [Netlify](https://netlify.com) for automatic deployment on push.

``` bash
# install as a local dependency
yarn add -D vuepress # OR npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
echo '# Hello VuePress' > docs/README.md
```

::: warning
We currently recommend using [Yarn](https://yarnpkg.com/en/) instead of npm when installing VuePress into an existing project that has webpack 3.x as a dependency, because npm fails to generate the correct dependency tree in this case.
:::

Then, add some scripts to `package.json`:

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

You can now start writing with:

``` bash
yarn docs:dev # OR npm run docs:dev
```

To generate static assets, run:

``` bash
yarn docs:build # OR npm run docs:build
```

By default, the built files will be in `.vuepress/dist`, which can be configured via the `dest` field in `.vuepress/config.js`. The built files can be deployed to any static file server. See [Deployment Guide](deploy.md) for guides on deploying to popular services.
