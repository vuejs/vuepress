# Getting Started

::: warning Prerequisites
VuePress requires [Node.js](https://nodejs.org/en/) >= 8.6.
:::

This section will help you build a basic VuePress documentation site from ground up. If you already have an existing project and would like to keep documentation inside the project, start from Step 3.

1. Create and change into a new directory

    ```bash
    mkdir vuepress-starter && cd vuepress-starter
    ```

2. Initialize with your preferred package manager

    ```bash
    yarn init # npm init
    ```

3. Install VuePress locally

    Globally installed VuePress is no longer recommanded.

    ```bash
    yarn add -D vuepress # npm install -D vuepress
    ```

    ::: warning
    We currently recommend using [Yarn](https://classic.yarnpkg.com/lang/en/) instead of npm when installing VuePress into an existing project that has webpack 3.x as a dependency, because npm fails to generate the correct dependency tree in this case.
    :::

4. Create your first document

    ```bash
    mkdir docs && echo '# Hello VuePress' > docs/README.md
    ```

5. Add some [scripts](https://classic.yarnpkg.com/en/docs/package-json#toc-scripts) to `package.json`

    This step is optional but highly recommanded, the rest of the documentaion will assume those scripts being added.

    ``` json
    {
      "scripts": {
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs"
      }
    }
    ```

6. Serve the documentation site in the local server

    ```bash
    yarn docs:dev # npm run docs:dev
    ```

    VuePress will start a hot-reloading development server at [http://localhost:8080](http://localhost:8080).

By now, you should have a basic but functional VuePress documentation site.

To understand how to structure your documents and configurations, check out recommended [document structure](./directory-structure.html).

To config your documentation site and gain more custimization. Visit [Basic Config](/basic-config.html)

You can also use [static assests], markdown sytax and Vue Component your VuePress documentation.

When your documentation site start to take shape, you may want to deloy it on a popular hosting services.
