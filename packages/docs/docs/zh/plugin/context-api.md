# Context API

VuePress 提供了一个存储了当前页面所有状态的 Context API。

::: tip 提示
每个函数式插件的上下文对象是一个继承于根上下文的隔离上下文对象。
:::

```js
module.exports = (options, ctx) => {
  // ...
}
```

## ctx.isProd

- 类型: `boolean`

VuePress 是否运行在生产环境模式下。

## ctx.sourceDir

- 类型: `string`

文档的根目录路径。

## ctx.tempPath

- Type: `string`

临时文件所在的根目录路径。

## ctx.outDir

- Type: `string`

输出目录。

## ctx.themePath

- Type: `string`

当前应用的主题的根路径。

## ctx.base

- Type: `string`

参考: [base](../config/README.md#base).

## ctx.writeTemp

- Type: `Function`

一个用于向 tempPath 写入临时文件的方法。
