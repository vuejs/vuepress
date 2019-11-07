---
title: last-updated
metaTitle: Last-Updated Plugin | VuePress
---

# [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated)

> last-updated plugin for VuePress

If you use the default theme, you don't need to install this plugin, because the plugin is already included in the `core` of VuePress, and you should use the [themeConfig.lastUpdated](../../theme/default-theme-config.md#last-updated) option directly.

If you use it at your custom theme, you'll need to handle the UI by yourself, and you can use __[$page.lastUpdated](../../guide/global-computed.md#page)__ to access the date string.

## Usage

```js
module.exports = {
  plugins: ['@vuepress/last-updated']
}
```

## Options

### transformer

- Type: `(timestamp: number, lang: string) => string`
- Default: `undefined`

By default, this plugin produces a 13-bit timestamp for each page, you can also pass in a transformer to convert it to any format that you want.

e.g.

``` javascript
const moment = require('moment');

module.exports = {
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // Don't forget to install moment yourself
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
If you are running in [i18n](../../guide/i18n.md) mode, you can also use the second argument `lang` to generate time strings for different languages.

Note that in VuePress, we follow this spec: [W3C > Language tags in HTML and XML](https://en.wikipedia.org/wiki/Language_localisation), so `en-US` uses hyphens (`-`) instead of underscores (`_`). Please make sure that the library you are using follows this spec, otherwise please convert it yourself.
:::
