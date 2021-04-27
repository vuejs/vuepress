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
module.exports = {
  layouts: path.resolve(__dirname, 'path/to/layouts'),
}
```

Using a plain object is equivalent:

```js
module.exports = {
  layouts: {
    Layout: path.resolve(__dirname, 'path/to/layouts/Layout.vue'),
    404: path.resolve(__dirname, 'path/to/layouts/404.vue'),
    FooBar: path.resolve(__dirname, 'path/to/layouts/FooBar.vue'),
  },
}
```

### extends

- Type: `string`

- Details:

  The name of the theme to inherit.

  All of the Theme API of the parent theme will be inherited, but the child theme will not override the parent theme.

  If a layout with the same name is registered in both the child theme and the parent theme, the layout of the child theme will have a higher priority.

  Multi-level inheritance is not supported.

- Example:

```js
module.exports = {
  // inherit the default theme
  extends: '@vuepress/theme-default',

  // override the `404` layout
  layouts: {
    404: path.resolve(__dirname, 'path/to/404.vue'),
  },
}
```
