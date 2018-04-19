---
sidebar: auto
---

# Config Reference

## Basic Config

### base

- Type: `string`
- Default: `/`

The base URL the site will be deployed at. You will need to set this if you plan to deploy your site under a sub path, for example GitHub pages. If you plan to deploy your site to `https://foo.github.io/bar/`, then `base` should be set to `"/bar/"`. It should always start and end with a slash.

The `base` is automatically prepended to all the URLs that start with `/` in other options, so you only need to specify it once.

**Also see:**

- [Base URL](../guide/assets.md#base-url)
- [Deploy Guide > Github Pages](../guide/deploy.md#github-pages)

### title

- Type: `string`
- Default: `undefined`

Title for the site. This will be the prefix for all page titles, and displayed in the navbar in the default theme.

### description

- Type: `string`
- Default: `undefined`

Description for the site. This will be rendered as a `<meta>` tag in the page HTML.

### head

- Type: `Array`
- Default: `[]`

Extra tags to be injected to the page HTML `<head>`. Each tag can be specified in the form of `[tagName, { attrName: attrValue }, innerHTML?]`. For example, to add a custom favicon:

``` js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ]
}
```

### host

- Type: `string`
- Default: `'0.0.0.0'`

Specify the host to use for the dev server.

### port

- Type: `number`
- Default: `8080`

Specify the port to use for the dev server.

### dest

- Type: `string`
- Default: `.vuepress/dist`

Specify the output directory for `vuepress build`.

### ga

- Type: `string`
- Default: `undefined`

Provide the Google Analytics ID to enable integration.

### serviceWorker

- Type: `boolean`
- Default: `false`

If set to `true`, VuePress will automatically generate and register a service worker that caches the content for offline use (only enabled in production).

If developing a custom theme, the `Layout.vue` component will also be emitting the following events:

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip PWA NOTES
The `serviceWorker` option only handles the service worker. To make your site fully PWA-compliant, you will need to provide the Web App Manifest and icons in `.vuepress/public`. For more details, see [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Also, only enable this if you are able to deploy your site with SSL, since service worker can only be registered under HTTPs URLs.
:::

### locales

- Type: `{ [path: string]: Object }`
- Default: `undefined`

Specify locales for i18n support. For more details, see the guide on [Internationalization](../guide/i18n.md).

## Theming

### theme

- Type: `string`
- Default: `undefined`

Specify this to use a custom theme. With the value of `"foo"`, VuePress will attempt to load the theme component at `node_modules/vuepress-theme-foo/Layout.vue`.

### themeConfig

- Type: `Object`
- Default: `{}`

Provide config options to the used theme. The options will vary depending on the theme you are using.

**Also see:**

- [Default Theme Configuration](../default-theme-config/).

## Markdown

### markdown.slugify

- Type: `Function`
- Default: [source](https://github.com/vuejs/vuepress/blob/master/lib/markdown/slugify.js)

Function for transforming header texts into slugs. This affects the ids/links generated for header anchors, table of contents and sidebar links.

### markdown.anchor

- Type: `Object`
- Default: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

Options for [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor). (Note: prefer `markdown.slugify` if you want to customize header ids.)

### markdown.toc

- Type: `Object`
- Default: `{ includeLevel: [2, 3] }`

Options for [markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents). (Note: prefer `markdown.slugify` if you want to customize header ids.)

### markdown.config

- Type: `Function`
- Default: `undefined`

A function to apply additional plugins to the [markdown-it](https://github.com/markdown-it/markdown-it) instance used to render source files. Example:

``` js
module.exports = {
  markdown: {
    config: md => {
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

## Build Pipeline

### postcss

- Type: `Object`
- Default: `{ plugins: [require('autoprefixer')] }`

Options for [postcss-loader](https://github.com/postcss/postcss-loader). Note specifying this value will overwrite autoprefixer and you will need to include it yourself.

### configureWebpack

- Type: `Object | Function`
- Default: `undefined`

Modify the internal webpack config. If the value is an Object, it will be merged into the final config using [webpack-merge](https://github.com/survivejs/webpack-merge); If the value is a function, it will receive the config as the 1st argument and an `isServer` flag as the 2nd argument. You can either mutate the config directly, or return an object to be merged:

``` js
module.exports = {
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // mutate the config for client
    }
  }
}
```

### chainWebpack

- Type: `Function`
- Default: `undefined`

Modify the internal webpack config with [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

``` js
module.exports = {
  chainWebpack: (config, isServer) => {
    // config is an instance of ChainableConfig
  }
}
```

## Browser Compatibility

### evergreen

- Type: `boolean`
- Default: `false`

Set to `true` if you are only targeting evergreen browsers. This will disable ES5 transpilation and polyfills for IE, and result in faster builds and smaller files.
