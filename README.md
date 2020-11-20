# vuepress-next

[![github check](https://github.com/vuepress/vuepress-next/workflows/check/badge.svg)](https://github.com/vuepress/vuepress-next/actions?query=workflow%3Acheck)
[![license](https://badgen.net/github/license/vuepress/vuepress-next)](https://github.com/vuepress/vuepress-next/blob/master/LICENSE)

> With the power of Vue 3.0 and TypeScript

## Status: Pre-Alpha

Core features have been completed, but are still unstable.

Accepting issues and PRs from community. Contribution welcome!

## Develop & Preview

```sh
# install dependencies with yarn classic workspaces
yarn

# start a dev-server to develop vuepress docs
yarn docs:dev
```

For more details, please check our [contributing guidelines](https://github.com/vuepress/vuepress-next/blob/master/docs/contributing.md).

### TODO List

Features in the following list are not fully determined, and might be changed or removed during development.

- [ ] @vuepress/core
  - [x] Plugin API
    - [x] clientAppEnhanceFiles
    - [x] clientAppRootComponentFiles
    - [x] clientAppSetupFiles
    - [x] extendsPageData
  - [ ] Theme API
    - [ ] Theme Inheritance

- [ ] @vuepress/markdown
  - [x] codePlugin
  - [x] customComponentPlugin
  - [ ] highlightLinesPlugin
  - [x] hoistTagsPlugin
  - [x] linksPlugin
  - [ ] snippetsPlugin

- [x] @vuepress/bundler-webpack
  - [x] Dev server (dev)
  - [x] Pre-render (build)
  - [x] Style pre-processors config

- [ ] @vuepress/theme-default
  - [x] Navbar
  - [x] Sidebar
  - [x] Page
  - [ ] Plugins integration

- [x] @vuepress/cli
  - [x] Resolve user config file
  - [x] Watch & Reload (dev)

- [ ] Official plugins
  - [ ] @vuepress/plugin-active-header-links
  - [x] @vuepress/plugin-back-to-top
  - [x] @vuepress/plugin-container
  - [x] @vuepress/plugin-git
  - [ ] @vuepress/plugin-google-analytics
  - [ ] @vuepress/plugin-medium-zoom
  - [x] @vuepress/plugin-nprogress
  - [ ] @vuepress/plugin-palette-stylus
  - [ ] @vuepress/plugin-pwa
  - [ ] @vuepress/plugin-search

- [ ] Documentation
  - [ ] Guide
  - [ ] References
  - [ ] API
  - [ ] Migration Guide

- [x] CI setup

### Breaking Changes

Temporarily record some breaking changes here.

#### Core

#### User config

- All webpack related configs are moved to `bundlerConfig` (with `@vuepress/bundler-webpack`)
  - `postcss` -> `bundlerConfig.postcss`
  - `stylus` -> `bundlerConfig.stylus`
  - `scss` -> `bundlerConfig.scss`
  - `sass` -> `bundlerConfig.sass`
  - `less` -> `bundlerConfig.less`
  - `chainWebpack` -> `bundlerConfig.chainWebpack`
  - `configureWebpack` -> `bundlerConfig.configureWebpack`
- `patterns` -> `pagePatterns`

##### Permalink patterns

- `:i_month` -> removed
- `:i_day` -> removed
- `:minutes` -> removed (undocumented in 1.0)
- `:seconds` -> removed (undocumented in 1.0)
- `:regular` -> `:raw`

##### Palette system

The palette system of Vuepress 1.0 (i.e. `palette.styl` and `index.styl`) will only works in default theme

Custom theme authors can use their own way for users to configure styles (not be limited with stylus)

##### Default frontmatter

- `meta` -> `head`, which uses the same type with `siteConfig.head`

  For example:
  
  ```yaml
  head:
    - - meta
      - name: foo
        content: bar
    - - link
      - rel: canonical
        href: foobar
    - - script
      - {}
      - console.log('hello from frontmatter');
  ```

  Has the same structure with:

  ```js
  // .vuepress/config.js
  module.exports = {
    // ...
    head: [
      ['meta', { name: 'foo', content: 'bar' }],
      ['link', { rel: 'canonical', href: 'foobar' }],
      ['script', {}, `console.log('hello from frontmatter');`],
    ],
    // ...
  }
  ```

##### Plugin API

- `ready` -> `onPrepared`
- `updated` -> removed
- `generated` -> `onGenerated`
- `additionalPages` -> removed, use `app.pages.push(createPage())` in `onInitialized` hook
- `clientDynamicModules` -> removed, use `app.writeTemp()` in `onPrepared` hook
- `enhanceAppFiles` -> `clientAppEnhanceFiles`
- `globalUIComponents` -> `clientAppRootComponentFiles`
- `clientRootMixin` -> `clientAppSetupFiles`
- `extendMarkdown` -> `extendsMarkdown`
- `extendPageData` -> `extendsPageData`
- `extendsCli` -> removed
- `configureWebpack` -> removed
- `chainWebpack` -> removed
- `beforeDevServer` -> removed
- `afterDevServer` -> removed

##### Theme API

- `extend` -> `extends`

#### CLI

- `-c, --cache [cache]` -> `-c, --cache <cache>` , i.e. the value of `cache` option is not optional
- `--no-cache` -> `--clean-cache`

#### Default Theme

- `<CodeGroup>`, `<CodeBlock>` -> `<CodeGroup>`, `<CodeGroupItem>`
