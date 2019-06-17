---
en: 7cc37b78dae9c6facb9147b7970ed0b1d9e7476e
lang: ru-RU
---

# Использование темы

Использование темы почти такое же, как использование плагина.

## Использование темы из зависимости

Темы могут быть опубликованы на npm в необработанном формате Vue SFC, как `vuepress-theme-xxx`.

``` js
module.exports = {
  theme: 'vuepress-theme-xx'
}
```

## Сокращения тем

Если вы добавили префикс к теме `vuepress-theme-`, вы можете использовать сокращение, чтобы пропустить этот префикс:

``` js
module.exports = {
  theme: 'xxx'
}
```

То же самое, что и:

``` js
module.exports = {
  theme: 'vuepress-theme-xxx'
}
```

Это также работает с [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
module.exports = {
  theme: '@org/vuepress-theme-xxx', // или официальная тема: '@vuepress/theme-xxx'
}
```

Сокращение:

``` js
module.exports = {
  theme: '@org/xxx', // или официальная тема: '@vuepress/xxx'
}
```

::: warning Замечание
Тема, название которой начинается с `@vuepress/theme-`, является официально поддерживаемой темой.
:::
