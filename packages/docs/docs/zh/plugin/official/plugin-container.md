---
title: container
metaTitle: Markdown 容器插件 | VuePress
---

# [@vuepress/plugin-container](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-container)

> Markdown 容器插件

## 安装

```bash
yarn add -D @vuepress/plugin-container@next
# OR npm install -D @vuepress/plugin-container@next
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/container'] 
}
```

## 选项

### type

- 类型: `string`
- 这是一个必需的选项

容器的类型。举个例子，如果 `type` 被设置为 `foo`，则仅有下面的语法会被视为对应的容器：

```md
::: foo bar
随便写点啥 ~
:::
```

### defaultTitle

- 类型: `string`
- 默认值: `type` 的大写形式

容器的默认标题。如果没有提供标题，则会使用 `defaultTitle` 作为容器的标题。

### before

- 类型: `string | Function`
- 默认值: `undefined`

要插入在容器前的 HTML。如果设置为一个函数，将传入当前的 `info` 作为第一个参数。（在上面的例子中，`info` 的值为 `bar`。）如果设置了这个值，它将覆盖 `defaultTitle` 的效果。

### after

- 类型: `string | Function`
- 默认值: `undefined`

要插入在容器后的 HTML。如果设置为一个函数，将传入当前的 `info` 作为第一个参数。（在上面的例子中，`info` 的值为 `bar`。）如果设置了这个值，它将覆盖 `defaultTitle` 的效果。

### validate

- 类型: `Function`
- 默认值: `undefined`

一个用于判定容器是否结束的函数。当认定容器范围结束时应返回一个 `true`。

### render

- 类型: `Function`
- 默认值: `undefined`

容器开头和结束 token 的渲染函数。如果设置了这个值，它将覆盖 `before`, `after` 和 `defaultTitle` 的效果。

### marker

- 类型: `string`
- 默认值: `':'`

用于分隔符的字符。
