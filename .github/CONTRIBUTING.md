## Development Setup

This project uses a monorepo setup that requires using [Yarn](https://yarnpkg.com) because it relies on [Yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).

``` sh
# Install dependencies & compile TypeScript utilities.
yarn bootstrap

# Clean dependencies.
yarn clean

# Useful when creating new submodules.
yarn boot

# Serve the docs.
yarn dev

# Build the docs.
yarn build

# Execute all the test suites.
yarn test
```

## Core packages

- **docs**: Docs of VuePress (do not publish to npm).
- **vuepress**: VuePress CLI.
- **packages**
  - `core`: containing the Node.js API, the Plugin API, the Theme API, the Client SPA, etc.
  - `markdown`: internal Markdown compiler.
  - `markdown-loader`: internal Markdown loader.
  - `plugin-active-header-links`: a plugin for active sidebar heading links.
  - `plugin-google-analytics`: Google Analytics integration.
  - `plugin-last-updated`: implementation of "last updated" feature.
  - `plugin-medium-zoom`: `medium-zoom` integration.
  - `plugin-nprogress`: `nprogress` integration.
  - `plugin-pwa`: PWA plugin.
  - `plugin-search`: search plugin, providing the `SearchBox` component.
  - `shared-utils`: TypeScript utilities.
  - `test-utils`: test utilities.
  - `theme-default`: default theme.
  - `theme-vue`: a theme tweak from default theme, used for the official Vue project.

## Core packages not in main project

> Previously, for quick iteration, these projects were kept in ULIVZ's workspace. In the future, we may want to build an independent GitHub group.

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




