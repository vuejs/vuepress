---
en: 2b6d17fd210075c5226f558e3243ecacaf0c115d
lang: ru-RU
---

# Опции API

## name

- Тип: `string`
- По умолчанию: undefined

Название плагина.

Внутренне vuepress будет использовать имя пакета плагина в качестве имени плагина. Если ваш плагин является локальным плагином (то есть напрямую использует функцию чистого плагина), обязательно настройте эту опцию, которая подходит для отслеживания отладки.

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      (pluginOptions, context) => ({
        name: 'my-xxx-plugin'
        // ... остальные параметры
      })
    ]
  ]
}
```

## plugins

- Тип: `array`
- По умолчанию: `undefined`

Плагин может содержать несколько плагинов, как пресет.

```js
// A plugin
module.exports = {
  plugins: [
    'tag',
    'category'
  ]
}
```

## chainWebpack

- Тип: `Function`
- По умолчанию: undefined

Измените внутреннюю конфигурацию webpack с помощью [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

```js
module.exports = {
  chainWebpack (config, isServer) {
    // config является экземпляром ChainableConfig
  }
}
```

::: tip
Поскольку VuePress является приложением на основе Vue-SSR, будет две конфигурации веб-пакетов, `isServer` используется для определения того, применяется ли текущая конфигурация webpack к серверу или клиенту.

**Смотрите также:**

- [Vue SSR > Конфигурация сборки](https://ssr.vuejs.org/guide/build-config.html)
:::

## define

- Тип: `Object|Function`
- По умолчанию: undefined

Поскольку использование [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) с помощью [chainWebpack](#chainwebpack) будет немного сложным:

```js
module.exports = {
  chainWebpack (config) {
    config.plugin('injections').tap(([options]) => [
      Object.assign(options, {
        SW_BASE_URL: JSON.stringify('/')
      })
    ])
  }
}
```

VuePress специально открыл более краткую опцию `define`, обратите внимание, что значения были автоматически обработаны `JSON.stringify`.

- Использование объекта:

```js
module.exports = {
  define: {
    SW_BASE_URL: '/',
  }
}
```

- Использование функции:

```js
module.exports = (options, context) => ({
  define () {
    return {
      SW_BASE_URL: context.base || '/',
      SW_ENABLED: !!options.enabled,
    }
  }
})
```

## alias

- Тип: `Object|Function`
- По умолчанию: undefined

Мы можем установить псевдонимы через [chainWebpack](#chainwebpack):

```js
module.exports = (options, context) => ({
  chainWebpack (config) {
    config.resolve.alias.set('@pwd', process.cwd())
  }
})
```

Но опция `alias` делает этот процесс более похожим на конфигурацию:

```js
module.exports = (options, context) => ({
  alias: {
    '@pwd': process.cwd()
  }
})
```

## beforeDevServer

- Тип: `Function`
- По умолчанию: undefined

Эквивалентно [before](https://webpack.js.org/configuration/dev-server/#devserver-before) в [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Вы можете использовать его для определения пользовательских обработчиков перед выполнением всего промежуточного программного обеспечения:

```js
module.exports = {
  // ...
  beforeDevServer(app, server) {
    app.get('/path/to/your/custom', function(req, res) {
      res.json({ custom: 'response' })
    })
  }
}
```

## afterDevServer

- Тип: `Function`
- По умолчанию: undefined

Эквивалентно [after](https://webpack.js.org/configuration/dev-server/#devserver-after) в [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Вы можете использовать его для запуска пользовательского промежуточного программного обеспечения после всего другого промежуточного программного обеспечения:

```js
module.exports = {
  // ...
  afterDevServer(app, server) {
    // взламываем сейчас ...
  }
}
```

## extendMarkdown

- Тип: `Function`
- По умолчанию: `undefined`

Функция для изменения конфигурации по умолчанию или применения дополнительных плагинов к экземпляру [markdown-it](https://github.com/markdown-it/markdown-it), используемому для визуализации исходных файлов. Пример:

```js
module.exports = {
  extendMarkdown: md => {
    md.set({ breaks: true })
    md.use(require('markdown-it-xxx'))
  }
}
```

## chainMarkdown

- Тип: `Function`
- По умолчанию: `undefined`

Измените конфигурацию внутренней разметки с помощью [markdown-it-chain](https://github.com/ulivz/markdown-it-chain) - API цепочки, например [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain), но для [markdown-it](https://github.com/markdown-it/markdown-it).

```js
module.exports = {
  chainMarkdown (config) {
    // Взаимодействовуем с 'options' в новом MarkdownIt
    // Ссылка: https://markdown-it.github.io/markdown-it/#MarkdownIt.new
    config
      .options
        .link(true)
        .breaks(true)

    // Изменяем аргументы внутреннего плагина.
    config
      .plugin('anchor')
        .tap(([options]) => [
          Object.assign(options, { permalinkSymbol: '#' })
        ])

    // Добавляем дополнительный плагин markdown-it
    config
      .plugin('sup')
        .use(require('markdown-it-sup'))

    // Удаляем внутренний плагин
    config.plugins.delete('snippet')
  }
}
```

**Смотрите также:**

- [Внутренние markdown-it плагины в VuePress](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown/index.js)
- [Настройка плагинов](https://github.com/neutrinojs/webpack-chain#config-plugins)

## enhanceAppFiles

- Тип: `String | Array | AsyncFunction`
- По умолчанию: `undefined`

Эта опция принимает абсолютные пути к файлам, указывающие на файлы расширений, или функцию, которая возвращает пути, которая позволяет вам выполнять некоторые [Улучшения на уровне приложения](../guide/basic-config.md#app-level-enhancements)

``` js
import { resolve } from 'path'

