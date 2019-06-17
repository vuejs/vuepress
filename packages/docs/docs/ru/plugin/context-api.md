---
en: a3c1dae32b405a6471840ca2b204c9825c5d38ae
lang: ru-RU
---

# Контекстный API

Начиная с VuePress 1.x.x, VuePress предоставляет объект `AppContext`, который хранит все состояние текущего приложения и может быть доступен через API плагина.

::: warning Заметка
Контекст каждого плагина представляет собой изолированный контекст, унаследованный от контекста приложения.
:::

```js
module.exports = (options, ctx) => {
  // ...
}
```

## ctx.isProd

- Тип: `boolean`

Работает ли VuePress в режиме производственной среды.

## ctx.pages

- Тип: `array`

Содержит список объектов Page

## ctx.sourceDir

- Тип: `string`

Корневой каталог, в котором находятся документы.

## ctx.tempPath

- Тип: `string`

Корневой каталог, в котором находятся временные файлы.

## ctx.outDir

- Тип: `string`

Путь сборки.

## ctx.base

- Тип: `string`

Смотрите [base](../config/README.md#base).

## ctx.writeTemp

- Тип: `Function`

Утилита для записи временных файлов в tempPath.
