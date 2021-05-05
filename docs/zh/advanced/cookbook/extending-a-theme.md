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

接下来，创建 `.vuepress/layouts/Layout.vue` ，并使用由默认主题的 `Layout` 提供的插槽：

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
