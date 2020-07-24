# 开发主题

想要书写一个主题，首先在你文档根目录创建一个 `.vuepress/theme` 目录，接着创建一个 `Layout.vue` 文件：

::: vue
.
└─ .vuepress
   └─ `theme`
       └─ Layout.vue
:::

到这里，就像开发一个普通的 Vue 应用一样。如何组织你的主题，这完全取决于你。

## 获取渲染内容

当前的 `.md` 文件渲染的内容，可以作为一个独特的全局组件 `<Content/>` 来使用，你可能想要它显示在页面中的某个地方。一个最简单的主题，可以是一个唯一的 `Layout.vue` 组件，并包含以下内容：

``` html
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

**更多请阅读:**

- [Markdown 插槽](../guide/markdown-slot.md)

## 内容摘抄

如果一个 markdown 文件中有一个 `<!-- more -->` 注释，则该注释之前的内容会被抓取并暴露在 `$page.excerpt` 属性中。如果你在开发一个博客主题，你可以用这个属性来渲染一个带摘抄的文章列表。

## 目录结构

随着需求的变化，只有一个布局组件 `Layout.vue` 可能还不够，你可能想要定义更多的布局组件用于不同的页面，你可能还想要自定义一个[调色板](../config/README.md#palette-styl)，甚至应用一些插件。

那么是时候重新组织你的主题了！一个约定的主题的目录结构如下：

::: vue
theme
├── `global-components`
│   └── xxx.vue
├── `components`
│   └── xxx.vue
├── `layouts`
│   ├── Layout.vue _(**必要的**)_
│   └── 404.vue
├── `styles`
│   ├── index.styl
│   └── palette.styl
├── `templates`
│   ├── dev.html
│   └── ssr.html
├── `index.js`
├── `enhanceApp.js`
└── package.json
:::

- `theme/global-components`: 该目录下的组件都会被自动注册为全局组件。想了解更多，请参考 [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-register-components)。
- `theme/components`: Vue 组件。
- `theme/layouts`: 布局组件，其中  `Layout.vue` 是必需的。
- `theme/styles`: 全局的样式和调色板。
- `theme/templates`: 修改默认的模板文件。
- `theme/index.js`: 主题文件的入口文件。
- `theme/enhanceApp.js`: 主题水平的客户端增强文件。

::: warning 注意
当你将你的主题以一个 npm 包的形式发布时，如果你没有任何主题配置，即没有 `theme/index.js`，那么你需要将 `package.json` 中的 `"main"` 字段设置为 `layouts/Layout.vue`，只有这样 VuePress 才能正确地解析主题。

```json
{
  ...
  "main": "layouts/Layout.vue",
  ...
}
```

:::

## 布局组件

假设你的主题 `layouts` 目录如下：

::: vue
theme
└── `layouts`
    ├── Layout.vue
    ├── AnotherLayout.vue
    └── 404.vue
:::

然后，所有的页面将会默认使用 `Layout.vue` 作为布局组件，对于那些匹配不到的路由将会使用 `404.vue`。

如果你想要在某一个页面中使用 `AnotherLayout.vue` 作为布局组件，那么你只需要更新这个页面的 `frontmatter`：

```markdown
---
layout: AnotherLayout
---
````

::: tip
每个 layout 组件都可能会渲染出截然不同的页面，如果你想设置一些全局的 UI（如全局的 `<header>`），可以考虑使用 [globalLayout](./option-api.md#globallayout)。
:::

## 使用插件

你可以通过主题的配置文件 `themePath/index.js` 来给主题应用一些插件：

```js
module.exports = {
  plugins: [
    '@vuepress/pwa',
    { 
      serviceWorker: true,
      updatePopup: true
    }
  ]
}
```

## 网站和页面的元数据

`Layout` 组件将会对每一个文档目录下的 `.md` 执行一次，同时，整个网站以及特定页面的元数据将分别暴露为 `this.$site` 和 `this.$page` 属性，它们将会被注入到每一个当前应用的组件中。

这是你现在看到的这个网站的 `$site` 的值：

``` json
{
  "title": "VuePress",
  "description": "Vue 驱动的静态网站生成器",
  "base": "/",
  "pages": [
    {
      "lastUpdated": 1524027677000,
      "path": "/",
      "title": "VuePress",
      "frontmatter": {}
    },
    ...
  ]
}
```

`title`, `description` 和 `base` 会从 `.vuepress/config.js` 中对应的的字段复制过来，而 `pages` 是一个包含了每个页面元数据对象的数据，包括它的路径、页面标题（明确地通过 [YAML front matter](../guide/markdown.md#front-matter) 指定，或者通过该页面的第一个标题取到），以及所有源文件中的 `YAML front matter` 的数据。

下面的这个对象是你正在看的这个页面的 `$page` 的值：

``` json
{
  "lastUpdated": 1524847549000,
  "path": "/custom-themes.html",
  "title": "自定义主题",
  "headers": [/* ... */],
  "frontmatter": {}
}
```

如果用户在 `.vuepress/config.js` 配置了 `themeConfig`，你将可以通过 `$site.themeConfig` 访问到它。如此一来，你可以通过它来对用户开放一些自定义主题的配置 —— 比如指定目录或者页面的顺序，你也可以结合 `$site.pages` 来动态地构建导航链接。

最后，别忘了，作为 Vue Router API 的一部分，`this.$route` 和 `this.$router` 同样可以使用。

::: tip 提示
`lastUpdated` 是这个文件最后一次 git 提交的 UNIX 时间戳，更多细节请参考：[最后更新时间](./default-theme-config.md#最后更新时间)。
:::

**参考:**

- [全局计算属性](../guide/global-computed.md).


## 应用配置

自定义主题也可以通过主题根目录下的 `enhanceApp.js` 文件来对 VuePress 应用进行拓展配置。这个文件应当 `export default` 一个钩子函数，并接受一个包含了一些应用级别属性的对象作为参数。你可以使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，或者增加额外的路由钩子等：

``` js
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
}
```
