# 自定义主题

::: tip 提示
主题组件受到同样的 [浏览器的 API 访问限制](./using-vue.md#browser-api-access-restrictions)。
:::

VuePress 使用单文件组件来构建自定义主题。想要开发一个自定义主题，首先在你的文档根目录新建一个 `.vuepress/theme` 文件夹，然后再创建一个 `Layout.vue` 文件：

```
.
└─ .vuepress
   └─ theme
      └─ Layout.vue
```

从这里开始，就和开发一个平时的 Vue 应用一样了，如何组织你的主题完全取决于你。

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
      "path": "/",
      "title": "VuePress",
      "frontmatter": {}
    },
    ...
  ]
}
```

`title`, `description` 和 `base` 会从 `.vuepress/config.js` 中对应的的字段复制过来，而 `pages` 是一个包含了每个页面元数据对象的数据，包括它的路径、页面标题（明确地通过 [YAML front matter](./markdown.md#yaml-front-matter) 指定，或者通过该页面的第一个标题取到），以及所有源文件中的 `YAML front matter` 的数据。

下面的这个对象是你正在看的这个页面的 `$page` 的值：

``` json
{
  "path": "/custom-themes.html",
  "title": "自定义主题",
  "headers": [/* ... */],
  "frontmatter": {}
}
```

如果用户在 `.vuepress/config.js` 配置了 `themeConfig`，你将可以通过 `$site.themeConfig` 访问到它。如此一来，你可以通过它来对用户开放一些自定义主题的配置 —— 比如指定目录或者页面的顺序，你也可以结合 `$site.pages` 来动态地构建导航链接。

最后，别忘了，作为 Vue Router API 的一部分，`this.$route` 和 `this.$router` 同样可以使用。

## 内容摘抄

如果一个 markdown 文件中有一个 `<!-- more -->` 注释，则该注释之前的内容会被抓取并暴露在 `$page.excerpt` 属性中。如果你在开发一个博客主题，你可以用这个属性来渲染一个带摘抄的文章列表。

## 获取渲染内容

当前的 `.md` 文件渲染的内容，可以作为一个独特的全局组件 `<Content/>` 来使用，你可能想要它显示在页面中的某个地方。一个最简单的主题，可以是一个唯一的 `Layout.vue` 组件，并包含以下内容：

``` html
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

## 应用配置

自定义主题也可以通过主题根目录下的 `enhanceApp.js` 文件来对 VuePress 应用进行拓展配置。这个文件应当 `export default` 一个钩子函数，并接受一个包含了一些应用级别属性的对象作为参数。你可以使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，或者增加额外的路由钩子等：

```js
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
}
```

## 渲染主题页面

自定义主题可以通过主题根目录下的 `pages.js` 文件使 VuePress 渲染属于主题的页面。这个文件应当 `export default` 一个异步函数，并接受一个包含了站点元数据等属性的对象作为参数。该函数需要返回一个数组，数组内容为需要渲染的页面元数据。你可以在这个文件中定义主题所需渲染的页面，例如：为博客系统设计的归档页面、分类页面等。

另外，你需要结合[应用配置](#应用配置)一节中的说明，注册合适的应用路由。否则，渲染结果只会是一些 404 页面。

::: tip 
该模块被 webpack 直接引用，因此你可能需要使用 CommonJS 语法来导出函数。
:::

```js
exports.default = async function ({ siteData }) {
  return [
    { path: '/archive.html' } // path 定义渲染目标，它和其它元数据一起将被放在 $page 里。
  ]
}
```

## 使用来自 npm 的主题

主题可以以 Vue 单文件组件的格式，并以 `vuepress-theme-xxx` 的名称发布到 npm 上。

如果想使用一个来自 npm 的主题，你需要在 `.vuepress/config.js` 补充 `theme` 选项：

``` js
module.exports = {
  theme: 'awesome'
}
```

VuePress 将会尝试去加载并使用位于 `node_modules/vuepress-theme-awesome/Layout.vue` 的主题组件。

## 修改默认主题

你可以使用 `vuepress eject [targetDir]` 这个命令来将默认主题的源码复制到 `.vuepress/theme` 文件夹下，从而可以对默认主题进行任意的修改。需要注意的是一旦 eject，即使升级 VuePress 你也无法再获得 VuePress 对默认主题的更新。
