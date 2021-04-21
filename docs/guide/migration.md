# Migrating from v1

Some major changes and enhancements of VuePress v2:

- VuePress v2 is now using Vue 3, so make sure your components and other client files are compatible with Vue 3.
- VuePress v2 is developed with TypeScript, so it provides better TS support now. It's highly recommended to use TypeScript to develop plugins and themes. VuePress config file also supports TypeScript, and you can use `.vuepress/config.ts` directly.
- VuePress v2 supports both Webpack and Vite as bundler. You can even use Vite in dev mode to get better development experience, and use Webpack in build mode to get better browser compatibility.

Core ideas and processes of VuePress v2 are the same with v1, while v2 API has been re-designed and becomes more normalized. So you might encounter breaking changes when migrating an existing v1 project to v2. This guide is here to help you migrating v1 sites / plugins / themes to v2.

- If you are a common user, you need to read the guide [for users](#for-users).
- If you are a plugin author, you need to read the guide [for plugin authors](#for-plugin-authors).
- If you are a theme author, you need to read the guide [for theme authors](#for-theme-authors).

## For Users

### User Config Change

#### shouldPrefetch

Default value is changed from `() => true` to `false`.

#### extraWatchFiles

Removed.

You can watch files manually in [onWatched](../reference/plugin-api.md#onwatched) hook.

#### patterns

Renamed to `pagePatterns`

#### markdown.lineNumbers

Moved to [markdown.code.lineNumbers](../reference/config.md#markdown-code-linenumbers).

Default value is changed from `false` to `true`.

#### markdown.slugify

Removed.

If you want to change the slugify function anyway, set the following options separately:

- `markdown.anchor.slugify`
- `markdown.toc.slugify`
- `markdown.extractHeaders.slugify`

#### markdown.pageSuffix

Removed.

#### markdown.externalLinks

Moved to [markdown.links.externalAttrs](../reference/config.md#markdown-links).

#### markdown.toc

Changed.

See [Config > markdown.toc](../reference/config.md#markdown-toc)

#### markdown.plugins

Removed.

Use markdown-it plugins in [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) hook.

#### markdown.extendMarkdown

Removed.

Use [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) hook.

#### markdown.extractHeaders

Changed.

See [Config > markdown.extractHeaders](../reference/config.md#markdown-extractheaders)

#### Webpack Related Configs

All webpack related configs are moved to options of `@vuepress/bundler-webpack`, so you should set them in [bundlerConfig](../reference/config.md#bundlerconfig):

- `postcss`: moved to `bundlerConfig.postcss`
- `stylus`: moved to `bundlerConfig.stylus`
- `scss`: moved to `bundlerConfig.scss`
- `sass`: moved to `bundlerConfig.sass`
- `less`: moved to `bundlerConfig.less`
- `chainWebpack`: moved to `bundlerConfig.chainWebpack`
- `configureWebpack`: moved to `bundlerConfig.configureWebpack`
- `evergreen`: moved to `bundlerConfig.evergreen`, and default value is changed from `false` to `true`.

See [Bundlers > Webpack](../reference/bundler/webpack.md)

### Frontmatter Change

#### meta

Removed.

Use [head](../reference/frontmatter.md#head) instead. For example:

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

### Permalink Patterns Change

- `:i_month`: removed
- `:i_day`: removed
- `:minutes`: removed (undocumented in v1)
- `:seconds`: removed (undocumented in v1)
- `:regular`: renamed to `:raw`

See [Frontmatter > permalinkPattern](../reference/frontmatter.md#permalinkpattern).

### Palette System Change

The stylus palette system of VuePress v1 (i.e. `styles/palette.styl` and `styles/index.styl`) is no longer provided by VuePress Core.

The palette system is extracted to [@vuepress/plugin-palette](../reference/plugin/palette.md).

Theme authors can use their own way to allow users to custom styles, and not be limited with stylus.

If you are using default theme, the palette system is still available but migrated to SASS. See [Default Theme > Styles](../reference/default-theme/styles.md).

### Conventional Files Change

#### .vuepress/enhanceApp.js

Renamed to `.vuepress/clientAppEnhance.{js,ts}`.

The arguments of the function are changed, too.

#### .vuepress/components/

Files in this directory will not be registered as Vue components automatically.

You need to use [@vuepress/plugin-register-components](../reference/plugin/register-components.md), or register your components manually in `.vuepress/clientAppEnhance.{js,ts}`.

#### .vuepress/theme/

This directory will not be used as local theme implicitly if it is existed.

You need to set the path to the local theme explicitly via [theme](../reference/config.md#theme) option.

### Plugin API Change

- `ready`: renamed to `onPrepared`
- `updated`: renamed to `onWatched`
- `generated`: renamed to `onGenerated`
- `additionalPages`: removed, use `app.pages.push(createPage())` in `onInitialized` hook
- `clientDynamicModules`: removed, use `app.writeTemp()` in `onPrepared` hook
- `enhanceAppFiles`: renamed to `clientAppEnhanceFiles`
- `globalUIComponents`: renamed to `clientAppRootComponentFiles`
- `clientRootMixin`: renamed to`clientAppSetupFiles`
- `extendMarkdown`: renamed to `extendsMarkdown`
- `chainMarkdown`: removed
- `extendPageData`: renamed to `extendsPageData`
- `extendsCli`: removed
- `configureWebpack`: removed
- `chainWebpack`: removed
- `beforeDevServer`: removed
- `afterDevServer`: removed

See [Plugin API](../reference/plugin-api.md).

### Theme API Change

#### layouts

Now you need to specify the layouts directory or layout components manually.

See [Theme API > layouts](../reference/theme-api.md#layouts).

#### extend

Renamed to `extends`.

You can still inherit a parent theme with `extends: 'parent-theme'`, which will extends the plugins, layouts, etc.

However, the `@theme` and `@parent-theme` aliases are not available now.

### CLI Change

#### eject command

Removed.

#### cache options

- `-c, --cache [cache]`: changed to `--cache <cache>`, which means that the shorthand `-c` is not for `cache` option, and the value of `cache` option is not optional.
- `--no-cache`: renamed to `--clean-cache` .

### Default Theme Change

#### Built-in Components

- `<CodeGroup />` and `<CodeBlock />` renamed to `<CodeGroup />` and `<CodeGroupItem />`
- `<Badge />`
  - `$badgeErrorColor` palette variable renamed to `$badgeDangerColor`
  - `type` prop only accepts `tip`, `warning` and `danger` now

#### Palette System

The palette system of default theme has migrated to SASS.

See [Default Theme > Styles](../reference/default-theme/styles.md).

#### Theme Config

Default theme config has changed a lot.

See [Default Theme > Config](../reference/default-theme/config.md).

### Official Plugins Change

See [Official Plugins](../reference/plugin/README.md).

### Community Themes and Plugins

Themes and plugins of v1 is not compatible with v2.

Please make sure that those themes and plugins you are using have supported v2, and refer to their own documentation for migration guide.

## For Plugin Authors

Read the [Plugin API Change](#plugin-api-change) first.

Some major breaking changes:

- Most of the v1 hooks have equivalents in v2. The only exception is `extendsCli`, which has been removed.
- Webpack related hooks are removed, because VuePress Core has decoupled with webpack. If you still want to modify webpack config in plugin, try to handle `app.options.bundlerConfig` in `onInitialized` hook.

## For Theme Authors

Read the [Plugin API Change](#plugin-api-change) and [Theme API Change](#theme-api-change) first.

Some major breaking changes:

- There is no **conventional theme directory structure** anymore.
  - The file `theme/enhanceApp.js` or `theme/clientAppEnhance.{js,ts}` will not be used as client app enhance file implicitly. You need to specify it explicitly in `clientAppEnhanceFiles` hook.
  - Files in `theme/global-components/` directory will not be registered as Vue components automatically. You need to use [@vuepress/plugin-register-components](../reference/plugin/register-components.md), or register components manually in `clientAppEnhance.{js,ts}`.
  - Files in `theme/layouts/` directory will not be registered as layout components automatically. You need to specify it explicitly in `layouts` option.
  - Files in `theme/templates/` directory will not be used as dev / ssr template automatically.
  - Always provide a theme entry file, and do not use `"main": "layouts/Layout.vue"` as the theme entry.
- Stylus is no longer the default CSS pre-processor, and the stylus palette system is not embedded. If you still want to use similar palette system as v1, [@vuepress/plugin-palette](../reference/plugin/palette.md) may help.
- Markdown code blocks syntax highlighting by Prism.js is not embedded by default. You can use either [@vuepress/plugin-prismjs](../reference/plugin/prismjs.md) or [@vuepress/plugin-shiki](../reference/plugin/shiki.md), or implement syntax highlighting in your own way.
- For scalability concern, `$site.pages` is not available any more.
