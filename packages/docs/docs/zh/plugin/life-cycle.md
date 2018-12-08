# 生命周期

## ready

- 类型: `AsyncFunction`
- 作用域：`dev|build`

```js
module.exports = {
  async ready() {
    // ...
  }
}
```

::: tip 提示

`ready` 钩子在应用初始化之后，并在某些特定的函数式 API 执行之前执行。这些函数式 API 包括：

- clientDynamicModules
- enhanceAppFiles

:::

## updated

- 类型: `Function`
- 作用域：`dev`

```js
module.exports = {
  updated() {
    // ...
  }
}
```

## generated

- 类型: `AsyncFunction`
- 作用域：`build`

```js
module.exports = {
  async generated() {
    // ...
  }
}
```
