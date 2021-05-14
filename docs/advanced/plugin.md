# Writing a Plugin

::: tip
Before reading this guide, you'd better learn the VuePress [architecture](./architecture.md) first.
:::

## Create a Plugin

A VuePress plugin is a plain JavaScript object that satisfies the [Plugin API](../reference/plugin-api.md), which is called a *Plugin Object*.

If a plugin wants to receive user options, it could be a function that returns a *Plugin Object*, which is called a *Plugin Function*.

<CodeGroup>
  <CodeGroupItem title="Plugin Object" active>

```js
const fooPlugin = {
  name: 'vuepress-plugin-foo',
  // ...
}
```

  </CodeGroupItem>

  <CodeGroupItem title="Plugin Function">

```js
const fooPlugin = (options, app) => {
  return {
    name: 'vuepress-plugin-foo',
    // ...
  }
}
```

  </CodeGroupItem>
</CodeGroup>

## Publish to NPM

The typical structure of a plugin package is as follow:

```bash
vuepress-plugin-foo
├─ lib
│  └─ index.js
└─ package.json
```

### Plugin Entry

The `lib/index.js` file is the plugin entry, which should export the plugin directly:

<CodeGroup>
  <CodeGroupItem title="CJS" active>

```js
module.exports = fooPlugin
```

  </CodeGroupItem>

  <CodeGroupItem title="ESM">

```js
export default fooPlugin
```

  </CodeGroupItem>
</CodeGroup>

::: tip
Notice that the plugin entry will be loaded in Node, so it should be in CommonJS format.

If you are using ESM format, you'll need to use [babel](https://babeljs.io/) or [typescript](https://www.typescriptlang.org/) to transpile it into CommonJS.
:::

### package.json

The [package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json) file is required to publish a package to NPM:

```json
{
  "name": "vuepress-plugin-foo",
  "version": "1.0.0",
  "keywords": [
    "vuepress-plugin",
  ],
  "main": "lib/index.js",
  "files": [
    "lib"
  ]
}
```

- Set `name` to follow the naming convention: `vuepress-plugin-xxx` or `@org/vuepress-plugin-xxx`.
- Set `keywords` to include `vuepress-plugin`, so that users can search your plugin on NPM.
- Set `main` to the plugin entry file.
- Set `files` to only publish those files inside `lib` directory.
