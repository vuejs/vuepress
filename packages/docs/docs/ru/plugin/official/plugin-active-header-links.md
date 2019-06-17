---
en: 33dfbdcbb8341c9d018380ad60b9e74f1ff8a633
lang: ru-RU
title: active-header-links
metaTitle: Плагин для автоматической активации ссылок на боковой панели при прокрутке страницы | VuePress
---

# [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-active-header-links)

> Плагин для автоматической активации ссылок на боковой панели при прокрутке страницы

## Установка

```bash
yarn add -D @vuepress/plugin-active-header-links@next
# ИЛИ npm install -D @vuepress/plugin-active-header-links@next
```

## Использование

```javascript
module.exports = {
  plugins: ['@vuepress/active-header-links']
}
```

### Установка опций
```javascript
module.exports = {
  plugins: ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor',
    headerTopOffset: 120
  }]
}
```

## Опции

### sidebarLinkSelector

- Тип: `string`
- По умолчанию: `.sidebar-link`

### headerAnchorSelector

- Тип: `string`
- По умолчанию: `.header-anchor`

