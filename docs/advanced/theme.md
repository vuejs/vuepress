# Writing a Theme

::: tip
Before reading this guide, you'd better learn the guide of [Writing a Plugin](./plugin.md) first.
:::

## Create a Theme

A VuePress theme is a special plugin, which should satisfy the [Theme API](../reference/theme-api.md). Like plugins, a theme can also be a *Theme Object* or a *Theme Function*.

<CodeGroup>
  <CodeGroupItem title="Theme Object" active>

```js
const { path } = require('@vuepress/utils')

const fooTheme = {
  name: 'vuepress-theme-foo',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
    404: path.resolve(__dirname, 'layouts/404.vue'),
  },
  // ...
}
```

  </CodeGroupItem>

  <CodeGroupItem title="Theme Function">

```js
const { path } = require('@vuepress/utils')

const fooTheme = (options, app) => {
  return {
    name: 'vuepress-theme-foo',
    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      404: path.resolve(__dirname, 'layouts/404.vue'),
    },
    // ...
  }
}
```

  </CodeGroupItem>
</CodeGroup>

The `layouts` field declares the layouts provided by your theme.

A theme must provide at least two layouts: `Layout` and `404`.

The `Layout` layout should contain the [Content](../reference/components.md#content) component to display the markdown content:

```vue
<template>
  <div>
    <Content />
  </div>
</template>
```

The `404` layout will be used for the `404.html` page:

```vue
<template>
  <div>404 Not Found</div>
</template>
```

You can provide more layouts, and users can change layout via [layout](../reference/frontmatter.md#layout) frontmatter.

## Publish to NPM

The typical structure of a theme package is as follow:

```bash
vuepress-theme-foo
├─ lib
│  ├─ layouts
│  │  ├─ Layout.vue
│  │  └─ 404.vue
│  └─ index.js
└─ package.json
```

### Theme Entry

The `lib/index.js` file is the theme entry, which should export the theme directly:

<CodeGroup>
  <CodeGroupItem title="CJS" active>

```js
module.exports = fooTheme
```

  </CodeGroupItem>

  <CodeGroupItem title="ESM">

```js
export default fooTheme
```

  </CodeGroupItem>
</CodeGroup>

::: tip
Notice that the theme entry will be loaded in Node, so it should be in CommonJS format.

If you are using ESM format, you'll need to use [babel](https://babeljs.io/) or [typescript](https://www.typescriptlang.org/) to transpile it into CommonJS.
:::

### package.json

The [package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json) file is required to publish a package to NPM:

```json
{
  "name": "vuepress-theme-foo",
  "version": "1.0.0",
  "keywords": [
    "vuepress-theme",
  ],
  "main": "lib/index.js",
  "files": [
    "lib"
  ]
}
```

- Set `name` to follow the naming convention: `vuepress-theme-xxx` or `@org/vuepress-theme-xxx`.
- Set `keywords` to include `vuepress-theme`, so that users can search your theme on NPM.
- Set `main` to the theme entry file.
- Set `files` to only publish those files inside `lib` directory.
