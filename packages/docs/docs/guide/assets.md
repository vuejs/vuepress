# Asset Handling

## Relative URLs

All Markdown files are compiled into Vue components and processed by webpack, so you can and **should prefer** referencing any asset using relative URLs:

``` md
![An image](./image.png)
```

This would work the same way as in `*.vue` file templates. The image will be processed with `url-loader` and `file-loader`, and copied to appropriate locations in the generated static build.

Also, you can use the `~` prefix to explicitly specify this is a webpack module request, allowing you to reference files with webpack aliases or from npm dependencies:

``` md
![Image from alias](~@alias/image.png)
![Image from dependency](~some-dependency/image.png)
```

Webpack aliases can be configured via [configureWebpack](../config/README.md#configurewebpack) in `.vuepress/config.js`. Example:

``` js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
```

## Public Files

Sometimes you may need to provide static assets that are not directly referenced in any of your Markdown or theme components - for example, favicons and PWA icons. In such cases, you can put them inside `.vuepress/public` and they will be copied to the root of the generated directory.

## Base URL

If your site is deployed to a non-root URL, you will need to set the `base` option in `.vuepress/config.js`. For example, if you plan to deploy your site to `https://foo.github.io/bar/`, then `base` should be set to `"/bar/"` (it should always start and end with a slash).

With a base URL, to reference an image in `.vuepress/public`, you’d have to use URLs like `/bar/image.png`. Yet, this is brittle if you ever decide to change the `base` later. To help with that, VuePress provides a built-in helper `$withBase` (injected onto Vue’s prototype) that generates the correct path:

``` vue
<img :src="$withBase('/foo.png')" alt="foo">
```

Note you can use the above syntax not only in theme components, but in your Markdown files as well.

Also, if a `base` is set, it’s automatically prepended to all asset URLs in `.vuepress/config.js` options.
