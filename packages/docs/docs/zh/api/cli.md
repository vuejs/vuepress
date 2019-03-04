# 命令行接口

## 基本用法

```bash
vuepress <command> targetDir [options]
```

## build

在指定的目录生成一个静态站点。

### -p, --port `<port>`
查看 [port](./config.md#port)。

### -t, --temp `<temp>`
查看 [temp](./config.md#temp)。

### -c, --cache [cache]
### -no--cache [cache]
查看 [cache](./config.md#cache)。

### --debug
以调试模式启动开发服务器。

### --silent
以安静模式启动开发服务器。

## dev

启动一个开发服务器。来自 `vuepress build` 的所有选项都可用。除此以外，还有几个专门针对 dev 的选项：

### --host `<host>`
查看 [host](./config.md#host)。

### --open
当服务端准备就绪时自动打开浏览器。

## eject

将默认主题复制到 `.vuepress/theme` 目录，以供自定义。

## more commands

你可以使用 [extendCli](../plugin/option-api.md#extendcli) 来创建自定义命令。
