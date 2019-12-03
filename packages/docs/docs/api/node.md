# Node.js API

## Usage

```js
const { createApp, dev, build, eject } = require('vuepress')
```

## Methods

### createApp(\[options]): Promise\<App>

Create a VuePress application.

#### App.prototype.process: () => Promise\<void> | never

An asynchronous method used to prepare the context of the current app, and which contains loading pages and plugins, apply plugins, etc.

#### App.prototype.dev: () => Promise\<App> | never

Launch a dev process with current app context.

#### App.prototype.build: () => Promise\<App> | never

Launch a build process with current app context.


### dev(\[options]): Promise\<App>

Start a development server, actually it’s implemented by `createApp`:

```js
async function dev (options) {
  const app = createApp(options)
  await app.process()
  return app.dev()
}
```

### build(\[options]): Promise\<App>

Build your source files as a static site, actually it’s implemented by `createApp`:

```js
async function build (options) {
  const app = createApp(options)
  await app.process()
  return app.build()
}
```

### eject(targetDir): Promise\<void>

Copy the default theme into `{targetDir}/.vuepress/theme` for customization.


## Options

### sourceDir

- Type: `string`
- Required: `true`

Specify the source directory of your VuePress site.

### theme

- Type: `string`
- Required: `false`

See [theme](../config/README.md#theme).

### plugins

- Type: `array`
- Required: `false`

See [plugins](../config/README.md#plugins).

### temp

- Type: `string`
- Required: `false`

See [temp](../config/README.md#temp).

### dest

- Type: `string`
- Required: `false`

See [dest](../config/README.md#dest).

### siteConfig

- Type: `object`
- Required: `{}`

It’s useful when you’re writing tests and don’t want to depend on actual config file, for all options please head [siteConfig](../config/README.md).
