---
sidebar: auto
---

# 插件

插件通常会为 VuePress 添加全局功能。插件的范围没有限制——一般有下面几种：

1. 拓展在编译期生成的数据，如：[@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated).
2. 在编译前后生成额外的文件，如：[@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa)
3. 增加额外的页面，如：[@vuepress/plugin-i18n-ui](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-i18n-ui)
4. 注入全局的 UI, 如：[@vuepress/plugin-back-to-top](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-back-to-top).

## 开发插件

一个插件应该导出一个普通的 JavaScript 对象（`#1`），如果插件需要接受配置选项，那么它可以是一个返回对象的函数（`#2`），这个函数接受插件的配置选项为第一个参数、包含编译期上下文的 [ctx](#ctx) 对象作为第二个参数。

``` js
// #1
module.exports = {
   // ...
}
```

``` js
// #2
module.exports = (options, ctx) => {
   return {
      // ...
   }
}
```

::: tip
一个 VuePress 插件应该是一个 `CommonJS 模块`，因为 VuePress 插件运行在 Node 端。
:::

## 使用插件

你可以通过在 `.vuepress/config.js` 中做一些配置来使用插件：

``` js
module.exports = {
  plugins: [
    require('./my-plugin.js')
  ]
}
```

### 使用来自依赖的插件

一个插件可以在以 `vuepress-plugin-xxx` 的形式发布到 npm，你可以这样使用它：

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xx' ]
}
```

### 插件的缩写

如果你的插件名以 `vuepress-plugin-` 开头，你可以使用缩写来省略这个前缀：

``` js
module.exports = {
  plugins: [ 'xxx' ]
}
```

和下面等价：

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xxx' ]
}
```

这也适用于 [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
module.exports = {
  plugins: [ '@org/vuepress-plugin-xxx', '@vuepress/plugin-xxx' ]
}
```

等价于:

``` js
module.exports = {
  plugins: [ '@org/xxx', '@vuepress/xxx' ]
}
```

::: warning 注意
以 `@vuepress/plugin-` 开头的插件是官方维护的插件。
:::

### 插件的选项

#### Babel 式

插件可以通过在配置内的数组中封装名称和选项对象来指定选项：

``` js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-xxx',
      { /* options */ }
    ]
  ]
}
```

由于这种风格和 [babeld Plugin/Preset Options](https://babeljs.io/docs/en/plugins#plugin-preset-options) 一直，我们称之为"Babel 风格"。

#### 对象式

VuePress 也提供了一种更简单的方式来使用来自依赖的插件：

``` js
module.exports = {
  plugins: {
    'xxx': { /* options */ }
  }
}
```

::: warning 注意
可以通过显示地将选项设置成 `false` 来禁用一个插件：

- Babel 风格

``` js
module.exports = {
  plugins: [
    [ 'xxx', false ] // disabled.
  ]
}
```

- 对象风格

``` js
module.exports = {
  plugins: {
    'xxx': false // disabled.
  }
}
```

:::

## 生命周期

### ready

- 类型: `AsyncFunction`
- 作用域：`dev|build`

```js
module.exports = {
  async ready() {
    // ...
  }
}
```

::: tip 提示

`ready` 钩子在应用初始化之后，并在某些特定的函数式 API 执行之前执行。这些函数式 API 包括：

- clientDynamicModules
- enhanceAppFiles

:::

### updated

- 类型: `Function`
- 作用域：`dev`

```js
module.exports = {
  updated() {
    // ...
  }
}
```

### generated

- 类型: `AsyncFunction`
- 作用域：`build`

```js
module.exports = {
  async generated() {
    // ...
  }
}
```

## API

### name

- 类型: `string`
- 默认值: undefined

插件的名字。

在内部，VuePress 将会使用插件的包名作为插件的名称。当你你插件是一个本地插件（即直接使用了一个纯函数）时，请确保设定了该选项，这对调试更有利。

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      (pluginOptions, ctx) => ({
        name: 'my-xxx-plugin'
        // ... the rest of options
      })
    ]
  ]
}
```

### plugins

- 类型: `array`
- 默认值: undefined

一个插件可以像 preset 一样包含多个插件。

```js
// 一个插件
module.exports = {
  plugins: [
    'tag',
    'category'
  ]
}
```

### enabled

- 类型: `boolean`
- 默认值: true'

是否激活插件。例子：如果你想让你的插件只在开发环境有效：

