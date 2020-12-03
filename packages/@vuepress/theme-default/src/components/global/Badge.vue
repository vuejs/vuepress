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
  vertical-align top
  .table-of-contents &
    vertical-align middle
  &.tip
    background-color $badgeTipColor
  &.warning
    background-color $badgeWarningColor
  &.danger
    background-color $badgeDangerColor
  & + &
    margin-left 5px
</style>
