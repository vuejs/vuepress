# 配置

<NpmBadge package="@vuepress/cli" />
<NpmBadge package="@vuepress/core" />

VuePress 配置的参考文档，可以通过配置文件来设置这些配置。 VuePress 约定的配置文件为（按照优先顺序）：

- 当前工作目录 `cwd` 下：
  - `vuepress.config.ts`
  - `vuepress.config.js`
- 源文件目录 `sourceDir` 下：
  - `.vuepress/config.ts`
  - `.vuepress/config.js`

你也可以通过 [命令行接口](./cli.md) 的 `--config` 选项来指定配置文件。

## 站点配置

### base

- 类型： `string`

- 默认值： `/`

- 详情：

  部署站点的基础路径。

  如果你想让你的网站部署到一个子路径下，你将需要设置它。它的值应当总是以斜杠开始，并以斜杠结束。举例来说，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`。

  `base` 将会作为前缀自动地插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

- 参考：
  - [指南 > 静态资源 > Base Helper](../guide/assets.md#base-helper)
  - [指南 > 部署](../guide/deployment.md)

### lang

- 类型： `string`

- 默认值： `en-US`

- 详情：

  站点的语言。

  它将会在最终渲染出的 HTML 中作为 `<html>` 标签的 `lang` 属性。

  它可以设置在不同语言的 locales 中。

- 参考：
  - [配置 > locales](#locales)

### title

- 类型： `string`

- 默认值： `''`

- 详情：

  站点的标题。

  它将会作为所有页面标题的后缀，并且在默认主题的导航栏中显示。

  它可以设置在不同语言的 locales 中。

- 参考：
  - [配置 > locales](#locales)

### description

- 类型： `string`

- 默认值： `''`

- 详情：

  站点的描述。

  它将会在最终渲染出的 HTML 中作为 `<meta name="description" />` 标签的 `content` 属性。它会被每个页面的 Frontmatter 中的 `description` 字段覆盖。

  它可以设置在不同语言的 locales 中。

- 参考：
  - [配置 > locales](#locales)
  - [Frontmatter > description](./frontmatter.md#description)

### head

- 类型： `HeadConfig[]`

- 默认值： `[]`

- 详情：

  在最终渲染出的 HTML 的 `<head>` 标签内加入的额外标签。

  你可以通过 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式来添加标签。

  它可以设置在不同语言的 locales 中。

- 示例：

  增加一个自定义的 favicon ：

```js
module.exports = {
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
}
```

渲染为：

```html
<head>
  <link rel="icon" href="/images/logo.png" />
</head>
```

- 参考：
  - [配置 > locales](#locales)
  - [Frontmatter > head](./frontmatter.md#head)

### locales

- 类型： `{ [path: string]: Partial<SiteLocaleData> }`

- 默认值： `{}`

- 详情：

  多语言支持的各个语言 locales 。

  可以使用的字段有：

  - [lang](#lang)
  - [title](#title)
  - [description](#description)
  - [head](#head)

- 参考：
  - [指南 > I18n](../guide/i18n.md)

## 主题配置

### theme

- 类型： `string`

- 默认值： `'@vuepress/default'`

- 详情：

  你想要使用的主题的名称或绝对路径。

  这个选项可以接收主题名称、主题简称或主题的绝对路径。

- 示例：

```js
module.exports = {
  theme: 'vuepress-theme-foo',
  theme: 'bar',
  theme: path.resolve(__dirname, './path/to/local/theme'),
}
```

- 参考：
  - [指南 > 主题](../guide/theme.md)

### themeConfig

- 类型： `ThemeConfig`

- 默认值： `{}`

- 详情：

  为当前使用的主题提供的配置项。具体的配置项取决于你使用的主题。

- 参考：
  - [默认主题 > 配置](./default-theme/config.md)

## 打包工具配置

### bundler

- 类型： `string`

- 默认值： `'@vuepress/webpack'`

- 详情：

  你想要使用的打包工具的名称。

  可以使用打包工具名称的简称。

- 参考：
  - [指南 > 打包工具](../guide/bundler.md)

### bundlerConfig

- 类型： `BundlerConfig`

- 默认值： `{}`

- 详情：

  为当前使用的打包工具提供的配置项。具体的配置项取决于你使用的打包工具。

- 参考：
  - [指南 > 打包工具](../guide/bundler.md)
  - [打包工具 > Webpack](./bundler/webpack.md)
  - [打包工具 > Vite](./bundler/vite.md)

## 目录配置

### dest

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/dist` ``

- 详情：

  指定 `vuepress build` 命令的输出目录。

### temp

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/.temp` ``

- 详情：

  指定临时文件目录。

### cache

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/.cache` ``

- 详情：

  指定缓存目录。

### public

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/public` ``

- 详情：

  指定 Public 文件目录。

- 参考：
  - [指南 > 静态资源 > Public 文件](../guide/assets.md#public-文件)

## Markdown 配置

### markdown

- 类型： `MarkdownOptions`

- 默认值： `{}`

- 详情：

  对 VuePress 内置的 Markdown 语法扩展进行配置。

  它可以接收 [markdown-it](https://github.com/markdown-it/markdown-it) 的所有配置项，以及下列额外的配置项。

- 参考：
  - [markdown-it > Init with presets and options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
  - [指南 > Markdown > 语法扩展](../guide/markdown.md#语法扩展)

### markdown.anchor

- 类型： `AnchorPluginOptions | false`

- 详情：

  [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 标题锚点](../guide/markdown.md#标题锚点)

### markdown.assets

- 类型： `AssetsPluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it assets 插件的配置项。

  设置为 `false` 可以禁用该插件。

