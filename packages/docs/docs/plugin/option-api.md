# Option API

## name

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

## plugins

- Type: `array`
- Default: `undefined`

A plugin can contain multiple plugins like a preset.

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

## define

- Type: `Object|Function`
- Default: undefined

Since using [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) via [chainWebpack](#chainwebpack) would be a little complicated:

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

## alias

- Type: `Object|Function`
- Default: undefined

We can set aliases via [chainWebpack](#chainwebpack):

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

## enhanceDevServer

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

## extendMarkdown

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

## chainMarkdown

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

## enhanceAppFiles

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
module.exports = (option, ctx) => {
  return {
    enhanceAppFiles: [{
      name: 'dynamic-code',
      content: `export default ({ Vue }) => { Vue.mixin('$source', '${context.sourceDir}') }`
    }]
  }
}
```

## clientDynamicModules

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

## extendPageData

- Type: `Function`
- Default: `undefined`

A function used to extend or modify the [$page](../miscellaneous/global-computed.md#page) object. This function will be invoking once for each page at compile time.

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
      path,                // current page's real link (use regularPath when permalink does not exist)
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

## clientRootMixin

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

## additionalPages

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

## globalUIComponents

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
