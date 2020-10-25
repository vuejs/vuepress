<template>
  <div class="code-group-item" :class="{ 'code-group-item__active': active }">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CodeGroupItem',

  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<style scoped>
.code-group-item {
  display: none;
}
.code-group-item__active {
  display: block;
}
.code-group-item > pre {
  background-color: orange;
}
</style>
