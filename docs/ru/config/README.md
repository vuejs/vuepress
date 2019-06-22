---
en: 403deb186c92a930d4f06105f18db68a1f03f6ac
sidebar: auto
---

# Настройка

<Bit/>

## Базовые настройки

### base

- Тип: `string`
- По умолчанию: `/`

Базовый URL, по которому будет опубликован сайт. Вам нужно будет установить это значение, если вы планируете развернуть свой сайт в подпапку, например, на GitHub Pages. Если вы планируете опубликовать свой сайт по ссылке `https://foo.github.io/bar/`, то для `base` должно быть установлено значение `"/bar/"`. Оно всегда должно начинаться и заканчиваться `/` слешем.

`base` автоматически добавляется ко всем URL-адресам, начинающимся с `/` в других параметрах, поэтому необходимо указать его только один раз.

**Также смотрите:**

- [Базовый URL](../guide/assets.md#базовый-url)
- [Руководство по публикации > Github Pages](../guide/deploy.md#GitHub-Pages)

### title

- Тип: `string`
- По умолчанию: `undefined`

Название сайта. Будет использоваться, как префикс для всех заголовков страниц и будет отображаться на панели навигации в теме по умолчанию.

### description

- Тип: `string`
- По умолчанию: `undefined`

Описание сайта. Будет отображаться, как тег `<meta>` на странице HTML.

### head

- Тип: `Array`
- По умолчанию: `[]`

Дополнительные теги для вставки на страницу HTML `<head>`. Каждый тег может быть указан в виде `[tagName, {attrName: attrValue}, innerHTML?]`. Например, чтобы добавить свой уникальный favicon:

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

Укажите домен или IP-адрес, который будет использоваться для сервера разработки.

### port

- Тип: `number`
- По умолчанию: `8080`

Укажите порт, который будет использоваться для сервера разработки.

### dest

- Тип: `string`
- По умолчанию: `.vuepress/dist`

Укажите каталог сборки для `vuepress build`.

### ga

- Тип: `string`
- По умолчанию: `undefined`

Укажите идентификатор Google Analytics, чтобы включить интеграцию.

::: tip Совет
Пожалуйста, помните про [GDPR (2018 реформа правил защиты данных ЕС)](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en) и рассмотрите возможность настройки Google Analytics для [анонимных IP-адресов](https://support.google.com/analytics/answer/2763052?hl=en), где уместно и/или необходимо.
:::

### serviceWorker

- Тип: `boolean`
- По умолчанию: `false`

Если установлено значение `true`, VuePress автоматически сгенерирует и зарегистрирует Service Worker, который кэширует содержимое для автономного использования (включено только в рабочей среде).

При разработке пользовательской темы компонент `Layout.vue` также будет генерировать следующие события:

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip Примечание PWA
Опция `serviceWorker` обрабатывает только Service Worker. Чтобы сделать ваш сайт полностью совместимым с PWA, вам потребуется предоставить манифест веб-приложения и иконки в `.vuepress/public`. Для получения дополнительной информации посмотрите [Документацию MDN о манифесте веб-приложения](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Кроме того, включайте Service Worker, только если вы можете развернуть свой сайт с SSL, так как он может быть зарегистрирован только по HTTPs URL-адресам.
:::

### locales

- Тип: `{ [path: string]: Object }`
- По умолчанию: `undefined`

Укажите языки для поддержки i18n. Подробнее смотрите в руководстве по [Мультиязычности](../guide/i18n.md).

### shouldPrefetch

- Тип: `Function`
- По умолчанию: `() => true`

Функция для управления тем, у каких файлов должно быть указано `<link rel="preload">`. Смотрите [ShouldPrefetch](https://ssr.vuejs.org/api/#shouldprefetch).

## Темы

### theme

- Тип: `string`
- По умолчанию: `undefined`

Укажите название темы, если вы используете пользовательскую тему. При значении `"foo"` VuePress попытается загрузить компонент темы из `node_modules/vuepress-theme-foo/Layout.vue`.

### themeConfig

- Тип: `Object`
- По умолчанию: `{}`

Укажите параметры конфигурации для используемой темы. Параметры будут различаться в зависимости от темы, которую вы используете.

**Смотрите также:**

- [Настройка темы по умолчанию](../default-theme-config/README.md).

## Markdown

### markdown.lineNumbers

- Тип: `boolean`
- По умолчанию: `undefined`

Показывать ли номера строк слева от каждого блока с кодом.

**Смотрите также:**

- [Номера строк](../guide/markdown.md#номера-строк)

### markdown.slugify

- Тип: `Function`
- По умолчанию: [source](https://github.com/vuejs/vuepress/blob/0.x/lib/markdown/slugify.js)

Функция для преобразования заголовков в символьный код. Влияет на идентификаторы/ссылки, сгенерированные для якорей заголовков, оглавления и ссылки на боковой панели.

### markdown.externalLinks

- Тип: `Object`
- По умолчанию: `{ target: '_blank', rel: 'noopener noreferrer' }`

Состоит из пары ключ-значение, будет добавлен в теги `<a>`, для всех внешних ссылок. Опция по умолчанию откроет внешние ссылки в новом окне.

### markdown.anchor

- Тип: `Object`
- По умолчанию: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

Параметры для [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor). (Примечание: рекомендуется использовать `markdown.slugify`, если вы хотите настроить символьные коды заголовков)

### markdown.toc

- Тип: `Object`
- По умолчанию: `{ includeLevel: [2, 3] }`

Параметры для [markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents). (Примечание: рекомендуется использовать `markdown.slugify`, если вы хотите настроить символьные коды заголовков)

### markdown.config

- Тип: `Function`
- По умолчанию: `undefined`

Функция для изменения конфигурации по умолчанию или применения дополнительных плагинов к экземпляру [markdown-it](https://github.com/markdown-it/markdown-it), используемому для отображения исходных файлов. Пример:

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

## Сборка Pipeline

:::tip Настройка CSS препроцессоров
VuePress имеет готовую конфигурацию webpack для перечисленных ниже препроцессоров CSS. Для получения дополнительной информации смотрите [Использование препроцессоров](../guide/using-vue.md#испоnьзование-препроцессоров).
:::

### postcss

- Тип: `Object`
- По умолчанию: `{ plugins: [require('autoprefixer')] }`

Опции [postcss-loader](https://github.com/postcss/postcss-loader). Обратите внимание, что при указании этого значения `autoprefixer` будет перезаписан, вам нужно будет добавить его самостоятельно.

### stylus

- Тип: `Object`
- По умолчанию: `{ preferPathResolver: 'webpack' }`

Параметры [stylus-loader](https://github.com/shama/stylus-loader).

### scss

- Тип: `Object`
- По умолчанию: `{}`

Опции [sass-loader](https://github.com/webpack-contrib/sass-loader) для обработки `*.scss` файлов.

### sass

- Тип: `Object`
- По умолчанию: `{ indentedSyntax: true }`

Опции [sass-loader](https://github.com/webpack-contrib/sass-loader) для обработки `*.sass` файлов.

### less

- Тип: `Object`
- По умолчанию: `{}`

Опции [less-loader](https://github.com/webpack-contrib/less-loader) для обработки `*.less` файлов.

### configureWebpack

- Тип: `Object | Function`
- По умолчанию: `undefined`

Изменение внутренних настроек webpack. Если значением является объект, он будет объединен с помощью [webpack-merge](https://github.com/survivejs/webpack-merge). Если значение является функцией, оно получит текущие настройки в качестве 1-го аргумента и флаг `isServer` в качестве 2-го аргумента. Вы можете изменить настройки напрямую, либо вернуть объект для слияния:

``` js
module.exports = {
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // мутировать конфиг для клиента
    }
  }
}
```

### chainWebpack

- Тип: `Function`
- По умолчанию: `undefined`

Изменение внутренних настроек webpack с помощью [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

``` js
module.exports = {
  chainWebpack: (config, isServer) => {
    // config является экземпляром ChainableConfig
  }
}
```

## Совместимость браузеров

### evergreen

- Тип: `boolean`
- По умолчанию: `false`

Установите значение `true`, если вы хотите поддерживать только актуальные браузеры. Это отключит предварительную обработку в ES5 и добавление polyfills для IE, что приведет к более быстрой сборке и уменьшению размера файлов.
