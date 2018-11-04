---
title: last-updated
---

# @vuepress/plugin-last-updated

> last-updated 插件。

::: warning 注意
注意，vuepress 的 core 中已经包含此插件，你无需再重复安装。
:::

## 使用

```js
module.exports = {
  plugins: ['@vuepress/last-updated'] 
}
```

## 选项

### transformer

- 类型: `function`
- 默认值: `undefined`

默认情况下，本插件为每个页面生成一个 13 位的时间戳，你可以传入一个 transformer 将其转换为你想要的任何格式。

``` javascript
const timeago = require("timeago.js");

module.exports = {
  plugins: [
    [ 
      'last-updated',
      { transformer: timeago.format }
    ]
  ]
}
```
