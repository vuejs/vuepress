# Command Line Interface

<NpmBadge package="@vuepress/cli" />

VuePress CLI is provided by [@vuepress/cli](https://www.npmjs.com/package/@vuepress/cli) package. It is a dependency of the [vuepress](https://www.npmjs.com/package/vuepress) package, and you can also install it separately.

Run `vuepress --help` to get following help messages:

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
VuePress is using [debug](https://www.npmjs.com/package/debug) module.

Set environment variable `DEBUG=vuepress*` to enable debug logs.
:::

## dev

Start a development server to develop your VuePress site locally.

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
Options set by CLI will override those options with the same name in your config file.
:::

## build

Build your VuePress site to static files, which are ready for [deployment](../guide/deployment.md).

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
Options set by CLI will override those options with the same name in your config file.
:::

## info

Outputs information about your system and dependencies.

This command would be helpful when you want to check your environment or report an issue.
