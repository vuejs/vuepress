# Plugin API

<NpmBadge package="@vuepress/core" />

Plugins should be used before initialization. The basic options will be handled once the plugin is used:

- [name](#name)
- [multiple](#multiple)
- [plugins](#plugins)

The following hooks will be processed when initializing app:

- [extendsMarkdown](#extendsmarkdown)
- [extendsPageOptions](#extendspageoptions)
- [onInitialized](#oninitialized)

The following hooks will be processed when preparing files:

- [extendsPageData](#extendspagedata)
- [clientAppEnhanceFiles](#clientappenhancefiles)
- [clientAppRootComponentFiles](#clientapprootcomponentfiles)
- [clientAppSetupFiles](#clientappsetupfiles)
- [onPrepared](#onprepared)

The following hooks will be processed in dev / build:

- [alias](#alias)
- [define](#define)
- [onWatched](#onwatched)
- [onGenerated](#ongenerated)

## Basic Options

### name

- Type: `string`

- Details:

  Name of the plugin.

  It will be used for identifying plugins to avoid using a same plugin multiple times, so make sure to use a unique plugin name.

  It should follow the naming convention:

  - Non-scoped: `vuepress-plugin-foo`
  - Scoped: `@org/vuepress-plugin-foo`

- Also see:
  - [Plugin API > multiple](#multiple)

### multiple

- Type: `boolean`

- Default: `false`

- Details:

  Declare whether the plugin can be used multiple times.

  If set to `false`, when using plugins with the same name, the one used previously will be replaced by the one used later.

  If set to `true`, plugins with the same name could be used multiple times and won't be replaced.

- Also see:
  - [Plugin API > name](#name)

### plugins

- Type: `PluginConfig[]`

- Details:

  Plugins to use.

  A plugin can use other plugins via this option.

  This option accepts an array, each item of which is a two-element tuple:

  - The first element is the plugin name or the plugin itself. It accepts plugin name, plugin name shorthand, absolute path to plugin, or the plugin object.
  - The second element is the plugin options. It accepts boolean or object. Set it to `false` to disable the plugin. Set it to `true` to enable the plugin without any options. Use object to enable the plugin with options.

  For simplicity, you can use the first element of the tuple that described above as the array item, which equals enabling the plugin without any options.

- Example:

```js
module.exports = {
  plugins: [
    // two-element tuple
    ['vuepress-plugin-foo', false],
    ['bar', true],
    [path.resolve(__dirname, './path/to/local/plugin'), { /* options */ }],
    [require('vuepress-plugin-baz'), true],

    // only use the first element
    'foobar', // equals to ['foobar', true]
  ],
}
```

- Also see:
  - [Guide > Plugin](../guide/plugin.md)

## Development Hooks

### alias

- Type: `Record<string, any> | ((app: App) => Record<string, any>)`

- Details:

  Path aliases definition.

  This hook accepts an object or a function that returns an object.

- Example:

```js
module.exports = {
  alias: {
    '@alias': path.resolve(__dirname, './path/to/alias'),
  },
}
```

### define

- Type: `Record<string, any> | ((app: App) => Record<string, any>)`

- Details:

  Define global constants replacements.

  This hook accepts an object or a function that returns an object.

  This can be useful for passing variables to client files. Note that the values will be automatically processed by `JSON.stringify()`.

- Example:

```js
module.exports = {
  define: {
    __GLOBAL_BOOLEAN__: true,
    __GLOBAL_STRING__: 'foobar',
    __GLOBAL_OBJECT__: { foo: 'bar' },
  },
}
```

### extendsMarkdown

- Type: `(md: Markdown, app: App) => void | Promise<void>`

- Details:

  Markdown enhancement.

  This hook accepts a function that will receive an instance of `Markdown` powered by [markdown-it](https://github.com/markdown-it/markdown-it) in its arguments.

  This can be used for using extra markdown-it plugins and implementing customizations.

- Example:

```js
module.exports = {
  extendsMarkdown: (md) => {
    md.use(plugin1)
    md.linkify.set({ fuzzyEmail: false })
  },
}
```

### extendsPageOptions

- Type: `(filePath: string, app: App) => PageOptions | Promise<PageOptions>`

- Details:

  Page options extension.

  This hook accepts a function that will receive the relative file path of the page. The returned object will be merged into page options, which will be used to create the page.

- Example:

Set permalink pattern for pages in `_posts` directory:

```js
module.exports = {
  extendsPageOptions: (filePath) => {
    if (filePath.startsWith('_posts/')) {
      return {
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug.html',
        },
      }
    }
    return {}
  },
}
```

### extendsPageData

- Type: `(page: Page, app: App) => Record<string, any> | Promise<Record<string, any>>`

- Details:

  Page data extension.

  This hook accepts a function that will receive an instance of `Page`. The returned object will be merged into page data, which can be used in client side code.

- Example:

```js
module.exports = {
  extendsPageData: (page) => {
    const meta = 'foobar'
    return { meta }
  },
}
```

In client component:

```js
import { usePageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData()
    console.log(page.value.meta) // foobar
  },
}
```

## Client Files Hooks

### clientAppEnhanceFiles

- Type: `string | string[] | ((app: App) => string | string[] | Promise<string | string[]>)`

- Details:

  Paths of client app enhancement files.

  This hook accepts absolute file paths, or a function that returns the paths.

  Files listed in this hook will be invoked after the client app is created to make some enhancement to it.

- Example:

```js
module.exports = {
  clientAppEnhanceFiles: path.resolve(__dirname, './path/to/clientAppEnhance.js'),
}
```

- Also see:
  - [Client API > defineClientAppEnhance](./client-api.md#defineclientappenhance)
  - [Cookbook > Usage of Client App Enhance](../advanced/cookbook/usage-of-client-app-enhance.md)

### clientAppRootComponentFiles

- Type: `string | string[] | ((app: App) => string | string[] | Promise<string | string[]>)`

- Details:

  Paths of client app root component files.

  This hook accepts absolute file paths, or a function that returns the paths.

  Components listed in this hook will be rendered to the root node of the client app.

- Example:

```js
module.exports = {
  clientAppRootComponentFiles: path.resolve(__dirname, './path/to/RootComponent.vue'),
}
```

### clientAppSetupFiles

- Type: `string | string[] | ((app: App) => string | string[] | Promise<string | string[]>)`

- Details:

  Paths of client app setup files.

  This hook accepts absolute file paths, or a function that returns the paths.

  Files listed in this hook will be invoked in the [setup](https://v3.vuejs.org/guide/composition-api-setup.html) function of the client app.

- Example:

```js
module.exports = {
  clientAppSetupFiles: path.resolve(__dirname, './path/to/clientAppSetup.js'),
}
```

- Also see:
  - [Client API > defineClientAppSetup](./client-api.md#defineclientappsetup)

## Lifecycle Hooks

### onInitialized

- Type: `(app: App) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has been initialized.

### onPrepared

- Type: `(app: App) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has finished preparation.

### onWatched

- Type: `(app: App, watchers: Closable[], restart: () => Promise<void>) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has started dev-server and watched files change.

  The `watchers` is an array of file watchers. When changing config file, the dev command will be restarted and those watchers will be closed. If you are adding new watchers in this hook, you should push your watchers to the `watchers` array, so that they can be closed correctly when restarting.

  The `restart` is a method to restart the dev command. When calling this method, the `watchers` array will be closed automatically.

### onGenerated

- Type: `(app: App) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has generated static files.
