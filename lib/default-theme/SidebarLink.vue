<script>
import { isActive } from './util'

export default {
  functional: true,
  props: ['item'],
  render (h, { parent: { $route }, props: { item }}) {
    return h('router-link', {
      props: {
        to: item.path
      },
      class: {
        'sidebar-link': true,
        // use custom active class matching logic
        // due to edge case of paths ending with / + hash
        active: isActive($route, item.path)
      }
    }, [item.title || item.path])
  }
}
</script>

<style lang="stylus">
@import './styles/config.stylus'

a.sidebar-link
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.25rem
  padding-left 1.25rem
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
  .sidebar-group &
    padding-left 2rem
</style>
