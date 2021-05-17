# 开发主题

::: tip
在阅读该指南之前，你最好先了解一下 [开发插件](./plugin.md) 指南。
:::

## 创建一个主题

VuePress 主题是一个特殊的插件，它应该符合 [主题 API](../reference/theme-api.md) 。和插件一样，主题可以是一个 *主题对象* 或一个 *主题函数* 。

<CodeGroup>
  <CodeGroupItem title="主题对象" active>

```js
const { path } = require('@vuepress/utils')

const fooTheme = {
  name: 'vuepress-theme-foo',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
    404: path.resolve(__dirname, 'layouts/404.vue'),
  },
  // ...
}
```

  </CodeGroupItem>

  <CodeGroupItem title="主题函数">

```js
const { path } = require('@vuepress/utils')

const fooTheme = (options, app) => {
  return {
    name: 'vuepress-theme-foo',
    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      404: path.resolve(__dirname, 'layouts/404.vue'),
    },
    // ...
  }
}
```

  </CodeGroupItem>
</CodeGroup>

`layouts` 字段声明了你的主题提供的布局。

一个主题必须提供至少两个布局：`Layout` 和 `404` 。

`Layout` 布局应该包含 [Content](../reference/components.md#content) 组件来展示 Markdown 内容：

```vue
<template>
  <div>
    <Content />
  </div>
</template>
```

`404` 布局会被用于 `404.html` 页面：

```vue
<template>
  <div>404 Not Found</div>
</template>
```

你可以提供多个布局，用户可以通过 [layout](../reference/frontmatter.md#layout) Frontmatter 来修改布局。

## 发布到 NPM

一个典型的主题 Package 的结构如下所示：

```bash
vuepress-theme-foo
├─ lib
│  ├─ layouts
│  │  ├─ Layout.vue
│  │  └─ 404.vue
│  └─ index.js
└─ package.json
```

### 主题入口

`lib/index.js` 文件是主题入口，它应当直接导出主题：

<CodeGroup>
  <CodeGroupItem title="CJS" active>

```js
module.exports = fooTheme
```

  </CodeGroupItem>

  <CodeGroupItem title="ESM">

```js
export default fooTheme
```

  </CodeGroupItem>
</CodeGroup>

::: tip
注意，主题入口会在 Node 中被加载，因此它应为 CommonJS 格式。

如果你使用 ESM 格式，你需要使用 [babel](https://babeljs.io/) 或 [typescript](https://www.typescriptlang.org/) 来将它编译成 CommonJS 。
:::

### package.json

为了把 Package 发布到 NPM 上，[package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json) 文件是必需的：

```json
{
  "name": "vuepress-theme-foo",
  "version": "1.0.0",
  "keywords": [
    "vuepress-theme",
  ],
  "main": "lib/index.js",
  "files": [
    "lib"
  ]
}
```

- 将 `name` 按照约定命名： `vuepress-theme-xxx` 或 `@org/vuepress-theme-xxx` 。
- 在 `keywords` 中包含 `vuepress-theme` ，这样用户可以在 NPM 上搜索到你的主题。
- 将 `main` 设为主题入口文件。
- 设置 `files` ，仅发布 `lib` 目录下的文件。
