# Writing a Plugin

A plugin should export a `plain JavaScript object`(`#1`). If the plugin needs to take options, it can be a function that returns a plain object(`#2`). The function will be called with the plugin’s options as the first argument, along with [ctx](./context-api.md) which provides some compile-time metadata.

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
A VuePress plugin module should be a `CommonJS Module` because VuePress plugins runs on the Node.js side.
:::
