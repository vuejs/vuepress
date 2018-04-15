# 自定义主题

::: tip
主题组件受到同样的 [浏览器的 API 访问限制](./using-vue.md#browser-api-access-restrictions)
:::

VuePress 使用单文件组件来构建自定义主题。想要使用一个自定义主题，首先在你的文档根目录新建一个 `.vuepress/theme` 文件夹，然后新建一个 `Layout.vue` 文件：

```
.
└─ .vuepress
   └─ theme
      └─ Layout.vue
```

从这里开始，就和开发一个平时的 Vue 应用一样了，这完全取决于你如何组织你的主题。

## 网站和页面的元数据

`Layout` 组件将会对每一个文档目录下的 `.md` 执行以此，同时，整个网站以及特定页面的元数据将分别暴露为 `this.$site` 和 `this.$page` 属性，它们将会被注入到每一个当前应用的组件中。

这是这个特有的网站的 `$site` 的值：

``` json
{
  "title": "VuePress",
  "description": "Vue-powered Static Site Generator",
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

`title`, `description` 和 `base` 会从对应的 `.vuepress/config.js` 分别赋值过来，`pages` 是一个包含了每个页面元数据对象的数据，包括它的路径、页面标题（明确地通过 YAML frontmatter 指定，或者通过该页面的第一个标题取到），以及所有源文件中的 YAML frontmatter 的数据。

下面的这个对象是你正在看的这个页面的 `$page` 的值：

``` json
{
  "path": "/custom-themes.html",
  "title": "Custom Themes",
  "headers": [/* ... */],
  "frontmatter": {}
}
```

如果用户在 `.vuepress/config.js` 配置了 `themeConfig`，你将可以通过 `$site.themeConfig` 访问到它，你可以使用它来允许用户对你的主题自定义一些行为 —— 比如，制定目录以及页面的顺序，你也可以结合 `$site.pages` 来动态地构建导航链接。

最后，别忘了，作为 Vue Router API 的一部分，`this.$route` 和 `this.$router` 同样可用。

## 获取渲染内容

当前的 `.md` 文件渲染的内容，可以作为特别的全局组件 `<Content/>` 来使用，你可能想它显示在页面中的某个地方，一个最简单的主题，可以是一个唯一的 `Layout.vue` 组件，并包含以下内容：

``` html
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

## 使用 Dependency 中的主题

主题可以以 Vue 单文件组件的格式、以 `vuepress-theme-xxx` 的名称发布到 npm 上。

想要使用一个来自 npm dependency 的主题，需要在 `.vuepress/config.js` 完善 `theme` 的选项：

``` js
module.exports = {
  theme: 'awesome'
}
```

VuePress 将会尝试去加载并使用位于 `node_modules/vuepress-theme-awesome/Layout.vue` 的主题组件。
 
