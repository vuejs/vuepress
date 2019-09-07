# 介绍

VuePress 由两部分组成：第一部分是一个[极简静态网站生成器](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core)，它包含由 Vue 驱动的[主题系统](../theme/README.md)和[插件 API](../plugin/README.md)，另一个部分是为书写技术文档而优化的[默认主题](../theme/default-theme-config.md)，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

## 它是如何工作的？

事实上，一个 VuePress 网站是一个由 [Vue](http://vuejs.org/)、[Vue Router](https://github.com/vuejs/vue-router) 和 [webpack](http://webpack.js.org/) 驱动的单页应用。如果你以前使用过 Vue 的话，当你在开发一个自定义主题的时候，你会感受到非常熟悉的开发体验，你甚至可以使用 Vue DevTools 去调试你的自定义主题。

在构建时，我们会为应用创建一个服务端渲染（SSR）的版本，然后通过虚拟访问每一条路径来渲染对应的HTML。这种做法的灵感来源于 [Nuxt](https://nuxtjs.org/) 的 `nuxt generate` 命令，以及其他的一些项目，比如 [Gatsby](https://www.gatsbyjs.org/)。

## Features

**内置的 Markdown 拓展**

* [目录](../guide/markdown.md#目录)
* [自定义容器](../guide/markdown.md#自定义容器)
* [代码块中的行高亮](../guide/markdown.md#代码块中的行高亮)
* [行号](../guide/markdown.md#行号)
* [导入代码段](../guide/markdown.md#导入代码段)

**在 Markdown 中 使用 Vue**

* [模板语法](../guide/using-vue.md#模板语法)
* [使用组件](../guide/using-vue.md#使用组件)

**Vue驱动的自定义主题系统**

* [网站和页面的元数据](../theme/writing-a-theme.md#网站和页面的元数据)
* [内容摘抄](../theme/writing-a-theme.md#内容摘抄)

**默认主题**

* Responsive layout
* [首页](../theme/default-theme-config.md#首页)
* [内置的搜索](../theme/default-theme-config.md#内置搜索)
* [Algolia 搜索](../theme/default-theme-config.md#algolia-搜索)
* 可定制的 [navbar](../theme/default-theme-config.md#navbar) and [sidebar](../theme/default-theme-config.md#sidebar)
* [自动生成的 GitHub 链接和页面编辑链接](../theme/default-theme-config.md#Git-仓库和编辑链接)
* [PWA: 刷新内容的 Popup](../theme/default-theme-config.md#popup-ui-to-refresh-contents)
* [最后更新时间](../theme/default-theme-config.md#最后更新时间)
* [多语言支持](../guide/i18n.md)

**博客主题**

* [文档](https://vuepress-theme-blog.ulivz.com/)
* [在线案例](https://ulivz.com/)

**Plugin**

* [强大的 Plugin API](../plugin/README.md)
* [博客插件](https://vuepress-plugin-blog.ulivz.com/)
* [PWA 插件](../plugin/official/plugin-pwa.md)
* [Google Analytics 插件](../plugin/official/plugin-google-analytics.md)
* ...

## 为什么不是...?

### Nuxt

VuePress 能做的事情，Nuxt 理论上确实能够胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用的特性。

### Docsify / Docute

这两个项目同样都是基于 Vue，然而它们都是完全的运行时驱动，因此对 SEO 不够友好。如果你并不关注 SEO，同时也不想安装大量依赖，它们仍然是非常好的选择！

### Hexo

Hexo 一直驱动着 Vue 的文档 —— 事实上，在把我们的主站从 Hexo 迁移到 VuePress 之前，我们可能还有很长的路要走。Hexo 最大的问题在于他的主题系统太过于静态以及过度地依赖纯字符串，而我们十分希望能够好好地利用 Vue 来处理我们的布局和交互，同时，Hexo 的 Markdown 渲染的配置也不是最灵活的。

### GitBook

我们的子项目文档一直都在使用 GitBook。GitBook 最大的问题在于当文件很多时，每次编辑后的重新加载时间长得令人无法忍受。它的默认主题导航结构也比较有限制性，并且，主题系统也不是 Vue 驱动的。GitBook 背后的团队如今也更专注于将其打造为一个商业产品而不是开源工具。
