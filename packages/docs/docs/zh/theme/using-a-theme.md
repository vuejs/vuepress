# 使用主题

使用一个主题和使用一个插件几乎一致。

## 使用 dependency 中的主题

一个插件可以在以 `vuepress-theme-xxx` 的形式发布到 npm，你可以这样使用它：

``` js
module.exports = {
  theme: 'vuepress-theme-xx'
}
```

## 主题的缩写

如果你的插件名以 `vuepress-theme-` 开头，你可以使用缩写来省略这个前缀：

``` js
module.exports = {
  theme: 'xxx'
}
```

和下面等价：

``` js
module.exports = {
  theme: 'vuepress-theme-xxx'
}
```

这也适用于 [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
module.exports = {
  theme: '@org/vuepress-theme-xxx', // 或者一个官方主题: '@vuepress/theme-xxx'
}
```

缩写:

``` js
module.exports = {
  theme: '@org/xxx', // 或者一个官方主题: '@vuepress/xxx'
}
```

::: warning 注意
以 `@vuepress/plugin-` 开头的插件是官方维护的插件。
:::
