# Passing Data to Client Code

As we know, VuePress plugin entries and theme entries are processed in Node side, but sometimes you might need to pass data to client side. For example, you want to generate different data when users use different options.

## Use `define` Hook

Plugin API provides a [define](../../reference/plugin-api.md#define) hook to define global constants for client code. You can make use of it to pass data to client.

First, define some constants in `define` hook:

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

Then use them in client code directly:

```js
const foo = __FOO__
const obj = __OBJ__
```

If you are using TypeScript in client code, you may need to declare the types of the global constants manually:

```ts
declare const __FOO__: string
declare const __OBJ__: { bar: number }
```

## Write and Load Temp Files

If you need to achieve some more complex features, you can write temp files and load them dynamically in client code.

First, write a temp file `foo.js`, which will be generated in the [temp](../../reference/config.md#temp) directory:

```js
module.exports = (options) => ({
  async onPrepared(app) {
    // write temp file
    await app.writeTemp('foo.js', `export const foo = ${JSON.stringify(options.foo)}`)
  },
})
```

Then, load the temp file via `@temp` alias in client code:

```js
import { foo } from '@temp/foo'
```

If you are using TypeScript in client code, you may need to declare the type of the temp module manually:

```ts
declare module '@temp/foo' {
  export const foo: string
}
```
