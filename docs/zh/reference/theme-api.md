# 主题 API

<NpmBadge package="@vuepress/core" />

VuePress 主题同样是一个插件，因此主题 API 可以接收 [插件 API](./plugin-api.md) 的所有选项，但存在以下差别：

## 基础配置项

### name

- 类型： `string`

- 详情：

  主题的名称。

  它应遵从如下命名约定：

  - 非 Scoped: `vuepress-theme-foo`
  - Scoped: `@org/vuepress-theme-foo`

### multiple

- 详情：

  主题永远不能被多次使用，因此不应设置该配置项。

## 主题特定配置项

### layouts

- 类型： `string | Record<string, string>`

- 详情：

  指定主题的布局组件。

  它可以接收布局目录的绝对路径。该目录下的所有 `.vue,.ts,.js` 文件都会被注册为布局组件。

  它还可以接收一个普通对象，其键是布局名称，值是布局文件的绝对路径。

  一个主题必须至少有两个布局： `Layout` 和 `404` 。

- 示例：

布局目录：

```bash
layouts
├─ Layout.vue
├─ 404.vue
└─ FooBar.vue
```

使用布局目录的绝对路径：

```js
module.exports = {
  layouts: path.resolve(__dirname, 'path/to/layouts'),
}
```

使用普通对象是等效的：

```js
module.exports = {
  layouts: {
    Layout: path.resolve(__dirname, 'path/to/layouts/Layout.vue'),
    404: path.resolve(__dirname, 'path/to/layouts/404.vue'),
    FooBar: path.resolve(__dirname, 'path/to/layouts/FooBar.vue'),
  },
}
```

### extends

- 类型： `string`

- 详情：

  要继承的主题名称。

  父主题的所有主题 API 都会被继承，但是子主题不会覆盖父主题。

  如果在子主题和父主题中都注册了具有相同名称的布局，则子主题的布局将具有更高的优先级。

  不支持多级继承。

- 示例：

```js
module.exports = {
  // 继承默认主题
  extends: '@vuepress/theme-default',

  // 覆盖 `404` 布局
  layouts: {
    404: path.resolve(__dirname, 'path/to/404.vue'),
  },
}
```
