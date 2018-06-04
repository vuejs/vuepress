---
sidebar: auto
---

# Конфигурация

## Базовые настройки

### base

- Тип: `string`
- По умолчанию: `/`

Базовый URL сайта куда будет происходить публикация. Вам потребуется установить эту опцию, если вы планируете публиковать ваш сайт не по корневому пути, например GitHub pages. Если вы планируете опубликовать сайт по адресу `https://foo.github.io/bar/`, тогда `base` должна быть установлена в значение `"/bar/"`. Значение всегда должно начинаться и заканчиваться слэшем.

Значение `base` автоматически добавляется в начало всех URL, начинающихся с `/` в других параметрах, поэтому вам потребуется определить его здесь только один раз.

**Смотри также:**

- [Базовый URL](../guide/assets.md#базовый-url)
- [Публикация > Github Pages](../guide/deploy.md#github-pages)

### title

- Тип: `string`
- По умолчанию: `undefined`

Заголовок сайта. Он будет префиксом для всех заголовков страниц, а также отображаться в боковой панели в стандартной теме.

### description

- Тип: `string`
- По умолчанию: `undefined`

Описание сайта. Будет отображаться в виде `<meta>` тега в HTML страницы.

### head

- Тип: `Array`
- По умолчанию: `[]`

Дополнительные теги, которые необходимо добавить в HTML страницы в тег `<head>`. Каждый тег может быть определён в виде `[tagName, { attrName: attrValue }, innerHTML?]`. Например, чтобы добавить пользовательскую иконку сайта:

``` js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ]
}
```

### host

- Тип: `string`
- По умолчанию: `'0.0.0.0'`

Определяет хост для сервера разработки.

### port

- Тип: `number`
- По умолчанию: `8080`

Определяет порт для сервера разработки.

### dest

- Тип: `string`
- По умолчанию: `.vuepress/dist`

Определяет каталог сохранения сборки по команде `vuepress build`.

### ga

- Тип: `string`
- По умолчанию: `undefined`

Указание Google Analytics ID для включения интеграции.

::: tip СОВЕТ
Пожалуйста, помните о вступившем в силу [GDPR (2018 реформа правил защиты данных Евросоюза)](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en) и позаботьтесь о том, чтобы настроить Google Analytics на [анонимные IP](https://support.google.com/analytics/answer/2763052?hl=en) где это может потребоваться и/или необходимо.
:::

### serviceWorker

- Тип: `boolean`
- По умолчанию: `false`

При установке в значение `true`, VuePress будет автоматически генерировать и регистрировать service worker, который кэширует контент для использования оффлайн (используется только в production).

При разработке пользовательской темы компонент `Layout.vue` также будет генерировать следующие события:

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip ПРИМЕЧАНИЯ ДЛЯ PWA
Параметр `serviceWorker` управляет только service worker. Чтобы сделать ваш сайт полностью  PWA-совместимым, вам необходимо предоставить Web App Manifest и иконки в `.vuepress/public`. Подробнее в [документации MDN — Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Кроме того, включайте эту опцию только в том случае, если у вас есть возможность публикации сайта через SSL, поскольку service worker может быть зарегистрирован только по HTTPS адресам.
:::

### locales

- Тип: `{ [path: string]: Object }`
- По умолчанию: `undefined`

Определяет локализации для поддержки i18n. Подробнее в разделе [Интернационализация](../guide/i18n.md).

### shouldPrefetch

- Тип: `Function`
- По умолчанию: `() => true`

Функция, определяющая какиим файлам необходимо генерировать подсказки пред-загрузки ресурсов `<link rel="preload">`. Подробнее в документации [shouldPrefetch](https://ssr.vuejs.org/ru/api/#shouldprefetch).

## Темы

### theme

- Тип: `string`
- По умолчанию: `undefined`

Укажите, чтобы использовать пользовательскую тему. При значении `"foo"`, VuePress попытается загрузить компонент темы из `node_modules/vuepress-theme-foo/Layout.vue`.

### themeConfig

- Тип: `Object`
- По умолчанию: `{}`

Определяет конфигурацию настроек для используемой темы. Список опций может варьироваться в зависимости от используемой вами темы.

**Смотри также:**

- [Настройки стандартной темы](../default-theme-config/README.md).

## Markdown

### markdown.lineNumbers

- Тип: `boolean`
- По умолчанию: `undefined`

Показывать ли номера строк слева в каждом блоке кода.

### markdown.slugify

- Тип: `Function`
- По умолчанию: [source](https://github.com/vuejs/vuepress/blob/master/lib/markdown/slugify.js)

Функция для преобразования текстов заголовков в slugs. Это влияет на генерируемые id/ссылки для якорей заголовков, блока содержания и ссылок в боковой панели.

### markdown.externalLinks

- Тип: `Object`
- По умолчанию: `{ target: '_blank', rel: 'noopener noreferrer' }`

Пары ключ и значение будут добавлены в теги `<a>`, которые указывают на внешние ссылки. Опция по умолчанию устанавливает открытие внешних ссылок в новом окне.

### markdown.anchor

- Тип: `Object`
- По умолчанию: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

Настройки для [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor). (Примечание: предпочитайте `markdown.slugify` если хотите настроить генерацию ID заголовков.)

### markdown.toc

- Тип: `Object`
- По умолчанию: `{ includeLevel: [2, 3] }`

Настройки для [markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents). (Примечание: предпочитайте `markdown.slugify` если хотите настроить генерацию ID заголовков.)

### markdown.config

- Тип: `Function`
- По умолчанию: `undefined`

Функция для изменения стандартной конфигурации или применения дополнительных плагинов в экземпляре [markdown-it](https://github.com/markdown-it/markdown-it), используемом для отображения исходных файлов. Например:

``` js
module.exports = {
  markdown: {
    config: md => {
      md.set({ breaks: true })
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

## Процесс сборки

### postcss

- Тип: `Object`
- По умолчанию: `{ plugins: [require('autoprefixer')] }`

Настройки для [postcss-loader](https://github.com/postcss/postcss-loader). Обратите внимание, что указав здесь своё значение вы перезапишете подключение autoprefixer и вам потребуется добавить его самостоятельно.

### stylus

- Тип: `Object`
- По умолчанию: `{ preferPathResolver: 'webpack' }`

Настройки для [stylus-loader](https://github.com/shama/stylus-loader).

### scss

- Тип: `Object`
- По умолчанию: `{}`

Настройки для [sass-loader](https://github.com/postcss/postcss-loader) для загрузки `*.scss` файлов.

### sass

- Тип: `Object`
- По умолчанию: `{ indentedSyntax: true }`

Настройки [sass-loader](https://github.com/webpack-contrib/sass-loader) для загрузки `*.sass` файлов.

### less

- Тип: `Object`
- По умолчанию: `{}`

Настройки для [less-loader](https://github.com/webpack-contrib/less-loader).

### configureWebpack

- Тип: `Object | Function`
- По умолчанию: `undefined`

Изменение внутренней конфигурации webpack. Если значением будет объект, он будет объединён в финальную конфигурацию с помощью [webpack-merge](https://github.com/survivejs/webpack-merge); если значением будет функция, она получит конфигурацию первым аргументом и флаг `isServer` вторым. Вы можете либо напрямую изменить конфигурацию, либо вернуть объект, который будет объединяться:

``` js
module.exports = {
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // изменяем конфигурацию для клиента
    }
  }
}
```

### chainWebpack

- Тип: `Function`
- По умолчанию: `undefined`

Изменение внутренней конфигурации webpack с помощью [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

``` js
module.exports = {
  chainWebpack: (config, isServer) => {
    // config будет экземпляром ChainableConfig
  }
}
```

## Совместимость с браузерами

### evergreen

- Тип: `boolean`
- По умолчанию: `false`

Установите в значение `true` если вы поддерживаете только современные (evergreen) браузеры. Это отключит транспиляцию модулей в ES5 и полифиллы для IE, что в результате ускорит сборку и уменьшит размер файлов.
