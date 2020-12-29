# vuepress-next

[![github check](https://github.com/vuepress/vuepress-next/workflows/check/badge.svg)](https://github.com/vuepress/vuepress-next/actions?query=workflow%3Acheck)
[![github docs](https://github.com/vuepress/vuepress-next/workflows/docs/badge.svg)](https://github.com/vuepress/vuepress-next/actions?query=workflow%3Adocs)
[![npm](https://badgen.net/npm/v/vuepress/next)](https://www.npmjs.com/package/vuepress)
[![license](https://badgen.net/github/license/vuepress/vuepress-next)](https://github.com/vuepress/vuepress-next/blob/main/LICENSE)

## Status: Alpha

The codebase has been completely refactored with TypeScript. Some major changes:

- Fully migrated to Vue 3
- Extract `@vuepress/cli` from `vuepress` package
- Extract `@vuepress/client` from `@vuepress/core` package
- Extract `@vuepress/bundler-webpack` from `@vuepress/core` package and migrate to webpack 5
  - As webpack is decoupled with core, other bundlers are also possible to be supported
- Extract `@vuepress/plugin-palette-stylus` from `@vuepress/core` package - stylus is no longer the default CSS pre-processor, and the way of styles customization should be determined by theme

The documentation has not finished yet. For now you can check out the breaking changes list below as migration reference.

## Contribution

See [Contributing Guide](https://github.com/vuepress/vuepress-next/blob/main/docs/contributing.md).

## TODO List

- [ ] @vuepress/markdown
  - [ ] snippetsPlugin

- [ ] Documentation
  - [x] Guide
  - [ ] References
  - [ ] API
  - [ ] Migration Guide

## Breaking Changes

Temporarily record some breaking changes here.

### Core

#### User config

- `shouldPrefetch` -> the default value is changed to `false`
- `patterns` -> `pagePatterns`
- `extraWatchFiles` -> removed
- `evergreen` -> the default value is changed to `true`
- `markdown`
  - `markdown.lineNumbers` -> `markdown.code.lineNumbers`, and the default value is changed to `true`
  - `markdown.slugify` -> removed
  - `markdown.pageSuffix` -> removed
  - `markdown.externalLinks` -> `markdown.links.externalAttrs`
  - `markdown.toc` -> changed
  - `markdown.plugins` -> removed
  - `markdown.extendMarkdown` -> removed
  - `markdown.extractHeaders` -> changed
- All webpack related configs are moved to `bundlerConfig` (with `@vuepress/bundler-webpack`)
  - `postcss` -> `bundlerConfig.postcss`
  - `stylus` -> `bundlerConfig.stylus`
  - `scss` -> `bundlerConfig.scss`
  - `sass` -> `bundlerConfig.sass`
  - `less` -> `bundlerConfig.less`
  - `chainWebpack` -> `bundlerConfig.chainWebpack`
  - `configureWebpack` -> `bundlerConfig.configureWebpack`

#### Conventional files and directories

- `.vuepress/enhanceApp.js` -> `.vuepress/clientAppEnhance.{js,ts}`
- `.vuepress/components` -> will not auto register components, and you need to register your components manually in `.vuepress/clientAppEnhance.{js,ts}`

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

#### Frontmatter

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

- `eject` command -> removed
- `-c, --cache [cache]` -> `--cache <cache>` - the shorthand `-c` is not for `cache` option, and the value of `cache` option is not optional
- `--no-cache` -> `--clean-cache`

### Default Theme

- `<CodeGroup />`, `<CodeBlock />` -> `<CodeGroup />`, `<CodeGroupItem />`
- `<Badge />`
  - `$badgeErrorColor` -> `$badgeDangerColor`
  - `type` prop only accepts `tip`, `warning` and `danger`
- Default theme config has changed a lot. Please checkout the types definition and our `docs/.vuepress/config.ts` as reference
