# 向客户端代码传递数据

我们知道，VuePress 插件入口和主题入口是在 Node 端处理的，但有时候你可能需要向客户端动态传递数据。例如，你希望在用户传入不同的选项时生成不同的数据。

## 使用 `define` Hook

插件 API 提供了一个 [define](../../reference/plugin-api.md#define) Hook 来定义客户端代码中的全局常量。你可以利用它来向客户端传递数据。

首先，通过 `define` Hook 定义一些常量：

```js
module.exports = (options) => ({
  define: {
    __FOO__: options.foo || 'str',
    __OBJ__: {
      bar: options.bar || 123,
    },
  },
})
```

然后，在客户端代码中直接使用它们：


```js
const foo = __FOO__
const obj = __OBJ__
```

如果你在客户端代码中使用 TypeScript ，你可能需要手动声明这些全局常量的类型：

```ts
declare const __FOO__: string
declare const __OBJ__: { bar: number }
```

## 写入并加载临时文件

如果你需要实现一些更复杂的功能，你可以写入临时文件，并在客户端代码中动态加载它们。

首先，写入一个名为 `foo.js` 的临时文件，它将会生成在 [temp](../../reference/config.md#temp) 目录中：

```js
module.exports = (options) => ({
  async onPrepared(app) {
    // 写入临时文件
    await app.writeTemp('foo.js', `export const foo = ${JSON.stringify(options.foo)}`)
  },
})
```

然后，在客户端代码中通过 `@temp` 别名来加载临时文件：

```js
import { foo } from '@temp/foo'
```

如果你在客户端代码中使用 TypeScript ，你可能需要手动声明这些临时模块的类型：

```ts
declare module '@temp/foo' {
  export const foo: string
}
```
