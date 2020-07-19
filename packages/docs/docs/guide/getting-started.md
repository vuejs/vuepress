# Getting Started

::: warning Prerequisite
VuePress requires [Node.js](https://nodejs.org/en/) >= 8.6.
:::

## Quick Start

The fastest way to get your VuePress project setup is to use our create-vuepress tool which will help scaffold the basic VuePress site structure for you.

To use it, open up your terminal in the desired directory and run the following command:

```bash
yarn create vuepress [directoryName]
# OR npx create-vuepress [directoryName]
```

You will be prompted to choose which boilerplate you prefer. For most users, the `docs` boilerplate is what you will want.

You will then have the opportunity to configure your VuePress site’s metadata such as:

- Project Name
- Description
- Maintainer Email
- Maintainer Name
- Repository URL

Once it is complete, you should see your new VuePress site scaffolded in your directory! :tada:

## Manual Setup

This section will help you build a basic VuePress documentation site from ground up. If you already have an existing project and would like to keep documentation inside the project, start from Step 3.

1. Create and change into a new directory

   ``` bash
   mkdir vuepress-starter && cd vuepress-starter
   ```

2. Initialize with your preferred package manager

   ``` bash
   yarn init # npm init
   ```

3. Install VuePress locally

   ``` bash
   yarn add -D vuepress # npm install -D vuepress
   ```

   ::: warning
   We currently recommend using [Yarn](https://classic.yarnpkg.com/lang/en/) instead of npm when installing VuePress into an existing project that has webpack 3.x as a dependency, because npm fails to generate the correct dependency tree in this case.
   :::

4. Create your first document

   ``` bash
   mkdir docs && echo '# Hello VuePress' > docs/README.md
   ```

5. Add some [scripts](https://classic.yarnpkg.com/en/docs/package-json#toc-scripts) to `package.json`

   This step is optional but highly recommended, the rest of the documentation will assume those scripts being added.

   ``` json
   {
     "scripts": {
       "docs:dev": "vuepress dev docs",
       "docs:build": "vuepress build docs"
     }
   }
   ```

6. Serve the documentation site in the local server

   ``` bash
   yarn docs:dev # npm run docs:dev
   ```

   VuePress will start a hot-reloading development server at [http://localhost:8080](http://localhost:8080).

By now, you should have a basic but functional VuePress documentation site. Next, learn about VuePress’ recommended [directory structure](directory-structure.html) and the basics of [configuration](basic-config.html) in VuePress.

Once you’re familiar with those concepts mentioned above, learn how to enrich your content with [static assets](assets.html), [Markdown extensions](markdown.html) and [vue components](using-vue.html).

And when your documentation site starts to take shape, be sure to read about [multi-language support](i18n.html) and the [deployment guide](deploy.html).
