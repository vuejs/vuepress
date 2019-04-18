# Using a theme

Using a theme is almost the same as using a plugin.

## Using a theme from a dependency

Themes can be published on npm in raw Vue SFC format as `vuepress-theme-xxx`.

``` js
module.exports = {
  theme: 'vuepress-theme-xx'
}
```

## Theme Shorthand

If you prefix the theme with `vuepress-theme-`, you can use a shorthand to leave out that prefix:

``` js
module.exports = {
  theme: 'xxx'
}
```

Same with:

``` js
module.exports = {
  theme: 'vuepress-theme-xxx'
}
```

This also works with [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
module.exports = {
  theme: '@org/vuepress-theme-xxx', // or an official theme: '@vuepress/theme-xxx'
}
```

Shorthand:

``` js
module.exports = {
  theme: '@org/xxx', // or an official theme: '@vuepress/xxx'
}
```

::: warning Note
The theme whose name starts with `@vuepress/theme-` is an officially maintained theme.
:::
