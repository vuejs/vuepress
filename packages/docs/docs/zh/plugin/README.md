---
sidebar: auto
---

# Plugins

> Translation are welcome!

## Writing a Plugin

Plugins usually add global-level functionality to VuePress. There is no strictly defined scope for a plugin - there are typically several types of plugins:

1. Extend the data generated at compile time. e.g. [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated).
2. Generate extra files before or after compilation. e.g. [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa)
3. Add extra pages. e.g. [@vuepress/plugin-i18n-ui](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-i18n-ui)
4. Inject global UI. e.g. [@vuepress/plugin-back-to-top](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-back-to-top).

A plugin should export a `plain object`(`#1`). If the plugin needs to take options, it can be a function that exports a plain object(`#2`). The function will be called with the plugin's options as the first argument, along with [context](#plugin-context) which provides some compile-time metadata.

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
A VuePress plugin module should leverage `CommonJS Module` because VuePress plugins runs on the Node side.
:::

## Using a plugin

You can use plugins by doing some configuration at `.vuepress/config.js`:

``` js
module.exports = {
  plugins: [
    require('./my-plugin.js')
  ]
}
```

### Use plugins from a dependency

A plugin can be published on npm in `CommonJS` format as `vuepress-plugin-xxx`. then you can use it:

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xx' ]
}
```

### Plugin Shorthand

If you prefix the plugin with `vuepress-plugin-`, you can use a shorthand to leave out that prefix:

``` js
module.exports = {
  plugins: [ 'xxx' ]
}
```

Same with:

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xxx' ]
}
```

