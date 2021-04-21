# 从 v1 迁移

VuePress v2 的一些主要改动和优化：

- VuePress v2 现在使用 Vue 3 ，因此你要保证你的组件和其他客户端文件是适用于 Vue 3 的。
- VuePress v2 是使用 TypeScript 开发的，因此它现在提供了更好的类型支持。我们强烈推荐你使用 TypeScript 来开发插件和主题。 VuePress 配置文件也同样支持 TypeScript ，你可以直接使用 `.vuepress/config.ts` 。
- VuePress v2 支持使用 Webpack 和 Vite 作为打包工具。你甚至可以在开发模式使用 Vite 来获取更好的开发体验，而在构建模式使用 Webpack 来获取更好的浏览器兼容性。

VuePress v2 的核心思想和流程是和 v1 一致的，但 v2 API 经过了重新设计，更加标准化。因此在将现有的 v1 项目迁移至 v2 时，你很可能会遇到一些 Breaking Changes 。本指南将帮助你将 v1 的站点 / 插件 / 主题迁移至 v2 。

- 如果你是一个普通用户，你需要阅读 [给用户](#给用户) 的指南。
- 如果你是一个插件作者，你需要阅读 [给插件作者](#给插件作者) 的指南。
- 如果你是一个主题作者，你需要阅读 [给主题作者](#给主题作者) 的指南。

## 给用户

### 用户配置变更

#### shouldPrefetch

默认值从 `() => true` 更改为 `false` 。

#### extraWatchFiles

移除。

你可以手动在 [onWatched](../reference/plugin-api.md#onwatched) Hook 中监听文件变化。

#### patterns

重命名为 `pagePatterns` 。

#### markdown.lineNumbers

移动至 [markdown.code.lineNumbers](../reference/config.md#markdown-code-linenumbers) 。

默认值从 `false` 更改为 `true` 。

#### markdown.slugify

移除。

如果你无论如何都要修改 slugify 函数，分别设置以下选项：

- `markdown.anchor.slugify`
- `markdown.toc.slugify`
- `markdown.extractHeaders.slugify`

#### markdown.pageSuffix

移除。

#### markdown.externalLinks

移动至 [markdown.links.externalAttrs](../reference/config.md#markdown-links) 。

#### markdown.toc

有改动。

参考 [配置 > markdown.toc](../reference/config.md#markdown-toc)

#### markdown.plugins

移除。

在 [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) Hook 中使用 markdown-it 插件。

#### markdown.extendMarkdown

移除。

使用 [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) Hook 。

#### markdown.extractHeaders

有修改。

参考 [配置 > markdown.extractHeaders](../reference/config.md#markdown-extractheaders)

#### Webpack 相关配置

所有 Webpack 相关的配置都移动至 `@vuepress/bundler-webpack` 的配置项中，所以你需要在 [bundlerConfig](../reference/config.md#bundlerconfig) 中设置它们：

- `postcss`：移动至 `bundlerConfig.postcss`
- `stylus`：移动至 `bundlerConfig.stylus`
- `scss`：移动至 `bundlerConfig.scss`
- `sass`：移动至 `bundlerConfig.sass`
- `less`：移动至 `bundlerConfig.less`
- `chainWebpack`：移动至 `bundlerConfig.chainWebpack`
- `configureWebpack`：移动至 `bundlerConfig.configureWebpack`
- `evergreen`：移动至 `bundlerConfig.evergreen` ，且默认值从 `false` 更改为 `true` 。

参考 [打包工具 > Webpack](../reference/bundler/webpack.md)

### Frontmatter 变更

#### meta

移除。

改为使用 [head](../reference/frontmatter.md#head) 。例如：

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

和以下结构相同：

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

### 永久链接 Patterns 变更

- `:i_month`：移除
- `:i_day`：移除
- `:minutes`：移除（v1 文档中未列出）
- `:seconds`：移除（v1 文档中未列出）
- `:regular`：重命名为 `:raw`

参考 [Frontmatter > permalinkPattern](../reference/frontmatter.md#permalinkpattern) 。

### 调色板系统变更

VuePress v1 的 Stylus 调色板系统 （即 `styles/palette.styl` 和 `styles/index.styl`） 不再由 VuePress Core 默认提供支持。

调色板系统提取到了 [@vuepress/plugin-palette](../reference/plugin/palette.md) 当中。

主题作者可以使用自己的方式来为用户提供自定义样式的能力，而不必被限制在 Stylus 当中。

如果你使用的是默认主题，那么调色板系统仍然存在，但改为使用 SASS 。参考 [默认主题 > 样式](../reference/default-theme/styles.md) 。

### 约定文件变更

#### .vuepress/enhanceApp.js

重命名为 `.vuepress/clientAppEnhance.{js,ts}` 。

函数接收的参数也有改动。

#### .vuepress/components/

在该目录下的文件不会被自动注册为 Vue 组件。

你需要使用 [@vuepress/plugin-register-components](../reference/plugin/register-components.md) ，或者在 `.vuepress/clientAppEnhance.{js,ts}` 中手动注册你的组件。

#### .vuepress/theme/

即使该目录存在，也不会被隐式默认当作本地主题目录。

你需要在 [theme](../reference/config.md#theme) 配置项中显式声明本地主题的路径。

### 插件 API 变更

- `ready`：重命名为 `onPrepared`
- `updated`：重命名为 `onWatched`
- `generated`：重命名为 `onGenerated`
- `additionalPages`：移除，改为在 `onInitialized` Hook 中使用 `app.pages.push(createPage())`
- `clientDynamicModules`：移除，改为在 `onPrepared` Hook 中使用 `app.writeTemp()`
- `enhanceAppFiles`：重命名为 `clientAppEnhanceFiles`
- `globalUIComponents`：重命名为 `clientAppRootComponentFiles`
- `clientRootMixin`：重命名为`clientAppSetupFiles`
- `extendMarkdown`：重命名为 `extendsMarkdown`
- `chainMarkdown`：移除
- `extendPageData`：重命名为 `extendsPageData`
- `extendsCli`：移除
- `configureWebpack`：移除
- `chainWebpack`：移除
- `beforeDevServer`：移除
- `afterDevServer`：移除

参考 [插件 API](../reference/plugin-api.md) 。

### 主题 API 变更

#### layouts

现在你需要手动设置布局目录或布局组件。

参考 [主题 API > layouts](../reference/theme-api.md#layouts) 。

#### extend

重命名为 `extends` 。

你仍然可以通过 `extends: 'parent-theme'` 来继承一个父主题，这将会继承其插件和布局等。

但是，`@theme` 和 `@parent-theme` 别名不再生效。

### CLI 变更

#### eject 命令

移除。

#### cache 选项

- `-c, --cache [cache]`：修改为 `--cache <cache>` ，意味着 `-c` 不再是 `cache` 选项的缩写，并且 `cache` 选项的值不再是可选的。
- `--no-cache`：重命名为 `--clean-cache` 。

### 默认主题变更

#### 内置组件

- `<CodeGroup />` 和 `<CodeBlock />` 重命名为 `<CodeGroup />` 和 `<CodeGroupItem />`
- `<Badge />`
  - `$badgeErrorColor` 调色板变量重命名为 `$badgeDangerColor`
  - `type` Prop 现在只接受 `tip` 、 `warning` 和 `danger`

#### 调色板系统

默认主题的调色板系统迁移为 SASS 。

参考 [默认主题 > 样式](../reference/default-theme/styles.md) 。

#### 主题配置

默认主题的配置有大量变更。

参考 [默认主题 > 配置](../reference/default-theme/config.md) 。

### 官方插件变更

参考 [官方插件](../reference/plugin/README.md) 。

### 社区主题和插件

v1 的主题和插件和 v2 并不兼容。

请确保你在使用的主题和插件已经支持 v2 ，并前往它们各自的文档查看迁移指南。

## 给插件作者

请先浏览 [插件 API 变更](#插件-api-变更) 。

一些主要的 Breaking Changes ：

- 大部分 v1 Hook 都在 v2 中存在等效的 Hook 或实现方式。唯一的例外是 `extendsCli` ，它被移除了。
- Webpack 相关的 v1 Hook 都被移除了，因为 VuePress Core 已经和 Webpack 解耦了。如果你仍然想要在插件中修改 Webpack 配置，可以尝试在 `onInitialized` Hook 中处理 `app.options.bundlerConfig` 。

## 给主题作者

请先浏览 [插件 API 变更](#插件-api-变更) 和 [主题 API 变更](#主题-api-变更)。

一些主要的 Breaking Changes ：

- 所谓的 **主题目录结构约定** 不再存在。
  - `theme/enhanceApp.js` 或 `theme/clientAppEnhance.{js,ts}` 文件不会被隐式作为 Client App Enhance 文件。你需要在 `clientAppEnhanceFiles` Hook 中显式指定它。
  - `theme/global-components/` 目录下的文件不会被自动注册为 Vue 组件。你需要使用 [@vuepress/plugin-register-components](../reference/plugin/register-components.md) ，或者在 `clientAppEnhance.{js,ts}` 中手动注册组件。
  - `theme/layouts/` 目录下的文件不会被自动注册为布局组件。你需要通过 `layouts` 配置项来显式指定。
  - `theme/templates/` 目录下的文件不会被自动作为 dev / ssr 的模板。
  - 你始终需要提供主题入口文件，并且不要使用 `"main": "layouts/Layout.vue"` 作为主题入口。
- Stylus 不再是默认的 CSS 预处理器，并且 Stylus 调色板系统不再被默认支持。如果你仍然想要使用和 v1 类似的调色板系统，可以使用 [@vuepress/plugin-palette](../reference/plugin/palette.md) 。
- 由 Prism.js 提供的 Markdown 代码块的语法高亮不再被默认支持。你可以选择使用 [@vuepress/plugin-prismjs](../reference/plugin/prismjs.md) 或 [@vuepress/plugin-shiki](../reference/plugin/shiki.md) ，或者用你自己的方式实现语法高亮。
- 考虑到可扩展性， `$site.pages` 不再可用。
