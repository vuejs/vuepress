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

# run playground script to preview
# start a dev-server
yarn play:dev
# build static files
yarn play:build
# serve static files locally
yarn play:serve
```

### TODO List

Features in the following list are not fully determined, and might be changed or removed during development.

- [ ] @vuepress/core

  - [x] Plugin API
    - [x] clientAppEnhanceFiles
    - [x] clientAppSetupFiles
    - [ ] extendPageData
    - [ ] extendCli
    - [ ] additionalPages
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

- [ ] @vuepress/bundler-webpack

  - [x] Dev server (dev)
  - [x] Pre-render (build)
  - [ ] Style pre-processors config

- [ ] @vuepress/theme-default

- [ ] @vuepress/cli

  - [ ] Resolve user config file
  - [ ] Watch & Reload (dev)

- [ ] official plugins

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
- `clientDynamicModules` -> removed, use `app.writeTemp()` in `onPrepared` hook directly
- `enhanceAppFiles` -> `clientAppEnhanceFiles`
- `clientRootMixin` -> `clientAppSetupFiles`

#### Theme API

- `extend` -> `extends`
