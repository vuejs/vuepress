---
en: 060bfda810e10cc6e8bce08a2b0faf1ec7ecde23
lang: ru-RU
sidebarDepth: 3
sidebar: auto
---

# Настройка

<Bit/>

## Базовые настройки

### base

- Тип: `string`
- По умолчанию: `/`

Базовый URL, по которому будет развернут сайт. Вам нужно будет установить это значение, если вы планируете развернуть свой сайт в подпапку, например, на GitHub Pages. Если вы планируете развернуть свой сайт в `https://foo.github.io/bar/`, то для `base` должно быть установлено значение `"/bar/"`. Он всегда должен начинаться и заканчиваться косой чертой.

`base` автоматически добавляется ко всем URL-адресам, начинающимся с `/` в других параметрах, поэтому вам нужно указать его только один раз.

**Также смотрите:**

- [Базовый URL](../guide/assets.md#базовый-url)
- [Руководство по развертыванию > GitHub Pages](../guide/deploy.md#github-pages)

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

Дополнительные теги для вставки на страницу HTML `<head>`. Каждый тег может быть указан в виде `[tagName, {attrName: attrValue}, innerHTML?]`. Пример, чтобы добавить пользовательский favicon:

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

Укажите хост, который будет использоваться для сервера разработки.

### port

- Тип: `number`
- По умолчанию: `8080`

Укажите порт, который будет использоваться для сервера разработки.

### temp

- Тип: `string`
- По умолчанию: `/path/to/@vuepress/core/.temp`


Укажите временный каталог для клиента.

### dest

- Тип: `string`
- По умолчанию: `.vuepress/dist`

Укажите выходной каталог для `vuepress build`. If a relative path is specified, it will be resolved based on `process.cwd()`.

### locales

- Тип: `{ [path: string]: Object }`
- По умолчанию: `undefined`

Укажите языки для поддержки i18n. Подробнее смотрите в руководстве по [Интернационализации](../guide/i18n.md).

### shouldPrefetch

- Тип: `Function`
- По умолчанию: `() => true`

Функция для управления тем, какие файлы должны генерировать подсказки ресурса `<link rel="preload">`. Смотрите [ShouldPrefetch](https://ssr.vuejs.org/api/#shouldprefetch).

### cache

- Тип: `boolean|string`
- По умолчанию: `true`

VuePress по умолчанию использует [cache-loader](https://github.com/webpack-contrib/cache-loader), чтобы значительно ускорить компиляцию веб-пакета.

Эта опция может быть использована для указания пути к кэшу, а также может удалить кэш перед каждой сборкой, установите для этого значение `false`

::: tip
Эта опция также может быть использована через CLI:

```bash
vuepress dev docs --cache .cache # устанавливает путь к кэшу
vuepress dev docs --no-cache     # удаляет кэш перед каждой сборкой.
```
:::

### extraWatchFiles

- Тип: `Array`
- По умолчанию: `[]`

Укажите дополнительные файлы для просмотра.

Вы можете посмотреть любой файл, если хотите. Изменения в файлах приведут к перестройке `vuepress` и обновлению в реальном времени.

``` js
module.exports = {
  extraWatchFiles: [
    '.vuepress/foo.js', // Использование относительного пути
    '/path/to/bar.js'   // Использование абсолютного пути
  ]
}
```

## Дизайн

### palette.styl

Если вы хотите применить простые изменения цвета к стилю [пресета по умолчанию](https://github.com/vuejs/vuepress/blob/master/packages/@vuepress/core/lib/app/style/config.styl ) или определить некоторые цветовые переменные для последующего использования, вы можете создать файл `.vuepress/styles/palette.styl`.

Есть несколько цветовых переменных, которые вы можете настроить:

``` stylus
// Значения по умолчанию
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```

::: danger Заметка
Вы должны писать ТОЛЬКО переменные цвета в этом файле, поскольку `palette.styl` будет импортирован в конец корневого конфигурационного файла stylus, он будет использоваться несколькими файлами, поэтому после того, как вы напишете здесь стили, ваш стиль будет дублироваться несколько раз.
:::

### index.styl

VuePress предоставляет удобный способ добавления дополнительных стилей. Для этого вы можете создать файл `.vuepress/styles/index.styl`. Это файл [Stylus](http://stylus-lang.com/), но вы также можете использовать обычный синтаксис CSS.

```stylus
.content {
  font-size 30px
}
```

**Смотрите также:**

- [Почему `palette.styl` и `index.styl` не могут быть объединены в один API?](../faq/README.md#почему-palette-styl-и-index-styl-не-могут-быть-объединены-в-один-API)

## Темы

### theme

- Тип: `string`
- По умолчанию: `undefined`

Укажите это, чтобы использовать пользовательскую тему. При значении `"foo"` VuePress попытается загрузить компонент темы из `node_modules/vuepress-theme-foo/Layout.vue`.

### themeConfig

- Тип: `Object`
- По умолчанию: `{}`

Укажите параметры конфигурации для используемой темы. Параметры будут различаться в зависимости от темы, которую вы используете.

**Также смотрите:**

- [Конфигурация темы по умолчанию](../theme/default-theme-config.md).

## Плагины

### plugins

- Тип: `Object|Array`
- По умолчанию: `undefined`

Пожалуйста, обратитесь к [Плагины > Использование плагинов](../plugin/using-a-plugin.md), чтобы узнать, как использовать плагины.

## Markdown

### markdown.lineNumbers

- Тип: `boolean`
- По умолчанию: `undefined`

Показывать ли номера строк слева от каждого блока кода.

**Также смотрите:**

- [Номера строк](../guide/markdown.md#номера-строк)

### markdown.slugify

- Тип: `Function`
- По умолчанию: [source](https://github.com/vuejs/vuepress/blob/0.x/lib/markdown/slugify.js)

Функция для преобразования текстов заголовков в слаги. Влияет на идентификаторы/ссылки, сгенерированные для якорей заголовков, оглавления и ссылки на боковой панели.

### markdown.anchor

- Тип: `Object`
- По умолчанию: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

Параметры для [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor). (Примечание: рекомендуется использовать `markdown.slugify`, если вы хотите настроить идентификаторы заголовков.)

### markdown.externalLinks

- Тип: `Object`
- По умолчанию: `{ target: '_blank', rel: 'noopener noreferrer' }`

Пара ключ-значение будет добавлена в теги `<a>`, указывающие на внешнюю ссылку. Опция по умолчанию откроет внешние ссылки в новом окне.

### markdown.toc

- Тип: `Object`
- По умолчанию: `{ includeLevel: [2, 3] }`

Параметры для [markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents). (Примечание: рекомендуется использовать `markdown.slugify`, если вы хотите настроить идентификаторы заголовков.)

### markdown.plugins

Вы можете установить любые плагины markdown-it с помощью опции `markdown.plugins`. Это похоже на [использование плагинов VuePress](../plugin/using-a-plugin.m). Вы можете использовать стиль Babel или стиль объекта. Префикс `markdown-it-` является необязательным и может отсутствовать в списке.

``` js
module.exports = {
  markdown: {
    plugins: [
      '@org/foo', // равно @org/markdown-it-foo, если существует
      ['markdown-it-bar', {
        // предоставьте опции здесь
      }]
    ]
  }
}
```

иои

``` js
module.exports = {
  markdown: {
    plugins: {
      '@org/foo': {}
      'markdown-it-bar': {
        // предоставьте опции здесь
      }
    }
  }
}
```

### markdown.extendMarkdown

- Тип: `Function`
- По умолчанию: `undefined`

Функция для изменения конфигурации по умолчанию или применения дополнительных плагинов к экземпляру [markdown-it](https://github.com/markdown-it/markdown-it), используемому для визуализации исходных файлов. например

``` js
module.exports = {
  markdown: {
    extendMarkdown: md => {
      md.set({ breaks: true })
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

::: tip
Эта опция также включена в [Plugin API](../plugin/option-api.md#extendmarkdown).
:::

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
VuePress поставляется со встроенным webpack для перечисленных ниже препроцессоров CSS. Для получения дополнительной информации об установке этих или препроцессоров без встроенной поддержки смотрите [Использование препроцессоров](../guide/using-vue.md#испоnьзование-препроцессоров) для получения дополнительной информации.
:::

### postcss

- Тип: `Object`
- По умолчанию: `{ plugins: [require('autoprefixer')] }`

Параметры для [postcss-loader](https://github.com/postcss/postcss-loader). Обратите внимание, что при указании этого значения автоматический префикс будет перезаписан, и вам нужно будет включить его самостоятельно.

### stylus

- Тип: `Object`
- По умолчанию: `{ preferPathResolver: 'webpack' }`

Опции для [stylus-loader](https://github.com/shama/stylus-loader).

### scss

- Тип: `Object`
- По умолчанию: `{}`

Опции для [sass-loader](https://github.com/webpack-contrib/sass-loader) для загрузки `*.scss` файлов.

### sass

- Тип: `Object`
- По умолчанию: `{ indentedSyntax: true }`

Опции для [sass-loader](https://github.com/webpack-contrib/sass-loader) для загрузки `*.sass` файлов.

### less

- Тип: `Object`
- По умолчанию: `{}`

Опции для [less-loader](https://github.com/webpack-contrib/less-loader).

### configureWebpack

- Тип: `Object | Function`
- По умолчанию: `undefined`

Измените внутренний конфиг webpack. Если значением является Object, оно будет объединено в окончательную конфигурацию с помощью [webpack-merge](https://github.com/survivejs/webpack-merge); Если значение является функцией, оно получит конфигурацию в качестве 1-го аргумента и флаг `isServer` в качестве 2-го аргумента. Вы можете либо изменить конфигурацию напрямую, либо вернуть объект для слияния:

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

Измените внутреннюю конфигурацию веб-пакета с помощью [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

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

Установите значение `true`, если вы ориентируетесь только на вечнозеленые браузеры. Это отключит перенос ES5 и полизаполнения для IE, что приведет к более быстрой сборке и уменьшению размера файлов.
