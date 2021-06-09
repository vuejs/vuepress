# Plugin

With the help of [Plugin API](../reference/plugin-api.md), VuePress plugin can provide different features for you.

## Community Plugin

Community users have created lots of plugins and published them to [NPM](https://www.npmjs.com/search?q=keywords:vuepress-plugin). VuePress team also maintains some official plugins under the [@vuepress](https://www.npmjs.com/search?q=%40vuepress%20keywords%3Aplugin) scope. You should check the plugin's own documentation for detailed guide.

In general, you need to specify the name of the plugin to use in [plugins](../reference/config.md#plugins) option:

```js
module.exports = {
  plugins: [
    'foo',
    ['bar', { /* options */ }]
  ],
}
```

You can use either plugin name or its shorthand:

|        Plugin Name        |      Shorthand      |
|---------------------------|---------------------|
| `vuepress-plugin-foo`     | `foo`               |
| `@org/vuepress-plugin-bar`| `@org/bar`          |
| `@vuepress/plugin-foobar` | `@vuepress/foobar`  |

::: tip
Most plugins can only be used once. If the same plugin is used multiple times, only the last one will take effect.

However, some plugins can be used multiple times (e.g. [@vuepress/plugin-container](../reference/plugin/container.md)), and you should check the documentation of the plugin itself for detailed guide.
:::

## Local Plugin

If you want to use your own plugin but don't want to publish it, you can create a local plugin.

It is recommended to use the [Config File](./configuration.md#config-file) directly as a plugin, because [almost all of the Plugin APIs are available](../reference/config.md#plugin-api), which would be more convenient in most cases.

But if you have too many things to do in your config file, it's better to extract them into separate plugins, and use them by setting the absolute path to them or requiring them:

```js
module.exports = {
  plugins: [
    path.resolve(__dirname, './path/to/your-plugin.js'),
    require('./another-plugin'),
  ],
}
```

You can refer to [Advanced > Writing a Plugin](../advanced/plugin.md) for how to write your own plugin.