```js
module.exports = (options, ctx) => {
  return {
    enabled: !ctx.isProd
  }
}
```

### chainWebpack

- 类型: `Function`
- 默认值: undefined

使用 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 来修改内部的 webpack 配置：

```js
module.exports = {
  chainWebpack (config, isServer) {
    // config 是一个 ChainableConfig 的实例
  }
}
```

::: tip 提示
由于 VuePress 是一个基于 Vue-SSR 的应用，这里会有两个 webpack 配置，`isServer` 用于决定当前的 webpack 配置是应用到 server 还是 client。

**参考:**

- [Vue SSR > 构建配置](https://ssr.vuejs.org/zh/guide/build-config.html)
:::

### define

- 类型: `Object|Function`
- 默认值: undefined

由于通过 [chainWebpack](#chainwebpack) 使用 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) 会有点麻烦：

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

VuePress 特别开辟了一个更简洁的 `define` 选项。值得注意的是这些值已自动地被 `JSON.stringify` 处理。

- 对象式:

```js
module.exports = {
  define: {
    SW_BASE_URL: '/',
  }
}
```

- 函数式:

```js
module.exports = (options, ctx) => ({
  define () {
    return {
      SW_BASE_URL: ctx.base || '/',
      SW_ENABLED: !!options.enabled,
    }
  }
})
```

### alias

- 类型: `Object|Function`
- 默认值: undefined

我们可以通过 [chainWebpack](#chainwebpack) 来配置别名：

```js
module.exports = (options, ctx) => ({
  chainWebpack (config) {
    config.resolve.alias.set('@theme', ctx.themePath)
  }
})
```

`alias` 可以使这个流程更像配置：

```js
module.exports = (options, ctx) => ({
  alias: {
    '@theme': ctx.themePath
  }
})
```

### enhanceDevServer

- 类型: `Function`
- 默认值: undefined

拓展 devServer 下层的 [Koa](https://github.com/koajs/koa) app：

``` js
module.exports = {
  enhanceDevServer (app) {
    // ...
  }
}
```

一个简单的创建子 public 目录的插件如下：

```js
const path = require('path')

module.exports = (options, ctx) => {
  const imagesAssetsPath = path.resolve(ctx.sourceDir, '.vuepress/images')

  return {
      // For development
      enhanceDevServer (app) {
        const mount = require('koa-mount')
        const serveStatic = require('koa-static')
        app.use(mount(path.join(ctx.base, 'images'), serveStatic(imagesAssetsPath)))
      },

      // For production
      async generated () {
        const { fs } = require('@vuepress/shared-utils')
        await fs.copy(imagesAssetsPath, path.resolve(ctx.outDir, 'images'))
      }
  }
}
```

### extendMarkdown

- 类型: `Function`
- 默认值: `undefined`

一个函数，修改内部用于渲染 markdown 文件的 [markdown-it](https://github.com/markdown-it/markdown-it) 实例的配置、或者应用一些额外的插件：

```js
module.exports = {
  extendMarkdown: md => {
    md.set({ breaks: true })
    md.use(require('markdown-it-xxx'))
  }
}
```

### chainMarkdown

- 类型: `Function`
- 默认值: `undefined`

使用 [markdown-it-chain](https://github.com/ulivz/markdown-it-chain) 来修改内部的 markdown 配置。

```js
module.exports = {
  chainMarkdown (config) {
    // 与 new MarkdownIt 的 'options' 互动
    // 参考: https://markdown-it.github.io/markdown-it/#MarkdownIt.new
    config
      .options
        .link(true)
        .breaks(true)

    // 修改内置插件的参数
    config
      .plugin('anchor')
        .tap(([options]) => [
          Object.assign(options, { permalinkSymbol: '#' })
        ])

    // 增加额外的插件
    config
      .plugin('sup')
        .use(require('markdown-it-sup'))

    // Remove internal plugin
    config.plugins.delete('snippet')
  }
}
```

**参考:**

- [VuePress 的内置 markdown-it 插件](https://github.com/vuejs/vuepress/blob/next/packages/%40vuepress/core/lib/markdown/index.js)
- [配置插件](https://github.com/neutrinojs/webpack-chain#config-plugins)

### enhanceAppFiles

- 类型: `Array|AsyncFunction`
- 默认值: `undefined`

这个选项接受一个包含文件的数组，或者一个返回该数组的函数。你可以通过此选项做一些[应用级别的配置](../guide/basic-config.md#应用级别的配置)。

``` js
module.exports = {
  enhanceAppFiles: [
    path.resolve(__dirname, 'client.js')
  ]
}
```

值得提及的是，为了让插件开发者能够在编译器做更多的事情，`enhanceAppFiles` 也支持动态的代码：

```js
module.exports = (option, ctx) => {
  return {
    enhanceAppFiles: [{
      name: 'dynamic-code',
      content: `export default ({ Vue }) => { Vue.mixin('$source', '${context.sourceDir}') }`
    }]
  }
}
```

### clientDynamicModules

- 类型: `Function`
- 默认值: `undefined`

有时，你可能想要在编译期间生成一些在客户端使用的模块：

```js
module.exports = (options, ctx) => ({
  clientDynamicModules() {
    return {
      name: 'constans.js',
      content: `export const SOURCE_DIR = '${context.sourceDir}'`
    }
  }
})
```

然后你可以在客户端这样使用你的模块：

``` js
import { SOURCE_DIR } from '@dynamic/constans'
```

### extendPageData

- 类型: `Function`
- 默认值: `undefined`

一个函数，用于拓展或者修改 [$page](../miscellaneous/global-computed.md#page) 对象。这个函数将会在编译器为每个页面执行一次。

```js
module.exports = {
  extendPageData ($page) {
    const {
      _filePath,           // file's absolute path
      _computed,           // access the client global computed mixins at build time, e.g _computed.$localePath.
      _content,            // file's raw content string
      _strippedContent,    // file's content string without frontmatter
      key,                 // page's unique hash key
      frontmatter,         // page's frontmatter object
      regularPath,         // current page's default link (follow the file hierarchy)
      path,                // current page's permalink
    } = $page
   
    // 1. Add extra fields.
    page.xxx = 'xxx'
    
    // 2. Change frontmatter.
    frontmatter.sidebar = 'auto'
  }
}
```

::: warning Note
These fields starting with an `_` means you can only access them during build time.
:::

e.g.

``` js
module.exports = {
  extendPageData ($page) {
    $page.size = ($page.content.length / 1024).toFixed(2) + 'kb'
  }
}
```

Then you can use this value via `this.$page.size` in any Vue component.

### clientRootMixin

- Type: `String`
- Default: `undefined`

A path to the mixin file which allow you to control the life cycle of root component.

``` js
// plugin's entry
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

### additionalPages

- Type: `Array|Function`
- Default: `undefined`

Add a page pointing to a markdown file:

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

Add a page with explicit content:

```js
module.exports = {
  async additionalPages () {
    const rp = require('request-promise');

    // VuePress doesn't have request library built-in
    // you need to install it yourself.
    const content = await rp('https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md');
    return [
      {
        path: '/readme/',
        content
      }
    ]
  }
}
```

Add a pure route:

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

### globalUIComponents

- Type: `Array|String`
- Default: `undefined`

You might want to inject some global UI fixed somewhere on the page, e.g. `back-to-top`, `popup`. In VuePress, **a global UI is a Vue component**, you can directly define the component's name(s) in this option, e.g.

``` js
module.exports = {
  globalUIComponents: [
    'Component-1',
    'Component-2'
  ]
}
```

Then, VuePress will automatically inject these components behind the layout component:

```html
<div id="app">
  <div class="theme-container"> ... </div> <!-- Layout Component -->
  <div class="global-ui">
    <Component-1/>
    <Component-2/>
</div>
</div>
```

## ctx

Starting with VuePress 1.x.x, VuePress provides an `AppContext` object that stores all the state of the current app and can be accessed through the plugin API.

::: warning Note
Context of each plugin is a isolated context, they just inherit from the same app context.
:::

```js
module.exports = (options, ctx) => {
  // ...
}
```

### ctx.isProd

- Type: `boolean`

Whether vuepress run in production environment mode.

### ctx.sourceDir

- Type: `string`

Root directory where the documents are located.

### ctx.tempPath

- Type: `string`

Root directory where the temporary files are located.

### ctx.outDir

- Type: `string`

Output path.

### ctx.themePath

- Type: `string`

The path of the currently active theme.

### ctx.base

- Type: `string`

See: [base](../config/README.md#base).

### ctx.writeTemp

- Type: `Function`

A utility for writing temporary files to tempPath.
