# Command Line Interface

## Usage

```bash
vuepress <command> targetDir [options]
```

## build

Build dir as a static site.

### -p, --port `<port>`
See [port](../config/README.md#port).

### -t, --temp `<temp>`
See [temp](../config/README.md#temp).

### -c, --cache [cache]
### -no--cache [cache]
See [cache](../config/README.md#cache).

### --debug
Start development server in debug mode.

### --silent
Start development server in silent mode.

## dev

Start a development server. All options from `vuepress build` are available. And there are several options specifically for dev:

### --host `<host>`
See [host](../config/README.md#host).

### --open
Open browser when ready.

## eject

Copy the default theme into `.vuepress/theme` for customization.

## more commands

You can create a custom command with [extendCli](../plugin/option-api.md#extendcli).
