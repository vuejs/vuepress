---
en: 328310472a899f2bcb1f623012b0b5216a4fecfd
lang: ru-RU
title: last-updated
metaTitle: Плагин Last-Updated | VuePress
---

# [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated)

> Плагин Last-Updated для vuepress

Если вы используете тему по умолчанию, вам не нужно устанавливать этот плагин, потому что плагин уже включен в `core` VuePress, и вы должны использовать [themeConfig.lastUpdated](../../theme/default-theme-config.md#last-updated) напрямую.

Если вы используете его в своей пользовательской теме, вам нужно будет самостоятельно обрабатывать пользовательский интерфейс и использовать __[$page.lastUpdated](../../guide/global-computed.md#page)__ для получения доступа к строке даты.

## Использование

```js
module.exports = {
  plugins: ['@vuepress/last-updated'] 
}
```

## Опции

### transformer

- Тип: `(timestamp: number, lang: string) => string`
- По умолчанию: `undefined`

По умолчанию этот плагин создает 13-битную временную метку для каждой страницы, вы также можете передать преобразователь в любой формат, который вы хотите.

e.g.

``` javascript
const moment = require('moment');

module.exports = {
  plugins: [
    [ 
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // Не забудьте установить moment самостоятельно
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
Если вы работаете в режиме [i18n](../../guide/i18n.md), вы также можете использовать второй аргумент `lang` для генерации временных строк для разных языков.

Обратите внимание, что в VuePress мы следуем этой спецификации: [W3C > Language tags in HTML and XML](https://en.wikipedia.org/wiki/Language_localisation), поэтому в `en-US` использует вместо дефисов (`-`) подчеркивания (`_`). Пожалуйста, убедитесь, что используемая вами библиотека соответствует этой спецификации, в противном случае, пожалуйста, конвертируйте ее самостоятельно.
:::