module.exports = {
  enhanceAppFiles: resolve(__dirname, 'client.js')
}
```

Эта опция также поддерживает динамический код, который позволяет вам делать больше вещей с возможностью касаться контекста компиляции:

```js
module.exports = (option, context) => {
  return {
    enhanceAppFiles() {
      return {
         name: 'dynamic-code',
         content: `export default ({ Vue }) => { Vue.mixin('$source', '${
           context.sourceDir
         }') }`
       }
    }
  }
}
```

## clientDynamicModules

- Тип: `Function`
- По умолчанию: `undefined`

Иногда вы можете захотеть сгенерировать некоторые клиентские модули во время компиляции.

```js
module.exports = (options, context) => ({
  clientDynamicModules() {
    return {
      name: 'constants.js',
      content: `export const SOURCE_DIR = '${context.sourceDir}'`
    }
  }
})
```

Затем вы можете использовать этот модуль в коде на стороне клиента:

``` js
import { SOURCE_DIR } from '@dynamic/constants'
```

## extendPageData

- Тип: `Function`
- По умолчанию: `undefined`

Функция, используемая для расширения или изменения объекта [$page](../guide/global-computed.md#page). Эта функция будет вызываться один раз для каждой страницы во время компиляции.

```js
module.exports = {
  extendPageData ($page) {
    const {
      _filePath,           // абсолютный путь к файлу
      _computed,           // получить доступ к глобальным вычисляемым миксинам клиента во время сборки, например, _computed.$localePath.
      _content,            // строка необработанного содержимого файла
      _strippedContent,    // строка содержимого файла без frontmatter
      key,                 // уникальный хэш-ключ страницы
      frontmatter,         // объект frontmatter страницы
      regularPath,         // ссылка по умолчанию для текущей страницы (следует иерархии файлов)
      path,                // реальная ссылка текущей страницы (используется регулярный путь, если постоянная ссылка не существует)
    } = $page

    // 1. Добавляем дополнительные поля.
    $page.xxx = 'xxx'

    // 2. Изменяем frontmatter.
    frontmatter.sidebar = 'auto'
  }
}
```

::: warning Заметка
Поля, начинающиеся с `_`, означают, что вы можете получить к ним доступ только во время сборки.
:::

например:

``` js
module.exports = {
  extendPageData ($page) {
    $page.size = ($page._content.length / 1024).toFixed(2) + 'kb'
  }
}
```

Затем вы можете использовать это значение через `this.$page.size` в любом компоненте Vue.

## clientRootMixin

- Тип: `String`
- По умолчанию: `undefined`

Путь к файлу mixin, который позволяет вам контролировать жизненный цикл корневого компонента.

``` js
// точка входа плагина
const path = require('path')

module.exports = {
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
}
```

``` js
// mixin.js
export default {
  created () {},
  mounted () {}
}
```

## additionalPages

- Тип: `Array|AsyncFunction`
- По умолчанию: `undefined`

Добавляет страницу, указывающую на файл Markdown:

```js
const path = require('path')

module.exports = {
  additionalPages: [
    {
     path: '/readme/',
     filePath: path.resolve(__dirname, '../../README.md')
    }
  ]
}
```

Добавляет страницу с явным содержанием:

```js
module.exports = {
  async additionalPages () {
    // Обратите внимание, что VuePress не имеет встроенной библиотеки запросов
    // Вам нужно установить его самостоятельно.
    const rp = require('request-promise')
    const content = await rp('https://raw.githubusercontent.com/vuejs/vuepress/master/CHANGELOG.md')
    return [
      {
        path: '/changelog/',
        content
      }
    ]
  }
}
```

Добавьте чистый маршрут:

```js
module.exports = {
  additionalPages: [
    {
       path: '/alpha/',
       frontmatter: {
          layout: 'MyLayout'
       }
    }
  ]
}
```

## globalUIComponents

- Тип: `Array|String`
- По умолчанию: `undefined`

Возможно, вы захотите добавить какой-нибудь глобальный пользовательский интерфейс, зафиксированный где-то на странице, например, `back-to-top`, `popup`. В VuePress **глобальный пользовательский интерфейс является компонентом Vue**, в этом параметре вы можете напрямую определить имя компонента, например,

``` js
module.exports = {
  globalUIComponents: [
    'Component-1',
    'Component-2'
  ]
}
```

Затем VuePress автоматически внедрит эти компоненты за компонентом макета:

```html
<div id="app">
  <div class="theme-container"> ... </div> <!-- Компонент макета -->
  <div class="global-ui">
    <Component-1/>
    <Component-2/>
  </div>
</div>
```

## extendCli

- Тип: `function`
- По умолчанию: `undefined`

Зарегистрируйте дополнительную команду для улучшения CLI vuepress. Функция будет вызываться с экземпляром [CAC](https://github.com/cacjs/cac) в качестве первого аргумента.

```js
module.exports = {
  extendCli (cli) {
    cli
      .command('info [targetDir]', '')
      .option('--debug', 'отображает информацию в режиме отладки')
      .action((dir = '.') => {
        console.log('Показать информацию о вашем сайте')
      })
  }
}
```

Теперь вы можете использовать `vuepress info [targetDir]` a в вашем проекте!

::: tip
Обратите внимание, что пользовательская команда, зарегистрированная плагином, требует, чтобы VuePress определял конфигурацию вашего сайта, например, `vuepress dev` и `vuepress build`, поэтому при разработке команды обязательно приведите пользователя к передаче `targetDir` в качестве аргумента CLI.
:::
