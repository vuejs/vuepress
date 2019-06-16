---
en: 3b79b464bd2171732b28f702dccb222d546f7f89
lang: ru-RU
title: medium-zoom
metaTitle: Плагин Medium-Zoom | VuePress
---

# [@vuepress/plugin-medium-zoom](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-medium-zoom)

> [medium-zoom](https://github.com/francoischalifour/medium-zoom) плагин

## Установка

```bash
yarn add -D @vuepress/plugin-medium-zoom@next
# ИЛИ npm install -D @vuepress/plugin-medium-zoom@next
```

## Использование

**Простое**:

```javascript
module.exports = {
  plugins: ['@vuepress/medium-zoom'] 
}
```

**С опциями**:

```javascript
module.exports = {
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',
      // опции medium-zoom здесь
      // Смотрите: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }
  }
}
```

## Опции

### selector

- Тип: `string`
- По умолчанию: `.theme-default-content img`

Обратите внимание, что `.theme-default-content` - это имя класса компонента [`<Content />`](../../guide/using-vue.md#content) в теме по умолчанию.

### options

- Тип: `object`
- По умолчанию: `undefined`

[Опции](https://github.com/francoischalifour/medium-zoom#options) для [medium-zoom](https://github.com/francoischalifour/medium-zoom).
