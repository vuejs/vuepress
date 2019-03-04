# Node.js

```js
const vuepress = require('vuepress')
```

## 全局方法

### vuepress.dev

启动一个开发服务器。

### vuepress.build

生成一个静态站点。

### vuepress.eject

将默认主题复制到 `.vuepress/theme` 目录，以供自定义。

### vuepress.createApp

创建一个 VuePress 应用。

```js
const app = vuepress.createApp(/* options */)
app.process().then(() => {
  console.log('ready!')
  app.dev()
})
```

## App 选项

### options.sourceDir

指定 VuePress 的根目录。

### options.theme

查看 [theme](./config.md#theme)。

### options.plugins

查看 [plugins](./config.md#plugins)。

### options.temp

查看 [temp](./config.md#temp)。

### options.dest

查看 [dest](./config.md#dest)。

### options.siteConfig

查看 [siteConfig](./config.md)。
