# Lifecycle

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

::: tip
The `ready` hook is executed after the application is initialized and before some specific functional APIs are executed. These functional APIs include:

- [clientDynamicModules](./option-api.md#clientdynamicmodules)
- [enhanceAppFiles](./option-api.md#enhanceappfiles)

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

  Called when a (production) build finishes, with an array of generated page HTML paths.

``` js
module.exports = {
  async generated (pagePaths) {
    // ...
  }
}
```
