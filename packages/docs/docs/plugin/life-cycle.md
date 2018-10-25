# Life Cycle

## ready

- Type: `AsyncFunction`
- Scope：`dev|build`

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

- Type: `Function`
- Scope：`dev`

```js
module.exports = {
  updated() {
    // ...
  }
}
```

## generated

- Type: `AsyncFunction`
- Scope：`build`

```js
module.exports = {
  async generated() {
    // ...
  }
}
```
