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

## Extend Default Theme

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

Next, create `.vuepress/theme/layouts/Layout.vue`, and make use of the slots that provided by the `Layout` of default theme:

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

## Make Your Theme Extendable

As a theme author, you might want to make your theme extendable, allowing users to use your theme with their own customization.

You can provide slots in your layouts, just like how default theme does. This approach requires you to determine which parts of your theme could be extended. It is more suitable for those common customizations like page footer or header:

```vue
<template>
  <div class="my-theme-layout">
    <slot name="page-header" />
    <Content />
    <slot name="page-footer" />
  </div>
</template>
```

If you think it is not flexible enough, you can try some more aggressive approaches to make each components of you theme replaceable.

For example, set `alias` for each components of you theme:

```js
module.exports = {
  name: 'vuepress-theme-foo',
  alias: {
    // set alias for replaceable components
    '@theme/Navbar.vue': path.resolve(__dirname, 'components/Navbar.vue'),
    '@theme/Sidebar.vue': path.resolve(__dirname, 'components/Sidebar.vue'),
  },
}
```

Next, use those components via aliases in your theme:

```vue
<template>
  <div class="my-theme-layout">
    <Navbar />
    <Sidebar />
    <Content />
  </div>
</template>

<script>
import Navbar from '@theme/Navbar.vue'
import Sidebar from '@theme/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar,
  },
}
</script>
```

Then, users can replace specific components by overriding the `alias` when extending your theme:

```js
module.exports = {
  name: 'vuepress-theme-foobar',
  extends: 'vuepress-theme-foo'
  alias: {
    // replace the Navbar component
    '@theme/Navbar.vue': path.resolve(__dirname, 'components/CustomNavbar.vue'),
  },
}
```
