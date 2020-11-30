# vuepress-next

[![github check](https://github.com/vuepress/vuepress-next/workflows/check/badge.svg)](https://github.com/vuepress/vuepress-next/actions?query=workflow%3Acheck)
[![github docs](https://github.com/vuepress/vuepress-next/workflows/docs/badge.svg)](https://github.com/vuepress/vuepress-next/actions?query=workflow%3Adocs)
[![license](https://badgen.net/github/license/vuepress/vuepress-next)](https://github.com/vuepress/vuepress-next/blob/main/LICENSE)

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

For more details, please check our [contributing guidelines](https://github.com/vuepress/vuepress-next/blob/main/docs/contributing.md).

## TODO List

Features in the following list are not fully determined, and might be changed or removed during development.

- [x] @vuepress/core
  - [x] Plugin API
    - [x] clientAppEnhanceFiles
    - [x] clientAppRootComponentFiles
    - [x] clientAppSetupFiles
    - [x] extendsPageData

- [ ] @vuepress/markdown
  - [x] codePlugin
  - [x] customComponentPlugin
  - [x] hoistTagsPlugin
  - [x] linksPlugin
  - [ ] snippetsPlugin

- [x] @vuepress/bundler-webpack
  - [x] Dev server (dev)
  - [x] Pre-render (build)
  - [x] Style pre-processors config

- [x] @vuepress/theme-default
  - [x] Navbar
  - [x] Sidebar
  - [x] Page
  - [x] Plugins integration

- [x] @vuepress/cli
  - [x] Resolve user config file
  - [x] Watch & Reload (dev)

- [ ] Official plugins
  - [x] @vuepress/plugin-active-header-links
  - [x] @vuepress/plugin-back-to-top
  - [x] @vuepress/plugin-container
  - [x] @vuepress/plugin-docsearch
  - [x] @vuepress/plugin-git
  - [x] @vuepress/plugin-google-analytics
  - [x] @vuepress/plugin-medium-zoom
  - [x] @vuepress/plugin-nprogress
  - [x] @vuepress/plugin-palette-stylus
  - [ ] @vuepress/plugin-pwa

- [ ] Documentation
  - [ ] Guide
  - [ ] References
  - [ ] API
  - [ ] Migration Guide

- [x] CI setup

## Breaking Changes

Temporarily record some breaking changes here.

### Core

#### User config

- `patterns` -> `pagePatterns`
- `extraWatchFiles` -> removed
- All webpack related configs are moved to `bundlerConfig` (with `@vuepress/bundler-webpack`)
  - `postcss` -> `bundlerConfig.postcss`
  - `stylus` -> `bundlerConfig.stylus`
  - `scss` -> `bundlerConfig.scss`
  - `sass` -> `bundlerConfig.sass`
  - `less` -> `bundlerConfig.less`
  - `chainWebpack` -> `bundlerConfig.chainWebpack`
  - `configureWebpack` -> `bundlerConfig.configureWebpack`

#### Permalink patterns

- `:i_month` -> removed
- `:i_day` -> removed
- `:minutes` -> removed (undocumented in 1.0)
- `:seconds` -> removed (undocumented in 1.0)
- `:regular` -> `:raw`

#### Stylus Palette system

The stylus palette system of Vuepress 1.0 (i.e. `styles/palette.styl` and `styles/index.styl`) will only work in default theme.

To make the stylus palette system reusable, it's extracted to `@vuepress/plugin-palette-stylus`.

Theme authors can use their own way for users to configure styles (not be limited with stylus).

#### Default frontmatter

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

#### Plugin API

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

#### Theme API

- `extend` -> `extends`

You can still inherit a parent theme with `extends: 'parent-theme'`, which will extends the plugins, layouts, etc.

However, the `@theme` and `@parent-theme` aliases are not available now.

### CLI

- `-c, --cache [cache]` -> `-c, --cache <cache>` , i.e. the value of `cache` option is not optional
- `--no-cache` -> `--clean-cache`

### Default Theme

- `<CodeGroup>`, `<CodeBlock>` -> `<CodeGroup>`, `<CodeGroupItem>`
