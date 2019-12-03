# Node.js API

## 使用

```js
const { createApp, dev, build, eject } = require('vuepress')
```

## 方法

### createApp(\[options]): Promise\<App>

创建一个 VuePress 应用实例。

#### App.prototype.process: () => Promise\<void> | never

用于准备当前站点上下文的异步方法。其中包含加载页面和插件、应用插件等。

#### App.prototype.dev: () => Promise\<App> | never

使用当前应用程序上下文启动一个 devProcess.


#### App.prototype.build: () => Promise\<App> | never

使用当前应用程序上下文启动一个 buildProcess.

### dev(\[options]): Promise\<App>

启动一个 Dev Server，实际上它是由 `createapp` 实现的：

```js
async function dev (options) {
  const app = createApp(options)
  await app.process()
  return app.dev()
}
```

### build(\[options]): Promise\<App>

将源文件构建为静态站点, 实际上它是由 `createapp` 实现的：

```js
async function build (options) {
  const app = createApp(options)
  await app.process()
  return app.build()
}
```

### eject(targetDir): Promise\<void>

将默认主题复制到 `{targetDir}/.vuepress/theme`中进行自定义。


## Options

### sourceDir

- 类型: `string`
- 默认值: `true`

指定 VuePress 站点的源目录。

### theme

- 类型: `string`
- 默认值: `false`

参见 [theme](../config/README.md#theme)。

### plugins

- 类型: `array`
- 默认值: `false`

参见 [plugins](../config/README.md#plugins)。

### temp

- 类型: `string`
- 默认值: `false`

参见 [temp](../config/README.md#temp)。

### dest

- 类型: `string`
- 默认值: `false`

参见 [dest](../config/README.md#dest)。

### siteConfig

- 类型: `object`
- 默认值: `{}`

当你想编写测试且不想依赖于实际的配置文件时，它将非常有用。想要查看所有的配置选项，请移步 [siteConfig](../config/README.md)。
