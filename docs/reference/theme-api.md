# Theme API

<NpmBadge package="@vuepress/core" />

VuePress theme also works as a plugin, so Theme API can accept all the options of [Plugin API](./plugin-api.md) with following differences.

## Basic Options

### name

- Type: `string`

- Details:

  Name of the theme.

  It should follow the naming convention:

  - Non-scoped: `vuepress-theme-foo`
  - Scoped: `@org/vuepress-theme-foo`

### multiple

- Details:

  A theme should never be used multiple times, so this option should not be set.

## Theme Specific Options

### layouts

- Type: `string | Record<string, string>`

- Details:

  Specify layout components of the theme.

  It accepts absolute path of the layouts directory. All the `.vue,.ts,.js` files in the directory will be registered as layout components.

  It also accepts a plain object, of which the key is the layout name and the value is the absolute path of the layout file.

  A theme must have at least two layouts: `Layout` and `404`.

- Example:

The layout directory:

```bash
layouts
├─ Layout.vue
├─ 404.vue
└─ FooBar.vue
```

Using the absolute path of layout directory:

```js
const { path } = require('@vuepress/utils')

module.exports = {
  layouts: path.resolve(__dirname, 'path/to/layouts'),
}
```

Using a plain object is equivalent:

```js
const { path } = require('@vuepress/utils')

module.exports = {
  layouts: {
    Layout: path.resolve(__dirname, 'path/to/layouts/Layout.vue'),
    404: path.resolve(__dirname, 'path/to/layouts/404.vue'),
    FooBar: path.resolve(__dirname, 'path/to/layouts/FooBar.vue'),
  },
}
```

### plugins

- Type: `PluginConfig[]`

- Details:

  Plugins to use in the theme.

- Also see:
  - [Config > plugins](./config.md#plugins)

### extends

- Type: `string`

- Details:

  The name of the theme to inherit.

  All of the Theme API of the parent theme will be inherited, but the child theme will not override the parent theme.

  When a layout with the same name is registered in both child and parent theme, the layout of the child theme will have a higher priority.

  When a same plugin is used in both child and parent theme, if the plugin does not support to be used multiple times, only the one used in the child theme will take effect.

  Multi-level inheritance is supported.

- Example:

```js
const { path } = require('@vuepress/utils')

module.exports = {
  // inherit the default theme
  extends: '@vuepress/theme-default',

  // override the `404` layout
  layouts: {
    404: path.resolve(__dirname, 'path/to/404.vue'),
  },
}
```