This also works with [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
module.exports = {
  plugins: [ '@org/vuepress-plugin-xxx', '@vuepress/plugin-xxx' ]
}
```

Shorthand:

``` js
module.exports = {
  plugins: [ '@org/xxx', '@vuepress/xxx' ]
}
```

::: warning Note
The plugin whose name starts with `@vuepress/plugin-` is an officially maintained plugin.
:::

### Plugin options

#### Babel Style

Plugins can have options specified by wrapping the name and an options object in an array inside your config:

``` js
module.exports = {
  plugins: [
    [
      require('./my-plugin.js'),
      { /* options */ }
    ]
  ]
}
```

Since this style is consistent with [babel's Plugin/Preset Options](https://babeljs.io/docs/en/plugins#plugin-preset-options), we call it `Babel Style`.

#### Object Style

VuePress also provides a simpler way to use plugins from a dependency:

``` js
module.exports = {
  plugins: {
    'xxx': { /* options */ }
  }
}
```

::: warning Note
The plugin can be disabled when `false` is explicitly passed as option.

- Babel style

``` js
module.exports = {
  plugins: [
    [ 'xxx', false ] // disabled.
  ]
}
```

- Object style

``` js
module.exports = {
  plugins: {
    'xxx': false // disabled.
  }
}
```

:::

## Options

### name

- Type: `string`
- Default: undefined

The name of the plugin.

Internally, vuepress will use the plugin's package name as the plugin name. When your plugin is a local plugin (i.e. using a pure plugin function directly), please be sure to configure this option, that is good for debug tracking.

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

- Type: `array`
- Default: `undefined`

A plug-in can contain multiple plugins like a preset.


```js
// your plugin
module.exports = {
  plugins: [
    'tag',
    'category'
  ]
}
```

### enabled

- Type: `boolean`
- Default: true

Configure whether to enable this plugin. e.g. if you want to enable a plugin only in development mode:

```js
module.exports = (options, ctx) => {
  return {
    enabled: !ctx.isProd
  }
}
```

### chainWebpack

- Type: `Function`
- Default: undefined

Modify the internal webpack config with [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

```js
module.exports = {
  chainWebpack (config, isServer) {
    // config is an instance of ChainableConfig
  }
}
```

::: tip
Since VuePress is a Vue-SSR based application, there will be two webpack configurations, `isServer` is used to determine whether the current webpack config is applied to the server or client.

**Also see:**

- [Vue SSR > Build Configuration](https://ssr.vuejs.org/guide/build-config.html)
:::

### define

- Type: `Object|Function`
- Default: undefined

Since using [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) via [chainWebpack](chainwebpack) would be a little complicated:

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

VuePress specifically opened up a more concise `define` option, note that the values has been automatically processed by `JSON.stringify`.

- Object Usage:

```js
module.exports = {
  define: {
    SW_BASE_URL: '/',
  }
}
```

- Function Usage:

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

- Type: `Object|Function`
- Default: undefined

We can set aliases via [chainWebpack](chainwebpack):

```js
module.exports = (options, ctx) => ({
  chainWebpack (config) {
    config.resolve.alias.set('@theme', ctx.themePath)
  }
})
```

But `alias` option makes this process more like configuration:

```js
module.exports = (options, ctx) => ({
  alias: {
    '@theme': ctx.themePath
  }
})
```

### enhanceDevServer

- Type: `Function`
- Default: undefined

Enhance the underlying [Koa](https://github.com/koajs/koa) app.

``` js
module.exports = {
  enhanceDevServer (app) {
    // ...
  }
}
```

A simple plugin to create a sub public directory is as follows:

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

- Type: `Function`
- Default: `undefined`

A function to modify default config or apply additional plugins to the [markdown-it](https://github.com/markdown-it/markdown-it) instance used to render source files. Example:

```js
module.exports = {
  extendMarkdown: md => {
    md.set({ breaks: true })
    md.use(require('markdown-it-xxx'))
  }
}
```

### chainMarkdown

- Type: `Function`
- Default: `undefined`

Modify the internal markdown config with [markdown-it-chain](https://github.com/ulivz/markdown-it-chain) —— A chaining API like [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) but for [markdown-it](https://github.com/markdown-it/markdown-it).

```js
module.exports = {
  chainMarkdown (config) {
    // Interact with 'options' in new MarkdownIt
    // Ref: https://markdown-it.github.io/markdown-it/#MarkdownIt.new
    config
      .options
        .link(true)
        .breaks(true)

    // Modify the arguments of internal plugin.
    config
      .plugin('anchor')
        .tap(([options]) => [
          Object.assign(options, { permalinkSymbol: '#' })
        ])

    // Add extra markdown-it plugin
    config
      .plugin('sup')
        .add(require('markdown-it-sup'))

    // Remove internal plugin
    config.plugins.delete('snippet')
  }
}
```

**Also see:**

- [Internal plugins in VuePress](https://github.com/vuejs/vuepress/blob/next/packages/%40vuepress/core/lib/markdown/index.js)
- [Config plugins](https://github.com/neutrinojs/webpack-chain#config-plugins)

### enhanceAppFiles

- Type: `Array | AsyncFunction`
- Default: `undefined`

This option accepts an array containing the file paths, or a function that returns this array, which allows you to do some [App Level Enhancements](../guide/basic-config.md#theme-configuration).

``` js
module.exports = {
  enhanceAppFiles: [
    path.resolve(__dirname, 'client.js')
  ]
}
```

The file can `export default` a hook function which will work like `.vuepress/enhanceApp.js`, or any client side code snippets.

It's worth mentioning that in order for plugin developers to be able to do more things at compile time, this option also supports dynamic code:

```js
module.exports = (option, context) => {
  return {
    enhanceAppFiles: [{
      name: 'dynamic-code',
      content: `export default ({ Vue }) => { Vue.mixin('$source', '${context.sourceDir}') }`
    }]
  }
}
```

### clientDynamicModules

- Type: `Function`
- Default: `undefined`

Sometimes, you may want to generate some client modules at compile time.

```js
module.exports = (options, context) => ({
  clientDynamicModules() {
    return {
      name: 'constans.js',
      content: `export const SOURCE_DIR = '${context.sourceDir}'`
    }
  }
})
```

Then you can use this module at client side code by:

``` js
import { SOURCE_DIR } from '@dynamic/constans'
```

### extendPageData

- Type: `Function`
- Default: `undefined`

A function used to extend or modify the [$page](../miscellaneous/global-computed.md#page) object. This function will be invoking once for each page at compile time

```js
module.exports = {
  extendPageData ($page) {
    const {
      _filePath,           // file's absolute path
      _i18n,               // access the client global mixins at build time, e.g _i18n.$localePath.
      _content,            // file's raw content string
      _strippedContent,    // file's content string without frontmatter
      key,                 // page's unique hash key
      frontmatter,         // page's frontmatter object
      regularPath,         // current page's default link (follow the file hierarchy)
      path,                // current page's permalink
    } = $page
   
    // 1. Add extra files.
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

You might want to inject some global UI fixed somewhere on the page, e.g. `back-to-top`, `popup`. In VuePress, **a global UI is a Vue component**, you can define the component's name(s) in the plugin, e.g.

``` js
module.exports = {
  globalUIComponents: [
    'Component-1',
    'Component-2'
  ]
}
```

Then, VuePress will automatically inject these components behind the theme container:

```html
<div id="app">
  <div class="theme-container"> ... </div>
  <div class="global-ui">
    <Component-1/>
    <Component-2/>
</div>
</div>
```

## Context

Starting with VuePress 1.x.x, VuePress provides an `AppContext` object that stores all the state of the current app and can be accessed through the plugin API.

::: warning Note
Context of each plugin is a isolated context, they just inherit from the same app context.
:::

```js
module.exports = (options, context) => {
  // ...
}
```

### context.isProd

- Type: `boolean`

Whether vuepress run in production environment mode.

### context.sourceDir

- Type: `string`

Root directory where the documents are located.

### context.tempPath

- Type: `string`

Root directory where the temporary files are located.

### context.outDir

- Type: `string`

Output path.

### context.themePath

- Type: `string`

The path of the currently active theme.

### context.base

- Type: `string`

See: [base](../config/README.md#base).

### context.writeTemp

- Type: `Function`

A utility for writing temporary files to tempPath.
