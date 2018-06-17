---
sidebar: auto
---

# Plugins

## Writing a Plugin 

Plugins usually add global-level functionality to VuePress. There is no strictly defined scope for a plugin - there are typically several types of plugins you can write:

1. Extend the data generated at compile time. e.g. `the last updated time of each file`.
2. Generate extra files before or after compilation. e.g. `PWA support`.
3. Add extra pages. e.g. [vuepress-plugin-i18n-ui](https://github.com/ulivz/vuepress-plugin-i18n-ui)
4. Inject global UI. e.g. `back to top`.

A plugin should export a `plain object`(`#1`). If the plugin needs to take options, it can be a function that exports a plain object(`#2`). The function will be called with the plugin's options as the first argument, along with [plugin context](#plugin-context) which provides some compile-time context.

``` js
// #1
module.exports = {
   // ...
}
```

``` js
// #2
module.exports = (options, context) => {
   return {
      // ...
   }
}
```

::: tip
A plugin module should use `CommonJS` instead of ES6's `export default` because the VuePress plugin runs on the Node side.
:::

## Using a plugin

You can use plugins by do some configuration at `.vuepress/config.js`:

``` js
module.exports = {
  plugins: [
    require('./my-plugin.js') 
  ]
}
```

When you want to pass in some options to it:

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

### Use plugins from npm

A plugin can be published on npm in `CommonJS` format as `vuepress-plugin-xxx` <Badge type='tip' text='R'/>. Then you can use it like this:

``` js
module.exports = {
  plugins: [ 'xxx' /* also can be full name. */ ]
}
```

## Options

### name

- Type: `string`
- Default: undefined

The name of the plugin.

### enable

- Type: `boolean`
- Default: true

Configure whether to enable this plugin. e.g. if you want to enable a plugin only in development mode:

``` js
module.exports = (options, context) => {
  return {
    enable: !context.isProd
  }
}
```

### chainWebpack

- Type: `Function`
- Default: undefined

Modify the internal webpack config with [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

### enhanceDevServer

- Type: `Function`
- Default: undefined

``` js
module.exports = {
  enhanceDevServer(app) {
    // app: poa instance
  }
}
```

### extendMarkdown

- Type: `Function`
- Default: `undefined`

A function to modify default config or apply additional plugins to the [markdown-it](https://github.com/markdown-it/markdown-it) instance used to render source files. Example:

``` js
module.exports = {
  extendMarkdown: md => {
    md.set({ breaks: true })
    md.use(require('markdown-it-xxx'))
  }
}
```

### enhanceAppFiles

- Type: `Array|Function`
- Default: `undefined`

This option accepts an array containing the file paths, or a function that returns this array, which allow you to do some [App Level Enhancements](../guide/basic-config.md#theme-configuration).

The file can `export default` a hook function which will work like `.vuepress/enhanceApp.js`, or any valid client side code snippets.

``` js
module.exports = {
  enhanceAppFiles: [
    path.resolve(__dirname, 'client.js')
  ]
}
```

### extendPageData

- Type: `Function`
- Default: `undefined`

A function that exports a plain object which will be merged into each page's data object. This function will be invoking once for each page at compile time.

``` js
module.exports = {
  extendPageData ({ 
    base,      // file's relative path
    filepath,  // file's absolute path
    routePath, // url to access this file (client side)
    content,   // file's raw content
    key,       // file's key
  }) {
    return {
      // ...
    }
  }
}
```

e.g.

``` js
module.exports = {
  extendPageData ({ content }) {
    return {
      size: (content.length / 1024).toFixed(2) + 'kb'
    }
  }
}
```

Then you can use this value via `this.$page.size` in any Vue component.


### clientDynamicModules

- Type: `Function`
- Default: `undefined`

Sometimes, you may want to generate some client modules at compile time.

``` js
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

### clientRootMixin

- Type: `String`
- Default: `undefined`

A path to the mixin file which allow you to control the life cycle of APP's root component.

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

``` js
const path = require('path')

module.exports = {
  additionalPages () {
    return [
      {
        route: '/readme/',
        path: path.resolve(__dirname, '../../README.md')
      }
    ]
  }
}
```

``` js

module.exports = {
  additionalPages () {
    return [
      {
        route: '/readme/',
        path: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md'
      }
    ]
  }
}
````

## Plugin Context

```
module.exports = (options, context) => {
  return {
    enable: !context.isProd
  }
}
```


## Lifecycle

首先，我们都知道 VuePress 有两个主要指令：

``` bash
vuepress dev
vuepress build
```

dev 和 build 的工作过程大抵相同，他们的基本工作流程如下:

![image](/plugin.png)







在正式介绍插件之前，我们需要花一些时间来了解 VuePress 的基本工作原理。





