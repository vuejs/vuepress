---
prev: /markdown
next: /using-vue
---

# Asset Handling

## Relative URLs

Since your markdown files are compiled into Vue components via webpack, you can safely reference any asset using relative paths on your file system:

``` md
![logo][./logo.png]
```

This would work the same way as if you are referencing it inside a `*.vue` file template. The image will be processed with `url-loader` and `file-loader`, and copied to appropriate locations in the generated static build.

## Public Files

Sometimes you may need to provide some static assets that are not directly referenced in any of your markdown or theme components - for example, favicons and PWA icons. In that case you can put them inside `.vuepress/public` and they will be copied to the root of the generated static build.

## Referencing Base URL Dynamically

If your site is deployed to a non-root URL, you will need to set the `base` option in `.vuepress/config.js`. The value of this option will be available anywhere in markdown or your components as `$site.base`. In order to use it though, you will have to use direct HTML along with Vue bindings:

``` md
<img :src="$site.base + 'foo.png'" alt="foo">
```
