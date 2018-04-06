# Markdown Extensions

## Links

- Inbound links ending in `.md` or `.html` are converted to `<router-link>` for SPA navigation.

  - [Home](/)
  - [Setup](./setup.md#quickstart)

- Outbound links automatically gets `target="_blank"`: [vuejs.org](https://vuejs.org)

## Header Anchors

Headers automatically get anchor links applied.

## Table of Contents

**Input**

``` markdown
[[toc]]
```

**Output**

[[toc]]

## Custom Containers

**Input**

``` markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous thing
:::
```

**Output**

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous thing
:::

## Line Highlighting in Code Blocks

**Input**

```` markdown
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Emoji

**Input**

``` markdown
:tada: :100:
```

**Output**

:tada: :100:

## Custom Configuration
