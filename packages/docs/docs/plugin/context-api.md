# Context API

Starting with VuePress 1.x.x, VuePress provides an `AppContext` object that stores all the state of the current app and can be accessed through the plugin API.

::: warning Note
Context of each plugin is a isolated context inherited from the same app context.
:::

```js
module.exports = (options, ctx) => {
  // ...
}
```

## ctx.isProd

- Type: `boolean`

Whether VuePress run in production environment mode.

## ctx.pages

- Type: `array`

Contains a list of Page objects

## ctx.sourceDir

- Type: `string`

Root directory where the documents are located.

## ctx.tempPath

- Type: `string`

Root directory where the temporary files are located.

## ctx.outDir

- Type: `string`

Output path.

## ctx.base

- Type: `string`

See: [base](../config/README.md#base).

## ctx.writeTemp

- Type: `Function`

A utility for writing temporary files to tempPath.
