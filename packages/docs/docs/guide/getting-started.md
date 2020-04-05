# Getting Started

::: warning Prerequisite
VuePress requires [Node.js](https://nodejs.org/en/) >= 8.6.
:::

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

   Globally installed VuePress is no longer recommended.

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

   This step is optional but highly recommended, the rest of the documentaion will assume those scripts being added.

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

Once you’re familiar with those concepts mentioned above, learn about how to enrich your content with [static assests](assets.html), [Markdown extensions](markdown.html) and [vue components](using-vue.html).

And when your documentation site start to take shape, check out the [multi-language support](i18n.html) and guides for [deploying](deploy.html) your site to popular services.
