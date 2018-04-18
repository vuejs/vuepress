# 介绍

VuePress 由两部分组成：一个是由 Vue 驱动的极简主题系统带来的静态网站生成器，一个是为书写技术文档而优化的默认主题，它的诞生初衷是为了助力 Vue 及其子项目书写文档的需求。
 
每一个由 VuePress 生成的页面都有自己预渲染好的 HTML，也因此带来了非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面都将在用户浏览到的时候按需加载。

## 它是如何工作的？

事实上，一个 VuePress 网站是一个由 [Vue](http://vuejs.org/)、[Vue Router](https://github.com/vuejs/vue-router) 和 [Webpack](http://webpack.js.org/) 驱动的单页应用。如果你以前使用过 Vue 的话，当你在开发一个自定义主题的时候，你将会回到曾经那非常熟悉的开发体验，你甚至可以使用 Vue DevTools 去调试你的自定义主题。

在构建过程中，我们创建了一个服务端渲染（SSR）版本的应用，同时在访问每一个路由的时候会渲染对应的HTML，这种做法的灵感来源于 [Nuxt](https://nuxtjs.org/) 的 `nuxt generate` 命令，以及其他的一些项目，如 [Gatsby](https://www.gatsbyjs.org/)。

## 特性

- [内置的 Markdown 拓展](./markdown.md)，为技术文档而生
- [在 Markdown 文件使用 Vue 组件的能力](./using-vue.md)
- [Vue 驱动的自定义主题系统](./custom-themes.md)
- 支持 PWA
- 集成了 Google Analytics
- 一个默认的主题包含：
  - 响应式布局
  - 可选的主页
  - 简洁的开箱即用的标题搜索
  - 可以自定义的导航栏（navbar）和侧边栏（sidebar）
  - 自动生成的 GitHub 链接和页面的编辑链接

## Todo

VuePress 仍然处于开发中，这里有一些目前还不支持、但已经在计划中的特性：

- Algolia DocSearch 的集成
- 博客系统

欢迎你的 Contribution！

## 为什么不是...?

### Nuxt

VuePress 能做的事情，Nuxt 同样能胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用的特性。

### Docsify / Docute

这两个项目同样都是 Vue 驱动的，然而它们都是完全的运行时驱动，因此对 SEO 不够友好。如果你并不关注 SEO，同时也不想因为安装依赖而弄糊涂，它们仍然是非常好的选择！

### Hexo

Hexo 一直驱动着 Vue 的文档 —— 事实上，在决定开始从 Hexo 迁移到 VuePress 之前，我们还有很长的路要走。Hexo 最大的问题在于他的主题系统太过于静态以及过度地依赖纯字符串，而我们十分希望能够好好地利用 Vue 来处理我们的布局和交互，同时，Hexo 的 Markdown 渲染的配置也不是最灵活的。

