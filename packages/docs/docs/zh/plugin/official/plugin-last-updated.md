---
title: last-updated
metaTitle: Last-Updated 插件 | VuePress
---

# [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated)

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

- Type: `(timestamp: number, lang: string) => string`
- 默认值: `undefined`

默认情况下，本插件为每个页面生成一个 13 位的时间戳，你可以传入一个 transformer 将其转换为你想要的任何格式。

例子：

``` javascript
const moment = require('moment');

module.exports = {
  plugins: [
    [ 
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ]
}
```

::: tip
如果你在 [i18n](../../guide/i18n.md) 模式下运行，你还可以使用第二个参数 `lang` 为不同语言生成时间字符串。

请注意，在 VuePress 中，我们遵循以下规范：[W3C > Language tags in HTML and XML](https://en.wikipedia.org/wiki/Language_localisation)，因此 `zh-CN` 使用连字符（`-`）而不是下划线（`_`）。 请确保你使用的库遵循此规范，否则请自行转换。
:::
