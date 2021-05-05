# Extending a Theme

Sometimes you might want make some minor changes to a theme, but you may not want to fork and modify the entire project.

With the help of [Theme API](../../reference/theme-api.md), you can extend a theme and make your own modifications:

```js
module.exports = {
  // your theme
  name: 'vuepress-theme-foo',
  // parent theme to extend
  extends: 'vuepress-theme-bar',
  // override layouts of parent theme
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}
```

In this case, your `vuepress-theme-foo` will inherit all configuration, plugins and layouts from `vuepress-theme-bar`, and you can override corresponding layouts as needed.

## Extending Default Theme

First, create the theme directory and theme entry `.vuepress/theme/index.js`:

```js
const { path } = require('@vuepress/utils')

module.exports = {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}
```

You local theme will extends default theme, and override the `Layout` layout.

Next, create `.vuepress/layouts/Layout.vue`, and make use of the slots that provided by the `Layout` of default theme:

```vue
<template>
  <Layout>
    <template #page-bottom>
      <div class="my-footer">This is my custom page footer</div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

export default {
  components: {
    Layout,
  },
}
</script>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>
```

You will add a custom footer to every normal pages in default theme (excluding homepage):

![extending-a-theme](/images/cookbook/extending-a-theme-01.png)

Here are all the slots that provided by the `Layout` of default theme:

- `navbar-before`
- `navbar-after`
- `sidebar-top`
- `sidebar-bottom`
- `page-top`
- `page-bottom`
