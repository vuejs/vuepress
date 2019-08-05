## Development Setup

This project uses a monorepo setup that requires using [Yarn](https://yarnpkg.com) because it relies on [Yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).

``` sh
# Install dependencies & Compile utilities wrote by TypeScript.
yarn bootstrap

# Clean dependencies.
yarn clean

# Useful when created new sub module.
yarn boot

# Serve the docs.
yarn dev

# Build the docs.
yarn build

# Execute all the test suites.
yarn test
```

## Core packages

- **docs**: Docs of VuePress (Do not publish to NPM.)
- **vuepress**: CLI of VuePress.
- **packages**
  - `core`: Containing Node.js API, Plugin API, Theme API, Client SPA, etc.
  - `markdown`: Internal Markdown Compiler.
  - `markdown-loader`: Internal Markdown Compiler.
  - `plugin-active-header-links`: A plugin for active sidebar heading links.
  - `plugin-google-analytics`: GA integration.
  - `plugin-last-updated`: Implementaion of "lastUpdated".
  - `plugin-medium-zoom`: medium-zoom integration.
  - `plugin-nprogress`: nprogress integration.
  - `plugin-pwa`: PWA plugin.
  - `plugin-search`: Search plugin, providing the `<SearchBox />` component.
  - `shared-utils`: Utilities wrote by TS.
  - `test-utils`: Test Utilities.
  - `theme-default`: Default Theme.
  - `theme-vue`: A theme tweak from default theme and used for Vue official project.

## Core packages Not in Main Project

> Previously, for quick iteration, these proejcts are still in ULIVZ's workspace. In the future, we may build an 
independent Github Group.

- [awesome-vuepress](https://github.com/ulivz/awesome-vuepress)
- [@vuepress/plugin-blog](https://github.com/ulivz/vuepress-plugin-blog)
- [@vuepress/theme-blog](https://github.com/ulivz/vuepress-theme-blog)

## Workflow

### Issue

> TODO

### Pull Request

> TODO

### Substantial Changes

> RFC flow, TODO

## Code Specification

> TODO

## Commit Specification

> TODO




