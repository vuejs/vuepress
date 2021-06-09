# 插件

借助于 [插件 API](../reference/plugin-api.md) ， VuePress 插件可以为你提供各种不同的功能。

## 社区插件

社区用户创建了很多插件，并将它们发布到了 [NPM](https://www.npmjs.com/search?q=keywords:vuepress-plugin) 上。 VuePress 团队也在 [@vuepress](https://www.npmjs.com/search?q=%40vuepress%20keywords%3Aplugin) Scope 下维护了一些官方插件。查看插件本身的文档可以获取更详细的指引。

一般而言，你需要在 [plugins](../reference/config.md#plugins) 配置项中设置你要使用的插件名称：

```js
module.exports = {
  plugins: [
    'foo',
    ['bar', { /* 配置项 */ }]
  ],
}
```

你可以使用插件名称或者它的简称：

|          插件名称          |         简称         |
|---------------------------|---------------------|
| `vuepress-plugin-foo`     | `foo`               |
| `@org/vuepress-plugin-bar`| `@org/bar`          |
| `@vuepress/plugin-foobar` | `@vuepress/foobar`  |

::: tip
大部分插件只能使用一次，如果同一个插件被多次使用，那么只有最后一次会生效。

然而，部分插件是可以被多次使用的（例如 [@vuepress/plugin-container](../reference/plugin/container.md)），你应该查看插件本身的文档来获取详细指引。
:::

## 本地插件

如果你想要使用自己的插件，但是又不想发布它，你可以创建一个本地插件。

推荐你直接将 [配置文件](./configuration.md#配置文件) 作为插件使用，因为 [几乎所有的插件 API 都可以在配置文件中使用](../reference/config.md#插件-api)，这在绝大多数场景下都更为方便。

但是如果你在配置文件中要做的事情太多了，最好还是将它们提取到单独的插件中，然后通过设置绝对路径或者通过 require 来使用它们：

```js
module.exports = {
  plugins: [
    path.resolve(__dirname, './path/to/your-plugin.js'),
    require('./another-plugin'),
  ],
}
```

前往 [深入 > 开发插件](../advanced/plugin.md) 学习如何开发你自己的插件。
