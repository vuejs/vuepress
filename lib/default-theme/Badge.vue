<script>
export default {
  functional: true,
  props: ['type', 'text'],
  render (h, { props, slots }) {
    return h('span', {
      class: ['badge', props.type]
    }, props.text || slots().default)
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.badge
  display inline-block
  vertical-align top
  font-size 14px
  height 18px
  line-height 18px
  border-radius 9px
  padding 0 5px
  color white
  margin-right 5px
  &.tip
    background-color #42b983
  &.warning, &.warn
    background-color darken(#ffe564, 35%)
</style>
