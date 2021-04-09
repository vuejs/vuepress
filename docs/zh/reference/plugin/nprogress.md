---
title: nprogress
---

<!-- `# nprogress` 会被渲染成 `<h1 id="nprogress">` ，导致 id 和 nprogress 进度条冲突 （有点蠢） -->

<!-- 所以我们在 h1 标题后添加一个 '插件' 后缀，然后通过 title frontmatter 来设置页面标题 -->

# nprogress 插件

> [@vuepress/plugin-nprogress](https://www.npmjs.com/package/@vuepress/plugin-nprogress)

将 [nprogress](https://github.com/rstacruz/nprogress) 集成到 VuePress 中，在切换到另一个页面时会展示进度条。

## 样式

你可以通过 CSS 变量来自定义进度条的样式：

```css
:root {
  --nprogress-color: #29d;
}
```
