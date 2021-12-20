# Getting Started

## Prerequisites

- [Node.js 10+](https://nodejs.org/en/)
- [Yarn Classic](https://classic.yarnpkg.com/en/) (Optional)\*

\* _If your project is using webpack 3.x, you may notice some installation issues with `npm`. In this case, we recommend using Yarn._

## Quick Start

The fastest way to get your VuePress project set up is to use our [create-vuepress-site generator](https://github.com/vuepressjs/create-vuepress-site/), which will help scaffold the basic VuePress site structure for you.

To use it, open up your terminal in the desired directory and run the following command:

<code-group>
<code-block title="YARN" active>
```bash
yarn create vuepress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM">
```bash
npx create-vuepress-site [optionalDirectoryName]
```
</code-block>
</code-group>

The command will interactively ask for details to configure your VuePress site’s metadata such as:

- Project Name
- Description
- Maintainer Email
- Maintainer Name
- Repository URL

Once this done, a scaffolded documentation site will be created in the `docs` directory (or custom directory name, if passed) under the current directory.

To see it in action, navigate into newly scaffolded directory, install the dependencies and start the local server:

<code-group>
<code-block title="YARN" active>
```bash
cd docs
yarn install
yarn dev
```
</code-block>

<code-block title="NPM">
```bash
cd docs
npm install
npm run dev
```
</code-block>
</code-group>

## Manual Installation

If you prefer, you can build a basic VuePress documentation site from ground up instead of using the generator mentioned above.

Note: If you already have an existing project and would like to keep documentation inside the project, start from Step 3.

1. Create and change into a new directory

   ```bash
   mkdir vuepress-starter && cd vuepress-starter
   ```

2. Initialize with your preferred package manager

   <code-group>
   <code-block title="YARN" active>
    ```bash
    yarn init
    ```
   </code-block>

   <code-block title="NPM">
   ```bash
   npm init
   ```
   </code-block>
   </code-group>

3. Install VuePress locally

   <code-group>
   <code-block title="YARN" active>
   ```bash
   yarn add -D vuepress
   ```
   </code-block>

   <code-block title="NPM">
   ```bash
   npm install -D vuepress
   ```
   </code-block>
   </code-group>

4. Create your first document

   ```bash
   mkdir docs && echo '# Hello VuePress' > docs/README.md
   ```

5. Add helper [scripts](https://classic.yarnpkg.com/en/docs/package-json#toc-scripts) to `package.json`

   This step is optional but highly recommended, as the rest of the documentation will assume those scripts being present.

   ```json
   {
     "scripts": {
       "docs:dev": "vuepress dev docs",
       "docs:build": "vuepress build docs"
     }
   }
   ```

6. Serve the documentation site in the local server

   <code-group>
   <code-block title="YARN" active>
   ```bash
   yarn docs:dev
   ```
   </code-block>

   <code-block title="NPM">
   ```bash
   npm run docs:dev
   ```
   </code-block>
   </code-group>

   VuePress will start a hot-reloading development server at [http://localhost:8080](http://localhost:8080).

By now, you should have a basic but functional VuePress documentation site. Next, learn about VuePress’ recommended [directory structure](directory-structure.html) and the basics of [configuration](basic-config.html) in VuePress.

Once you’re familiar with those concepts mentioned above, learn how to enrich your content with [static assets](assets.html), [Markdown extensions](markdown.html) and [vue components](using-vue.html).

And when your documentation site starts to take shape, be sure to read about [multi-language support](i18n.html) and the [deployment guide](deploy.html).
