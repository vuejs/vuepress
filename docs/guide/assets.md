# Assets

## Relative URLs

You can reference any assets using relative URLs in your Markdown content:

```md
![An image](./image.png)
```

This is generally the suggested way to import images, as users usually place images near the Markdown file that references them.

## Public Files

You can put some static assets inside public directory, and they will be copied to the root of the generated directory.

The default public directory is `.vuepress/public`, which can be changed in config.

It would be useful in some cases:

- You may need to provide static assets that are not directly referenced in any of your Markdown files, for example, favicon and PWA icons.
- You may need to serve some shared static assets, which may even be referenced outside your site, for example, logo images.
- You may want to reference images using absolute URLs in your Markdown content.

Take our documentation source files as an example, we are putting the logo of VuePress inside the public directory:

```bash
└─ docs
   ├─ .vuepress
   |  └─ public
   |     └─ images
   |        └─ hero.png  # <- Logo file
   └─ guide
      └─ assets.md       # <- Here we are
```

We can reference our logo in current page like this:

**Input**

```md
![VuePress Logo](/images/hero.png)
```

**Output**

![VuePress Logo](/images/hero.png)

::: tip
Config reference: [public](../reference/config.md#public)
:::

### Base Helper

If your site is deployed to a non-root URL, i.e. the [base](../reference/config.md#base) is not `"/"`, you will need to prepend the `base` to the absolute URLs of your public files.

For example, if you plan to deploy your site to `https://foo.github.io/bar/`, then `base` should be set to `"/bar/"`, and you have to reference your public files in Markdown like this:

```md
![VuePress Logo](/bar/images/hero.png)
```

Obviously, it is brittle if you ever decide to change the `base`. This is the reason why we suggest to reference static assets using relative URLs.

To help with that, VuePress provides a built-in helper `$withBase` that generates the correct path:

```md
<img :src="$withBase('/images/hero.png')" alt="VuePress Logo">
```

The helper is verbose in Markdown. So it might be more helpful for theme and plugin authors.

::: tip
Config reference: [base](../reference/config.md#base)
:::

## Packages and Path Aliases

Although it is not a common usage, you can reference images from dependent packages:

```bash
npm install -D package-name
```

```md
![Image from dependency](package-name/image.png)
```

The path aliases that set in config file are also supported:

```js
module.exports = {
  alias: {
    '@alias': path.resolve(__dirname, './path/to/some/dir'),
  },
}
```

```md
![Image from path alias](@alias/image.png)
```

::: tip
Config reference: [alias](../reference/config.md#alias)
:::
