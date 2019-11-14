---
title: search
metaTitle: Search Plugin | VuePress
---

# [@vuepress/plugin-search](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-search)

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

### test

- Type: `RegExp` | `Array<RegExp>`
- Default: `null`

Set up searchable paths with regular expressions. If no test expression is provided it will search on all paths. Considering you have this structure:

```bash
docs/
├── .vuepress/
│    └── ...
│
├── master/
│    └── ...
│
├── 1.0/
│    └── ...
│
└── 2.0/
     └── ...
```

You can set up searchable paths with `test` as:

- RegExp: `'/1\.0/'`
- Array of RegExp: `['/1\.0/', '/2\.0/']`


Otherwise,  the default search will return duplicates, once you can have similar content between folders `/master/`, `/1.0/` and `/2.0/`.

### searchHotkeys

- Type: `Array<string>`
- Default: `['s', '/']`

Configure the hotkeys which when pressed will focus the search box. Set to an empty array to disable this feature.

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
