# Using Vue in Markdown

## Templating

## Using Components

Any `*.vue` file found in `.vuepress/components` are automatically registered as global async components. For example:

``` bash
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
Note **components must be nested inside a `<div>`**, because otherwise they'd be automatically wrapped inside a `<p>`, which can only contain inline elements.
:::

## Style & Script

(TODO)
