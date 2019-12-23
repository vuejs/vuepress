# Using Vue in Markdown

## Browser API Access Restrictions

Because VuePress applications are server-rendered in Node.js when generating static builds, any Vue usage must conform to the [universal code requirements](https://ssr.vuejs.org/en/universal.html). In short, make sure to only access Browser / DOM APIs in `beforeMount` or `mounted` hooks.

If you are using or demoing components that are not SSR friendly (for example containing custom directives), you can wrap them inside the built-in `<ClientOnly>` component:

``` md
<ClientOnly>
  <NonSSRFriendlyComponent/>
</ClientOnly>
```

Note this does not fix components or libraries that access Browser APIs **on import** - to use code that assumes a browser environment on import, you need to dynamically import them in proper lifecycle hooks:

``` vue
<script>
export default {
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      // use code
    })
  }
}
</script>
```

If your module `export default` a Vue component, you can register it dynamically:

```vue
<template>
  <component v-if="dynamicComponent" :is="dynamicComponent"></component>
</template>

<script>
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      this.dynamicComponent = module.default
    })
  }
}
</script>
```

**Also see:**

- [Vue.js > Dynamic Components](https://vuejs.org/v2/guide/components.html#Dynamic-Components)


## Templating

### Interpolation

Each Markdown file is first compiled into HTML and then passed on as a Vue component to `vue-loader`. This means you can use Vue-style interpolation in text:

**Input**

``` md
{{ 1 + 1 }}
```

**Output**

<div class="language-text"><pre><code>{{ 1 + 1 }}</code></pre></div>

### Directives

Directives also work:

**Input**

``` md
<span v-for="i in 3">{{ i }} </span>
```

**Output**

<div class="language-text"><pre><code><span v-for="i in 3">{{ i }} </span></code></pre></div>

### Access to Site & Page Data

The compiled component does not have any private data but does have access to the [site metadata](../theme/writing-a-theme.md#site-and-page-metadata). For example:

**Input**

``` md
{{ $page }}
```

**Output**

``` json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {}
}
```

## Escaping

By default, fenced code blocks are automatically wrapped with `v-pre`. To display raw mustaches or Vue-specific syntax inside inline code snippets or plain text, you need to wrap a paragraph with the `v-pre` custom container:

**Input**

``` md
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

**Output**

::: v-pre
`{{ This will be displayed as-is }}`
:::

## Using Components

Any `*.vue` files found in `.vuepress/components` are automatically registered as [global](https://vuejs.org/v2/guide/components-registration.html#Global-Registration), [async](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components) components. For example:

```
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      ├─ OtherComponent.vue
      └─ Foo
         └─ Bar.vue
```

Inside any Markdown file you can then directly use the components (names are inferred from filenames):

``` md
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

<demo-1></demo-1>

<OtherComponent/>

<Foo-Bar/>

::: warning IMPORTANT
Make sure a custom component’s name either contains a hyphen or is in PascalCase. Otherwise it will be treated as an inline element and wrapped inside a `<p>` tag, which will lead to hydration mismatch because `<p>` does not allow block elements to be placed inside it.
:::

### Using Components In Headers

You can use Vue components in the headers, but note the difference between the following two ways:

| Markdown | Output HTML | Parsed Header |
|--------|-------------|----------------|
| <pre v-pre><code> # text &lt;Tag/&gt; </code></pre> | `<h1>text <Tag/></h1>` | `text` |
| <pre v-pre><code> # text \`&lt;Tag/&gt;\` </code></pre> | `<h1>text <code>&lt;Tag/&gt;</code></h1>` | `text <Tag/>` |

The HTML wrapped by `<code>` will be displayed as is, only the HTML that is not wrapped will be parsed by Vue.

::: tip

The output HTML is accomplished by [markdown-it](https://github.com/markdown-it/markdown-it), while the parsed headers are done by VuePress, and used for the [sidebar](../theme/default-theme-config.md#sidebar) and the document title.
:::

## Using Pre-processors

VuePress has built-in webpack config for the following pre-processors: `sass`, `scss`, `less`, `stylus` and `pug`. All you need to do is installing the corresponding dependencies. For example, to enable `sass`, install the following in your project:

``` bash
yarn add -D sass-loader node-sass
```

Now you can use the following in Markdown and theme components:

``` vue
<style lang="sass">
.title
  font-size: 20px
</style>
```

Using `<template lang="pug">` requires installing `pug` and `pug-plain-loader`:

``` bash
yarn add -D pug pug-plain-loader
```

::: tip
If you are a Stylus user, you don’t need to install `stylus` and `stylus-loader` in your project because VuePress uses Stylus internally.

For pre-processors that do not have built-in webpack config support, you will need to [extend the internal webpack config](../config/README.md#configurewebpack) and install the necessary dependencies.
:::

## Script & Style Hoisting

Sometimes you may need to apply some JavaScript or CSS only to the current page. In those cases, you can directly write root-level `<script>` or `<style>` blocks in the Markdown file, and they will be hoisted out of the compiled HTML and used as the `<script>` and `<style>` blocks for the resulting Vue single-file component.

<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  props: ['slot-key'],
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = 'This is rendered by inline script and styled by inline CSS'
  }
}
</script>

## Built-In Components

### OutboundLink <Badge text="stable"/>

It(<OutboundLink/>) is used to specify that this is an external link. In VuePress, this component has been followed by every external link.

### ClientOnly <Badge text="stable"/>

See [Browser API Access Restrictions](#browser-api-access-restrictions).

### Content

- **Props**:

  - `pageKey` - string, [page](./global-computed.md#page)'s hash key, defaults to current page’s key.
  - `slotKey` - string, key of [Markdown slot](./markdown-slot.md). Defaults to [default slot](./markdown-slot.md#default-slot-content).

- **Usage**：

Specify a specific slot for a specific page (.md) for rendering. This will be useful when you use [Custom Layout](../theme/default-theme-config.md#custom-layout-for-specific-pages) or [Writing a theme](../theme/writing-a-theme.md)

``` vue
<Content/>
```

**Also see:**

- [Global Computed > $page](./global-computed.md#page)
- [Markdown Slot](./markdown-slot.md)
- [Writing a theme > Content Outlet](../theme/writing-a-theme.md#content-outlet)


### Badge <Badge text="beta" type="warning"/> <Badge text="default theme"/>

- **Props**:

  - `text` - string
  - `type` - string, optional value: `"tip"|"warning"|"error"`, defaults to `"tip"`.
  - `vertical` - string, optional value: `"top"|"middle"`, defaults to `"top"`.

- **Usage**:

You can use this component in header to add some status for some API:

``` md
### Badge <Badge text="beta" type="warning"/> <Badge text="default theme"/>
```

**Also see:**

- [Using Components In Headers](#using-components-in-headers)
