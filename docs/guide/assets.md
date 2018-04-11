---
prev: ./markdown
next: ./using-vue
---

# Asset Handling

## Relative URLs

Since your markdown files are compiled into Vue components via webpack, you can safely reference any asset using relative paths on your file system:

``` md
![logo][./logo.png]
```

This would work the same way as if you are referencing it inside a `*.vue` file template. The image will be processed with `url-loader` and `file-loader`, and copied to appropriate locations in the generated static build.

## Public Files

Sometimes you may need to provide some static assets that are not directly referenced in any of your markdown or theme components - for example, favicons and PWA icons. In such cases you can put them inside `.vuepress/public` and they will be copied to the root of the generated directory.

## Base URL

If your site is deployed to a non-root URL, you will need to set the `base` option in `.vuepress/config.js`. For example, if you plan to deploy your site to `https://foo.github.io/bar/`, then `base` should be set to `"/bar/"` (it should always start and end with a slash).

With a base URL, if you want to reference an image in `.vuepress/public`, you'd have to use URLs like `/bar/image.png`. However, this is brittle if you ever decide to change the `base` later. To help with that, VuePress provides a built-in helper `$withBase` (injected onto Vue's prototype) that generates the correct path:

``` md
<img :src="$withBase('/foo.png')" alt="foo">
```

In addition, if a `base` is set, all asset URLs in `.vuepress/config.js` will get the base automatically prepended as well.
