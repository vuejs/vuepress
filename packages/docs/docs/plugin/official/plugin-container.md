---
title: container
metaTitle: A plugin of registering markdown containers | VuePress
---

# [@vuepress/plugin-container](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-container)

> A plugin of registering markdown containers

## Install

```bash
yarn add -D @vuepress/plugin-container@next
# OR npm install -D @vuepress/plugin-container@next
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/container'] 
}
```

## Options

### type

- Type: `string`
- This is a required option.

The type for the container. For example, if `type` was set to `foo`, only the following syntax will be parsed as a container:

```md
::: foo bar
write something here ~
:::
```

### defaultTitle

- Type: `string`
- Default: the upper case of `type`

The default title for the container. If no title was provided, `defaultTitle` will be showed as the title of the container.

### before

- Type: `string | Function`
- Default: `undefined`

String to be placed before the block. If specified as a function, a argument `info` will be passed to it. (In the example above, `info` will be `bar`.) If specified, it will override `defaultTitle`.

### after

- Type: `string | Function`
- Default: `undefined`

String to be placed after the block. If specified as a function, a argument `info` will be passed to it. (In the example above, `info` will be `bar`.) If specified, it will override `defaultTitle`.

### validate

- Type: `Function`
- Default: `undefined`

A function to validate tail after opening marker, should return `true` on success.

### render

- Type: `Function`
- Default: `undefined`

The renderer function for opening/closing tokens. If specified, it will override `before`, `after` and `defaultTitle`.

### marker

- Type: `string`
- Default: `':'`

The character to use in delimiter.
