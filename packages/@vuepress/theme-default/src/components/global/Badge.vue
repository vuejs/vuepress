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
      default: 'top',
    },
  },
})
</script>

<style lang="stylus">
@require('../../styles/config')

.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color white
  background-color #42b983
  &.tip, &.green
    background-color $badgeTipColor
  &.error
    background-color $badgeErrorColor
  &.warning, &.warn, &.yellow
    background-color $badgeWarningColor
  & + &
    margin-left 5px
</style>
