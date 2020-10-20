# vuepress-next

> With the power of Vue 3.0 and TypeScript

## Status: Pre-Alpha

Core features have been completed, but are still unstable.

Accepting issues and PRs from community. Contribution welcome!

## Develop & Preview

```sh
# install dependencies
# with yarn classic workspaces
yarn

# run dev and build script
# compiling typescript source code
yarn dev
yarn build

# testing
yarn test

# start a dev-server
yarn docs:dev
# build static files
yarn docs:build
# serve static files locally
yarn docs:serve
```

### TODO List

Features in the following list are not fully determined, and might be changed or removed during development.

- [ ] @vuepress/core

  - [x] Plugin API
    - [x] clientAppEnhanceFiles
    - [x] clientAppSetupFiles
    - [ ] extendsPageData
    - [ ] extendsCli
    - [ ] globalUIComponents
    - [ ] configureWebpack
  - [ ] Theme API
    - [ ] Palette System
    - [ ] Theme Inheritance

- [ ] @vuepress/markdown

  - [x] customComponentPlugin
  - [ ] highlightPlugin
  - [ ] highlightLinesPlugin
  - [x] hoistTagsPlugin
  - [ ] lineNumbersPlugin
  - [x] linksPlugin
  - [ ] snippetsPlugin

- [x] @vuepress/bundler-webpack

  - [x] Dev server (dev)
  - [x] Pre-render (build)
  - [x] Style pre-processors config

- [ ] @vuepress/theme-default

- [x] @vuepress/cli

  - [x] Resolve user config file
  - [x] Watch & Reload (dev)

- [ ] official plugins

  - [ ] @vuepress/plugin-back-to-top
  - [ ] @vuepress/plugin-google-analytics
  - [ ] @vuepress/plugin-medium-zoom
  - [x] @vuepress/plugin-nprogress
  - [ ] @vuepress/plugin-pwa
  - [ ] @vuepress/plugin-search

- [ ] docs
  - [ ] Migration Guide

### Breaking Changes

Temporarily record some breaking changes here.

#### Core

- permalink patterns
  - `:i_month` -> removed
  - `:i_day` -> removed
  - `:minutes` -> removed (undocumented in 1.0)
  - `:seconds` -> removed (undocumented in 1.0)
  - `:regular` -> `:raw`

#### Plugin API

- `ready` -> `onPrepared`
- `updated` -> removed
- `generated` -> `onGenerated`
- `additionalPages` -> removed, use `app.pages.push(createPage())` in `onInitialized` hook
- `clientDynamicModules` -> removed, use `app.writeTemp()` in `onPrepared` hook
- `enhanceAppFiles` -> `clientAppEnhanceFiles`
- `clientRootMixin` -> `clientAppSetupFiles`
- `extendMarkdown` -> `extendsMarkdown`

#### Theme API

- `extend` -> `extends`
