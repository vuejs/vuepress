---
sidebar: auto
---

# Config Reference

<Bit/>

## Basic Config

### base

- Type: `string`
- Default: `/`

The base URL to which the site will be deployed. You will need to set this if you plan to deploy your site under a sub path, for example GitHub pages. If you plan to deploy your site to `https://foo.github.io/bar/`, then `base` should be set to `"/bar/"`. It should always start and end with a forward slash (/).

The `base` is automatically prepended to all the URLs that start with `/` in other options, so you only need to specify it once.

**See also:**

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
    ['link', { rel: 'icon', href: '/logo.png' }]
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

::: tip
Please be aware of [GDPR (2018 reform of EU data protection rules)](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en) and consider setting Google Analytics to [anonymize IPs](https://support.google.com/analytics/answer/2763052?hl=en) where appropriate and/or needed.
:::

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

### shouldPrefetch

- Type: `Function`
- Default: `() => true`

A function to control what files should have `<link rel="preload">` resource hints generated. See [shouldPrefetch](https://ssr.vuejs.org/api/#shouldprefetch).

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

- [Default Theme Configuration](../default-theme-config/README.md).

## Markdown

### markdown.lineNumbers

- Type: `boolean`
- Default: `undefined`

Whether to show line numbers to the left of each code blocks.

**Also see:**

- [Line Numbers](../guide/markdown.md#line-numbers)

### markdown.slugify

- Type: `Function`
- Default: [source](https://github.com/vuejs/vuepress/blob/0.x/lib/markdown/slugify.js)

Function for transforming header texts into slugs. This affects the ids/links generated for header anchors, table of contents and sidebar links.

### markdown.externalLinks

- Type: `Object`
- Default: `{ target: '_blank', rel: 'noopener noreferrer' }`

The key and value pair will be added to `<a>` tags that points to an external link. The default option will open external links in a new window.

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

A function to modify default config or apply additional plugins to the [markdown-it](https://github.com/markdown-it/markdown-it) instance used to render source files. Example:

``` js
module.exports = {
  markdown: {
    config: md => {
      md.set({ breaks: true })
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

## Build Pipeline

:::tip Configuring CSS Pre-processors
VuePress comes with built-in webpack config for the CSS pre-processors listed below. For more information on installation these or pre-processors without built-in support, see [Using Pre-Processors](../guide/using-vue.md#using-pre-processors) for more information.
:::

### postcss

- Type: `Object`
- Default: `{ plugins: [require('autoprefixer')] }`

Options for [postcss-loader](https://github.com/postcss/postcss-loader). Note specifying this value will overwrite autoprefixer and you will need to include it yourself.

### stylus

- Type: `Object`
- Default: `{ preferPathResolver: 'webpack' }`

Options for [stylus-loader](https://github.com/shama/stylus-loader).

### scss

- Type: `Object`
- Default: `{}`

Options for [sass-loader](https://github.com/webpack-contrib/sass-loader) to load `*.scss` files.

### sass

- Type: `Object`
- Default: `{ indentedSyntax: true }`

Options for [sass-loader](https://github.com/webpack-contrib/sass-loader) to load `*.sass` files.

### less

- Type: `Object`
- Default: `{}`

Options for [less-loader](https://github.com/webpack-contrib/less-loader).

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
