<script>
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'tip'
    },
    text: String,
    vertical: {
      type: String,
      default: 'top'
    }
  },
  render (h, { props, slots }) {
    return h('span', {
      class: ['badge', props.type, props.vertical]
    }, props.text || slots().default)
  }
}
</script>

<style lang="stylus" scoped>
@import '../../default-theme/styles/config.styl'

.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color white
  margin-right 5px
  background-color #42b983
  &.middle
    vertical-align middle
  &.top
    vertical-align top
  &.tip, &.green
    background-color #42b983
  &.error
    background-color #DA5961 //#f66
  &.warning, &.warn, &.yellow
    background-color darken(#ffe564, 35%)
</style>
