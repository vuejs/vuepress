---
en: b671745627c54b4b2171d6397621726a5470a827
lang: ru-RU
title: nprogress
metaTitle: Плагин Nprogress | VuePress
---

# [@vuepress/plugin-nprogress](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-nprogress)

> Плагин индикатора выполнения, основанный на [nprogress](https://github.com/rstacruz/nprogress). <Badge text="1.0.0-alpha.31+"/>

## Установка

```bash
yarn add -D @vuepress/plugin-nprogress@next
# ИЛИ npm install -D @vuepress/plugin-nprogress@next
```

## Использование

```javascript
module.exports = {
  plugins: ['@vuepress/nprogress']
}
```

## Пользовательский цвет

Установите `$nprogressColor` в вашем файле __site__ или __theme__ `palette.styl`, чтобы изменить цвет индикатора выполнения (по умолчанию это `$accentColor`).

```stylus
// .vuepress/styles/palette.styl
// или
// .vuepress/theme/styles/palette.styl

$nprogressColor = red
```

**Смотрите также:**

- [Настройка > Дизайн](../../config/README.md#дизайн)
