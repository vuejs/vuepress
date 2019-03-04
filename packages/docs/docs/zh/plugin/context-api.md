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

## ctx.pages

- 类型: `array`

一个包含了页面对象的列表。

## ctx.sourceDir

- 类型: `string`

文档的根目录路径。

## ctx.tempPath

- 类型: `string`

临时文件所在的根目录路径。

## ctx.outDir

- 类型: `string`

输出目录。

## ctx.base

- 类型: `string`

参考: [base](../config/README.md#base).

## ctx.writeTemp

- 类型: `Function`

一个用于向 tempPath 写入临时文件的方法。
