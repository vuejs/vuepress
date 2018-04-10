<script>
import { normalize, getHash, ensureExt } from './util'

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
        active: isActive($route, item)
      }
    }, [item.title || item.path])
  }
}

const endingSlashRE = /\/$/

export function isActive (route, page) {
  const routeHash = route.hash
  const linkHash = getHash(page.path)
  if (linkHash && routeHash !== linkHash) {
    return false
  }
  const routePath = normalize(route.path)
  const pagePath = normalize(page.path)
  if (endingSlashRE.test(routePath) || endingSlashRE.test(pagePath)) {
    return routePath === pagePath
  } else {
    return routePath.indexOf(pagePath) === 0
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
