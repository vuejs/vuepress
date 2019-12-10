---
title: search
metaTitle: Search 插件 | VuePress
---

# [@vuepress/plugin-search](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-search)

> 基于 [Headers](../../miscellaneous/glossary.md#headers) 的搜索插件

## 安装

```bash
yarn add -D @vuepress/plugin-search
# OR npm install -D @vuepress/plugin-search
```

::: tip
请注意，此插件已包含在**默认主题**中，你现在看到的搜索便是由本插件提供支持。
:::

## 使用

1. 启用此插件：

```js
// .vuepress/config.js or themePath/index.js
module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}
```

2. 本插件将自动注入指向搜索组件的 webpack 别名 `@SearchBox`，以便您可以直接在 [layout](../../miscellaneous/glossary.md#layout) 组件中使用它：

```vue
<template>
  <div class="foo-layout">
    <header>
      <SearchBox/>
    </header>
    <main>
      ...
    </main>
  </div>
</template>

<script>
import SearchBox from '@SearchBox'

export default {
  components: { SearchBox }
}
</script>
```

## 选项

### searchMaxSuggestions

- 类型: `number`
- 默认值: 5

设置搜索的最大结果数。

## 技巧

### 调整默认颜色

由于该搜索组件使用了内置调色板，你可以通过 `styles/palette.styl` 来调整搜索框的默认颜色：

```stylus
// 你现在看到的这个搜索栏的颜色：
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
$arrowBgColor = #ccc
```
