# 命令行接口

<NpmBadge package="@vuepress/cli" />

VuePress 命令行接口是由 [@vuepress/cli](https://www.npmjs.com/package/@vuepress/cli) 包提供的。它是 [vuepress](https://www.npmjs.com/package/vuepress) 包的依赖之一，当然你也可以单独安装它。

执行 `vuepress --help` 来获取下列帮助信息：

```bash
Usage:
  $ vuepress <command> [options]

Commands:
  dev [sourceDir]    Start development server
  build [sourceDir]  Build to static site
  info               Display environment information

For more info, run any command with the `--help` flag:
  $ vuepress dev --help
  $ vuepress build --help
  $ vuepress info --help

Options:
  -v, --version  Display version number 
  -h, --help     Display this message 
```

::: tip
VuePress 使用了 [debug](https://www.npmjs.com/package/debug) 模块。

设置环境变量 `DEBUG=vuepress*` 可以启用调试日志。
:::

## dev

启动一个开发服务器，在本地开发你的 VuePress 站点。

```bash
Usage:
  $ vuepress dev [sourceDir]

Options:
  -c, --config <config>  Set path to config file 
  -p, --port <port>      Use specified port (default: 8080) 
  -t, --temp <temp>      Set the directory of the temporary files 
  --host <host>          Use specified host (default: 0.0.0.0) 
  --cache <cache>        Set the directory of the cache files 
  --clean-temp           Clean the temporary files before dev 
  --clean-cache          Clean the cache files before dev 
  --open                 Open browser when ready 
  --debug                Enable debug mode 
  --no-watch             Disable watching page and config files (default: true)
  -v, --version          Display version number 
  -h, --help             Display this message
```

::: tip
通过命令行设置的配置项，会覆盖你配置文件中的同名配置项。
:::

## build

将你的 VuePress 站点构建成静态文件，以便你进行后续[部署](../guide/deployment.md)。

```bash
Usage:
  $ vuepress build [sourceDir]

Options:
  -c, --config <config>  Set path to config file 
  -d, --dest <dest>      Set the directory build output (default: .vuepress/dist) 
  -t, --temp <temp>      Set the directory of the temporary files 
  --cache <cache>        Set the directory of the cache files 
  --clean-temp           Clean the temporary files before build 
  --clean-cache          Clean the cache files before build 
  --debug                Enable debug mode 
  -v, --version          Display version number 
  -h, --help             Display this message
```

::: tip
通过命令行设置的配置项，会覆盖你配置文件中的同名配置项。
:::

## info

输出当前系统和依赖相关的信息。

在你想要检查你的环境，或者提交 Issue 时候，可以使用该命令。
