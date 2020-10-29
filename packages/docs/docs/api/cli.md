---
sidebarDepth: 3
---

# Command-line Interface

Currently, there are four cli commands in VuePress: [build](#build), [dev](#dev), [eject](#eject) and [info](#info).

If they are not enough for you, you can also create [your own commands](#more-commands).

## Usage

```bash
vuepress <command> [options]

Commands:
  dev [targetDir]    start development server
  build [targetDir]  build dir as static site
  eject [targetDir]  copy the default theme into .vuepress/theme for customization.
  info               Shows debugging information about the local environment
```

You can always add `--help` flag for more information.

## Commands

### build

Build dir as a static site.

#### -p, --port `<port>`

See [port](../config/README.md#port).

#### -t, --temp `<temp>`

See [temp](../config/README.md#temp).

#### -c, --cache `[cache]`

#### --no-cache

See [cache](../config/README.md#cache).

#### -d, --dest `<dest>`

See [dest](../config/README.md#dest).

#### --debug

Start development server in debug mode.

#### --silent

Start development server in silent mode.

### dev

Start a development server. All options from `vuepress build` are available. And there are several options specifically for dev:

#### --host `<host>`

See [host](../config/README.md#host).

#### --open

Open browser when ready.

#### --no-clear-screen

Do not clear screen when dev server is ready. Note that dev server will not clear screen if you start it in debug mode.

### eject

Copy the default theme into `.vuepress/theme` for customization.

### info

Shows debugging information about the local environment.

## more commands

You can create a custom command with [extendCli](../plugin/option-api.md#extendcli).
