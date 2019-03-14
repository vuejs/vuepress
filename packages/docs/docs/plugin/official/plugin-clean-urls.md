---
title: clean-urls
metaTitle: A plugin of automatically generating clean urls | VuePress
---

# [@vuepress/plugin-clean-urls](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-clean-urls)

> A plugin for automatically generating clean urls. <Badge text="1.0.0-alpha.40+"/>

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

::: warning
This plugin will always work on your dev server, but VuePress **does not have the right** to modify server identification. If you want your URLs to follow a certain pattern (e.g. `/routing` instead of `/routing.html` or `routing/`), you should make sure that your server would treat it as an HTML. This means that you may need to configure your server specifically.

References:

- For Netify users: [https://www.netlify.com/docs/redirects/#trailing-slash](https://www.netlify.com/docs/redirects/#trailing-slash).
- For Surge users: [https://surge.sh/help/using-clean-urls-automatically](https://surge.sh/help/using-clean-urls-automatically).
:::

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
