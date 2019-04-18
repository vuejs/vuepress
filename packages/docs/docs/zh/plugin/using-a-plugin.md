# 使用插件

你可以通过在 `.vuepress/config.js` 中做一些配置来使用插件：

``` js
module.exports = {
  plugins: [
    require('./my-plugin.js')
  ]
}
```

## 使用来自依赖的插件

一个插件可以在以 `vuepress-plugin-xxx` 的形式发布到 npm，你可以这样使用它：

``` js
module.exports = {
  plugins: [ 'vuepress-plugin-xx' ]
}
```

## 插件的缩写

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

## 插件的选项

### Babel 式

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

由于这种风格和 [babeld Plugin/Preset Options](https://babeljs.io/docs/en/plugins#plugin-preset-options) 一致，我们称之为"Babel 风格"。

### 对象式

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
