# Using a Plugin

You can use plugins by doing some configuration at `.vuepress/config.js`:

``` js
module.exports = {
  plugins: [
    require('./my-plugin.js')
  ]
}
```

## Use plugins from a dependency

A plugin can be published on npm in `CommonJS` format as `vuepress-plugin-xxx`. You can use it:

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xxx' ]
}
```

## Plugin Shorthand

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

## Plugin options

### Babel Style

Plugins can have options specified by wrapping the name and an options object in an array inside your config:

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

Since this style is consistent with [babel’s Plugin/Preset Options](https://babeljs.io/docs/en/plugins#plugin-preset-options), we call it `Babel Style`.

### Object Style

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
