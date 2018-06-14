---
sidebar: auto
---

# 配置

## 基本配置

### base

- 类型: `string`
- 默认值: `/`

部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，它的值应当总是以斜杠开始，并以斜杠结束。

`base` 将会自动地作为前缀插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

**参考:**

- [Base URL](../guide/assets.md#基础路径)
- [部署指南 > Github Pages](../guide/deploy.md#github-pages)

### title

- 类型: `string`
- 默认值: `undefined`

网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。

### description

- 类型: `string`
- 默认值: `undefined`

网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。

### head

- 类型: `Array`
- 默认值: `[]`

额外的需要被注入到当前页面的 HTML `<head>` 中的标签，每个标签都可以以 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式指定，举个例子，增加一个自定义的 favicon：

``` js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ]
}
```

### host

- Type: `string`
- Default: `'0.0.0.0'`

指定用于 dev server 的主机名。

### port

- 类型: `number`
- 默认值: `8080`

指定 dev server 的端口。

### dest

- 类型: `string`
- 默认值: `.vuepress/dist`

指定 `vuepress build` 的输出目录。

### ga

- 类型: `string`
- 默认值: `undefined`

提供一个 Google Analytics ID 来使 GA 生效。

::: tip 提示
请留意 [GDPR (2018年欧盟数据保护规则改革)](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en), 在合适或者需要的情况下，考虑将 Google Analytics 设置为[匿名化的 IP](https://support.google.com/analytics/answer/2763052?hl=zh-Hans)。
:::

### serviceWorker

- 类型: `boolean`
- 默认值: `false`

如果设置成 `true`，VuePress 将会自动生成并且注册一个 service worker，它缓存了那些已访问过的页面的内容，用于离线访问（仅在生产环境生效）。

如果你正在开发一个自定义主题，`Layout.vue` 组件将会自动触发下述的事件：

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip PWA NOTES
`serviceWorker` 选项仅仅用来控制 service worker，为了让你的网站完全地兼容 PWA，你需要在 `.vuepress/public` 提供 Manifest 和 icons，更多细节，请参见 [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).
此外，只有您能够使用 SSL 部署您的站点时才能启用此功能，因为 service worker 只能在 HTTPs 的 URL 下注册。
:::

### locales

- 类型: `{ [path: string]: Object }`
- 默认值: `undefined`

提供多语言支持的语言配置。具体细节请查看 [多语言支持](../guide/i18n.md)。

### shouldPrefetch

- 类型: `Function`
- 默认值: `() => true`

一个函数，用来控制对于哪些文件，是需要生成 `<link rel="prefetch">` 资源提示的。请参考 [shouldPrefetch](https://ssr.vuejs.org/zh/api/#shouldpreload)。

## 主题

### theme

- 类型: `string`
- 默认值: `undefined`

当你使用自定义主题的时候，需要指定它。当值为 `"foo"` 时，VuePress 将会尝试去加载位于 `node_modules/vuepress-theme-foo/Layout.vue` 的主题组件。

### themeConfig

- 类型: `Object`
- 默认值: `{}`

为当前的主题提供一些配置，这些选项依赖于你正在使用的主题。

**也可以参考:**

- [默认主题](../default-theme-config/README.md)。

## Markdown

### markdown.lineNumbers

- 类型: `boolean`
- 默认值: `undefined`

是否在每个代码块的左侧显示行号。

**参考:**

- [行号](../guide/markdown.md#行号)

### markdown.anchor

- 类型: `Object`
- 默认值: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

[markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 的选项。

### markdown.externalLinks

- Type: `Object`
- Default: `{ target: '_blank', rel: 'noopener noreferrer' }`

这个键值对将会作为特性被增加到是外部链接的 `<a>` 标签上，默认的选项将会在新窗口中打开一个该外部链接。

### markdown.toc

- 类型: `Object`
- 默认值: `{ includeLevel: [2, 3] }`

[markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents) 的选项。

### markdown.config

- 类型: `Function`
- 默认值: `undefined`

一个用于修改当前的 [markdown-it](https://github.com/markdown-it/markdown-it) 实例的默认配置，或者应用额外的插件的函数，举例如下：

``` js
module.exports = {
  markdown: {
    config: md => {
      md.set({ breaks: true })
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

## 构建流程

### postcss

- 类型: `Object`
- 默认值: `{ plugins: [require('autoprefixer')] }`

[postcss-loader](https://github.com/postcss/postcss-loader) 的选项，请注意，指定这个值，将会覆盖内置的 autoprefixer，所以你需要自己将它加进去。

### stylus

- Type: `Object`
- Default: `{ preferPathResolver: 'webpack' }`

[stylus-loader](https://github.com/shama/stylus-loader) 的选项。

### scss

- Type: `Object`
- Default: `{}`

加载 `*.scss` 文件的 [sass-loader](https://github.com/postcss/postcss-loader) 的选项。

### sass

- Type: `Object`
- Default: `{ indentedSyntax: true }`

加载 `*.sass` 文件的 [sass-loader](https://github.com/postcss/postcss-loader) 的选项。

### less

- Type: `Object`
- Default: `{}`

[less-loader](https://github.com/webpack-contrib/less-loader) 的选项。

### configureWebpack

- 类型: `Object | Function`
- 默认值: `undefined`

用于修改内部的 Webpack 配置。如果给定一个对象，那么它将会被 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到最终的配置中，如果给定一个函数，它将会接受 `config` 作为第一个参数，以及 `isServer` 作为第二个参数，你可以直接更改 `config`，也可以返回一个待合并的对象。

``` js
module.exports = {
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
    }
  }
}
```

### chainWebpack

- 类型: `Function`
- 默认值: `undefined`

通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 来修改内部的 Webpack 配置。

``` js
module.exports = {
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
  }
}
```

## 浏览器兼容性

### evergreen

- 类型: `boolean`
- 默认值: `false`

如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 `true`，这将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积。
