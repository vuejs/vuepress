<template>
  <span
    class="badge"
    :class="type"
    :style="{
      verticalAlign: vertical,
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Badge',

  props: {
    type: {
      type: String,
      required: false,
      default: 'tip',
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    vertical: {
      type: String,
      required: false,
      default: undefined,
    },
  },
})
</script>
