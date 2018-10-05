# 介绍

VuePress 由两部分组成：一部分是支持用 Vue 开发主题的极简静态网站生成器，另一个部分是为书写技术文档而优化的默认主题。它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

## 它是如何工作的？

事实上，一个 VuePress 网站是一个由 [Vue](http://vuejs.org/)、[Vue Router](https://github.com/vuejs/vue-router) 和 [webpack](http://webpack.js.org/) 驱动的单页应用。如果你以前使用过 Vue 的话，当你在开发一个自定义主题的时候，你会感受到非常熟悉的开发体验，你甚至可以使用 Vue DevTools 去调试你的自定义主题。

在构建时，我们会为应用创建一个服务端渲染（SSR）的版本，然后通过虚拟访问每一条路径来渲染对应的HTML。这种做法的灵感来源于 [Nuxt](https://nuxtjs.org/) 的 `nuxt generate` 命令，以及其他的一些项目，比如 [Gatsby](https://www.gatsbyjs.org/)。

## 特性

- 为技术文档而优化的 [内置 Markdown 拓展](markdown.md)
- [在 Markdown 文件中使用 Vue 组件的能力](using-vue.md)
- [Vue 驱动的自定义主题系统](custom-themes.md)
- [自动生成 Service Worker](../config/README.md#serviceworker)
- [Google Analytics 集成](../config/README.md#ga)
- [基于 Git 的 “最后更新时间”](../theme/default-theme-config.md#最后更新时间)
- [多语言支持](i18n.md)
- 默认主题包含：
  - 响应式布局
  - [可选的主页](../theme/default-theme-config.md#首页)
  - [简洁的开箱即用的标题搜索](../theme/default-theme-config.md#内置搜索)
  - [Algolia 搜索](../theme/default-theme-config.md#algolia-搜索)
  - 可自定义的[导航栏](../theme/default-theme-config.md#导航栏) 和[侧边栏](../theme/default-theme-config.md#侧边栏)
  - [自动生成的 GitHub 链接和页面的编辑链接](../theme/default-theme-config.md#git-仓库和编辑链接)

## Todo

VuePress 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的特性：

- 插件
- 博客系统

我们欢迎你为 VuePress 的开发作出贡献。

## 为什么不是...?

### Nuxt

VuePress 能做的事情，Nuxt 理论上确实能够胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用的特性。

### Docsify / Docute

这两个项目同样都是基于 Vue，然而它们都是完全的运行时驱动，因此对 SEO 不够友好。如果你并不关注 SEO，同时也不想安装大量依赖，它们仍然是非常好的选择！

### Hexo

Hexo 一直驱动着 Vue 的文档 —— 事实上，在把我们的主站从 Hexo 迁移到 VuePress 之前，我们可能还有很长的路要走。Hexo 最大的问题在于他的主题系统太过于静态以及过度地依赖纯字符串，而我们十分希望能够好好地利用 Vue 来处理我们的布局和交互，同时，Hexo 的 Markdown 渲染的配置也不是最灵活的。

### GitBook

我们的子项目文档一直都在使用 GitBook。GitBook 最大的问题在于当文件很多时，每次编辑后的重新加载时间长得令人无法忍受。它的默认主题导航结构也比较有限制性，并且，主题系统也不是 Vue 驱动的。GitBook 背后的团队如今也更专注于将其打造为一个商业产品而不是开源工具。
