---
seoTitle: Option API | Theme
---

# Option API

## plugins

- Type: `Array|Object`
- Default: undefined

**Also see:**

- [Plugin > Using a plugin](../plugin/using-a-plugin.md).

## extend

- Type: `String`
- Default: undefined

```js
module.exports = {
  extend: '@vuepress/theme-default'
}
```

VuePress supports a theme to be inherited from another theme. VuePress will follow the principle of `override` to automatically help you resolve the priorities of various theme attributes, such as styles, layout components.

Note that in the child theme, VuePress will apply a `@parent-theme` [alias](../plugin/option-api.md#alias) pointing to the package directory of parent theme.

**Also see:**

- [Example: `@vuepress/theme-vue`](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/theme-vue)
- [Design Concepts of VuePress 1.x](../miscellaneous/design-concepts.md)
