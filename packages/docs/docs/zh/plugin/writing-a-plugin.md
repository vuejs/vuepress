# 开发插件

一个插件应该导出一个普通的 JavaScript 对象（`#1`），如果插件需要接受配置选项，那么它可以是一个返回对象的函数（`#2`），这个函数接受插件的配置选项为第一个参数、包含编译期上下文的 [ctx](./context-api.md) 对象作为第二个参数。

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
