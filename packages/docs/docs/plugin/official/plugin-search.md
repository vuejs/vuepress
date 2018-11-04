---
title: search
---

# @vuepress/plugin-search

> [Headers](../../miscellaneous/glossary.md#headers)-based search plugin

## Install

```bash
yarn add -D @vuepress/plugin-search
# OR npm install -D @vuepress/plugin-search
```

::: tip
Note that this plugin has been included in **default theme**, the search box you see now is powered by the plugin.
:::

## Usage

1. Enable this plugin:

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

2. This plugin will automatically inject a webpack alias `@SearchBox` pointing to the search component so that you can use it directly in your [layout](../../miscellaneous/glossary.md#layout) component:

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

## Options

### searchMaxSuggestions

- Type: `number`
- Default: 5

Set the maximum number of results for search.

## Tips

### Tweak the default colors.

Since the Search component leverages the built-in palette, you can tweak the default colors via `styles/palette.styl`:

```stylus
// colors of the searchbox you see now:
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
$arrowBgColor = #ccc
```