::: danger
除非你了解它的用途，否则你不应该设置该配置项。
:::

### markdown.code

- 类型： `CodePluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it code 插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块](../guide/markdown.md#代码块)

#### markdown.code.highlightLines

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用代码块行高亮。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块 > 行高亮](../guide/markdown.md#行高亮)

#### markdown.code.lineNumbers

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用代码块行号。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块 > 行号](../guide/markdown.md#行号)

#### markdown.code.preWrapper

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在 `<pre>` 标签外额外包裹一层。

  `highlightLines` 和 `lineNumbers` 依赖于这个额外的包裹层。这换句话说，如果你禁用了 `preWrapper` ，那么行高亮和行号也会被同时禁用。

::: tip
如果你想要在客户端来实现这些功能时，可以禁用该配置项。比如使用 [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) 或者 [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/)。
:::

#### markdown.code.vPre

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在 `<pre>` 标签上添加 `v-pre` 指令。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块 > 添加 v-pre](../guide/markdown.md#添加-v-pre)

### markdown.customComponent

- 类型： `undefined | false`

- 详情：

  VuePress 内置的 markdown-it custom-component 插件的配置项。

  设置为 `false` 可以禁用该插件。

::: danger
除非你了解它的用途，否则你不应该设置该配置项。
:::

### markdown.emoji

- 类型： `EmojiPluginOptions | false`

- 详情：

  [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji) 的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > Emoji](../guide/markdown.md#emoji)

### markdown.extractHeaders

- 类型： `ExtractHeadersPluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it extract-headers 插件的配置项。

  它将会把页面的标题提取到 Page Data 中，可以用于生成侧边栏、目录等。比如当前页面的侧边栏，就是由这个插件提取出的标题来自动生成的。

  设置为 `false` 可以禁用该插件。

### markdown.hoistTags

- 类型： `HoistTagsPluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it hoist-tags 插件的配置项。

  它将会把你的 Markdown 中特定的 HTML 标签提升到 SFC 的顶层。默认情况下，只有 `<script>` 和 `<style>` 标签会被提升。你可以通过这个配置项，在 Markdown 中使用 SFC 自定义块。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [Cookbook > Markdown 与 Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md)

### markdown.links

- 类型： `LinkPluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it 链接插件的配置项。

  它可以把站内链接转换为 `<RouterLink>` ，并且可以在站外链接上添加额外的属性和图标。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 链接](../guide/markdown.md#链接)

### markdown.links.internalTag

- 类型： `string`

- 默认值： `'RouterLink'`

- 详情：

  内部链接所使用的标签。

  默认情况下，该插件会把内部链接转换为 `<RouterLink>` 。你可以把该选项设置为 `'a'` 来禁用这个功能。

### markdown.links.externalAttrs

- 类型： `Record<string, string>`

- 默认值： `{ target: '_blank', rel: 'noopener noreferrer' }`

- 详情：

  为外部链接添加额外的属性。

### markdown.links.externalIcon

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在外部链接的后面添加 <OutboundLink /> 图标。

  你可以通过页面的 [externalIcon](./frontmatter.md#externalicon) frontmatter 来覆盖这个全局配置。

### markdown.toc

- 类型： `TocPluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it 目录插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 目录](../guide/markdown.md#目录)

## 开发配置项

### debug

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否启用 Debug 模式。

  该配置项主要提供给开发者使用。同时，我们使用了 [debug](https://github.com/visionmedia/debug) 模块打印 Debug 日志，可以通过 `DEBUG=vuepress*` 环境变量来启用。

### host

- 类型： `string`

- 默认值： `'0.0.0.0'`

- 详情：

  指定开发服务器的主机名。

### port

- 类型： `number`

- 默认值： `8080`

- 详情：

  指定开发服务器的端口号。

### open

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否在开发服务器启动后打开浏览器。

### pagePatterns

- 类型： `string[]`

- 默认值： `['**/*.md', '!.vuepress', '!node_modules']`

- 详情：

  指定页面文件的 Patterns 。这些 Patterns 是相对于 Source 目录的。

### templateDev

- 类型： `string`

- 默认值： `'@vuepress/client/templates/index.dev.html'`

- 详情：

  指定开发时使用的 HTML 模板。

### templateSSR

- 类型： `string`

- 默认值： `'@vuepress/client/templates/index.ssr.html'`

- 详情：

  指定构建时 (SSR) 使用的 HTML 模板。

### shouldPreload

- 类型： `((file: string, type: string) => boolean)) | boolean`

- 默认值： `true`

- 详情：

  一个函数，用来控制哪些文件是需要生成对应的 `<link rel="preload">` 标签的。设置为 `true` 或者 `false` 来完全启用或禁用它。

  默认情况下，只有当前页面所需的文件会被预加载。所以在绝大部分情况下，你只需要使用 `true` 就可以了。

### shouldPrefetch

- 类型： `((file: string, type: string) => boolean)) | boolean`

- 默认值： `false`

- 详情：

  一个函数，用来控制哪些文件是需要生成对应的 `<link rel="prefetch">` 标签的。设置为 `true` 或者 `false` 来完全启用或禁用它。

  如果你将它设置为 `true` ，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做。

## 插件 API

用户配置文件同样可以作为一个 VuePress 插件，所以除了 `name` 和 `multiple` 配置项以外的所有插件 API 都可以在配置文件中使用。

前往 [插件 API 参考](./plugin-api.md) 查看所有插件 API 。
