# 命令行接口

## 基本用法

```bash
vuepress <command> targetDir [options]
```

## build

在指定的目录生成一个静态站点。

### -p, --port `<port>`
查看 [port](../config/README.md#port)。

### -t, --temp `<temp>`
查看 [temp](../config/README.md#temp)。

### -c, --cache `[cache]`
### --no-cache
查看 [cache](../config/README.md#cache)。

### --dest `<dest>`
查看 [dest](../config/README.md#dest)。

### --debug
以调试模式启动开发服务器。

### --silent
以安静模式启动开发服务器。

## dev

启动一个开发服务器。来自 `vuepress build` 的所有选项都可用。除此以外，还有几个专门针对 dev 的选项：

### --host `<host>`
查看 [host](../config/README.md#host)。

### --open
当服务端准备就绪时自动打开浏览器。

### --no-clear-screen
当 dev server 就绪时不清除屏幕。

## eject

将默认主题复制到 `.vuepress/theme` 目录，以供自定义。

## 更多指令

你可以使用 [extendCli](../plugin/option-api.md#extendcli) 来创建自定义命令。
