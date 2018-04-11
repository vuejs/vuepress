<script>
import { isActive } from './util'

export default {
  functional: true,
  props: ['item'],
  render (h, { parent: { $route }, props: { item }}) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const active = isActive($route, item.path)
    const link = renderLink(h, item.path, item.title || item.path, active)
    return active && item.headers
      ? [link, renderChildren(h, item, $route)]
      : link
  }
}

function renderLink (h, to, text, active) {
  return h('router-link', {
    props: { to },
    class: {
      active,
      'sidebar-link': true
    }
  }, text)
}

function renderChildren (h, { path, headers }, route) {
  headers = headers.filter(h => h.level === 2)
  return h('ul', { class: 'sidebar-sub-headers' }, headers.map(c => {
    const active = isActive(route, path + '#' + c.slug)
    return h('li', { class: 'sidebar-sub-header' }, [
      renderLink(h, '#' + c.slug, c.title, active)
    ])
  }))
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
  .sidebar-sub-headers &
    padding-left 3.25rem
    padding-top 0
    border-left none
    font-size 0.95em
    &.active
      font-weight 500
</style>
