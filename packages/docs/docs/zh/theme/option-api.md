---
seoTitle: Option API | Theme
---

# Option API

## plugins

- 类型: `Array|Object`
- 默认值: undefined

**参考:**

- [插件 > 使用插件](../plugin/using-a-plugin.md).

VuePress 支持一个主题继承于另一个主题。VuePress 将遵循 `override` 的方式自动帮你解决各种主题属性（如样式、布局组件）的优先级。

值得注意的是，在子主题中，VuePress 将注入一个指向父主题包目录根路径的 [alias](../plugin/option-api.md#alias) `@parent-theme`。

**参考:**

- [例子: `@vuepress/theme-vue`](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/theme-vue)
- [Design Concepts of VuePress 1.x](../miscellaneous/design-concepts.md)
