# Using Vue in Markdown

## Templating

Each markdown file is first compiled into HTML and then passed on as a Vue component to `vue-loader`. This means you can use Vue-style interpolation in text:

**Input**

``` markdown
{{ 1 + 1 }}
```

**Output**

<pre><code>{{ 1 + 1 }}</code></pre>

Directives also work:

**Input**

``` markdown
<span v-for="i in 3">{{ i }} </span>
```

**Output**

<pre><code><span v-for="i in 3">{{ i }} </span></code></pre>

The compiled component does not have any private data but do have access to the [site metadata](./theming.md#site-and-page-metadata). For example:

**Input**

``` markdown
{{ $page }}
```

**Output**

<pre><code>{{ $page }}</code></pre>

## Escaping

By default, fenced code blocks are automatically wrapped with `v-pre`. If you want to display raw mustaches or Vue-specific syntax inside inline code snippets or plain text, you need to wrap a paragraph with the `v-pre` custom container:

``` markdown
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

## Using Components

Any `*.vue` file found in `.vuepress/components` are automatically registered as global async components. For example:

```
.
└── .vuepress
    └── components
        └── demo-1.vue
```

Inside any markdown file you can then use the component like so:

``` markdown
<div>
  <demo-1/>
</div>
```

::: warning
Note **components must be nested inside a `<div>`**, because otherwise they'd be automatically wrapped inside a `<p>`, which can only contain inline elements. If your component contains block level elements (it mostly likely does), it will cause hydration mismatch in static builds.
:::

## Script & Style Hoisting

(TODO)

Sometimes you may need to apply some JavaScript or CSS only to the current page. In those case you can directly write root-level `<script>` or `<style>` blocks in the markdown file, and they will be hoisted out of the compiled HTML and used as the `<script>` and `<style>` blocks for the resulting Vue single-file component.
