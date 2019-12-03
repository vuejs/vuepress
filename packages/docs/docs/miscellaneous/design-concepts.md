---
sidebar: auto
---

# Design Concepts of VuePress 1.x

The design concepts of VuePress 1.x are mainly reflected in the following aspects:

1. Pluggable.
2. Convention over configuration.
3. Reasonable priority management.

## Pluggable

VuePress 1.0 has been rewritten extensively, and the most important one is the introduction of the [Plugin API](../plugin/README.md). What are the benefits of plugins?

### Decoupling

With plugins, we can implement many of the core functions with plugins, and you can see many built-in plugins [here](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core/lib/node/internal-plugins) that cover many of the core functions of VuePress, which used to blend in all parts of the code base, but now they’re clear at a glance.

### Configuration management

In the past, when we came across some less common requirements, we had some doubts: if we wanted to not support it, VuePress usage scenarios were limited; but if we wanted to support it, we had to write it into the core code base and set up a separate configuration API for it. For the maintainers, apart from not conducive to long-term maintenance, this sometimes makes us feel exhausted. We must think of some better solutions. Yes, this is plugin.

### `.vuepress/config.js` is also a plugin

Yes, your configuration file is also a plugin, so you can use the Plugin API directly without having to create a new plugin for it and import it in the configuration.

::: tip
The options supported by `.vuepress/config.js` are actually based on the plugin options and add some specific options.
:::


### `theme/index.js` is also a plugin

The root configuration file of the theme is also a plugin.

::: tip
As with `.vuepress/config.js`, the options supported by `theme/config.js` are based on the plugin options and add some specific options. Using a graph to express their relationship:

<svg viewBox="0 0 2806 912" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 51 (57462) - http://www.bohemiancoding.com/sketch -->
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect id="Rectangle-3" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="2806" height="912"></rect>
        <circle id="Oval" stroke="#979797" fill="#EC5975" cx="1212.5" cy="455.5" r="355.5"></circle>
        <circle id="Oval" stroke="#979797" fill="#937AC4" cx="1592.5" cy="455.5" r="355.5"></circle>
        <path d="M1402.5,155.000018 C1501.96722,218.018606 1568,329.058303 1568,455.520781 C1568,581.983259 1501.96722,693.022956 1402.5,756.041544 C1303.03279,693.022977 1237,581.983271 1237,455.520781 C1237,329.058291 1303.03279,218.018585 1402.50003,155 Z" id="Combined-Shape" stroke="#FFFFFF" stroke-width="10" fill="#00BD8C"></path>
        <text id=".vuepress/-config.js" font-family="ArialMT, Arial" font-size="60" font-weight="normal" fill="#FFFFFF">
            <tspan x="901.101562" y="436">.vuepress/</tspan>
            <tspan x="929.446289" y="503">config.js</tspan>
        </text>
        <text id="Plugin-API" font-family="ArialMT, Arial" font-size="72" font-weight="normal" fill="#FFFFFF">
            <tspan x="1302.42773" y="436">Plugin</tspan>
            <tspan x="1344.47461" y="516">API</tspan>
        </text>
        <text id="theme/-index.js" font-family="ArialMT, Arial" font-size="60" font-weight="normal" fill="#FFFFFF">
            <tspan x="1662.78613" y="436">theme/</tspan>
            <tspan x="1652.78125" y="503">index.js</tspan>
        </text>
    </g>
</svg>
:::

### Apply plugins in a plugin

In VuePress, you have the ability to apply some plugins in a plugin:

```js
// vuepress-plugin-xxx
module.exports = {
  plugins: [
    'a', 'b', 'c'
  ]
}
```

## Convention over configuration.

VuePress 1.0 begin to introduce some conventions to reduce the user’s excessive configuration pressure, the most intuitive manifestation of this is the conventions for the [document directory structure](../guide/directory-structure.md) and the [theme directory structure](../theme/writing-a-theme.md#directory-structure).

In the future, we may combine community feedback to introduce more agreements. Let’s wait and see.

## Reasonable priority management.

Senior users have found that both theme developers and regular users have the ability to customize global `palettes`, `styles`, `templates` and `plugins`, so how do they work together?

### Loading Priority

For `templates/*`, follow the certain loading priority. Taking `templates/ssr.html` as an example:

<!-- textlint-disable en-capitalization, terminology -->

@flowstart
cond1=>condition: User’s ssr.html
exists?
cond2=>condition: Theme’s ssr.html
exists?
stage1=>operation: Using user’s ssr.html
stage2=>operation: Using theme’s ssr.html
stage3=>operation: Using default ssr.html

cond1(no, right)->cond2(no)->stage3
cond1(yes, bottom)->stage1
cond2(yes, bottom)->stage2
@flowend

<!-- textlint-enable -->

::: warning Note
When customizing `templates/ssr.html`, or `templates/dev.html`, it’s best to edit it on the basis of the [default template files](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/app/index.dev.html), otherwise it may cause a build failure.
:::

### Overriding

For `palette.styl`, `index.styl` and `plugins`, follow the principles of overriding:

#### palette.styl

User’s `styles/palette.styl` has a higher priority than the theme’s `styles/palette.styl`, so the theme can define its own palette and the user can tweak it. For example:

```stylus
// theme/styles/palette.styl
$accentColor = #0f0
```

```stylus
// .vuepress/styles/palette.styl
$accentColor = #f00
```

So the final value of `$accentColor` is `#f00`.

#### index.styl

Both the user’s `styles/index.styl` and the theme’s `styles/index.styl` are generated into the final `CSS` file, but the user’s style is generated later and therefore has higher priority. For example:

```stylus
// theme/styles/index.styl
.content
  font-size 14px
```

```stylus
// .vuepress/styles/index.styl
.content
  font-size 15px
```

The final generated CSS is as follows:

```css
/* theme/styles/index.styl */
.content {
  font-size: 14px;
}

/* .vuepress/styles/index.styl */
.content {
  font-size: 15px;
}
```

#### plugins

Since all plugins with the same name can be applied ONLY once by default, users can override the default options for plugins in theme. For example:

```js
// theme/index.js
module.exports = {
  plugins: [
    'vuepress-plugin-xxx',
    { name: 'foo' }
  ]
}
```

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    'vuepress-plugin-xxx',
    { name: 'bar' }
  ]
}
```

Then the final value of `name` option will be `bar`.


## Others

With the goal of decoupling, we were able to separate VuePress into the following two libraries by introducing monorepo:

- [@vuepress/core](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/core)：Including the core implementation of `dev`, `build` and `Plugin API`;
- [@vuepress/theme-default](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/theme-default)：The default theme you see now.

Of course, for most users, you don’t need to worry about these three libraries. The [VuePress](https://www.npmjs.com/search?Q=vuepress) package has already assembled them together, so you can use VuePress like `0.x`.


