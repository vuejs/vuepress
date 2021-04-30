# Config

<NpmBadge package="@vuepress/cli" />
<NpmBadge package="@vuepress/core" />

Reference of VuePress config, which can be set via config file. The conventional config files are (in order of precedence):

- In current working directory `cwd`:
  - `vuepress.config.ts`
  - `vuepress.config.js`
- In source directory `sourceDir`:
  - `.vuepress/config.ts`
  - `.vuepress/config.js`

You can also specify the config file via `--config` option of [CLI](./cli.md).

## Site Config

### base

- Type: `string`

- Default: `/`

- Details:

  The base URL the site will be deployed at.

  You will need to set this if you plan to deploy your site under a sub path. It should always start and end with a slash. For example, if you plan to deploy your site to GitHub pages at `https://foo.github.io/bar/`, then you should set `base` to `"/bar/"`.

  The `base` is automatically prepended to all the URLs that start with `/` in other options, so you only need to specify it once.

- Also see:
  - [Guide > Assets > Base Helper](../guide/assets.md#base-helper)
  - [Guide > Deployment](../guide/deployment.md)

### lang

- Type: `string`

- Default: `en-US`

- Details:

  Language for the site.

  This will be the `lang` attribute of the `<html>` tag in the rendered HTML.

  This can be specified in different locales.

- Also see:
  - [Config > locales](#locales)
  - [Frontmatter > lang](./frontmatter.md#lang)

### title

- Type: `string`

- Default: `''`

- Details:

  Title for the site.

  This will be the suffix for all page titles, and displayed in the navbar in the default theme.

  This can be specified in different locales.

- Also see:
  - [Config > locales](#locales)

### description

- Type: `string`

- Default: `''`

- Details:

  Description for the site.

  This will be the `content` attribute of `<meta name="description" />` tag in the rendered HTML, which will be overrode by the `description` field of page frontmatter.

  This can be specified in different locales.

- Also see:
  - [Config > locales](#locales)
  - [Frontmatter > description](./frontmatter.md#description)

### head

- Type: `HeadConfig[]`

- Default: `[]`

- Details:

  Extra tags to inject into the `<head>` tag in the rendered HTML.

  You can specify each tag in the form of `[tagName, { attrName: attrValue }, innerHTML?]`.

  This can be specified in different locales.

- Example:

  To add a custom favicon:

```js
module.exports = {
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
}
```

Rendered as：

```html
<head>
  <link rel="icon" href="/images/logo.png" />
</head>
```

- Also see:
  - [Config > locales](#locales)
  - [Frontmatter > head](./frontmatter.md#head)

### locales

- Type: `{ [path: string]: Partial<SiteLocaleData> }`

- Default: `{}`

- Details:

  Specify locales for i18n support.

  Acceptable fields:

  - [lang](#lang)
  - [title](#title)
  - [description](#description)
  - [head](#head)

- Also see:
  - [Guide > I18n](../guide/i18n.md)

## Theme Config

### theme

- Type: `string`

- Default: `'@vuepress/default'`

- Details:

  Name or absolute path of theme your want to use.

  This option accepts theme name, theme name shorthand, or absolute path to theme.

- Example:

```js
module.exports = {
  theme: 'vuepress-theme-foo',
  theme: 'bar',
  theme: path.resolve(__dirname, './path/to/local/theme'),
}
```

- Also see:
  - [Guide > Theme](../guide/theme.md)

### themeConfig

- Type: `ThemeConfig`

- Default: `{}`

- Details:

  Provide config options to the used theme. The options will vary depending on the theme you are using.

- Also see:
  - [Default Theme > Config](./default-theme/config.md)

## Bundler Config

### bundler

- Type: `string`

- Default: `'@vuepress/webpack'`

- Details:

  Name of bundler your want to use.

  Bundler name shorthand is acceptable.

- Also see:
  - [Guide > Bundler](../guide/bundler.md)

### bundlerConfig

- Type: `BundlerConfig`

- Default: `{}`

- Details:

  Provide config options to the used bundler. The options will vary depending on the bundler you are using.

- Also see:
  - [Guide > Bundler](../guide/bundler.md)
  - [Bundlers > Webpack](./bundler/webpack.md)
  - [Bundlers > Vite](./bundler/vite.md)

## Directory Config

### dest

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/dist` ``

- Details:

  Specify the output directory for `vuepress build` command.

### temp

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/.temp` ``

- Details:

  Specify the directory for temporary files.

### cache

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/.cache` ``

- Details:

  Specify the directory for cache .

### public

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/public` ``

- Details:

  Specify the directory for public files.

- Also see:
  - [Guide > Assets > Public Files](../guide/assets.md#public-files)

## Markdown Config

### markdown

- Type: `MarkdownOptions`

- Default: `{}`

- Details:

  Configure VuePress built-in Markdown syntax extensions.

  It accepts all options of [markdown-it](https://github.com/markdown-it/markdown-it), and the following additional options.

- Also see:
  - [markdown-it > Init with presets and options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
  - [Guide > Markdown > Syntax Extensions](../guide/markdown.md#syntax-extensions)

### markdown.anchor

- Type: `AnchorPluginOptions | false`

- Details:

  Options for [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor).

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Header Anchors](../guide/markdown.md#header-anchors)

### markdown.assets

- Type: `AssetsPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it assets plugin.

  Set to `false` to disable this plugin.

::: danger
You should not configure it unless you understand what it is for.
:::

### markdown.code

- Type: `CodePluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it code plugin.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks](../guide/markdown.md#code-blocks)

#### markdown.code.highlightLines

- Type: `boolean`

- Default: `true`

- Details:

  Enable code line highlighting or not.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Line Highlighting](../guide/markdown.md#line-highlighting)

#### markdown.code.lineNumbers

- Type: `boolean`

- Default: `true`

- Details:

  Enable code line numbers or not.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Line Numbers](../guide/markdown.md#line-numbers)

#### markdown.code.preWrapper

- Type: `boolean`

- Default: `true`

- Details:

  Enable the extra wrapper of the `<pre>` tag or not.

  The wrapper is required by the `highlightLines` and `lineNumbers`. That means, if you disable `preWrapper`, the line highlighting and line numbers will also be disabled.

::: tip
You can disable it if you want to implement them in client side. For example, [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) or [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/).
:::

#### markdown.code.vPre

- Type: `boolean`

- Default: `true`

- Details:

  Enable the `v-pre` directive on `<pre>` tag or not.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Wrap with v-pre](../guide/markdown.md#wrap-with-v-pre)

### markdown.customComponent

- Type: `undefined | false`

- Details:

  Options for VuePress built-in markdown-it custom-component plugin.

  Set to `false` to disable this plugin.

::: danger
You should not configure it unless you understand what it is for.
:::

### markdown.emoji

- Type: `EmojiPluginOptions | false`

- Details:

  Options for [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji).

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Emoji](../guide/markdown.md#emoji)

### markdown.extractHeaders

- Type: `ExtractHeadersPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it extract-headers plugin.

  It will extract page headers to page data, which will be used for generating sidebar, table of contents, etc. For example, the sidebar of current page is auto generated from the headers that extracted by this plugin.

  Set to `false` to disable this plugin.

### markdown.hoistTags

- Type: `HoistTagsPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it hoist-tags plugin.

  It will hoist specific HTML tags in your Markdown to the top-level of SFC. By default, only `<script>` and `<style>` tags will be hoisted. You can set this option to support SFC custom blocks in Markdown.

  Set to `false` to disable this plugin.

- Also see:
  - [Cookbook > Markdown and Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md)

### markdown.importCode

- Type: `ImportCodePluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it import-code plugin.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Import Code Blocks](../guide/markdown.md#import-code-blocks)

#### markdown.importCode.handleImportPath

- Type: `(str: string) => string`

- Default: `(str) => str`

- Details:

  A function to handle the import path of the import code syntax.

### markdown.links

- Type: `LinksPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it links plugin.

  It will convert internal links to `<RouterLink>`, and add extra attributes and icon to external links.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Links](../guide/markdown.md#links)

#### markdown.links.internalTag

- Type: `'a' | 'RouterLink'`

- Default: `'RouterLink'`

- Details:

  Tag for internal links.

  By default, this plugin will transform internal links to `<RouterLink>`. You can set this option to `'a'` to disable this feature.

#### markdown.links.externalAttrs

- Type: `Record<string, string>`

- Default: `{ target: '_blank', rel: 'noopener noreferrer' }`

- Details:

  Additional attributes for external links.

#### markdown.links.externalIcon

- Type: `boolean`

- Default: `true`

- Details:

  Whether to append an <OutboundLink /> icon to external links.

  You can override this global option via [externalIcon](./frontmatter.md#externalicon) frontmatter in your pages.

### markdown.toc

- Type: `TocPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it table-of-contents plugin.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Table of Contents](../guide/markdown.md#table-of-contents)

## Development Config

### debug

- Type: `boolean`

- Default: `false`

- Details:

  Enable debug mode or not.

  This would be helpful for developers. Also, we are using [debug](https://github.com/visionmedia/debug) package for debug logging, which can be enabled via `DEBUG=vuepress*` environment variable.

### host

- Type: `string`

- Default: `'0.0.0.0'`

- Details:

  Specify the host to use for the dev server.

### port

- Type: `number`

- Default: `8080`

- Details:

  Specify the port to use for the dev server.

### open

- Type: `boolean`

- Default: `false`

- Details:

  Whether to open the browser after dev-server had been started.

### pagePatterns

- Type: `string[]`

- Default: `['**/*.md', '!.vuepress', '!node_modules']`

- Details:

  Specify the patterns of files you want to be resolved as pages. The patterns are relative to the source directory.

### templateDev

- Type: `string`

- Default: `'@vuepress/client/templates/index.dev.html'`

- Details:

  Specify the HTML template to be used for dev.

### templateSSR

- Type: `string`

- Default: `'@vuepress/client/templates/index.ssr.html'`

- Details:

  Specify the HTML template to be used for build (SSR).

### shouldPreload

- Type: `((file: string, type: string) => boolean)) | boolean`

- Default: `true`

- Details:

  A function to control what files should have `<link rel="preload">` resource hints generated. Set to `true` or `false` to enable or disable totally.

  By default, only those files that are required by current page will be preloaded. So you can keep it `true` in most cases.

### shouldPrefetch

- Type: `((file: string, type: string) => boolean)) | boolean`

- Default: `false`

- Details:

  A function to control what files should have `<link rel="prefetch">` resource hints generated. Set to `true` or `false` to enable or disable for all files.

  If you set it to `true`, all files that required by other pages will be prefetched. This is good for small sites, which will speed up the navigation, but it might not be a good idea if you have lots of pages in your site.

## Plugin API

User config file also works as a VuePress plugin, so all of the Plugin APIs are available except the `name` and `multiple` options.

Please check out [Plugin API Reference](./plugin-api.md) for a full list of Plugin APIs.
