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
The `ready` hook is executed after the application is initialized and before some specific functional APIs are executed. These functional APIs include:

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
