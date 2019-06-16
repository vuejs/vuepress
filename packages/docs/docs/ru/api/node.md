---
en: 0e712b7d344f6c8f08f9821b78c6997b888d5ede
lang: ru-RU
---

# Node.js API <Badge text="1.0.0-alpha.44+"/>

## Использование

```js
const { createApp, dev, build, eject } = require('vuepress')
```

## Методы

### createApp(\[options]): Promise\<App>

Создает приложение VuePress.

#### App.prototype.process: () => Promise\<void> | never

Асинхронный метод, используемый для подготовки контекста текущего приложения, который включает загрузку страниц и плагинов, применение плагинов и т.д.

#### App.prototype.dev: () => Promise\<App> | never

Запускает процесс разработки с текущим контекстом приложения.

#### App.prototype.build: () => Promise\<App> | never

Запускает процесс сборки с текущим контекстом приложения.


### dev(\[options]): Promise\<App>

Запускает сервер разработки, фактически он реализован с помощью `createApp`:

```js
async function dev (options) {
  const app = createApp(options)
  await app.process()
  return app.dev()
}
```

### build(\[options]): Promise\<App>

Собирает ваши исходные файлы, как статический сайт, фактически он реализован с помощью `createApp`:

```js
async function build (options) {
  const app = createApp(options)
  await app.process()
  return app.build()
}
```

### eject(targetDir): Promise\<void>

Копирует тему по умолчанию в `{targetDir}/.vuepress/theme` для настройки.


## Опции

### sourceDir

- Тип: `string`
- Обязательный: `true`

Указывает на исходный каталог вашего сайта VuePress.

### theme

- Тип: `string`
- Обязательный: `false`

Смотрите [theme](../config/README.md#theme).

### plugins

- Тип: `array`
- Обязательный: `false`

Смотрите [plugins](../config/README.md#plugins).

### temp

- Тип: `string`
- Обязательный: `false`

Смотрите [temp](../config/README.md#temp).

### dest

- Тип: `string`
- Обязательный: `false`

Смотрите [dest](../config/README.md#dest).

### siteConfig

- Тип: `object`
- Обязательный: `{}`

Это очень полезно, когда вы пишете тесты и не хотите зависеть от реального конфигурационного файла, для всех опций, пожалуйста, перейдите в [siteConfig](../config/README.md).
