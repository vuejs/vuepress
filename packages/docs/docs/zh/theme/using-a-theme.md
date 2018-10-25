# 使用主题

Using a theme is almost same as using a plugin.

## Use plugins from a dependency

Themes can be published on npm in raw Vue SFC format as `vuepress-theme-xxx`.

``` js
module.exports = {
  plugins: [ 'vuepress-theme-xx' ]
}
```

## Theme Shorthand

If you prefix the plugin with `vuepress-theme-`, you can use a shorthand to leave out that prefix:

``` js
module.exports = {
  plugins: [ 'xxx' ]
}
```

Same with:

``` js
module.exports = {
  plugins: [ 'vuepress-theme-xxx' ]
}
```

This also works with [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
module.exports = {
  plugins: [ '@org/vuepress-theme-xxx', '@vuepress/theme-xxx' ]
}
```

Shorthand:

``` js
module.exports = {
  plugins: [ '@org/xxx', '@vuepress/xxx' ]
}
```

::: warning Note
The plugin whose name starts with `@vuepress/theme-` is an officially maintained theme.
:::
