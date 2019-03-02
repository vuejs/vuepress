---
title: clean-urls
metaTitle: A plugin of automatically generating clean urls | VuePress
---

# [@vuepress/plugin-clean-urls](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-clean-urls)

> A plugin of automatically generating clean urls

## Install

```bash
yarn add -D @vuepress/plugin-clean-urls@next
# OR npm install -D @vuepress/plugin-clean-urls@next
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/clean-urls'] 
}
```

## Options

### normalSuffix

- Type: `string`
- Default: `''`

The suffix for normal pages. For example, `foo/bar.md` will become:

- `foo/bar.html` by default (without this plugin)
- `foo/bar/` (with `normalSuffix` set to `'/'`)
- `foo/bar` (with `normalSuffix` set to `''`)

### indexSuffix

- Type: `string`
- Default: `'/'`

The suffix for index pages. For example, `foo/index.md` will become:

- `foo/` by default (without this plugin)
- `foo` (with `indexSuffix` set to `''`)
- `foo/index.html` (with `indexSuffix` set to `'/index.html'`)

::: tip
An index page is a page with a file name of index.md or readme.md (case insensitive).
:::
