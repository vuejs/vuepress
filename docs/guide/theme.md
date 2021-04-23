# Theme

VuePress theme can provide layouts, styles and many other features for you, helping you to focus on writing Markdown content.

VuePress has a default theme out of the box, which is applied to our documentation site you are currently browsing. The default theme provides basic but useful features for documentation site, you can check out [Default Theme Config Reference](../reference/default-theme/config.md) for a full list of config.

However, you might think it is not good enough. Or, you want to build a different type of site, for example, a blog, instead of a documentation. Then, you can try to [use a community theme](#community-theme) or [create a local theme](#local-theme).

## Community Theme

Community users have created lots of theme and published them to [NPM](https://www.npmjs.com/search?q=keywords:vuepress-theme). You should check the theme's own documentation for detailed guide.

In general, you need to specify the name of the theme to use in [theme](../reference/config.md#theme) option:

```js
module.exports = {
  theme: 'foo',
}
```

You can use either theme name or its shorthand:

|        Theme Name         |      Shorthand      |
|---------------------------|---------------------|
| `vuepress-theme-foo`      | `foo`               |
| `@org/vuepress-theme-bar` | `@org/bar`          |
| `@vuepress/theme-default` | `@vuepress/default` |

## Local Theme

If you want to use your own custom theme but don't want to publish it, you can create a local theme.

First, create the local theme directory, typically `.vuepress/theme` :

```
└─ docs
   ├─ .vuepress
   │  ├─ theme
   │  │  └─ index.js
   │  └─ config.js
   └─ README.md
```

Then, set the absolute path of the theme directory to use it:

```js
module.exports = {
  theme: path.resolve(__dirname, './path/to/docs/.vuepress/theme'),
}
```

Next, refer to [Advanced > Writing a Theme](../advanced/theme.md) for how to write your own theme.
