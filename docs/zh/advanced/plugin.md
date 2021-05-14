# 开发插件

::: tip
在阅读该指南之前，你最好先了解一下 VuePress 的 [架构](./architecture.md) 。
:::

## 创建一个插件

VuePress 插件是一个符合 [插件 API](../reference/plugin-api.md) 的普通 JavaScript 对象，称之为 *插件对象* 。

如果插件想要接收用户配置项，那么它可以是一个返回值为 *插件对象* 的函数，称之为 *插件函数* 。

<CodeGroup>
  <CodeGroupItem title="插件对象" active>

```js
const fooPlugin = {
  name: 'vuepress-plugin-foo',
  // ...
}
```

  </CodeGroupItem>

  <CodeGroupItem title="插件函数">

```js
const fooPlugin = (options, app) => {
  return {
    name: 'vuepress-plugin-foo',
    // ...
  }
}
```

  </CodeGroupItem>
</CodeGroup>

## 发布到 NPM

一个典型的插件 Package 的结构如下所示：

```bash
vuepress-plugin-foo
├─ lib
│  └─ index.js
└─ package.json
```

### 插件入口

`lib/index.js` 文件是插件入口，它应当直接导出插件：

<CodeGroup>
  <CodeGroupItem title="CJS" active>

```js
module.exports = fooPlugin
```

  </CodeGroupItem>

  <CodeGroupItem title="ESM">

```js
export default fooPlugin
```

  </CodeGroupItem>
</CodeGroup>

::: tip
注意，插件入口会在 Node 中被加载，因此它应为 CommonJS 格式。

如果你使用 ESM 格式，你需要使用 [babel](https://babeljs.io/) 或 [typescript](https://www.typescriptlang.org/) 来将它编译成 CommonJS 。
:::

### package.json

为了把 Package 发布到 NPM 上，[package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json) 文件是必需的：

```json
{
  "name": "vuepress-plugin-foo",
  "version": "1.0.0",
  "keywords": [
    "vuepress-plugin",
  ],
  "main": "lib/index.js",
  "files": [
    "lib"
  ]
}
```

- 将 `name` 按照约定命名： `vuepress-plugin-xxx` 或 `@org/vuepress-plugin-xxx` 。
- 在 `keywords` 中包含 `vuepress-plugin` ，这样用户可以在 NPM 上搜索到你的插件。
- 将 `main` 设为插件入口文件。
- 设置 `files` ，仅发布 `lib` 目录下的文件。
