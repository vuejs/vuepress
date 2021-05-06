# 继承一个主题

有时你可能希望对一个主题进行一些小改动，但是又不想 Fork 并修改整个项目。

借助于 [主题 API](../../reference/theme-api.md) ，你可以继承一个主题并添加你自己的改动：

```ts
export default {
  // 你的主题
  name: 'vuepress-theme-foo',
  // 要继承的父主题
  extends: 'vuepress-theme-bar',
  // 覆盖父主题的布局
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
};
```

在这个例子中，你的 `vuepress-theme-foo` 将会继承 `vuepress-theme-bar` 的全部配置、插件和布局，并且你可以按照需要来覆盖对应的布局。

## 继承默认主题

首先，创建主题目录和主题入口 `.vuepress/theme/index.js` ：

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

你的本地主题将会继承默认主题，并且覆盖 `Layout` 布局。

接下来，创建 `.vuepress/theme/layouts/Layout.vue` ，并使用由默认主题的 `Layout` 提供的插槽：

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

你将会在除了首页外的所有页面添加一个自定义的页脚：

![extending-a-theme](/images/cookbook/extending-a-theme-01.png)

下面列出了默认主题的 `Layout` 所提供的所有插槽：

- `navbar-before`
- `navbar-after`
- `sidebar-top`
- `sidebar-bottom`
- `page-top`
- `page-bottom`

## 使你的主题可以被继承

作为一个主题作者，为了允许用户在使用你的主题时进行更多的自定义，你可能希望你的主题可以被用户继承。

你可以像默认主题的做法一样，在你的布局中添加插槽。这种方式需要你来决定主题的哪些部分是可以被扩展的，它更适合用于一些常见的自定义需求，比如页眉或页脚：

```vue
<template>
  <div class="my-theme-layout">
    <slot name="page-header" />
    <Content />
    <slot name="page-footer" />
  </div>
</template>
```

如果你觉得这种方式还不够灵活，你可以尝试一些更激进的做法，使你主题的每个组件都可以被替换。

比如，为你主题的每个组件都设置 `alias` 别名：

```js
module.exports = {
  name: 'vuepress-theme-foo',
  alias: {
    // 为可替换的组件设置别名
    '@theme/Navbar.vue': path.resolve(__dirname, 'components/Navbar.vue'),
    '@theme/Sidebar.vue': path.resolve(__dirname, 'components/Sidebar.vue'),
  },
}
```

然后，在你的主题中通过别名来使用这些组件：

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

这样，用户在继承你的主题时，就可以通过覆盖 `alias` 来替换特定的组件了：

```js
module.exports = {
  name: 'vuepress-theme-foobar',
  extends: 'vuepress-theme-foo'
  alias: {
    // 替换 Navbar 组件
    '@theme/Navbar.vue': path.resolve(__dirname, 'components/CustomNavbar.vue'),
  },
}
```
