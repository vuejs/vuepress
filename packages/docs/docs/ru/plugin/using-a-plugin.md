---
en: 6f995d4d5fe80b2d35d00b77b0faa1a65f7e49d7
lang: ru-RU
---

# Использование плагинов

Вы можете использовать плагины, выполнив некоторые настройки в `.vuepress/config.js`:

``` js
module.exports = {
  plugins: [
    require('./my-plugin.js')
  ]
}
```

## Использование плагинов из зависимостей

Плагин может быть опубликован на npm в формате `CommonJS` как `vuepress-plugin-xxx`. Вы можете использовать это:

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xx' ]
}
```

## Сокращения плагинов

Если вы добавляете к плагину префикс `vuepress-plugin-`, вы можете использовать сокращение, чтобы пропустить этот префикс:

``` js
module.exports = {
  plugins: [ 'xxx' ]
}
```

То же самое с:

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xxx' ]
}
```

Это также работает с [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
module.exports = {
  plugins: [ '@org/vuepress-plugin-xxx', '@vuepress/plugin-xxx' ]
}
```

Сокращение:

``` js
module.exports = {
  plugins: [ '@org/xxx', '@vuepress/xxx' ]
}
```

::: warning Заметка
Плагин, имя которого начинается с `@vuepress/plugin-`, является официально поддерживаемым плагином.
:::

## Опции плагина

### Babel Style

У плагинов могут быть опции, указанные путем переноса имени и объекта параметров в массив внутри вашей конфигурации:

``` js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-xxx',
      { /* опции */ }
    ]
  ]
}
```

Поскольку этот стиль согласуется с [babel's Plugin/Preset Options](https://babeljs.io/docs/en/plugins#plugin-preset-options), мы называем его `Babel Style`.

### Object Style

VuePress также предоставляет более простой способ использования плагинов из зависимости:

``` js
module.exports = {
  plugins: {
    'xxx': { /* опции */ }
  }
}
```

::: warning Заметка
Плагин можно отключить, если в качестве опции явно указано значение `false`.

- Babel style

``` js
module.exports = {
  plugins: [
    [ 'xxx', false ] // отключен.
  ]
}
```

- Object style

``` js
module.exports = {
  plugins: {
    'xxx': false // отключен.
  }
}
```

:::
