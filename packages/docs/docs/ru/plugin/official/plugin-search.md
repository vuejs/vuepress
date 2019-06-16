---
en: c8cbd9ccd7cfa79856769b8582cdda9e54876cc8
lang: ru-RU
title: search
metaTitle: Плагин поиска | VuePress
---

# [@vuepress/plugin-search](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-search)

> Плагин поиска по [заголовкам](../../miscellaneous/glossary.md#headers)

## Установка

```bash
yarn add -D @vuepress/plugin-search@next
# ИЛИ npm install -D @vuepress/plugin-search@next
```

::: tip
Обратите внимание, что этот плагин был включен в **тему по умолчанию**, окно поиска, которое вы видите сейчас, работает от плагина.
:::

## Использование

1. Включите этот плагин:

```js
// .vuepress/config.js или themePath/index.js
module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10      
    }]
  ]
}
```

2. Этот плагин автоматически вставит псевдоним webpack `@SearchBox`, указывающий на компонент поиска, чтобы вы могли использовать его непосредственно в своем компоненте [layout](../../miscellaneous/glossary.md#layout):

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

## Опции

### searchMaxSuggestions

- Тип: `number`
- По умолчанию: 5

Установите максимальное количество результатов для поиска.

### test

- Тип: `RegExp` | `Array<RegExp>`
- По умолчанию: `null`

Установите пути поиска с регулярными выражениями. Если тестовое выражение не указано, оно будет искать по всем путям. Учитывая, что у вас есть эта структура:

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

Вы можете настроить пути поиска с помощью `test` как:

- RegExp: `'/1\.0/'`
- Array или RegExp: `['/1\.0/', '/2\.0/']`


В противном случае поиск по умолчанию вернет дубликаты, если у вас будет похожий контент в папках `/master/`, `/1.0/` и `/2.0/`.

## Советы

### Настройте цвета по умолчанию.

Поскольку компонент Поиска использует встроенную палитру, вы можете настроить цвета по умолчанию с помощью `styles/palette.styl`:

```stylus
// цвета окна поиска, которое вы видите сейчас:
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
$arrowBgColor = #ccc
```
