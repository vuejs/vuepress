# @vuepress/markdown

> markdown library for vuepress

## Public API

### PLUGINS

A map [constant](./lib/constant.js) containing the names of all built-in markdown-it plugins.

### isRequiredPlugin(pluginName: string)

- **Usage**:

```js
const { isRequiredPlugin } = require('@vuepress/markdown')
console.log(isRequiredPlugin(PLUGINS.COMPONENT)) // true
console.log(isRequiredPlugin(PLUGINS.HIGHLIGHT_LINES)) // false
```

### removePlugin(config: chainMarkdown, pluginName: string)

Remove the specified built-in markdown-it plugin in VuePress.

It's needed to use with VuePress's [Plugin API > chainMarkdown](https://vuepress.vuejs.org/plugin/option-api.html#chainmarkdown).

- **Usage**:

```js
// Your VuePress Plugin or site config.
const { removePlugin } = require('@vuepress/markdown')
module.exports = {
  chainMarkdown (config) {
    removePlugin(config, PLUGINS.HIGHLIGHT_LINES)
  }
}
```

> Note that `PLUGINS.COMPONENT` and `PLUGINS.ANCHOR` are required in VuePress, It is forbidden to delete them!

### removeAllBuiltInPlugins(config: chainMarkdown)

Remove all built-in but not 100% necessary markdown-it plugins in VuePress.

- **Usage**:

```js
// Your VuePress Plugin or site config.
module.exports = {
  chainMarkdown (config) {
    require('@vuepress/markdown').removeAllBuiltInPlugins(config)
  }
}
```
