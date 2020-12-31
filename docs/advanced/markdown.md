# Markdown and Vue SFC

Each Markdown file is first compiled into HTML, and then converted to a Vue SFC. In other words, you can take Markdown as Vue SFC:

- Blocks `<script>` and `<style>` are treated as Vue SFC blocks as they are. In other words, they are hoisted from the `<template>` block to the top-level of SFC.
- Everything outside `<script>` and `<style>` will be compiled into HTML, and be treated as Vue SFC `<template>` block.

Here comes an example:

**Input**

```vue
_Hello, {{ msg }}_

<RedDiv>

_Current count is: {{ count }}_

</RedDiv>

<button @click="count++">Click Me!</button>

<script>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)

export default {
  components: {
    RedDiv,
  },

  setup() {
    const msg = 'Vue in Markdown'
    const count = ref(0)

    return {
      msg,
      count,
    }
  }
}
</script>

<style>
.red-div {
  color: red;
}
</style>
```

**Output**

_Hello, {{ msg }}_

<RedDiv>

_Current count is: {{ count }}_

</RedDiv>

<button @click="count++">Click Me!</button>

<script>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)

export default {
  components: {
    RedDiv,
  },

  setup() {
    const msg = 'Vue in Markdown'
    const count = ref(0)

    return {
      msg,
      count,
    }
  }
}
</script>

<style>
.red-div {
  color: red;
}
</style>
