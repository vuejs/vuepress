---
metaTitle: Configuration | Theme
---

# Theme Configuration

As with plugins, the theme configuration file `themeEntry` should export a `plain JavaScript object`(`#1`). If the plugin needs to take options, it can be a function that exports a plain object(`#2`). The function will be called with the `siteConfig.themeConfig` as the first argument, along with [ctx](./context-api.md) which provides some compile-time metadata.

``` js
// #1
module.exports = {
   // ...
}
```

``` js
// #2
module.exports = (themeConfig, ctx) => {
   return {
      // ...
   }
}
```


::: tip
1. You should see the difference between `themeEntry` and `themeConfig`, the former is a configuration for ths theme itself, which is provided by VuePress. the latter is the user's configuration for the theme, which is implemented by the currently used theme, e.g. [Default Theme Config](./default-theme-config.md).

2. In addition to the options listed in this section, `themeEntry` also supports all [Option API](../plugin/option-api.md) and [Life Cycle](../plugin/life-cycle.md) supported by plugins.
:::

## plugins

- Type: `Array|Object`
- Default: undefined

**Also see:**

- [Plugin > Using a Plugin](../plugin/using-a-plugin.md).

---

::: warning
You probably don't need to use following options tagged with <Badge text="Danger Zone" vertical="middle"/> unless you know what you are doing!
:::

## devTemplate <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

HTML template path used in `dev` mode, default template see [here](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/app/index.dev.html)

## ssrTemplate <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

HTML template path used in `build` mode, default template see [here](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/app/index.ssr.html)

**Also see:**

- [Vue SSR Guide > template](https://ssr.vuejs.org/api/#template).

## extend <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

```js
module.exports = {
  extend: '@vuepress/theme-default'
}
```

VuePress provides the ability to inherit one theme from another. VuePress will follow the concept of `override` and automatically help you prioritize various thematic attributes, e.g. styles and layout components.

**Also see:**

- [Theme Inheritance](./inheritance.md)
- [Design Concepts of VuePress 1.x](../miscellaneous/design-concepts.md)

## globalLayout <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

```js
// themePath/index.js
module.exports = {
  globalLayout: '/path/to/your/global/vue/sfc'
}
```

Global layout component is a component responsible for the global layout strategy. The [default global layout](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/app/components/GlobalLayout.vue) will help you render different layouts according to [$frontmatter.layout](../guide/frontmatter.md#layout), so in most cases you do not need to configure this option.

For example, when you want to set a global header and footer for your theme, you can do this:
  
```vue
<!-- themePath/layouts/GlobalLayout.vue -->
<template>
  <div id="global-layout">
    <header><h1>Header</h1></header>
    <component :is="layout"/>
    <footer><h1>Footer</h1></footer>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (this.$vuepress.isLayoutExists(this.$frontmatter.layout)) {
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
```
